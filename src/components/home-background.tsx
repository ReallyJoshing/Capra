'use client';

import { useSyncExternalStore } from 'react';
import { backgrounds, defaultBackground } from '@/config/backgrounds';

const key = 'odle-home-background';
let temporarySelection: string | undefined;
function read() {
  try { return temporarySelection ?? localStorage.getItem(key) ?? defaultBackground.id; }
  catch { return temporarySelection ?? defaultBackground.id; }
}
function subscribe(callback: () => void) {
  const storage = () => { temporarySelection = undefined; callback(); };
  window.addEventListener('storage', storage);
  window.addEventListener('odle-background-change', callback);
  return () => {
    window.removeEventListener('storage', storage);
    window.removeEventListener('odle-background-change', callback);
  };
}
export function useHomeBackground() {
  const id = useSyncExternalStore(subscribe, read, () => defaultBackground.id);
  const selected = backgrounds.find(background => background.id === id) ?? defaultBackground;
  function select(id: string) {
    temporarySelection = id;
    try { localStorage.setItem(key, id); } catch { /* Keep the current session usable without storage. */ }
    window.dispatchEvent(new Event('odle-background-change'));
  }
  return { selected, select };
}
export function HomeBackground() {
  const { selected } = useHomeBackground();
  return <div className="home-background" aria-hidden="true" style={{ backgroundImage: selected.src ? `url("${selected.src}")` : 'none' }} />;
}
