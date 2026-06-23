"use client";

import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

interface VideoPreloaderProps {
  onComplete: () => void;
}

export default function VideoPreloader({ onComplete }: VideoPreloaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Set cache-busting video source on client mount to bypass Chromium ERR_CACHE_OPERATION_NOT_SUPPORTED
    setVideoSrc(`/assets/preloader.mp4?t=${Date.now()}`);

    // Auto-exit safety timeout (in case autoplay fails or video hangs)
    const safetyTimeout = setTimeout(() => {
      handleExit();
    }, 7000); // 7 seconds max

    return () => {
      clearTimeout(safetyTimeout);
      // Restore scrolling when component unmounts
      document.body.style.overflow = "";
    };
  }, []);

  // Trigger play only after source has loaded/mounted in the DOM
  useEffect(() => {
    if (videoSrc && videoRef.current) {
      // Fix React muted autoplay bug programmatically
      videoRef.current.muted = true;
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay play() failed/prevented:", err);
      });
    }
  }, [videoSrc]);

  const handleExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    
    // Allow animation to complete before removing from DOM
    setTimeout(() => {
      onComplete();
    }, 1000); // matches the duration-1000 transition
  };

  const handlePlay = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const mediaError = videoRef.current?.error;
    console.error("Preloader video error details:", {
      code: mediaError?.code,
      message: mediaError?.message,
    });
    // Fail-safe: exit immediately if the video cannot play
    handleExit();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#05070a] flex items-center justify-center select-none overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Background Subtle Cyber Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,109,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Intro Video Element (Full Screen Cover) */}
      <div className={`relative w-full h-full transition-opacity duration-500 ${
        videoLoaded ? "opacity-100" : "opacity-0"
      }`}>
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            onLoadedData={handlePlay}
            onPlay={handlePlay}
            onEnded={handleExit}
            onError={handleVideoError}
            className="w-full h-full object-cover pointer-events-none"
          />
        )}
      </div>

      {/* Skip Button */}
      <button
        onClick={handleExit}
        className="absolute top-6 right-6 z-50 flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-cyber-pink/50 bg-black/45 hover:bg-cyber-pink/10 rounded-full text-[10px] font-mono tracking-widest text-white/50 hover:text-cyber-pink transition-all uppercase"
      >
        <span>Skip</span>
        <X size={10} />
      </button>

      {/* Loading indicator if video takes a second */}
      {!videoLoaded && (
        <div className="absolute flex flex-col items-center gap-3 font-mono text-[9px] text-cyber-pink/60 uppercase tracking-widest">
          <div className="w-6 h-6 rounded-full border border-cyber-pink/30 border-t-cyber-pink animate-spin" />
          <span>Bypassing Firewall...</span>
        </div>
      )}
    </div>
  );
}
