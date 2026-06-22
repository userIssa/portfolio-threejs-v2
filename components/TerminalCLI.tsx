"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, Play } from "lucide-react";

interface CLIHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function TerminalCLI({ onHackTrigger }: { onHackTrigger: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CLIHistoryItem[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
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
          <div className="flex flex-col gap-1 text-[10px] leading-relaxed text-slate-300">
            <p className="text-cyber-pink font-bold">// SYSTEM CONTROL DIRECTIVES // ターミナルコマンド</p>
            <p><span className="text-cyber-cyan font-semibold">help</span> - Display terminal command directory.</p>
            <p><span className="text-cyber-cyan font-semibold">about</span> - Print developer biography manifest.</p>
            <p><span className="text-cyber-cyan font-semibold">skills</span> - Print active languages and tech stacks.</p>
            <p><span className="text-cyber-cyan font-semibold">projects</span> - Print catalogued software applications.</p>
            <p><span className="text-cyber-cyan font-semibold">experience</span> - Print work history milestones.</p>
            <p><span className="text-cyber-cyan font-semibold">hack</span> - Initiate Katakana matrix bypass sequence.</p>
            <p><span className="text-cyber-cyan font-semibold">clear</span> - Clear the terminal buffer.</p>
            <p><span className="text-cyber-cyan font-semibold">exit</span> - Close interactive terminal console.</p>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="flex flex-col gap-1 text-slate-300 leading-relaxed text-[10px]">
            <p className="text-cyber-pink font-bold">NAME: Toluwanimi Oderinde (Issa)</p>
            <p className="text-cyber-purple font-bold">ROLE: Software Engineer & Cyber Security Specialist</p>
            <p>I am a detail-oriented backend/full-stack engineer and cyber security lead based in Nigeria. I specialize in auditing microservice gateways, designing React Native mobile portals, and conducting server penetration tests. I lead dev student communities and organize hacker CTFs.</p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="flex flex-col gap-1 text-slate-300 text-[10px]">
            <p className="text-cyber-pink font-bold">// TECH_STACK_MANIFEST // スキル一覧</p>
            <p>• <span className="text-cyber-cyan">CYBER SECURITY:</span> Vulnerability assessment, OWASP Top 10 auditing, Reverse Eng (Ghidra), Wireshark</p>
            <p>• <span className="text-cyber-green">LANGUAGES:</span> TypeScript, JavaScript, Python, C++, Go, HTML/CSS</p>
            <p>• <span className="text-cyber-purple">FRAMEWORKS:</span> React.js, Next.js, Node.js, Express, React Native, Expo</p>
            <p>• <span className="text-cyber-cyan">INFRA:</span> PostgreSQL, MongoDB, Docker, Git, REST & GraphQL APIs</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="flex flex-col gap-1 text-slate-300 text-[10px]">
            <p className="text-cyber-pink font-bold">// ARCHIVED PROJECTS LISTING // プロジェクトアーカイブ</p>
            <p>1. <span className="text-cyber-cyan font-semibold">Food Ordering App</span> - Mobile React Native food tracing client using Google Maps.</p>
            <p>2. <span className="text-cyber-cyan font-semibold">Vuln Scanner</span> - Multi-threaded python network scanner probing open ports and banner headers.</p>
            <p>3. <span className="text-cyber-cyan font-semibold">Meme4U</span> - Interactive social meme creator using MongoDB APIs.</p>
            <p>4. <span className="text-cyber-cyan font-semibold">AsiLeave Portal</span> - Administrative Next.js JWT task authorization client.</p>
            <p>5. <span className="text-cyber-cyan font-semibold">StegoWeb</span> - Client-side Canvas LSB steganography tool hiding text in image pixels.</p>
          </div>
        );
        break;

      case "experience":
        response = (
          <div className="flex flex-col gap-1 text-slate-300 text-[10px]">
            <p className="text-cyber-pink font-bold">// HISTORIC EXPERIENCE LOG // 経歴</p>
            <p>• <span className="text-cyber-cyan">Google Developer Student Clubs (GDSC Lead):</span> Organized academic security CTF hackathons and structured vulnerabilities workshops.</p>
            <p>• <span className="text-cyber-green">Nigeria LNG Limited (Full Stack Intern):</span> Engineered company internal portals, optimized SQL queries, and secured route handshakes.</p>
          </div>
        );
        break;

      case "hack":
        response = (
          <div className="text-cyber-red font-bold animate-pulse text-[11px]">
            TOKYO GATEWAY OVERLOADED... INITIATING KATAKANA BYPASS SEQUENCE.
          </div>
        );
        
        fetch("/api/hack-alert", { method: "POST" })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setHistory((prev) => [
                ...prev,
                {
                  command: "system_status",
                  output: (
                    <div className="text-cyber-pink font-semibold text-[10px] mt-1 animate-pulse">
                      CONNECTION ESTABLISHED: {data.ip} ({data.os}) // SECURE DOSSIER EXTRACTED
                    </div>
                  ),
                },
              ]);
            }
          })
          .catch((err) => console.error("Bypass log error:", err));

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
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-3 bg-cyber-dark glassmorphism hover:bg-cyber-pink/25 hover:text-cyber-pink hover:scale-105 transition-all text-cyber-cyan rounded-full shadow-neon-cyan/40 border border-cyber-cyan/30 flex items-center justify-center select-none"
        title="Open Terminal (Shortcut: `)"
        aria-label="Open Tokyo CLI Console"
      >
        <Terminal size={22} className="animate-pulse" />
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 h-[45vh] bg-cyber-dark/95 border-t border-cyber-pink/30 shadow-2xl flex flex-col font-mono text-xs select-text">
          {/* Header */}
          <div className="flex items-center justify-between bg-black/60 p-2.5 px-4 border-b border-cyber-pink/20 text-cyber-pink font-bold select-none">
            <div className="flex items-center gap-2">
              <Terminal size={14} />
              <span className="tracking-widest">ISSA_OS // ターミナル.SH (SESSION ACTIVE)</span>
            </div>
            <div className="flex items-center gap-4 text-white/30 text-[10px]">
              <span className="hidden sm:inline">Press ` or Esc to terminate</span>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition-colors"
                aria-label="Close terminal console"
              >
                <X size={16} />
              </button>
            </div>
          </div>

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
              <p className="font-bold">Welcome to Issa's Tokyo-OS Interactive command gateway V3.0.</p>
              <p className="text-[9.5px] text-white/40 mt-1">
                Type commands in English. Commands: <span className="text-cyber-pink">about</span>, <span className="text-cyber-pink">skills</span>, <span className="text-cyber-pink">projects</span>, <span className="text-cyber-pink">experience</span>, <span className="text-cyber-pink">hack</span>, <span className="text-cyber-pink">clear</span>.
              </p>
            </div>

            {history.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1 text-left border-l border-white/5 pl-2">
                <div className="flex items-center gap-1.5 text-cyber-pink/60 font-semibold">
                  <Play size={8} className="shrink-0" />
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
              className="flex-1 bg-transparent text-white focus:outline-none caret-cyber-pink tracking-wider placeholder:text-white/10"
              placeholder='Type a command or "help"...'
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      )}
    </>
  );
}
