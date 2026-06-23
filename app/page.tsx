"use client";

import { useState, useEffect } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import DecryptionGame from "@/components/DecryptionGame";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import HackerLog from "@/components/HackerLog";
import TerminalCLI from "@/components/TerminalCLI";
import MatrixOverlay from "@/components/MatrixOverlay";
import VideoPreloader from "@/components/VideoPreloader";

export default function Home() {
  const [isHacking, setIsHacking] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Force scroll restoration to manual and scroll to top on fresh mount/reload
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Main Interactive Space Background */}
      <BackgroundCanvas />

      {/* Global Navigation Header */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {/* Hero Landing Mock Editor Section */}
        <Hero />

        {/* Biography & Skills Radar Section */}
        <About />

        {/* Career Timeline Section */}
        <Experience />

        {/* Projects Repository grid Section */}
        <Projects />

        {/* Neo-Tokyo Firewall Decryption puzzle */}
        <section id="decryptor" className="py-20 px-6 relative">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-10">
            <div className="flex flex-col gap-3 text-left">
              <div className="text-xs font-mono tracking-widest text-cyber-pink font-bold">
                04 // CREDENTIALS_BYPASS_GAME // 暗号
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
                Secure Dossier Bypass
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
                <p className="text-xs text-slate-400 font-sans max-w-xl">
                  Play the decryption game to stabilize the handshake key and unlock my resume dossier, or bypass it using the override link.
                </p>
                <a
                  href="/assets/resume.pdf"
                  download="Toluwanimi_Oderinde_Resume.pdf"
                  className="self-start sm:self-center px-4 py-2 border border-cyber-pink/30 hover:border-cyber-pink bg-cyber-pink/5 hover:bg-cyber-pink/15 text-cyber-pink hover:text-white text-xs font-bold font-mono rounded-lg transition-all shadow-neon-pink/10 hover:shadow-neon-pink/30"
                >
                  BYPASS & DOWNLOAD CV
                </a>
              </div>
              <div className="h-1 w-20 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full mt-2" />
            </div>
            
            <DecryptionGame />
          </div>
        </section>

        {/* Peer Feedback Slider Section */}
        <Testimonials />

        {/* Contact form & Secure SMTP router Section */}
        <Contact />
      </main>

      {/* Footer Details */}
      <footer className="py-8 border-t border-white/5 bg-cyber-dark/40 font-mono text-[9px] text-white/30 text-center select-none">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} ISSA.DEV. ALL RIGHTS RESERVED.</span>
          <span className="text-cyber-pink hover:underline cursor-pointer" onClick={() => setIsHacking(true)}>
            [BYPASS_HANDSHAKE_OVERRIDE // システムバイパス]
          </span>
        </div>
      </footer>

      {/* Real-time Logger widget */}
      <HackerLog />

      {/* Command Line Easter Egg Drawer */}
      <TerminalCLI onHackTrigger={() => setIsHacking(true)} />

      {/* Matrix Glitch Overlay when 'hack' is triggered */}
      {isHacking && <MatrixOverlay onComplete={() => setIsHacking(false)} />}

      {/* Video Preloader on initial load */}
      {showPreloader && <VideoPreloader onComplete={() => setShowPreloader(false)} />}
    </div>
  );
}
