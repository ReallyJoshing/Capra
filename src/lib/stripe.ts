import Stripe from 'stripe';
export function stripeClient(){const key=process.env.STRIPE_SECRET_KEY;if(!key||!/^(sk|rk|rkcs)_test_/.test(key))throw new Error('Stripe test checkout is not configured yet.');return new Stripe(key);}
export function appOrigin(){return process.env.APP_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://127.0.0.1:3001');}
