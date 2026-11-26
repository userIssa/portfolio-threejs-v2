"use client";

import { useState } from "react";
import { Terminal, Shield, Award, Calendar, ChevronDown, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

interface WorkEvent {
  role: string;
  company: string;
  period: string;
  icon: LucideIcon;
  color: string;
  points: string[];
  tags: string[];
}

const EXPERIENCE_DATA: WorkEvent[] = [
  {
    role: "Software Engineer",
    company: "Genesis Group Nigeria — Innovations Department",
    period: "Jan 2026 - Present",
    icon: Terminal,
    color: "#ff2a85",
    points: [
      "Built GenHears: a full-stack complaint & customer satisfaction management system (Next.js, MongoDB, Tailwind) with RBAC, NPS tracking, sentiment analysis via OpenAI, and CSV export.",
      "Scoped and spec'd Inner Circle: a secret shopper programme platform with role-based assignment flows, points/milestone rewards, and per-business-unit survey templates.",
      "Initiated Candidate Assessment Portal to replace Google Forms Talent & Assessment workflows.",
      "Produced QSR Q2 strategy decks and QHSE adoption materials for executive-level internal distribution.",
    ],
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "OpenAI API", "RBAC", "System Scoping", "Strategy Decks"],
  },
  {
    role: "GDSC Cyber Security Lead",
    company: "Google, Babcock University Chapter",
    period: "Sept 2023 - Aug 2024",
    icon: Award,
    color: "#d9b885",
    points: [
      "Designed and presented structured cyber-security workshops covering SQL Injections, Cross-Site Scripting, and OWASP Top 10 vulnerabilities.",
      "Organized CTF (Capture The Flag) competitions and hacking games for university developers to practice penetration testing.",
      "Mentored student members on binary reverse-engineering basics (using Ghidra/IDA Pro) and secure API development protocols.",
    ],
    tags: ["OWASP Top 10", "CTF Hosting", "Ghidra", "IDA Pro", "Penetration Testing", "Security Mentorship"],
  },
  {
    role: "Cybersecurity Intern",
    company: "NLNG (Nigeria LNG Limited)",
    period: "Feb 2023 - Aug 2023",
    icon: Shield,
    color: "#0284c7",
    points: [
      "Audited company portal authentication schemas, implementing JSON Web Tokens (JWT) and securing Express route endpoints.",
      "Optimized query performance for relational PostgreSQL database layers, reducing dashboard loading lag by 35%.",
      "Conducted vulnerability assessments and emulated threat pathways across local development network layouts.",
      "Collaborated with dev teams to containerize application components using Docker, accelerating local testing and production builds.",
    ],
    tags: ["JWT Auth", "PostgreSQL", "Express API", "Docker", "Vulnerability Assessment", "Threat Emulation"],
  },
];

export default function Experience() {
  const [pinnedIdx, setPinnedIdx] = useState<number | null>(null);

  return (
    <section id="experience" className="py-20 px-6 relative">
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyber-purple/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto w-full flex flex-col gap-12">
        {/* Section Heading */}
        <Reveal>
          <div className="flex flex-col gap-3 text-left">
            <div className="text-xs font-mono tracking-widest text-cyber-green font-bold">
              {"02 // CAREER_TIMELINE"}
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] font-sans tracking-tight">
                Work Experience
              </h2>
              <span className="text-[11px] font-mono tracking-wider text-[var(--muted)]">
                Hover or tap entry for dossier details
              </span>
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan rounded-full mt-1" />
          </div>
        </Reveal>

        {/* Timeline body (preserved circuit line + node icons, compact hover/tap reveal) */}
        <div className="relative border-l border-[var(--line)] pl-7 sm:pl-11 ml-3 sm:ml-4 flex flex-col gap-4 text-left">
          {/* Vertical Connecting Circuit Line Overlay */}
          <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-gradient-to-b from-cyber-pink via-cyber-purple to-cyber-cyan" />

          {EXPERIENCE_DATA.map((exp, idx) => {
            const isLast = idx === EXPERIENCE_DATA.length - 1;
            const isPinned = pinnedIdx === idx;
            return (
              <Reveal key={idx} delayMs={idx * 90}>
                <article
                  className="relative group rounded-xl px-3 -mx-3 transition-colors duration-200 hover:bg-[var(--surface-subtle)]/70"
                >
                  {/* Node Icon on Timeline Line */}
                  <div
                    className="absolute -left-[25px] sm:-left-[43px] top-3.5 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] rounded-full border bg-[var(--bg)] flex items-center justify-center transition-all duration-300 group-hover:scale-110 z-10"
                    style={{
                      borderColor: exp.color,
                      boxShadow: `0 0 10px ${exp.color}40`,
                    }}
                  >
                    <exp.icon size={10} className="sm:w-3 sm:h-3" style={{ color: exp.color }} />
                  </div>

                  {/* 1px Hairline Editorial Timeline Entry */}
                  <div
                    className={`py-3 transition-colors ${
                      !isLast ? "border-b border-[var(--line)]" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        if (isPinned) e.currentTarget.blur();
                        setPinnedIdx(isPinned ? null : idx);
                      }}
                      aria-expanded={isPinned}
                      className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 focus:outline-none"
                    >
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--ink)] group-hover:text-cyber-pink transition-colors">
                          {exp.role}
                        </h3>
                        <div className="text-xs sm:text-sm font-mono font-semibold mt-0.5" style={{ color: exp.color }}>
                          {exp.company}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--surface-subtle)] border border-[var(--line)] rounded-full text-xs font-mono text-[var(--text)]">
                          <Calendar size={12} className="text-cyber-green shrink-0" />
                          <span>{exp.period}</span>
                        </div>
                        <ChevronDown
                          size={15}
                          className={`text-[var(--muted)] transition-transform duration-300 group-hover:rotate-180 group-hover:text-cyber-pink ${
                            isPinned ? "rotate-180 text-cyber-pink" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Details hidden by default, smooth reveal on hover / focus / tap */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isPinned
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-4 mt-3 border-t border-[var(--line)]/60">
                          {/* Bullet points */}
                          <ul className="flex flex-col gap-2 mb-4 text-sm sm:text-[15px] text-[var(--text)] font-sans leading-relaxed">
                            {exp.points.map((pt, pIdx) => (
                              <li key={pIdx} className="flex gap-3 items-start">
                                <span className="text-[11px] font-mono text-cyber-green mt-1 shrink-0">{"//"}</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Clean dot-separated capability strip */}
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-[var(--muted)] pb-2">
                            <span className="text-[10px] tracking-widest uppercase mr-1 opacity-75">
                              STACK:
                            </span>
                            {exp.tags.map((tag, tIdx) => (
                              <span key={tIdx} className="inline-flex items-center gap-2 text-[var(--text)]/85">
                                <span>{tag}</span>
                                {tIdx < exp.tags.length - 1 && (
                                  <span aria-hidden="true" className="opacity-40">
                                    ·
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
