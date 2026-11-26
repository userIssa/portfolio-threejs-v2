"use client";

import { useState } from "react";
import { ArrowUpRight, ExternalLink, Plus, Minus } from "lucide-react";
import Reveal from "./Reveal";

interface ProjectItem {
  code: string;
  title: string;
  category: "development" | "security";
  highlight: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  accent: string;
  asciiTag: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    code: "01",
    title: "SentinelWatch",
    category: "security",
    highlight: "Local VLM inference · 0 cloud dependency · ntfy.sh alerts",
    description:
      "AI-powered CCTV security monitor for small businesses running local vision inference against existing CCTV streams and dispatching real-time alerts via ntfy.sh.",
    tech: ["Python", "FastAPI", "Ollama", "Moondream2", "Electron", "React"],
    githubUrl: "https://github.com/userIssa",
    accent: "var(--accent-pink)",
    asciiTag: "RTSP // VLM_LOCAL",
  },
  {
    code: "02",
    title: "Shroud",
    category: "security",
    highlight: "Hybrid Tor/residential proxy routing · D3-geo visualization",
    description:
      "Geo-aware secure browser combining hybrid Tor and residential proxy routing with fingerprint spoofing and an interactive D3 world map for route control.",
    tech: ["Electron", "React", "D3-geo", "Tor Proxy", "Fingerprint Spoofing"],
    githubUrl: "https://github.com/userIssa/shroud",
    accent: "var(--accent-cyan)",
    asciiTag: "TOR // GEO_ROUTE",
  },
  {
    code: "03",
    title: "ShellForge",
    category: "security",
    highlight: "51/51 tests passing · x86-64, x86-32, ARM Thumb & MIPS BE",
    description:
      "Constraint-aware shellcode generator backed by automated multi-architecture validation and exposed through a clean REST API.",
    tech: ["C99", "Python", "Flask", "GPT-4o-mini", "x86 / ARM Assembly"],
    githubUrl: "https://github.com/userIssa/shellforge",
    accent: "#d97706",
    asciiTag: "ASM // 51_PASS",
  },
  {
    code: "04",
    title: "HeapSentinel",
    category: "security",
    highlight: "Pointer & allocation audit · double-free & overflow trap",
    description:
      "Low-level heap memory integrity monitor that tracks allocations and pointer lifetimes to catch heap overflows, double frees, and memory corruption.",
    tech: ["C", "Python", "GDB Scripting", "Memory Protection"],
    githubUrl: "https://github.com/userIssa/heapsentinel",
    accent: "var(--accent-green)",
    asciiTag: "MEM // HEAP_GUARD",
  },
  {
    code: "05",
    title: "Arachne",
    category: "security",
    highlight: "Automated directory mapping · endpoint & input vector audit",
    description:
      "Custom security crawling and spidering framework engineered to enumerate server routes, inspect HTTP endpoints, and surface injection vectors.",
    tech: ["Python", "Spidering", "HTTP Auditing", "Payload Injection"],
    githubUrl: "https://github.com/userIssa/arachne",
    accent: "var(--accent-pink)",
    asciiTag: "HTTP // SPIDER",
  },
  {
    code: "06",
    title: "Ask HR",
    category: "development",
    highlight: "JWT-secured RAG pipeline · verbatim vector chunk retrieval",
    description:
      "Retrieval-Augmented Generation assistant for human resource operations using vector embeddings for verbatim policy lookup behind JWT handshakes.",
    tech: ["Next.js", "OpenAI API", "Vector Embeddings", "JWT Auth", "RAG"],
    githubUrl: "https://github.com/userIssa",
    accent: "var(--accent-cyan)",
    asciiTag: "RAG // JWT_AUTH",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "development" | "security">("all");
  const [activeIdx, setActiveIdx] = useState(0);

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const safeActiveIdx = activeIdx < filteredProjects.length ? activeIdx : 0;
  const activeProject = filteredProjects[safeActiveIdx];

  const handleFilterChange = (cat: "all" | "development" | "security") => {
    setFilter(cat);
    setActiveIdx(0);
  };

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-cyber-cyan/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-10">
        {/* Section Heading & Filter controls */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-mono tracking-widest text-cyber-green font-bold">
                {"03 // REPOSITORY_ARCHIVES"}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] font-sans tracking-tight">
                Projects Showcase
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyber-cyan to-cyber-green rounded-full mt-1" />
            </div>

            {/* Category Filter buttons */}
            <div className="flex bg-[var(--surface-subtle)] border border-[var(--line)] p-1 rounded-full self-start font-mono text-xs">
              {(["all", "development", "security"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleFilterChange(cat)}
                  className={`px-4 py-2 rounded-full font-bold uppercase transition-all tracking-wider ${
                    filter === cat
                      ? "bg-[var(--ink)] text-[var(--bg)] shadow-sm"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* DESKTOP (md+): shanzhy-inspired Horizontal Expanding Slice Strip */}
        <Reveal delayMs={80} className="hidden md:flex flex-col gap-6">
          {/* Active Project Banner Readout (shanzhy-style centered/clean top display) */}
          {activeProject && (
            <div className="flex items-end justify-between gap-4 border-b border-[var(--line)] pb-4 text-left">
              <div className="flex items-baseline gap-4">
                <span
                  className="font-mono text-xs font-bold tracking-widest"
                  style={{ color: activeProject.accent }}
                >
                  0{safeActiveIdx + 1} / 0{filteredProjects.length}
                </span>
                <h3 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--ink)] transition-all">
                  {activeProject.title}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
                  [{activeProject.category}]
                </span>
              </div>

              <span className="font-mono text-xs text-[var(--muted)]">
                HOVER OR SELECT SLICE TO INSPECT
              </span>
            </div>
          )}

          {/* Horizontal Expanding Slice Strip */}
          <div className="flex gap-2.5 h-[370px] w-full">
            {filteredProjects.map((project, idx) => {
              const isActive = idx === safeActiveIdx;
              return (
                <article
                  key={project.title}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIdx(idx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-label={`${project.title} (${project.category})`}
                  className={`relative rounded-2xl border overflow-hidden cursor-pointer transition-[flex,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] text-left flex flex-col justify-between ${
                    isActive
                      ? "flex-[4.5] border-[var(--line-strong)] bg-[var(--surface)] p-7 shadow-lg"
                      : "flex-[1] min-w-[68px] border-[var(--line)] bg-[var(--bg-2)]/70 hover:bg-[var(--surface-subtle)] p-4"
                  }`}
                >
                  {/* Subtle top accent hairline */}
                  <span
                    className={`absolute top-0 inset-x-0 h-[3px] transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-35"
                    }`}
                    style={{ backgroundColor: project.accent }}
                  />

                  {/* Subtle background grid inside active slice */}
                  {isActive && (
                    <div className="absolute inset-0 grid-overlay pointer-events-none opacity-35" />
                  )}

                  {isActive ? (
                    <>
                      {/* Expanded Card Header */}
                      <div className="relative z-10 flex items-center justify-between gap-3">
                        <span
                          className="font-mono text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-full border"
                          style={{
                            borderColor: `${project.accent}45`,
                            backgroundColor: `${project.accent}14`,
                            color: project.accent,
                          }}
                        >
                          {project.asciiTag}
                        </span>

                        <div className="flex items-center gap-3 font-mono text-xs">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="cta-wipe inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink)] font-bold"
                          >
                            <span>CODEBASE</span>
                            <ArrowUpRight size={13} />
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-cyber-cyan hover:text-[var(--ink)] transition-colors"
                            >
                              <span>LIVE</span>
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Expanded Body */}
                      <div className="relative z-10 flex flex-col gap-3 max-w-xl my-auto">
                        <h4 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                          {project.title}
                        </h4>
                        <p className="text-sm sm:text-[15px] text-[var(--text)] leading-relaxed font-sans">
                          {project.description}
                        </p>
                      </div>

                      {/* Expanded Footer Strip */}
                      <div className="relative z-10 flex flex-col gap-2.5 pt-4 border-t border-[var(--line)]">
                        <div className="font-mono text-xs text-[var(--ink)]">
                          <span style={{ color: project.accent }} className="mr-1.5 font-bold">
                            &gt;
                          </span>
                          {project.highlight}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-[var(--muted)]">
                          {project.tech.map((t, tIdx) => (
                            <span key={t} className="inline-flex items-center gap-2">
                              <span>{t}</span>
                              {tIdx < project.tech.length - 1 && (
                                <span aria-hidden="true" className="opacity-40">
                                  ·
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Collapsed Vertical Slice (cleanly labeled even when idle) */
                    <div className="h-full flex flex-col items-center justify-between py-2 relative z-10 select-none">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: project.accent }}
                      >
                        {project.code}
                      </span>

                      <span
                        className="font-mono text-xs font-bold tracking-widest uppercase text-[var(--text)] whitespace-nowrap"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {project.title}
                      </span>

                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: project.accent }}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Active Summary Sub-line (echoing shanzhy's centered 1-line summary below the strip) */}
          {activeProject && (
            <div className="flex items-center justify-between gap-4 font-mono text-xs text-[var(--muted)] pt-1">
              <span>
                {activeProject.code} {"//"} {activeProject.highlight}
              </span>
              <a
                href="https://github.com/userIssa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--ink)] hover:text-cyber-pink transition-colors shrink-0"
              >
                <span>ALL REPOS</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          )}
        </Reveal>

        {/* MOBILE (< md): Full-Width 1px-Hairline Vertical Touch Accordion */}
        <Reveal delayMs={80} className="md:hidden">
          <div className="rounded-2xl border border-[var(--line)] overflow-hidden divide-y divide-[var(--line)] bg-[var(--surface)] text-left">
            {filteredProjects.map((project, idx) => {
              const isOpen = idx === safeActiveIdx;
              return (
                <article key={project.title} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-expanded={isOpen}
                    className="w-full px-4 py-4 flex items-center justify-between gap-3 text-left transition-colors active:bg-[var(--surface-subtle)]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: project.accent }}
                      />
                      <span className="font-mono text-xs font-bold text-[var(--muted)] shrink-0">
                        {project.code}
                      </span>
                      <span className="font-sans text-base font-bold text-[var(--ink)] truncate">
                        {project.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span
                        className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
                        style={{
                          borderColor: `${project.accent}40`,
                          color: project.accent,
                        }}
                      >
                        {project.category === "security" ? "SEC" : "DEV"}
                      </span>
                      <span className="text-[var(--muted)]">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-5 pt-1 flex flex-col gap-4 border-t border-[var(--line)]/60 bg-[var(--bg)]/60">
                        <p className="text-sm text-[var(--text)] leading-relaxed font-sans pt-2">
                          {project.description}
                        </p>

                        <div className="font-mono text-[11px] text-[var(--ink)]">
                          <span style={{ color: project.accent }} className="mr-1.5 font-bold">
                            &gt;
                          </span>
                          {project.highlight}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--line)] text-[var(--text)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--bg)] font-mono text-xs font-bold tracking-wider"
                          >
                            <span>VIEW CODEBASE</span>
                            <ArrowUpRight size={13} />
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[var(--line-strong)] font-mono text-xs font-bold text-cyber-cyan"
                            >
                              <span>LIVE</span>
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
