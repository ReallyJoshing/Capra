'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from './cart-store';
import { productDetails } from '@/data/commerce';
export function ProductPurchase({ id }: { id: string }) {
  const detail = productDetails[id]; const cart = useCart();
  const [size,setSize] = useState(detail.sizes.length === 1 ? detail.sizes[0] : '');
  const [message,setMessage] = useState('');
  return <div className="purchase-controls">
    <fieldset className="size-selector"><legend>Select size</legend>{detail.sizes.map(s => <button key={s} type="button" aria-pressed={size===s} onClick={() => {setSize(s);setMessage('');}}>{s}</button>)}</fieldset>
    <button className="primary-button" onClick={() => { if(!size) {setMessage('Select a size to add this item.');return;} cart.add(id,size);setMessage('Added to your bag.'); }}>Add to bag</button>
    <p className="purchase-status" role="status">{message} {message.startsWith('Added') && <Link href="/cart">View bag</Link>}</p>
  </div>;
}
