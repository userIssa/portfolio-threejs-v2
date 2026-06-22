"use client";

import { useState } from "react";
import { ShieldCheck, Database, Layers, Terminal, Lock, Key } from "lucide-react";

interface SkillCategory {
  name: string;
  value: number; // 0 to 100
  icon: any;
  color: string;
  glowClass: string;
  description: string;
  subskills: string[];
}

const SKILL_DATA: SkillCategory[] = [
  {
    name: "Penetration Testing",
    value: 92,
    icon: Terminal,
    color: "#ff2a85", // Neon Sakura Pink
    glowClass: "shadow-neon-pink",
    description: "Vulnerability analysis, active threat emulation, and system exploit validation.",
    subskills: ["Metasploit", "Nmap", "Burp Suite", "Web App Pentesting", "Social Engineering"],
  },
  {
    name: "Reverse Engineering",
    value: 85,
    icon: Key,
    color: "#ff003c", // Cyber Red
    glowClass: "shadow-neon-red",
    description: "Decompiling, binary analysis, and disassembling firmware and executable layers.",
    subskills: ["Ghidra", "IDA Pro", "x64dbg", "ELF & PE Analysis", "Malware Analysis"],
  },
  {
    name: "Frontend Development",
    value: 88,
    icon: Layers,
    color: "#00f0ff", // Tokyo Cyan
    glowClass: "shadow-neon-cyan",
    description: "Designing sleek, modular user interfaces with high responsiveness and custom aesthetics.",
    subskills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Canvas API"],
  },
  {
    name: "Backend & Systems",
    value: 90,
    icon: Database,
    color: "#8b5cf6", // Purple
    glowClass: "shadow-neon-purple",
    description: "Creating highly scalable microservices, relational and non-relational database structures.",
    subskills: ["Node.js / Express", "MongoDB", "PostgreSQL", "REST & GraphQL APIs", "Docker"],
  },
  {
    name: "Network Security",
    value: 94,
    icon: ShieldCheck,
    color: "#10b981", // Green
    glowClass: "shadow-neon-green",
    description: "Analyzing packet layers, implementing firewall rules, and IDS/IPS packet monitoring.",
    subskills: ["Wireshark", "Suricata / Snort", "TCP/IP Suite", "VLAN/Subnetting", "VPNs"],
  },
  {
    name: "Cryptography",
    value: 80,
    icon: Lock,
    color: "#a855f7", // Violet
    glowClass: "shadow-neon-purple",
    description: "Implementing encryption standards, hash signatures, and validating token handshakes.",
    subskills: ["AES/RSA", "HMAC / SHA-256", "OAuth 2.0 & JWT", "SSL/TLS Handshakes", "PKI"],
  },
];

export default function SkillsRadar() {
  const [activeSkill, setActiveSkill] = useState<SkillCategory>(SKILL_DATA[0]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cx = 150;
  const cy = 150;
  const r = 100;
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
    <div className="w-full flex flex-col lg:flex-row items-center gap-10 p-6 glassmorphism rounded-2xl border-white/5 relative overflow-hidden">
      {/* Background grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-10" />

      {/* SVG Radar Chart */}
      <div className="relative w-[300px] h-[300px] flex items-center justify-center shrink-0">
        <svg viewBox="0 0 300 300" className="w-full h-full select-none">
          {gridLines.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke="rgba(0, 240, 255, 0.08)"
              strokeWidth="0.75"
              strokeDasharray="2, 2"
            />
          ))}

          {Array.from({ length: numAxes }).map((_, idx) => {
            const { x, y } = getCoordinates(idx, 100);
            return (
              <line
                key={idx}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            );
          })}

          <polygon
            points={skillPoints}
            fill="rgba(255, 42, 133, 0.2)"
            stroke="rgba(255, 42, 133, 0.8)"
            strokeWidth="2"
            className="transition-all duration-500"
          />

          {SKILL_DATA.map((skill, idx) => {
            const { x, y } = getCoordinates(idx, skill.value);
            const outerCoord = getCoordinates(idx, 115);
            const isHovered = hoveredIdx === idx;
            const isActive = activeSkill.name === skill.name;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onClick={() => setActiveSkill(skill)}
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  setActiveSkill(skill);
                }}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered || isActive ? 6 : 4}
                  fill={skill.color}
                  className="transition-all duration-300"
                />
                
                <text
                  x={outerCoord.x}
                  y={outerCoord.y + 4}
                  textAnchor="middle"
                  fill={isHovered || isActive ? "#ffffff" : "rgba(255, 255, 255, 0.4)"}
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="transition-colors duration-300"
                >
                  {skill.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail side panel */}
      <div className="flex-1 w-full flex flex-col justify-between self-stretch text-left z-10 font-mono">
        <div>
          <div className="flex items-center gap-3.5 mb-3.5">
            <div
              className="p-2.5 rounded-lg border"
              style={{
                borderColor: `${activeSkill.color}35`,
                backgroundColor: `${activeSkill.color}10`,
                color: activeSkill.color,
              }}
            >
              <activeSkill.icon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-wide text-white">{activeSkill.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-white/40">PROFICIENCY:</span>
                <span className="text-[10px] font-bold" style={{ color: activeSkill.color }}>
                  {activeSkill.value}%
                </span>
                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden shrink-0 ml-1">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${activeSkill.value}%`, backgroundColor: activeSkill.color }}
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans mb-5">
            {activeSkill.description}
          </p>
        </div>

        <div>
          <div className="text-[9px] tracking-widest text-white/40 mb-2">// TECH_STACK_MANIFEST:</div>
          <div className="flex flex-wrap gap-1.5">
            {activeSkill.subskills.map((sub, sIdx) => (
              <span
                key={sIdx}
                className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300 transition-all hover:bg-white/10"
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
