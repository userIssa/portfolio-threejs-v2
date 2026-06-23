"use client";

import { useEffect, useState } from "react";
import { MessageSquareCode, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarLetter: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    quote: "Issa demonstrated exceptional security insight during our system auditing phases. He analyzed complex endpoints, resolved security loops, and delivered highly descriptive vulnerability matrices.",
    name: "Dr. Sarah Jenkins",
    role: "Faculty Sponsor / Cyber Security Analyst",
    company: "GDSC Academic Advisory Board",
    avatarLetter: "S",
  },
  {
    quote: "During his internship, Issa integrated perfectly into our developer team. He designed key portal modules, optimized database layers, and secured sensitive APIs with OAuth/JWT standards.",
    name: "Oluwaseun Alabi",
    role: "Senior Full-Stack Developer",
    company: "Nigeria LNG Limited (NLNG)",
    avatarLetter: "O",
  },
  {
    quote: "An incredibly proactive engineer who combines frontend design aesthetics with backend rigor. His work on the leave-approval platform exceeded our expectations for responsiveness and code quality.",
    name: "Marcus Cheng",
    role: "Technical Lead",
    company: "AsiLeave Projects Director",
    avatarLetter: "M",
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(timer);
  }, [activeIdx]);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
      setAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
      setAnimating(false);
    }, 300);
  };

  const active = TESTIMONIALS_DATA[activeIdx];

  return (
    <section className="py-20 px-6 relative select-none">
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyber-purple/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto w-full flex flex-col gap-10">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 text-left">
          <div className="text-xs font-mono tracking-widest text-cyber-green font-bold">
            05 // PEER_FEEDBACK_MANIFEST
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Recommendations
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyber-purple to-cyber-cyan rounded-full mt-1" />
        </div>

        {/* Carousel container */}
        <div className="relative glassmorphism rounded-3xl p-6 sm:p-10 border-white/5 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Quote watermarks */}
          <Quote className="absolute top-6 left-6 text-white/5 w-24 h-24 rotate-180 pointer-events-none" />
          <MessageSquareCode className="absolute bottom-6 right-6 text-white/5 w-20 h-20 pointer-events-none" />

          {/* Active quote slide */}
          <div className={`transition-all duration-300 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"} flex flex-col items-center gap-6 z-10 max-w-2xl`}>
            <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed font-sans">
              "{active.quote}"
            </p>

            {/* Author specs */}
            <div className="flex items-center gap-3.5 mt-2">
              <div className="w-12 h-12 rounded-full bg-cyber-purple/15 border border-cyber-purple/40 text-cyber-purple flex items-center justify-center font-bold text-lg font-mono tracking-wider shrink-0 shadow-neon-purple/20">
                {active.avatarLetter}
              </div>
              <div className="text-left font-mono">
                <div className="text-sm font-bold text-white tracking-wide">{active.name}</div>
                <div className="text-xs text-cyber-green/80 font-medium mt-0.5">
                  {active.role}
                </div>
                <div className="text-[10px] text-white/40 font-semibold">{active.company}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between w-full mt-8 pt-6 border-t border-white/5 z-10">
            {/* Nav dots */}
            <div className="flex gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (animating) return;
                    setAnimating(true);
                    setTimeout(() => {
                      setActiveIdx(idx);
                      setAnimating(false);
                    }, 300);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeIdx === idx
                      ? "bg-cyber-cyan w-6 shadow-neon-cyan"
                      : "bg-white/10 hover:bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2 border border-white/5 hover:border-white/25 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-all"
                aria-label="Previous recommendation"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-2 border border-white/5 hover:border-white/25 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-all"
                aria-label="Next recommendation"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
