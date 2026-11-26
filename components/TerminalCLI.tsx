"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, Play, Activity } from "lucide-react";
import HackerLog from "./HackerLog";

interface CLIHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function TerminalCLI({ onHackTrigger }: { onHackTrigger: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"cli" | "logs">("cli");
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CLIHistoryItem[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && activeTab === "cli" && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setActiveTab("cli");
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode | string = "";

    if (trimmed === "") return;

    setCmdHistory((prev) => [cmd, ...prev].slice(0, 50));
    setHistoryIdx(-1);

    switch (trimmed) {
      case "help":
        response = (
          <div className="flex flex-col gap-1 text-xs leading-relaxed text-slate-300">
            <p className="text-cyber-pink font-bold">{"// SYSTEM CONTROL DIRECTIVES // ターミナルコマンド"}</p>
            <p><span className="text-cyber-cyan font-semibold">help</span> - Display terminal command directory.</p>
            <p><span className="text-cyber-cyan font-semibold">about</span> - Print developer biography manifest.</p>
            <p><span className="text-cyber-cyan font-semibold">skills</span> - Print active languages and tech stacks.</p>
            <p><span className="text-cyber-cyan font-semibold">projects</span> - Print catalogued software applications.</p>
            <p><span className="text-cyber-cyan font-semibold">experience</span> - Print work history milestones.</p>
            <p><span className="text-cyber-cyan font-semibold">logs</span> - Switch to live system monitor feed.</p>
            <p><span className="text-cyber-cyan font-semibold">hack</span> - Initiate Katakana matrix bypass sequence.</p>
            <p><span className="text-cyber-cyan font-semibold">clear</span> - Clear the terminal buffer.</p>
            <p><span className="text-cyber-cyan font-semibold">exit</span> - Close interactive terminal console.</p>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="flex flex-col gap-1 text-slate-300 leading-relaxed text-xs">
            <p className="text-cyber-pink font-bold font-mono">NAME: Toluwanimi Oderinde (Issa)</p>
            <p className="text-cyber-purple font-bold font-mono">ROLE: Software Engineer &amp; Ethical Hacker</p>
            <p className="font-sans">BSc Software Engineering graduate and cybersecurity specialist. Currently building internal tools, customer-facing platforms, and security-oriented systems at Genesis Group Nigeria&apos;s Innovations Department. Certified CEH &amp; MCRTA.</p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="flex flex-col gap-1 text-slate-300 text-xs font-mono">
            <p className="text-cyber-pink font-bold">{"// TECH_STACK_MANIFEST // スキル一覧"}</p>
            <p>• <span className="text-cyber-cyan">LANGUAGES:</span> Python, JavaScript, TypeScript, C, C99, SQL</p>
            <p>• <span className="text-cyber-green">FRONTEND:</span> React, Next.js, Tailwind CSS, Three.js, Electron</p>
            <p>• <span className="text-cyber-purple">BACKEND &amp; DB:</span> FastAPI, Node.js, Express, MongoDB, PostgreSQL</p>
            <p>• <span className="text-cyber-cyan">SECURITY &amp; AI:</span> Metasploit, Burp Suite, Nmap, Wireshark, CEH, MCRTA, Ollama, OpenAI RAG</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="flex flex-col gap-1 text-slate-300 text-xs font-mono">
            <p className="text-cyber-pink font-bold">{"// ARCHIVED PROJECTS LISTING // プロジェクトアーカイブ"}</p>
            <p>1. <span className="text-cyber-cyan font-semibold">SentinelWatch</span> - AI-powered local CCTV monitor with FastAPI/ntfy.sh alerts.</p>
            <p>2. <span className="text-cyber-cyan font-semibold">Shroud</span> - Geo-aware secure browser with hybrid Tor proxy routing.</p>
            <p>3. <span className="text-cyber-cyan font-semibold">ShellForge</span> - Constraint-aware shellcode generator with 51/51 validation passes.</p>
            <p>4. <span className="text-cyber-cyan font-semibold">GenHears</span> - Enterprise complaint satisfaction management portal for Genesis Group.</p>
            <p>5. <span className="text-cyber-cyan font-semibold">HeapSentinel</span> - Low-level heap memory overflow and double-free monitor in C.</p>
            <p>6. <span className="text-cyber-cyan font-semibold">Arachne</span> - Custom web crawler and endpoint scanning framework.</p>
            <p>7. <span className="text-cyber-cyan font-semibold">Ask HR</span> - JWT-secured RAG human resource assistant with vector embeddings.</p>
          </div>
        );
        break;

      case "experience":
        response = (
          <div className="flex flex-col gap-1 text-slate-300 text-xs font-mono">
            <p className="text-cyber-pink font-bold">{"// HISTORIC EXPERIENCE LOG // 経歴"}</p>
            <p>• <span className="text-cyber-pink font-bold">Genesis Group (Software Engineer Contract):</span> Built GenHears NPS tracker, scoped Inner Circle shopper app, and replacement portals.</p>
            <p>• <span className="text-cyber-green font-bold">NLNG (Cybersecurity Intern):</span> Audited internal auth portals, tuned PostgreSQL schemas, and emulated local threat patterns.</p>
            <p>• <span className="text-cyber-cyan font-bold">GDSC Babcock (Cyber Security Lead):</span> Designed active exploit tutorials and hosted security Capture-The-Flag challenges.</p>
          </div>
        );
        break;

      case "logs":
        setActiveTab("logs");
        setInputVal("");
        return;

      case "hack":
        response = (
          <div className="text-cyber-red font-bold animate-pulse text-xs">
            TOKYO GATEWAY OVERLOADED... INITIATING KATAKANA BYPASS SEQUENCE.
          </div>
        );

        setTimeout(() => {
          onHackTrigger();
          setIsOpen(false);
        }, 2200);
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        setIsOpen(false);
        setInputVal("");
        return;

      default:
        response = `COMMAND ERROR: "${cmd}" NOT FOUND. TYPE "help" FOR TOKYO PROTOCOL DIRECTIVES.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = historyIdx - 1;
      if (nextIdx >= 0) {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else {
        setHistoryIdx(-1);
        setInputVal("");
      }
    }
  };

  return (
    <>
      {/* Unified Bottom-Right Floating Cyber Dock */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1 p-1 rounded-full glassmorphism border-[var(--line-strong)] shadow-neon-cyan/20 select-none font-mono">
        <button
          type="button"
          onClick={() => {
            setActiveTab("logs");
            setIsOpen(true);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-semibold text-[var(--text)] hover:text-cyber-pink hover:bg-cyber-pink/10 transition-all"
          aria-label="Open system log monitor"
        >
          <span className="w-2 h-2 rounded-full bg-cyber-pink animate-pulse shrink-0" />
          <Activity size={13} className="text-cyber-pink" />
          <span className="hidden sm:inline">LOGS</span>
        </button>

        <span className="h-4 w-px bg-[var(--line)]" aria-hidden="true" />

        <button
          type="button"
          onClick={() => {
            setActiveTab("cli");
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-cyber-cyan/10 hover:bg-cyber-cyan hover:text-white text-cyber-cyan text-[11px] font-bold tracking-wider transition-all"
          title="Open Terminal (Shortcut: `)"
          aria-label="Open Tokyo CLI Console"
        >
          <Terminal size={14} />
          <span>CLI</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] rounded bg-[var(--surface-subtle)] border border-current/25">
            `
          </kbd>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 h-[46vh] bg-[#080b12]/95 text-slate-100 backdrop-blur-xl border-t border-[#ff2a6d]/35 shadow-2xl flex flex-col font-mono text-xs select-text animate-fade-in">
          {/* Header with Tabs */}
          <div className="flex items-center justify-between bg-black/60 px-4 py-2 border-b border-cyber-pink/20 font-bold select-none">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("cli")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] tracking-wider transition-all ${
                  activeTab === "cli"
                    ? "bg-cyber-pink/15 text-cyber-pink border border-cyber-pink/35"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <Terminal size={13} />
                <span>{"ISSA_OS // ターミナル.SH"}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("logs")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] tracking-wider transition-all ${
                  activeTab === "logs"
                    ? "bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/35"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <Activity size={13} />
                <span>{"SYSTEM_LOGS // ログ"}</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-white/40 text-[11px]">
              <span className="hidden sm:inline">Press ` or Esc to close</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition-colors p-1"
                aria-label="Close terminal console"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {activeTab === "logs" ? (
            <HackerLog />
          ) : (
            <>
              {/* Output screen */}
              <div
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 terminal-scanlines bg-black/35"
              >
                <div className="text-cyber-cyan/90 text-left">
                  <pre className="text-[8.5px] leading-tight mb-2.5 text-cyber-pink font-bold select-none">
{`   _  _ ___ ___   _     ___  ___     _____  _  ____   __ ___  
  | \\| | __/ _ \\ | |   / _ \\/ __|   |_   _|/ \\|  _ \\  \\// _ \\ 
  | \` | _| (_) || |__| (_) \\__ \\     | | ( o )| |_) )  / (_) )
  |_|\\_|___\\___/ |____\\___/|___/     |_| \\_/ |_| \\_\\ /_\\\\___/ 
                                                              `}
                  </pre>
                  <p className="font-bold">Welcome to Issa&apos;s Tokyo-OS Interactive command gateway V3.0.</p>
                  <p className="text-[11px] text-white/50 mt-1">
                    Type commands in English. Commands: <span className="text-cyber-pink">about</span>, <span className="text-cyber-pink">skills</span>, <span className="text-cyber-pink">projects</span>, <span className="text-cyber-pink">experience</span>, <span className="text-cyber-pink">logs</span>, <span className="text-cyber-pink">hack</span>, <span className="text-cyber-pink">clear</span>.
                  </p>
                </div>

                {history.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 text-left border-l border-white/10 pl-3">
                    <div className="flex items-center gap-1.5 text-cyber-pink/75 font-semibold">
                      <Play size={9} className="shrink-0" />
                      <span>issa@neotokyo:~$ {item.command}</span>
                    </div>
                    <div className="text-left leading-relaxed">{item.output}</div>
                  </div>
                ))}
              </div>

              {/* Input line */}
              <div className="flex items-center gap-2 p-3 px-4 bg-black/60 border-t border-cyber-pink/20">
                <span className="text-cyber-pink font-bold shrink-0">issa@neotokyo:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white focus:outline-none caret-cyber-pink tracking-wider placeholder:text-white/25"
                  placeholder='Type a command or "help"...'
                  autoComplete="off"
                  autoCapitalize="off"
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
