import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { commerce, productDetails } from '@/data/commerce';
import { allProducts as products } from '@/data/products';
import { shippingAmount, validateCart } from '@/lib/cart-validation.mjs';
import { appOrigin, stripeClient } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (request.headers.get('origin') !== appOrigin()) {
    return NextResponse.json({ error: 'Please open checkout from the storefront.' }, { status: 403 });
  }

  let input;
  try {
    const text = await request.text();
    if (text.length > 12000) throw new Error();
    input = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Invalid checkout request.' }, { status: 400 });
  }

  let items;
  try {
    items = validateCart(input.items, productDetails);
    if (typeof input.attempt !== 'string' || !/^[\w-]{16,64}$/.test(input.attempt)) {
      throw new Error('Invalid checkout attempt.');
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid bag.' }, { status: 400 });
  }

  try {
    const stripe = stripeClient();
    const subtotal = items.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      branding_settings: {
        display_name: `${commerce.businessName} — Prototype`,
        background_color: '#ffffff',
        button_color: '#34382f',
        border_style: 'rectangular',
      },
      line_items: items.map(item => ({
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: item.unitAmount,
          product_data: {
            name: `${products.find(product => product.id === item.id)!.name} — ${item.size}`,
            description: 'Capra prototype item. Test payment only; no goods will ship.',
            metadata: { product_id: item.id, size: item.size },
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [{
        shipping_rate_data: {
          display_name: 'Prototype US shipping',
          type: 'fixed_amount',
          fixed_amount: { amount: shippingAmount(subtotal), currency: 'usd' },
        },
      }],
      success_url: `${appOrigin()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appOrigin()}/cart`,
      metadata: { prototype: 'true' },
      custom_text: { submit: { message: 'Prototype checkout. Test cards only. No goods will ship.' } },
    }, {
      idempotencyKey: `capra-${input.attempt}-${createHash('sha256').update(JSON.stringify(items)).digest('hex').slice(0, 16)}`,
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: 'Stripe test checkout is unavailable. Please try again shortly.' }, { status: 503 });
  }
}
