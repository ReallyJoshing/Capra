import Link from 'next/link';
import {stripeClient} from '@/lib/stripe';
export const dynamic='force-dynamic';
export default async function SuccessPage({searchParams}:{searchParams:Promise<{session_id?:string}>}){
 const {session_id}=await searchParams;let paid=false;try{if(session_id?.startsWith('cs_test_')){const session=await stripeClient().checkout.sessions.retrieve(session_id);paid=session.payment_status==='paid'&&session.metadata?.prototype==='true';}}catch{}
 return <main id="main-content" className="commerce-page confirmation"><p className="eyebrow">ODLE / TEST CHECKOUT</p><h1>{paid?'Test payment received.':'Checking your payment.'}</h1><p>{paid?'Your Stripe test payment succeeded. This is a prototype order; no real charge was made and no goods will ship.':'Payment has not been confirmed. If you just paid, refresh this page in a moment. Do not pay again until you check the status.'}</p><Link className="primary-button" href="/clothing">Back to the collection</Link></main>;
}
