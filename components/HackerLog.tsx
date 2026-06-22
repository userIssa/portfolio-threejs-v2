"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, ShieldAlert, Cpu, Wifi, ChevronDown, ChevronUp } from "lucide-react";

interface LogEntry {
  id: string;
  time: string;
  type: "info" | "warn" | "ok" | "system";
  text: string;
}

const TEMPLATE_LOGS = [
  { type: "info", text: "Scanning Tokyo gateway subnets..." },
  { type: "ok", text: "Port 80/TCP active - HTTP node online" },
  { type: "ok", text: "Port 443/TCP active - Secure SSL handshake OK" },
  { type: "system", text: "Decrypting portfolio assets in memory buffer..." },
  { type: "info", text: "Handshake verified with Netlify endpoint" },
  { type: "warn", text: "Unusual traffic pattern resolved on SSH gateway" },
  { type: "ok", text: "Firewall rules synced: active bypass allowed" },
  { type: "info", text: "Syncing skills manifest data structure..." },
  { type: "system", text: "Resolving typescript module configurations" },
  { type: "ok", text: "Systems audit reported success: status 200" },
  { type: "warn", text: "Tokyo Firewall Bypass game initiated - awaiting key" },
  { type: "ok", text: "Email dispatch SMTP relay connected successfully" },
  { type: "system", text: "Rendering layout components at 60 FPS" },
];

export default function HackerLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialLogs: LogEntry[] = [
      {
        id: "1",
        time: new Date().toLocaleTimeString(),
        type: "system",
        text: "ISSA_OS CORE PROTOCOLS ONLINE // システムオンライン",
      },
      {
        id: "2",
        time: new Date().toLocaleTimeString(),
        type: "info",
        text: "Connecting handshakes with visitor node...",
      },
      {
        id: "3",
        time: new Date().toLocaleTimeString(),
        type: "ok",
        text: "Secure handshake authenticated.",
      },
    ];
    setLogs(initialLogs);

    const interval = setInterval(() => {
      const randomLog = TEMPLATE_LOGS[Math.floor(Math.random() * TEMPLATE_LOGS.length)];
      const newEntry: LogEntry = {
        id: Math.random().toString(36).substring(7),
        time: new Date().toLocaleTimeString(),
        type: randomLog.type as any,
        text: randomLog.text,
      };

      setLogs((prev) => {
        const next = [...prev, newEntry];
        return next.slice(-20);
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "warn":
        return { text: "text-cyber-red", label: "[WARN]", icon: <ShieldAlert size={14} className="text-cyber-red shrink-0" /> };
      case "ok":
        return { text: "text-cyber-green", label: "[ OK ]", icon: <Wifi size={14} className="text-cyber-green shrink-0" /> };
      case "system":
        return { text: "text-cyber-pink", label: "[SYS ]", icon: <Cpu size={14} className="text-cyber-pink shrink-0" /> };
      default:
        return { text: "text-cyber-cyan", label: "[INFO]", icon: <Terminal size={14} className="text-cyber-cyan shrink-0" /> };
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 w-80 max-w-[calc(100vw-2rem)] select-none font-mono">
      <div className={`glassmorphism rounded-t-lg border-b border-white/10 p-2.5 flex items-center justify-between text-xs font-bold tracking-wider ${isOpen ? "text-cyber-pink border-cyber-pink/30" : "text-cyber-gray"}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-cyber-pink animate-pulse" : "bg-cyber-gray"}`} />
          <span>CYBER_LOG_MONITOR // ログ</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:text-white transition-colors"
          aria-label={isOpen ? "Minimize logs" : "Maximize logs"}
        >
          {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {isOpen && (
        <div 
          ref={scrollRef}
          className="glassmorphism border-t-0 rounded-b-lg h-40 overflow-y-auto p-3 text-[9.5px] leading-relaxed flex flex-col gap-1.5 terminal-scanlines"
        >
          {logs.map((log) => {
            const style = getTypeStyle(log.type);
            return (
              <div key={log.id} className="flex gap-2 items-start hover:bg-white/5 p-0.5 rounded transition-all">
                <span className="text-white/40 font-semibold shrink-0">{log.time}</span>
                {style.icon}
                <span className={`font-semibold shrink-0 ${style.text}`}>{style.label}</span>
                <span className="text-white/95 text-left">{log.text}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
