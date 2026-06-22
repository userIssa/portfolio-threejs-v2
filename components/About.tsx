"use client";

import React, { useRef, useState } from "react";
import { ShieldCheck, Database, Layers, Smartphone } from "lucide-react";
import SkillsRadar from "./SkillsRadar";

interface CardItem {
  title: string;
  icon: any;
  color: string;
  glowClass: string;
  description: string;
}

const CARDS_DATA: CardItem[] = [
  {
    title: "Web Developer",
    icon: Layers,
    color: "#00f0ff", // Tokyo Cyan
    glowClass: "group-hover:shadow-neon-cyan/40",
    description: "Developing performant, responsive web apps using React, Next.js, and modern styling libraries.",
  },
  {
    title: "React Native Developer",
    icon: Smartphone,
    color: "#8b5cf6", // Purple
    glowClass: "group-hover:shadow-neon-purple/40",
    description: "Building cross-platform mobile apps with native UI modules, responsive charts, and fluid user flows.",
  },
  {
    title: "Backend Engineer",
    icon: Database,
    color: "#10b981", // Green
    glowClass: "group-hover:shadow-neon-green/40",
    description: "Engineering secure APIs, robust microservices, database structures, and deploying clusters via Docker.",
  },
  {
    title: "Ethical Hacker",
    icon: ShieldCheck,
    color: "#ff2a85", // Neon Sakura Pink
    glowClass: "group-hover:shadow-neon-pink/40",
    description: "Analyzing network packets, auditing API security, pentesting servers, and tracing binaries.",
  },
];

// Interactive 3D Parallax Tilt Card Component
function TiltCard({ card }: { card: CardItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY - height / 2) / (height / 2)) * -8;
    const rotateY = ((mouseX - width / 2) / (width / 2)) * 8;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="group w-full p-6 glassmorphism rounded-2xl border-white/5 flex flex-col justify-between items-start cursor-pointer hover:border-white/20 select-none text-left relative overflow-hidden"
    >
      {/* Dynamic Hover Accent Bottom Border Highlight */}
      <span
        className="absolute bottom-0 left-0 w-full h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        style={{ backgroundColor: card.color }}
      />

      <div className="flex flex-col gap-4">
        {/* Floating icon box */}
        <div
          className={`p-3 rounded-xl border border-white/5 bg-white/5 transition-all duration-300 ${card.glowClass} group-hover:scale-105`}
          style={{ color: card.color }}
        >
          <card.icon size={24} />
        </div>

        <div>
          <h3 className="text-lg font-bold tracking-wide text-white group-hover:text-white/95">
            {card.title}
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20 px-6 relative select-none">
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-cyber-pink/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-14">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 text-left">
          <div className="text-xs font-mono tracking-widest text-cyber-pink font-bold">
            01 // OVERVIEW_AND_DOSSIER // 概要
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Professional Overview
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full mt-1" />
        </div>

        {/* Bio paragraph and grid of services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="text-left flex flex-col gap-4 text-slate-300 text-sm leading-relaxed font-sans max-w-xl">
            <p>
              I am a cyber-security specialist and full stack web engineer focused on secure architecture models, active penetration testing, and clean software abstractions.
            </p>
            <p>
              My background integrates technical vulnerability assessments with modern application development. Whether auditing database endpoints, constructing high-fidelity mobile apps in React Native, or setting up secure proxy routers, I emphasize high-performance solutions and defensive security standards.
            </p>
            <p className="font-mono text-xs text-cyber-pink">
              // ACTIVE CORE PROTOCOLS: node.js | next.js | react | python | reverse_engineering | metasploit
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CARDS_DATA.map((card, idx) => (
              <TiltCard key={idx} card={card} />
            ))}
          </div>
        </div>

        {/* Re-embed interactive Skills Radar */}
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex flex-col gap-2 text-left">
            <h3 className="text-xl font-bold text-white font-sans">
              Cybersecurity & Dev Skill Vectors // スキル
            </h3>
            <p className="text-xs text-slate-400">
              Hover over axis markers to display specialized sub-skills and proficiency metrics.
            </p>
          </div>

          <SkillsRadar />
        </div>
      </div>
    </section>
  );
}
