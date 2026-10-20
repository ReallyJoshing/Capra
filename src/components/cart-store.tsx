'use client';
import { useSyncExternalStore } from 'react';
import { productDetails } from '@/data/commerce';
export type CartItem = { id: string; size: string; quantity: number };
const key = 'capra-cart-v1';
let memory: string | undefined;
function snapshot() { try { return memory ?? localStorage.getItem(key) ?? '[]'; } catch { return memory ?? '[]'; } }
function subscribe(callback: () => void) {
  const sync = (event: StorageEvent) => { if (event.key === key || event.key === null) { memory = undefined; callback(); } };
  window.addEventListener('storage', sync); window.addEventListener('capra-cart', callback);
  return () => { window.removeEventListener('storage', sync); window.removeEventListener('capra-cart', callback); };
}
function write(items: CartItem[]) { memory = JSON.stringify(items); try { localStorage.setItem(key, memory); } catch {} window.dispatchEvent(new Event('capra-cart')); }
export function useCart() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => '[]');
  let items: CartItem[] = [];
  try { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) items = parsed.filter(i => productDetails[i?.id]?.sizes.includes(i.size) && Number.isInteger(i.quantity) && i.quantity > 0 && i.quantity <= 10); } catch {}
  return {
    items, count: items.reduce((n,i) => n+i.quantity,0),
    add(id: string, size: string) { const existing = items.find(i => i.id === id && i.size === size); write(existing ? items.map(i => i === existing ? {...i, quantity: Math.min(10,i.quantity+1)} : i) : [...items,{id,size,quantity:1}]); },
    update(id: string, size: string, quantity: number) { write(items.map(i => i.id === id && i.size === size ? {...i,quantity} : i).filter(i => i.quantity > 0)); },
    clear() { write([]); },
  };
}
