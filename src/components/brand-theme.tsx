'use client';

import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { defaultBrandColors } from '@/config/brand-palettes';

type BrandColors = typeof defaultBrandColors;
const key = 'capra-brand-colors';
const legacyKey = 'odle-brand-colors';
const defaults = JSON.stringify(defaultBrandColors);
let sessionValue: string | undefined;
function snapshot() {
  try { return sessionValue ?? localStorage.getItem(key) ?? localStorage.getItem(legacyKey) ?? defaults; }
  catch { return sessionValue ?? defaults; }
}
function subscribe(update: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === key || event.key === legacyKey || event.key === null) { sessionValue = undefined; update(); }
  };
  window.addEventListener('storage', storage);
  window.addEventListener('capra-colors-change', update);
  return () => {
    window.removeEventListener('storage', storage);
    window.removeEventListener('capra-colors-change', update);
  };
}
export function useBrandColors() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => defaults);
  const colors = useMemo<BrandColors>(() => {
    try {
      const value = JSON.parse(raw);
      if (/^#[\da-f]{6}$/i.test(value.primary) && /^#[\da-f]{6}$/i.test(value.secondary)) return value;
    } catch { /* Ignore invalid saved preferences. */ }
    return defaultBrandColors;
  }, [raw]);
  function setColors(next: BrandColors) {
    sessionValue = JSON.stringify(next);
    try { localStorage.setItem(key, sessionValue); localStorage.removeItem(legacyKey); } catch { /* Still apply within this tab. */ }
    window.dispatchEvent(new Event('capra-colors-change'));
  }
  return { colors, setColors };
}
export function BrandTheme() {
  const { colors } = useBrandColors();
  useEffect(() => {
    document.documentElement.style.setProperty('--wordmark-color', colors.primary);
    document.documentElement.style.setProperty('--wordmark-inlay-color', colors.secondary);
  }, [colors]);
  return null;
}
