'use client';
import { useRef, useState } from 'react';
import type { Product } from '@/data/products';
import { ColorwaySwatches } from '@/components/colorway-swatches';
function GalleryPhoto({ image }: { image: Product['images'][number] }) {
  const ref = useRef<HTMLButtonElement>(null); const lens = useRef<HTMLSpanElement>(null);
  const [zoom,setZoom]=useState(false);
  const point=useRef({x:.5,y:.5});
  function position(x:number,y:number) {
    const node=ref.current, glass=lens.current;if(!node||!glass)return;
    const w=node.clientWidth,h=node.clientHeight,l=Math.min(180,w*.48);
    point.current={x,y};glass.style.width=`${l}px`;glass.style.height=`${l}px`;
    glass.style.left=`${Math.max(0,Math.min(w-l,x*w-l/2))}px`;glass.style.top=`${Math.max(0,Math.min(h-l,y*h-l/2))}px`;
    const photo=glass.firstElementChild as HTMLImageElement;
    Object.assign(photo.style,{width:`${w*2.5}px`,height:`${h*2.5}px`,left:`${l/2-x*w*2.5}px`,top:`${l/2-y*h*2.5}px`});
  }
  return <figure className="detail-photo"><button ref={ref} type="button" className="detail-photo-button" aria-label={zoom?'Exit magnification':'Magnify product photo'} aria-pressed={zoom}
    onClick={()=>{setZoom(!zoom);requestAnimationFrame(()=>position(point.current.x,point.current.y));}}
    onPointerMove={event=>{const r=event.currentTarget.getBoundingClientRect();position(Math.max(0,Math.min(1,(event.clientX-r.left)/r.width)),Math.max(0,Math.min(1,(event.clientY-r.top)/r.height)));}}
    onKeyDown={event=>{const delta:Record<string,[number,number]>={ArrowLeft:[-.05,0],ArrowRight:[.05,0],ArrowUp:[0,-.05],ArrowDown:[0,.05]};if(zoom&&delta[event.key]){event.preventDefault();const [dx,dy]=delta[event.key];position(Math.max(0,Math.min(1,point.current.x+dx)),Math.max(0,Math.min(1,point.current.y+dy)));}if(event.key==='Escape')setZoom(false);}}>
    <img src={image.src} alt={image.alt} draggable={false}/>
    <span ref={lens} className="image-magnifier" hidden={!zoom} aria-hidden="true"><img src={image.src} alt="" draggable={false}/></span>
  </button>{image.generated&&<figcaption>{image.label} · Generated concept image</figcaption>}</figure>;
}
export function ProductGallery({ product, initialColor }: { product: Product; initialColor?: string }) {
  const [selected, setSelected] = useState(product.colorways?.find(colorway => colorway.name === initialColor)?.imageIndex ?? 0);
  if (product.colorways) return <div className="detail-gallery concept-gallery">
    <GalleryPhoto key={product.images[selected].src} image={product.images[selected]} />
    <ColorwaySwatches product={product} selected={selected} onSelect={setSelected} />
    <p className="colorway-name" aria-live="polite">{product.colorways.find(colorway => colorway.imageIndex === selected)?.name}</p>
  </div>;
  return <div className={`detail-gallery${product.concept ? ' concept-gallery' : ''}`}>{product.images.map(image => <GalleryPhoto key={image.src} image={image} />)}</div>;
}
