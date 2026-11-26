"use client";

import { useState } from "react";
import { ShieldCheck, Database, Layers, Terminal, Lock, Key, type LucideIcon } from "lucide-react";

interface SkillCategory {
  code: string;
  shortLabel: string;
  name: string;
  value: number;
  icon: LucideIcon;
  color: string;
  description: string;
  subskills: string[];
}

const SKILL_DATA: SkillCategory[] = [
  {
    code: "01",
    shortLabel: "PENTEST",
    name: "Penetration Testing",
    value: 92,
    icon: Terminal,
    color: "#ff2a85",
    description: "Vulnerability analysis, active threat emulation, CEH auditing, and red team exploit validation.",
    subskills: ["Metasploit", "Burp Suite", "Nmap", "CEH Audit", "MCRTA Red Team", "OWASP Top 10"],
  },
  {
    code: "02",
    shortLabel: "REV_ENG",
    name: "Reverse Engineering",
    value: 82,
    icon: Key,
    color: "#ff003c",
    description: "Decompiling, binary analysis, and disassembling firmware, low-level heap layers, and shellcode.",
    subskills: ["Ghidra", "IDA Pro", "x86-64 Assembly", "ELF & PE Analysis", "Shellcode Forge", "Heap Audit"],
  },
  {
    code: "03",
    shortLabel: "FRONTEND",
    name: "Frontend Development",
    value: 88,
    icon: Layers,
    color: "#0284c7",
    description: "Designing sleek, modular user interfaces with high responsiveness, custom aesthetics, and desktop containers.",
    subskills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Three.js", "Electron"],
  },
  {
    code: "04",
    shortLabel: "BACKEND",
    name: "Backend & Systems",
    value: 90,
    icon: Database,
    color: "#8b5cf6",
    description: "Creating scalable microservices, relational and non-relational database structures, and containerized deployment pipelines.",
    subskills: ["FastAPI (Python)", "Node.js / Express", "MongoDB", "PostgreSQL", "Docker", "REST APIs"],
  },
  {
    code: "05",
    shortLabel: "NETSEC",
    name: "Network Security",
    value: 94,
    icon: ShieldCheck,
    color: "#10b981",
    description: "Analyzing packet layers, implementing firewall rules, secure proxy setups, and packet monitoring.",
    subskills: ["Wireshark", "Tor Network", "TCP/IP Suite", "Proxy Routing", "Kali Linux", "VMware Labs"],
  },
  {
    code: "06",
    shortLabel: "AI / RAG",
    name: "AI & Automation",
    value: 85,
    icon: Lock,
    color: "#a855f7",
    description: "Implementing local and cloud-based AI inference nodes, embeddings search, and secure RAG assistant pipelines.",
    subskills: ["OpenAI API", "Ollama", "Moondream2 Vision", "LangChain", "Vector Embeddings", "RAG Pipelines"],
  },
];

export default function SkillsRadar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const activeSkill = SKILL_DATA[activeIdx];
  const cx = 150;
  const cy = 150;
  const r = 92;
  const numAxes = SKILL_DATA.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / numAxes - Math.PI / 2;
    const distance = (value / 100) * r;
    const x = cx + distance * Math.cos(angle);
    const y = cy + distance * Math.sin(angle);
    return { x, y };
  };

  const gridLevels = [20, 40, 60, 80, 100];
  const gridLines = gridLevels.map((level) => {
    const points = Array.from({ length: numAxes }).map((_, idx) => {
      const { x, y } = getCoordinates(idx, level);
      return `${x},${y}`;
    });
    return points.join(" ");
  });

  const skillPoints = SKILL_DATA.map((skill, idx) => {
    const { x, y } = getCoordinates(idx, skill.value);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full rounded-2xl border border-[var(--line)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-px bg-[var(--line)]">
      {/* Left Pane: SVG Radar Chart */}
      <div
        data-cursor="precision"
        className="lg:col-span-5 bg-[var(--surface)] relative p-6 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 grid-overlay pointer-events-none opacity-35" />

        <div className="relative w-[290px] h-[270px] flex items-center justify-center shrink-0 z-10">
          <svg viewBox="-12 0 324 300" className="w-full h-full select-none overflow-visible">
            {gridLines.map((points, idx) => (
              <polygon
                key={idx}
                points={points}
                fill="none"
                stroke="var(--line)"
                strokeWidth="0.9"
                strokeDasharray="2, 2"
              />
            ))}

            {Array.from({ length: numAxes }).map((_, idx) => {
              const { x, y } = getCoordinates(idx, 100);
              const isSelected = activeIdx === idx;
              return (
                <line
                  key={idx}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke={isSelected ? SKILL_DATA[idx].color : "var(--line)"}
                  strokeOpacity={isSelected ? 0.65 : 1}
                  strokeWidth={isSelected ? "1.4" : "1"}
                />
              );
            })}

            <polygon
              points={skillPoints}
              fill="rgba(255, 42, 109, 0.14)"
              stroke="var(--accent-pink)"
              strokeWidth="2"
              className="transition-all duration-500"
            />

            {SKILL_DATA.map((skill, idx) => {
              const { x, y } = getCoordinates(idx, skill.value);
              const outerCoord = getCoordinates(idx, 122);
              const isHovered = hoveredIdx === idx;
              const isActive = activeIdx === idx;

              return (
                <g
                  key={skill.code}
                  role="button"
                  tabIndex={0}
                  aria-label={`${skill.name}: ${skill.value}% proficiency`}
                  className="cursor-pointer focus:outline-none"
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIdx(idx);
                    }
                  }}
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    setActiveIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Generous invisible hit area for effortless hover/tap */}
                  <circle cx={x} cy={y} r={16} fill="transparent" />

                  {isActive && (
                    <circle
                      cx={x}
                      cy={y}
                      r={10}
                      fill="none"
                      stroke={skill.color}
                      strokeOpacity={0.45}
                      strokeWidth="1.5"
                    />
                  )}

                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered || isActive ? 6 : 4.2}
                    fill={skill.color}
                    className="transition-all duration-200"
                  />

                  <text
                    x={outerCoord.x}
                    y={outerCoord.y + 3}
                    textAnchor="middle"
                    fill={isHovered || isActive ? "var(--ink)" : "var(--muted)"}
                    fontSize="9.5"
                    fontWeight={isHovered || isActive ? "700" : "600"}
                    fontFamily="monospace"
                    className="transition-colors duration-200"
                  >
                    {skill.shortLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right Pane: Selector + Focused Detail Readout */}
      <div className="lg:col-span-7 bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-center gap-6 text-left font-mono">
        {/* Quick Vector Selector Strip */}
        <div className="flex flex-wrap gap-1.5 pb-4 border-b border-[var(--line)]">
          {SKILL_DATA.map((skill, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={skill.code}
                type="button"
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all border ${
                  isSelected
                    ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
                    : "bg-[var(--surface-subtle)] text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--line-strong)]"
                }`}
              >
                {skill.code} {skill.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Active Skill Header & Description */}
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3.5">
              <div
                className="p-2.5 rounded-lg border shrink-0"
                style={{
                  borderColor: `${activeSkill.color}40`,
                  backgroundColor: `${activeSkill.color}14`,
                  color: activeSkill.color,
                }}
              >
                <activeSkill.icon size={20} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--ink)] font-sans">
                  {activeSkill.name}
                </h3>
                <div className="text-[11px] text-[var(--muted)]">
                  VECTOR_{activeSkill.code} {"//"} {activeSkill.shortLabel}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold" style={{ color: activeSkill.color }}>
                {activeSkill.value}%
              </span>
              <div className="w-24 h-1.5 bg-[var(--line)] rounded-full overflow-hidden shrink-0">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeSkill.value}%`, backgroundColor: activeSkill.color }}
                />
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-[15px] text-[var(--text)] leading-relaxed font-sans">
            {activeSkill.description}
          </p>
        </div>

        {/* Tech Stack Manifest */}
        <div className="pt-4 border-t border-[var(--line)]">
          <div className="text-[10px] tracking-widest text-[var(--muted)] mb-2.5">
            {"// TECH_STACK_MANIFEST:"}
          </div>
          <div className="flex flex-wrap gap-2">
            {activeSkill.subskills.map((sub) => (
              <span
                key={sub}
                className="text-xs px-2.5 py-1 rounded bg-[var(--surface-subtle)] border border-[var(--line)] text-[var(--text)]"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
