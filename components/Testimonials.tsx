"use client";

import { ShieldCheck, Award, Terminal, Cpu, CheckCircle2, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

interface LedgerEntry {
  code: string;
  category: string;
  title: string;
  organization: string;
  metric: string;
  detail: string;
  accent: string;
  icon: typeof ShieldCheck;
}

const VERIFIED_LEDGER: LedgerEntry[] = [
  {
    code: "CERT_01",
    category: "OFFENSIVE SECURITY",
    title: "Certified Ethical Hacker (CEH)",
    organization: "EC-Council",
    metric: "ACTIVE CREDENTIAL",
    detail: "Validated methodology across web application exploitation, network scanning, privilege escalation, and vulnerability reporting.",
    accent: "var(--accent-pink)",
    icon: ShieldCheck,
  },
  {
    code: "CERT_02",
    category: "RED TEAM OPERATIONS",
    title: "Certified Red Team Analyst (MCRTA)",
    organization: "CyberWarFare Labs",
    metric: "ACTIVE CREDENTIAL",
    detail: "Hands-on adversary emulation covering active directory attack paths, lateral movement, and defensive detection evasion.",
    accent: "var(--accent-cyan)",
    icon: Award,
  },
  {
    code: "AUDIT_03",
    category: "PRODUCTION IMPACT",
    title: "Database Optimization & Auth Hardening",
    organization: "Nigeria LNG Limited (NLNG)",
    metric: "-35% QUERY LAG",
    detail: "Audited portal authentication flows with JWT/Express endpoint hardening and tuned PostgreSQL schemas to cut dashboard load times by 35%.",
    accent: "var(--accent-green)",
    icon: Cpu,
  },
  {
    code: "BUILD_04",
    category: "SYSTEMS VALIDATION",
    title: "Multi-Arch Shellcode Verification",
    organization: "ShellForge Research",
    metric: "51 / 51 TESTS PASSING",
    detail: "Automated constraint-aware payload validation across x86-64, x86-32, ARM Thumb, and MIPS Big-Endian targets.",
    accent: "#8b5cf6",
    icon: Terminal,
  },
];

export default function Testimonials() {
  return (
    <section id="credentials" className="py-20 px-6 relative">
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyber-purple/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-mono tracking-widest text-cyber-green font-bold">
                {"05 // VERIFIED_CREDENTIALS_AND_IMPACT // 実績"}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] font-sans tracking-tight">
                Certifications &amp; Proven Impact
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyber-purple to-cyber-cyan rounded-full mt-1" />
            </div>

            <a
              href="/assets/resume.pdf"
              download="Toluwanimi_Oderinde_Resume.pdf"
              className="cta-wipe self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] font-mono text-xs font-bold tracking-wider"
            >
              <span>FULL DOSSIER (PDF)</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>

        {/* Architectural 1px Hairline Verification Ledger */}
        <Reveal delayMs={90}>
          <div className="border-t border-[var(--line)] flex flex-col text-left">
            {VERIFIED_LEDGER.map((item) => (
              <div
                key={item.code}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-6 px-3 border-b border-[var(--line)] hover:bg-[var(--surface-subtle)] transition-colors items-start lg:items-center"
              >
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg border shrink-0"
                    style={{
                      borderColor: `${item.accent}40`,
                      backgroundColor: `${item.accent}14`,
                      color: item.accent,
                    }}
                  >
                    <item.icon size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                      {item.code} {"//"} {item.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-[var(--ink)] mt-0.5">
                      {item.organization}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col gap-1">
                  <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text)] font-sans leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="lg:col-span-3 flex lg:justify-end">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-[11px] font-bold tracking-wider"
                    style={{
                      borderColor: `${item.accent}45`,
                      backgroundColor: `${item.accent}12`,
                      color: item.accent,
                    }}
                  >
                    <CheckCircle2 size={12} />
                    <span>{item.metric}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
