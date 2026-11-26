"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, ShieldAlert, Cpu, Wifi } from "lucide-react";

export interface LogEntry {
  id: string;
  time: string;
  type: "info" | "warn" | "ok" | "system";
  text: string;
}

const TEMPLATE_LOGS: Array<{ type: LogEntry["type"]; text: string }> = [
  { type: "info", text: "Scanning Tokyo gateway subnets..." },
  { type: "ok", text: "Port 80/TCP active - HTTP node online" },
  { type: "ok", text: "Port 443/TCP active - Secure SSL handshake OK" },
  { type: "system", text: "Decrypting portfolio assets in memory buffer..." },
  { type: "info", text: "Handshake verified with edge TLS node" },
  { type: "warn", text: "Unusual traffic pattern resolved on SSH gateway" },
  { type: "ok", text: "Firewall rules synced: active bypass allowed" },
  { type: "info", text: "Syncing skills manifest data structure..." },
  { type: "system", text: "Resolving TypeScript module configurations" },
  { type: "ok", text: "Systems audit reported success: status 200" },
  { type: "warn", text: "Tokyo Firewall Bypass game initiated - awaiting key" },
  { type: "ok", text: "Email dispatch SMTP relay ready" },
  { type: "system", text: "Rendering layout components at 60 FPS" },
];

export default function HackerLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      const now = new Date().toLocaleTimeString();
      setLogs([
        {
          id: "1",
          time: now,
          type: "system",
          text: "ISSA_OS CORE PROTOCOLS ONLINE // システムオンライン",
        },
        {
          id: "2",
          time: now,
          type: "info",
          text: "Connecting handshakes with visitor node...",
        },
        {
          id: "3",
          time: now,
          type: "ok",
          text: "Secure handshake authenticated.",
        },
      ]);
    }, 0);

    const interval = setInterval(() => {
      const randomLog = TEMPLATE_LOGS[Math.floor(Math.random() * TEMPLATE_LOGS.length)];
      const newEntry: LogEntry = {
        id: Math.random().toString(36).substring(7),
        time: new Date().toLocaleTimeString(),
        type: randomLog.type,
        text: randomLog.text,
      };

      setLogs((prev) => [...prev, newEntry].slice(-25));
    }, 5000);

    return () => {
      clearTimeout(bootTimer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getTypeStyle = (type: LogEntry["type"]) => {
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
    <div
      ref={scrollRef}
      className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 terminal-scanlines bg-black/35 text-xs font-mono leading-relaxed"
    >
      {logs.map((log) => {
        const style = getTypeStyle(log.type);
        return (
          <div key={log.id} className="flex gap-2.5 items-start hover:bg-white/5 px-1.5 py-0.5 rounded transition-all">
            <span className="text-white/45 font-semibold shrink-0">{log.time}</span>
            {style.icon}
            <span className={`font-semibold shrink-0 ${style.text}`}>{style.label}</span>
            <span className="text-white/90 text-left">{log.text}</span>
          </div>
        );
      })}
    </div>
  );
}
