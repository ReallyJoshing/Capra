'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { Product } from '@/data/products';

export function ProductViewer({ product, initialIndex, onClose }: {
  product: Product; initialIndex: number; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLButtonElement>(null);
  const gesture = useRef({ x: 0, y: 0, moved: false });
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(false);
  const [point, setPoint] = useState({ x: .5, y: .5 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const id = useId();
  const photo = product.images[index];
  const lens = Math.min(190, size.width * .5);
  const x = point.x * size.width;
  const y = point.y * size.height;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    if (stage.current) observer.observe(stage.current);
    return () => {
      observer.disconnect();
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, []);

  function move(clientX: number, clientY: number) {
    const rect = stage.current?.getBoundingClientRect();
    if (rect) setPoint({ x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)), y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)) });
  }

  return (
    <dialog ref={dialog} className="product-viewer" aria-labelledby={`${id}-title`}
      onClose={onClose} onCancel={event => { if (zoom) { event.preventDefault(); setZoom(false); } }}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="viewer-content">
        <header className="viewer-heading">
          <h2 id={`${id}-title`}>{product.name}</h2>
          <button type="button" className="viewer-close" onClick={() => dialog.current?.close()} aria-label="Close product viewer">×</button>
        </header>
        <button ref={stage} type="button" className="viewer-image" data-zoom={zoom}
          aria-label={zoom ? 'Turn magnifier off' : 'Magnify product photo'} aria-pressed={zoom} aria-describedby={`${id}-hint`}
          onPointerDown={event => {
            gesture.current = { x: event.clientX, y: event.clientY, moved: false };
            move(event.clientX, event.clientY);
            if (zoom) event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={event => {
            if (Math.hypot(event.clientX - gesture.current.x, event.clientY - gesture.current.y) > 5) gesture.current.moved = true;
            if (zoom) move(event.clientX, event.clientY);
          }}
          onClick={event => {
            if (event.detail === 0) { setPoint({ x: .5, y: .5 }); setZoom(!zoom); }
            else if (!gesture.current.moved) { move(event.clientX, event.clientY); setZoom(!zoom); }
          }}
          onKeyDown={event => {
            const steps: Record<string, [number, number]> = { ArrowLeft: [-.05, 0], ArrowRight: [.05, 0], ArrowUp: [0, -.05], ArrowDown: [0, .05] };
            if (zoom && steps[event.key]) {
              event.preventDefault(); const [dx, dy] = steps[event.key];
              setPoint(p => ({ x: Math.max(0, Math.min(1, p.x + dx)), y: Math.max(0, Math.min(1, p.y + dy)) }));
            }
          }}>
          {/* Full source keeps the magnifier sharp and uses the same contain geometry in both layers. */}
          <img src={photo.src} alt={photo.alt} draggable={false} />
          {zoom && size.width > 0 && <span className="image-magnifier" aria-hidden="true" style={{
            width: lens, height: lens,
            left: Math.max(0, Math.min(size.width - lens, x - lens / 2)),
            top: Math.max(0, Math.min(size.height - lens, y - lens / 2)),
          }}>
            <img src={photo.src} alt="" draggable={false} style={{
              width: size.width * 2.5, height: size.height * 2.5,
              left: lens / 2 - x * 2.5, top: lens / 2 - y * 2.5,
            }} />
          </span>}
        </button>
        <div className="viewer-footer">
          <div className="view-dots" role="group" aria-label="Product photos">
            {product.images.map((image, i) => <button key={image.src} type="button" aria-label={`Show ${image.label.toLowerCase()} view (${i + 1} of ${product.images.length})`} aria-pressed={index === i}
              onClick={() => { setIndex(i); setZoom(false); }}><span /></button>)}
          </div>
          <p id={`${id}-hint`}>{zoom ? 'Move or drag to inspect · Click again to exit' : 'Click the photo to magnify'}</p>
          {photo.generated && <p className="viewer-concept-note">Generated back-view concept</p>}
        </div>
      </div>
    </dialog>
  );
}
