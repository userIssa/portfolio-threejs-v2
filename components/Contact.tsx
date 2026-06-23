import React, { useState } from "react";
import { Send, ShieldAlert, ShieldCheck } from "lucide-react";
import dynamic from "next/dynamic";

const EarthCanvas = dynamic(() => import("./canvas/Earth"), {
  ssr: false,
});

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Required details missing (Name, Email, Message).");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMsg(data.error || "Failed secure handshake. Resend message.");
        setStatus("error");
      }
    } catch (err: any) {
      setErrorMsg("Transport layer error occurred. Try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 px-6 relative select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyber-pink/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-14">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 text-left">
          <div className="text-xs font-mono tracking-widest text-cyber-pink font-bold">
            06 // COMMS_UPLINK_CHANNEL // 連絡
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Establish Secure Uplink
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full mt-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact form - Left side */}
          <div className="lg:col-span-7 w-full p-6 sm:p-8 glassmorphism rounded-2xl border-cyber-pink/20 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 grid-overlay pointer-events-none opacity-10" />

            {status === "success" ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-5 animate-fade-in font-mono">
                <div className="p-4 rounded-full border border-cyber-cyan/45 bg-cyber-cyan/10 text-cyber-cyan shadow-neon-cyan shrink-0">
                  <ShieldCheck size={48} className="animate-bounce" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-white tracking-wide">SECURE_UPLINK: COMPLETE</h3>
                  <p className="text-sm text-slate-300 max-w-sm leading-relaxed font-sans">
                    Handshake signed. Your transmission was encrypted and dispatched via SMTP. I'll reply to your node soon.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 border border-cyber-pink/30 hover:border-cyber-pink bg-cyber-pink/5 text-cyber-pink hover:text-white transition-all rounded-lg text-xs font-mono tracking-wider font-bold mt-4"
                >
                  ESTABLISH NEW SIGNAL
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left font-mono text-xs">
                <div className="text-[10px] text-white/40 mb-1">// ENTER SECURE CORRESPONDENCE DETAILS</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-slate-400 font-bold tracking-wider">IDENTIFIER (NAME)*</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "sending"}
                      className="bg-black/40 border border-cyber-pink/20 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-pink transition-colors text-xs placeholder:text-white/20"
                      placeholder="e.g. Neo or Friendly Recruiter"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-slate-400 font-bold tracking-wider">REPLY_TO ADDRESS (EMAIL)*</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "sending"}
                      className="bg-black/40 border border-cyber-pink/20 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-pink transition-colors text-xs placeholder:text-white/20"
                      placeholder="e.g. recruit@localhost.com"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-slate-400 font-bold tracking-wider">UPLINK SUBJECT</label>
                  <input
                     id="subject"
                     type="text"
                     name="subject"
                     value={formData.subject}
                     onChange={handleChange}
                     disabled={status === "sending"}
                     className="bg-black/40 border border-cyber-pink/20 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-pink transition-colors text-xs placeholder:text-white/20"
                     placeholder="e.g. System Integration Proposal or Coffee Invite"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-slate-400 font-bold tracking-wider">TRANSMISSION BODY (MESSAGE)*</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "sending"}
                    rows={5}
                    className="bg-black/40 border border-cyber-pink/20 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-pink transition-colors text-xs placeholder:text-white/20 resize-none font-sans"
                    placeholder="e.g. We need someone to secure our backend APIs, build a React Native mobile app, or both."
                    required
                  />
                </div>

                {status === "error" && (
                  <div className="p-3 bg-cyber-red/10 border border-cyber-red/35 text-cyber-red rounded-lg flex items-center gap-2.5">
                    <ShieldAlert size={16} className="shrink-0 animate-pulse" />
                    <span className="font-semibold">{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-cyber-pink text-white hover:bg-white hover:text-black font-bold rounded-lg transition-all shadow-neon-pink text-xs font-mono self-start tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className={status === "sending" ? "animate-pulse" : ""} />
                  {status === "sending" ? "DISPATCHING PACKETS..." : "SEND SIGNAL"}
                </button>
              </form>
            )}
          </div>

          {/* Secure Network 3D Globe - Right side */}
          <div className="lg:col-span-5 w-full h-[350px] sm:h-[450px] lg:h-[500px] p-6 glassmorphism rounded-2xl border-cyber-pink/20 relative overflow-hidden flex flex-col justify-between text-left self-stretch">
            <div className="absolute inset-0 grid-overlay pointer-events-none opacity-10" />

            <div className="flex flex-col gap-2 font-mono">
              <h3 className="text-base font-bold text-white tracking-wide">Global Uplink Gateway</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Drag the interactive 3D globe to orbit the network node. Dispatches encrypted API transmissions directly via TLS 1.3 to the SMTP relay.
              </p>
            </div>

            <div className="w-full flex-1 min-h-[220px] relative">
              <EarthCanvas />
            </div>

            <div className="border-t border-white/5 pt-4 text-left font-mono text-[9px] text-white/30 flex justify-between">
              <span>SECURITY: TLS_1.3</span>
              <span>HOST: SMTP.GMAIL.COM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
