import {NextResponse} from 'next/server';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {stripeClient} from '@/lib/stripe';
export const runtime='nodejs';
export async function POST(request:Request){
 const secret=process.env.STRIPE_WEBHOOK_SECRET;if(!secret)return NextResponse.json({error:'Webhook is not configured.'},{status:503});
 let event;try{event=stripeClient().webhooks.constructEvent(await request.text(),request.headers.get('stripe-signature')||'',secret);}catch{return NextResponse.json({error:'Invalid signature.'},{status:400});}
 if(event.livemode)return NextResponse.json({error:'This endpoint accepts test events only.'},{status:400});
 if(event.type==='checkout.session.completed'||event.type==='checkout.session.async_payment_succeeded'){
 const session=event.data.object;if(session.payment_status==='paid'&&session.metadata?.prototype==='true'){
 try{if(process.env.VERCEL){await stripeClient().checkout.sessions.update(session.id,{metadata:{prototype_payment_recorded:'true'}});return NextResponse.json({received:true});}const directory=path.join(process.cwd(),'.data','test-orders');await mkdir(directory,{recursive:true});await writeFile(path.join(directory,`${session.id}.json`),JSON.stringify({sessionId:session.id,eventId:event.id,amount:session.amount_total,currency:session.currency,status:'paid',prototype:true,recordedAt:new Date().toISOString()}),{flag:'wx',mode:0o600});}catch(e){if((e as NodeJS.ErrnoException).code!=='EEXIST')return NextResponse.json({error:'Unable to record order.'},{status:500});}
 }}
 return NextResponse.json({received:true});
}
