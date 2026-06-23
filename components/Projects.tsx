"use client";

import { useState } from "react";
import { Terminal, ExternalLink, FolderGit, Eye } from "lucide-react";

interface ProjectItem {
  title: string;
  category: "development" | "security";
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  color: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    title: "SentinelWatch",
    category: "security",
    description: "AI-powered CCTV security monitor for small businesses with local inference (no cloud dependency), targeting existing CCTV hardware and pushing alerts via ntfy.sh.",
    tech: ["Python", "FastAPI", "Ollama", "Moondream2", "Electron", "React", "ntfy.sh"],
    githubUrl: "https://github.com/userIssa",
    color: "#ff007f", // Pink
  },
  {
    title: "Shroud",
    category: "security",
    description: "Geo-aware secure browser with hybrid Tor/residential proxy routing and fingerprint spoofing. Built with a D3 world map for interactive geo-routing visualization.",
    tech: ["Electron", "React", "D3-geo", "Tor proxy", "Fingerprint Spoofing"],
    githubUrl: "https://github.com/userIssa/shroud",
    color: "#00e5ff", // Cyan
  },
  {
    title: "ShellForge",
    category: "security",
    description: "Constraint-aware shellcode generator with 51/51 validation tests passing across x86-64, x86-32, ARM Thumb, and MIPS BE architectures. Serviced via a clean REST API interface.",
    tech: ["C99", "Python", "Flask", "GPT-4o-mini", "Assembly (x86/ARM)"],
    githubUrl: "https://github.com/userIssa/shellforge",
    color: "#e5a93c", // Gold
  },
  {
    title: "HeapSentinel",
    category: "security",
    description: "Low-level heap memory integrity monitor that monitors allocations, tracks pointers, and defends against common heap overflows, double frees, and memory corruption exploits.",
    tech: ["C", "Python", "Pointers Audit", "GDB scripting", "Memory Protection"],
    githubUrl: "https://github.com/userIssa/heapsentinel",
    color: "#00ff66", // Green
  },
  {
    title: "Arachne",
    category: "security",
    description: "A custom security crawling and spidering framework designed to map server directories, inspect web endpoints, and identify vulnerable input vectors.",
    tech: ["Python", "Spidering", "HTTP Auditing", "Payload Injections"],
    githubUrl: "https://github.com/userIssa/arachne",
    color: "#ff2a6d", // Cyber Pink
  },
  {
    title: "Ask HR",
    category: "development",
    description: "Retrieval-Augmented Generation (RAG) assistant for human resource operations. Employs vector embeddings for verbatim document chunk retrieval and secured via JWT handshakes.",
    tech: ["Next.js", "OpenAI API", "Vector Embeddings", "JWT Authentication", "RAG Pipeline"],
    githubUrl: "https://github.com/userIssa",
    color: "#00e5ff", // Cyan
  },
];

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "development" | "security">("all");

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-20 px-6 relative select-none">
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-cyber-cyan/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">
        {/* Section Heading & Filter controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="flex flex-col gap-3">
            <div className="text-xs font-mono tracking-widest text-cyber-green font-bold">
              03 // REPOSITORY_ARCHIVES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              Projects Showcase
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyber-cyan to-cyber-green rounded-full mt-1" />
          </div>

          {/* Category Filter buttons */}
          <div className="flex bg-white/5 border border-white/5 p-1 rounded-lg self-start font-mono text-xs">
            {(["all", "development", "security"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-md font-bold uppercase transition-all tracking-wider ${
                  filter === cat
                    ? "bg-cyber-cyan text-black shadow-neon-cyan"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            return (
              <div
                key={idx}
                className="group flex flex-col justify-between glassmorphism rounded-2xl p-6 border-white/5 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 relative text-left"
              >
                {/* Visual Accent Top Bar */}
                <span
                  className="absolute top-0 inset-x-0 h-1.5 rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: project.color }}
                />

                <div>
                  <div className="flex items-center justify-between gap-2.5 mb-4">
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                      style={{
                        borderColor: `${project.color}40`,
                        backgroundColor: `${project.color}15`,
                        color: project.color,
                      }}
                    >
                      {project.category.toUpperCase()}
                    </span>

                    {/* Repository Icon */}
                    <FolderGit size={18} className="text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold tracking-wide text-white group-hover:text-white/90">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-sans min-h-[72px]">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5 min-h-[44px]">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions links */}
                  <div className="border-t border-white/5 pt-3.5 flex items-center gap-4 text-xs font-mono">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      <span>CODEBASE</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-cyber-cyan hover:text-white transition-colors"
                      >
                        <ExternalLink size={14} className="shrink-0" />
                        <span>LIVE_HOST</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
