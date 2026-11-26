"use client";

import React, { useState } from "react";
import { ShieldCheck, Database, Layers, Smartphone, ArrowUpRight, type LucideIcon } from "lucide-react";
import SkillsRadar from "./SkillsRadar";
import Reveal from "./Reveal";

interface CapabilityItem {
  code: string;
  title: string;
  icon: LucideIcon;
  accent: string;
  summary: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    code: "01",
    title: "Software Engineering",
    icon: Layers,
    accent: "var(--accent-cyan)",
    summary:
      "Contractor at Genesis Group Nigeria. Built complaint management systems (GenHears), secret shopper platforms (Inner Circle), and internal assessment portals.",
  },
  {
    code: "02",
    title: "Ethical Hacking & Red Team",
    icon: ShieldCheck,
    accent: "var(--accent-pink)",
    summary:
      "CEH and MCRTA certified analyst. Auditing web endpoints, conducting server pentests, and testing low-level heap and shellcode boundaries.",
  },
  {
    code: "03",
    title: "Backend & Systems",
    icon: Database,
    accent: "var(--accent-green)",
    summary:
      "Designing role-based REST APIs, tuned MongoDB and PostgreSQL schemas, Dockerized services, and OpenAI sentiment/RAG pipelines.",
  },
  {
    code: "04",
    title: "Security Leadership",
    icon: Smartphone,
    accent: "#8b5cf6",
    summary:
      "Former GDSC Cyber Security Lead at Babcock University. Directed hands-on CTFs, OWASP Top 10 workshops, and binary reverse-engineering tutorials.",
  },
];

const DOSSIER_FACTS = [
  { label: "CURRENT ROLE", value: "Software Engineer @ Genesis Group" },
  { label: "CERTIFICATIONS", value: "CEH • MCRTA" },
  { label: "EDUCATION", value: "BSc Software Eng" },
  { label: "LOCATION", value: "Port Harcourt, NG" },
];

export default function About() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-cyber-pink/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-14">
        {/* Section Heading */}
        <Reveal>
          <div className="flex flex-col gap-3 text-left">
            <div className="text-xs font-mono tracking-widest text-cyber-pink font-bold">
              {"01 // OVERVIEW_AND_DOSSIER // 概要"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] font-sans tracking-tight">
              Professional Overview
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full mt-1" />
          </div>
        </Reveal>

        {/* Asymmetric Editorial Lead + Interactive Capability Ledger */}
        <Reveal delayMs={80}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Editorial Bio Column */}
            <div className="lg:col-span-7 text-left flex flex-col gap-6">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.2] text-[var(--ink)] font-sans">
                I build production systems—and test how they break before anyone else can.
              </p>

              <div className="flex flex-col gap-4 text-[var(--text)] text-[15px] leading-relaxed font-sans max-w-2xl">
                <p>
                  I am a Software Engineering graduate working as a contract Software Engineer at Genesis Group Nigeria&apos;s Innovations Department in Port Harcourt. I ship internal operational tools, customer-facing platforms, and security-first architectures.
                </p>
                <p>
                  Holding Certified Ethical Hacker (CEH) and Certified Red Team Analyst (MCRTA) credentials, I care about software that solves concrete problems, holds up under load, and treats security as a core invariant rather than an afterthought.
                </p>
              </div>

              <div className="font-mono text-xs text-cyber-pink pt-1">
                {"// CORE_STACK: next.js | typescript | python | c99 | mongodb | postgresql | metasploit | ceh | mcrta"}
              </div>
            </div>

            {/* Interactive 1px Hairline Capability Ledger */}
            <div className="lg:col-span-5 border-t border-[var(--line)] flex flex-col text-left">
              {CAPABILITIES.map((cap, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={cap.code}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={`w-full text-left py-4 px-3 border-b border-[var(--line)] transition-all flex flex-col gap-2 ${
                      isActive ? "bg-[var(--surface-subtle)]" : "hover:bg-[var(--surface-subtle)]/60"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 w-full">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: isActive ? cap.accent : "var(--muted)" }}
                        >
                          {cap.code}
                        </span>
                        <cap.icon
                          size={16}
                          style={{ color: isActive ? cap.accent : "var(--muted)" }}
                        />
                        <span
                          className={`text-sm sm:text-base font-bold tracking-wide transition-colors ${
                            isActive ? "text-[var(--ink)]" : "text-[var(--text)]"
                          }`}
                        >
                          {cap.title}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={15}
                        className={`transition-transform duration-300 shrink-0 ${
                          isActive ? "rotate-45 text-cyber-pink" : "text-[var(--muted)]"
                        }`}
                      />
                    </div>

                    <div
                      className={`grid transition-all duration-300 ${
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden text-[13px] text-[var(--muted)] leading-relaxed font-sans pl-7">
                        {cap.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Architectural 1px Hairline Dossier Strip */}
        <Reveal delayMs={120}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-[var(--line)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--line)] text-left">
            {DOSSIER_FACTS.map((fact) => (
              <div key={fact.label} className="py-5 sm:px-5 first:sm:pl-0 last:sm:pr-0 flex flex-col gap-1.5">
                <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                  {fact.label}
                </span>
                <span className="font-sans text-sm font-bold text-[var(--ink)]">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Interactive Skills Radar */}
        <Reveal delayMs={160}>
          <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col gap-2 text-left">
              <h3 className="text-xl font-bold text-[var(--ink)] font-sans">
                {"Cybersecurity & Dev Skill Vectors // スキル"}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                Hover over or select axis markers to display specialized sub-skills and proficiency metrics.
              </p>
            </div>

            <SkillsRadar />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
