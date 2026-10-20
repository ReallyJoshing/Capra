'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SiteActions } from './site-actions';
import styles from './decades-home.module.css';
import film from '@/data/decades-film.json';

export function DecadesHome() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const creditsRef = useRef<HTMLDialogElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      if (document.hidden || motion.matches || pausedByUser.current) {
        video.pause();
      } else {
        void video.play().catch(() => setPlaying(false));
      }
    };
    // The file may have loaded before React attached event handlers.
    if (video.readyState >= 2) setReady(true);
    sync();
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    return () => {
      video.pause();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      void video.play().catch(() => setPlaying(false));
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  }

  return (
    <main
      id="main-content"
      className={styles.home}
      data-ready={ready || failed}
      data-intro-complete={introComplete}
    >
      <h1 className="sr-only">Capra. For the ones who go beyond.</h1>

      <div
        className={styles.filmWindow}
        aria-hidden="true"
        onAnimationEnd={event => {
          if (event.target === event.currentTarget) setIntroComplete(true);
        }}
      >
        <video
          ref={videoRef}
          className={styles.film}
          muted
          playsInline
          loop
          preload="auto"
          poster="/videos/greatness-poster.jpg"
          onLoadedData={() => setReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          <source src="/videos/greatness-through-time.mp4" type="video/mp4" onError={() => setFailed(true)} />
        </video>
        <div className={styles.scrim} />
      </div>

      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="Capra home">
          <Image
            src="/images/brand/capra-sketch-transparent.png"
            alt=""
            width={1460}
            height={1078}
            sizes="112px"
            preload
          />
        </a>
        <SiteActions />
      </header>

      <p className={styles.introCaption} aria-hidden="true">Greatness, through time.</p>

      <section className={styles.manifesto} aria-label="Our spirit">
        <div className={styles.copy}>
          <p>Every generation has someone<br />who goes a little further.</p>
          <p>Higher than anyone imagined.<br />Faster than anyone believed.<br />Beyond what seemed possible.</p>
          <p>A first step.<br />A last-second win.<br />A lifetime in one moment.</p>
          <p>For the ones who dream it.<br />And then go out and do it.</p>
          <p>This is Capra.</p>
        </div>
        <Link className={styles.callToAction} href="/clothing">
          Explore
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
        </Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.filmTitle}>
          <span className={styles.title}>Greatness, through time</span>
          <span className={styles.cue}>{film.shots[0].year}—{film.shots.at(-1)?.year} · {film.shots.length} moments</span>
        </div>
        <div className={styles.filmActions}>
          <button type="button" className={styles.creditsLink} onClick={() => creditsRef.current?.showModal()}>
            Film credits
          </button>
          <button
            type="button"
            className={styles.playback}
            aria-label={playing ? 'Pause film' : 'Play film'}
            onClick={togglePlayback}
            disabled={failed}
          >
            {playing
              ? <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" /></svg>
              : <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m5 3 8 5-8 5Z" fill="currentColor" /></svg>}
          </button>
        </div>
      </footer>

      {failed && <p className={styles.failure} role="status">The film couldn’t load. You can still explore the spirit of Capra.</p>}

      <dialog className={styles.credits} ref={creditsRef} aria-labelledby="film-credits-title">
        <div className={styles.creditsHeading}>
          <div>
            <p>Capra / Film notes</p>
            <h2 id="film-credits-title">Greatness, through time.</h2>
          </div>
          <form method="dialog"><button type="submit" aria-label="Close film credits">×</button></form>
        </div>
        <p>A chronological celebration of human possibility. Archival film gives way to digital footage, with a new shot every half second.</p>
        <p>The athletes and organizations shown are not affiliated with Capra. Footage is credited below; clips have been trimmed, muted, resized, and assembled into this film.</p>
        <ol>
          {film.sources.map(source => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>
              <span>{source.author} · <a href={source.licenseUrl} target="_blank" rel="noreferrer">{source.license}</a></span>
            </li>
          ))}
        </ol>
        <p>
          <a href="/videos/greatness-through-time.mp4" download>Download the film (CC BY-SA 4.0) ↗</a>
          {' · '}
          <a href="/videos/greatness-credits.txt" download>Download credits ↗</a>
        </p>
        <p className={styles.licenseNote}>{film.licenseNote}</p>
      </dialog>
    </main>
  );
}
