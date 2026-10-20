'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function keepVictoryInFrame(video: HTMLVideoElement) {
  const mobile = window.matchMedia('(max-width: 639px)').matches;
  const trophyLift = video.currentTime >= 6.2 && video.currentTime < 7.6;
  video.style.objectPosition = mobile && trophyLift ? '25% center' : 'center';
}

export function CapraHero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrowScreen = window.matchMedia('(max-width: 639px)');
    let visible = false;
    setPlaying(!video.paused);
    const syncCrop = () => keepVictoryInFrame(video);
    syncCrop();

    function syncPlayback() {
      if (!video) return;
      if (!visible || reducedMotion.matches || userPaused.current) {
        video.pause();
        setPlaying(false);
        return;
      }
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });

    observer.observe(frame);
    reducedMotion.addEventListener('change', syncPlayback);
    narrowScreen.addEventListener('change', syncCrop);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', syncPlayback);
      narrowScreen.removeEventListener('change', syncCrop);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  return (
    <div className="capra-reel-frame" ref={frameRef}>
      <Image
        className="capra-reel-poster"
        src="/videos/capra-reel-poster.jpg"
        alt=""
        fill
        sizes="100vw"
        loading="eager"
      />
      <video
        className="capra-reel-video"
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        poster="/videos/capra-reel-poster.jpg"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={event => keepVictoryInFrame(event.currentTarget)}
      >
        <source src="/videos/capra-reel.mp4" type="video/mp4" />
      </video>
      <div className="capra-reel-shade" aria-hidden="true" />
      <div className="capra-reel-copy">
        <p>Capra / In motion</p>
        <h2>Chase it.<br />Earn it.</h2>
        <p className="capra-reel-deck">For the big leap, the last push, and the celebration with your people.</p>
        <a href="#capra-outro">Keep going <span aria-hidden="true">↓</span></a>
      </div>
      <p className="capra-reel-credit">Illustrative footage · No athlete endorsement</p>
      <button
        className="capra-reel-control"
        type="button"
        aria-label={playing ? 'Pause film' : 'Play film'}
        onClick={togglePlayback}
      >
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
      </button>
      <p className="sr-only">A fast montage of rock climbing, freestyle snowboarding, a hockey trophy lift, mountain biking, a soccer medal celebration, cliff diving, and big-wave surfing.</p>
    </div>
  );
}
