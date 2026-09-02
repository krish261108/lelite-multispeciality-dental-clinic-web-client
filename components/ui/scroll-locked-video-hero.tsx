"use client";

import { useEffect, useRef } from "react";

type ScrollLockedVideoHeroProps = {
  src: string;
  onProgress?: (progress: number) => void;
};

/**
 * Optional production hero controller for an approved L'ELITE video sequence.
 * The controller only captures the gesture while the sequence is active,
 * then releases the page so the user can continue naturally.
 */
export function ScrollLockedVideoHero({ src, onProgress }: ScrollLockedVideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const update = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const progress = duration ? video.currentTime / duration : 0;
      onProgress?.(progress);
    };
    video.addEventListener("timeupdate", update);
    return () => video.removeEventListener("timeupdate", update);
  }, [onProgress]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const scrub = (delta: number) => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const next = Math.min(video.duration, Math.max(0, video.currentTime + delta * 0.0022));
      video.currentTime = next;
      activeRef.current = next > 0 && next < video.duration;
    };

    const wheel = (event: WheelEvent) => {
      if (!activeRef.current && window.scrollY > 3 && event.deltaY < 0) return;
      const atStart = video.currentTime <= 0.001 && event.deltaY < 0;
      const atEnd = video.currentTime >= video.duration - 0.001 && event.deltaY > 0;
      if (atStart || atEnd) { activeRef.current = false; return; }
      event.preventDefault();
      activeRef.current = true;
      scrub(event.deltaY);
    };

    const touch = (event: TouchEvent) => {
      if (!event.touches[0]) return;
      const current = event.touches[0].clientY;
      const previous = Number(video.dataset.lastTouchY || current);
      const delta = previous - current;
      video.dataset.lastTouchY = String(current);
      if (!activeRef.current && delta < 0) return;
      if (video.currentTime <= 0.001 && delta < 0) { activeRef.current = false; return; }
      if (video.currentTime >= video.duration - 0.001 && delta > 0) { activeRef.current = false; return; }
      event.preventDefault();
      activeRef.current = true;
      scrub(delta * 1.5);
    };

    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("touchmove", touch, { passive: false });
    return () => {
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("touchmove", touch);
    };
  }, []);

  return <video ref={videoRef} className="scroll-locked-video" src={src} muted playsInline preload="metadata" aria-hidden="true" />;
}
