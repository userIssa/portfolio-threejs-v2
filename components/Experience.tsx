"use client";

import { Terminal, Shield, Award, Calendar } from "lucide-react";

interface WorkEvent {
  role: string;
  company: string;
  period: string;
  icon: any;
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
    color: "#ff2a85", // Neon Sakura Pink
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
    company: "Babcock University Chapter",
    period: "Sept 2023 - Aug 2024",
    icon: Award,
    color: "#d9b885", // Warm Gold
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
    color: "#00e5ff", // Tokyo Cyan
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
  return (
    <section id="experience" className="py-20 px-6 relative select-none">
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyber-purple/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto w-full flex flex-col gap-14">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 text-left">
          <div className="text-xs font-mono tracking-widest text-cyber-green font-bold">
            02 // CAREER_TIMELINE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Work Experience
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan rounded-full mt-1" />
        </div>

        {/* Timeline body */}
        <div className="relative border-l border-white/10 pl-6 sm:pl-10 ml-4 flex flex-col gap-12 text-left">
          {/* Vertical Connecting Circuit Line Overlay */}
          <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-gradient-to-b from-cyber-pink via-cyber-purple to-cyber-cyan shadow-lg" />

          {EXPERIENCE_DATA.map((exp, idx) => {
            return (
              <div key={idx} className="relative group">
                {/* Node Icon on Timeline Line */}
                <div
                  className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] rounded-full border bg-[#03050c] flex items-center justify-center transition-all duration-300 group-hover:scale-110 z-10"
                  style={{
                    borderColor: exp.color,
                    boxShadow: `0 0 10px ${exp.color}40`,
                  }}
                >
                  <exp.icon size={10} className="sm:w-3 sm:h-3" style={{ color: exp.color }} />
                </div>

                {/* Event Card */}
                <div className="glassmorphism rounded-2xl p-6 border-white/5 group-hover:border-white/15 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                    <div>
                      <h3 className="text-xl font-bold tracking-wide text-white group-hover:text-white/95">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-mono font-semibold mt-1" style={{ color: exp.color }}>
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-slate-300 self-start sm:self-center">
                      <Calendar size={12} className="text-cyber-green shrink-0" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-2.5 mb-5 text-sm text-slate-300 font-sans leading-relaxed">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex gap-2.5 items-start">
                        <span className="text-[9px] font-mono text-cyber-green mt-1.5 shrink-0">//</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills badges */}
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-cyber-gray mb-2">// CAPABILITIES_EXERCISED:</div>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 transition-all cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
