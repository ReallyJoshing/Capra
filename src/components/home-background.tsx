'use client';

import { useSyncExternalStore } from 'react';
import { backgrounds, defaultBackground } from '@/config/backgrounds';

const key = 'capra-home-background';
const legacyKey = 'odle-home-background';
let temporarySelection: string | undefined;
function read() {
  try { return temporarySelection ?? localStorage.getItem(key) ?? localStorage.getItem(legacyKey) ?? defaultBackground.id; }
  catch { return temporarySelection ?? defaultBackground.id; }
}
function subscribe(callback: () => void) {
  const storage = (event: StorageEvent) => { if (event.key === key || event.key === legacyKey || event.key === null) { temporarySelection = undefined; callback(); } };
  window.addEventListener('storage', storage);
  window.addEventListener('capra-background-change', callback);
  return () => {
    window.removeEventListener('storage', storage);
    window.removeEventListener('capra-background-change', callback);
  };
}
export function useHomeBackground() {
  const id = useSyncExternalStore(subscribe, read, () => defaultBackground.id);
  const selected = backgrounds.find(background => background.id === id) ?? defaultBackground;
  function select(id: string) {
    temporarySelection = id;
    try { localStorage.setItem(key, id); localStorage.removeItem(legacyKey); } catch { /* Keep the current session usable without storage. */ }
    window.dispatchEvent(new Event('capra-background-change'));
  }
  return { selected, select };
}
export function HomeBackground() {
  const { selected } = useHomeBackground();
  return <div className="home-background" aria-hidden="true" style={{ backgroundImage: selected.src ? `url("${selected.src}")` : 'none' }} />;
}
