"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, ShieldCheck, ShieldAlert, RotateCcw, FileDown } from "lucide-react";

const WORDS = [
  "SHINOBI",
  "KOSENNET",
  "FIREWALL",
  "CYBERNET",
  "OVERRIDE",
  "GATEWAY",
  "NETFLOW",
  "ROOT_DNS",
  "DATABASE",
  "SECURITY",
  "TOKYOHUB",
  "SSL_BIND",
];

export default function DecryptionGame() {
  const [targetWord, setTargetWord] = useState("");
  const [attempts, setAttempts] = useState(4);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const scrollRef = useRef<HTMLDivElement>(null);

  const initGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(randomWord);
    setAttempts(4);
    setSelectedWord(null);
    setGameState("playing");
    setLogs([
      "TOKYO_NETSEC // SUBNET FIREWALL BYPASS UTILITY V9.2",
      "STATUS: LOCKED // ACCESS: CLASSIFIED_DOSSIER",
      "IP_GATEWAY: 192.168.102.55",
      "----------------------------------------------",
      "SELECT HASHWORDS TO STABILIZE HANDSHAKE KEY:",
    ]);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleWordSelect = (word: string) => {
    if (gameState !== "playing" || attempts <= 0) return;

    setSelectedWord(word);

    let matches = 0;
    const len = Math.min(word.length, targetWord.length);
    for (let i = 0; i < len; i++) {
      if (word[i] === targetWord[i]) {
        matches++;
      }
    }

    const newLogs = [...logs, `> SELECTING: ${word}`];

    if (word === targetWord) {
      setGameState("won");
      newLogs.push("KEY INTEGRITY: 100% - VERIFIED.");
      newLogs.push("ACCESS GRANTED. DOSSIER UNLOCKED.");
      setLogs(newLogs);
    } else {
      const remaining = attempts - 1;
      setAttempts(remaining);
      newLogs.push("KEY MATCH ERROR. CHECKSUM DISCREPANCY.");
      newLogs.push(`RESULT: ${matches}/${targetWord.length} CORRECT VECTOR HASHES.`);
      
      if (remaining <= 0) {
        setGameState("lost");
        newLogs.push("SUBNET ACCESS LOCKED. IPS ACTIVE.");
        newLogs.push("SYSTEM COOLDOWN TRIGGERED.");
      } else {
        newLogs.push(`ATTEMPTS REMAINING: ${remaining}`);
      }
      setLogs(newLogs);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-5 rounded-2xl glassmorphism border-cyber-pink/20 font-mono select-none relative overflow-hidden">
      {/* CRT scanlines and grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-10" />
      <div className="absolute inset-0 pointer-events-none terminal-scanlines opacity-10" />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-cyber-pink/20 pb-3 mb-4">
        <div className="flex items-center gap-2.5 text-cyber-pink text-neon-glow-pink text-sm font-bold tracking-wider">
          <Terminal size={18} />
          <span>FIREWALL_BYPASS.EXE</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-white/40 uppercase">
          <span className={`w-2 h-2 rounded-full ${gameState === "won" ? "bg-cyber-cyan animate-pulse shadow-neon-cyan" : gameState === "lost" ? "bg-cyber-red animate-pulse shadow-neon-red" : "bg-cyber-pink animate-pulse shadow-neon-pink"}`} />
          <span>{gameState === "won" ? "BYPASS_OK" : gameState === "lost" ? "LOCKED" : `PENDING (${attempts} ATT)`}</span>
        </div>
      </div>

      {/* Grid workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hex lists */}
        <div className="border border-cyber-pink/20 rounded-lg p-3 bg-black/40 h-64 overflow-y-auto terminal-scanlines text-xs text-cyber-pink/80 flex flex-col gap-2">
          <div className="text-[10px] text-white/30 mb-2">// SUBNET DIRECTORY OVERLAY MAP</div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
            {WORDS.map((word, idx) => {
              const hex = (0xa3c5 + idx * 322).toString(16).toUpperCase();
              const isSelected = selectedWord === word;
              return (
                <button
                  key={word}
                  disabled={gameState !== "playing"}
                  onClick={() => handleWordSelect(word)}
                  className={`text-left font-mono text-[10px] p-1.5 rounded transition-all flex items-center gap-1.5 ${
                    gameState !== "playing" 
                      ? "opacity-35 cursor-not-allowed" 
                      : isSelected 
                        ? "bg-cyber-pink/25 text-white font-bold" 
                        : "hover:bg-cyber-pink/10 hover:text-white"
                  }`}
                >
                  <span className="text-white/20 select-none">0x{hex}</span>
                  <span className="tracking-widest font-semibold">{word}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Console logs */}
        <div className="border border-cyber-pink/20 rounded-lg p-3 bg-black/40 h-64 flex flex-col justify-between text-xs text-cyber-pink/80 terminal-scanlines text-left">
          <div ref={scrollRef} className="overflow-y-auto flex flex-col gap-1.5 flex-1 pr-1">
            {logs.map((log, i) => (
              <div
                key={i}
                className={
                  log.startsWith("> SELECTING")
                    ? "text-white font-bold mt-1.5"
                    : log.includes("VERIFIED") || log.includes("GRANTED")
                    ? "text-cyber-cyan font-bold text-neon-glow-cyan"
                    : log.includes("ERROR") || log.includes("LOCKED")
                    ? "text-cyber-red font-bold text-neon-glow-red"
                    : ""
                }
              >
                {log}
              </div>
            ))}
          </div>

          {/* Action trigger */}
          <div className="border-t border-cyber-pink/25 pt-2.5 mt-2 flex items-center justify-between">
            {gameState === "won" ? (
              <a
                href="/assets/resume.pdf"
                download="Toluwanimi_Oderinde_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-cyber-cyan text-black font-bold font-mono rounded hover:bg-white hover:text-black transition-all shadow-neon-cyan"
              >
                <FileDown size={15} />
                DOWNLOAD CLASSIFIED RESUME
              </a>
            ) : gameState === "lost" ? (
              <button
                onClick={initGame}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-cyber-red/20 border border-cyber-red/50 text-cyber-red hover:bg-cyber-red hover:text-white transition-all rounded font-bold font-mono"
              >
                <RotateCcw size={15} />
                BYPASS RESET (COOLDOWN CLEAR)
              </button>
            ) : (
              <button
                onClick={initGame}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-cyber-pink/30 hover:border-cyber-pink text-cyber-pink/70 hover:text-white transition-all rounded font-bold font-mono text-[9px]"
              >
                <RotateCcw size={12} />
                RE-REGENERATE HASH STRINGS
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success/Lockout decals */}
      {gameState === "won" && (
        <div className="mt-4 p-3 bg-cyber-cyan/10 border border-cyber-cyan/35 rounded-lg flex items-center gap-3">
          <ShieldCheck size={28} className="text-cyber-cyan animate-bounce shrink-0" />
          <div className="text-left text-xs">
            <div className="text-cyber-cyan font-bold">DECRYPTION SUCCESSFUL</div>
            <div className="text-white/70 font-sans">The firewall has been bypassed. Click the dossier download button above to save the resume file.</div>
          </div>
        </div>
      )}
      {gameState === "lost" && (
        <div className="mt-4 p-3 bg-cyber-red/10 border border-cyber-red/35 rounded-lg flex items-center gap-3">
          <ShieldAlert size={28} className="text-cyber-red animate-pulse shrink-0" />
          <div className="text-left text-xs">
            <div className="text-cyber-red font-bold font-mono">ACCESS BLOCKED</div>
            <div className="text-white/70 font-sans">Subnet scanner triggered cooldown locks. Use the reset trigger to execute bypass sequences again.</div>
          </div>
        </div>
      )}
    </div>
  );
}
