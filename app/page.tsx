import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import DecryptionGame from "@/components/DecryptionGame";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import PortfolioOverlays from "@/components/PortfolioOverlays";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <div className="min-h-screen relative text-[var(--ink)] flex flex-col font-sans overflow-x-hidden">
      {/* Main Interactive Space Background */}
      <BackgroundCanvas />

      {/* Global Navigation Header */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {/* Hero Landing Section */}
        <Hero />

        {/* Biography & Skills Radar Section */}
        <About />

        {/* Career Timeline Section */}
        <Experience />

        {/* Projects Repository Grid Section */}
        <Projects />

        {/* Neo-Tokyo Firewall Decryption Puzzle */}
        <section id="decryptor" className="py-20 px-6 relative">
          <Reveal>
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-10">
              <div className="flex flex-col gap-3 text-left">
                <div className="text-xs font-mono tracking-widest text-cyber-pink font-bold">
                  {"04 // CREDENTIALS_BYPASS_GAME // 暗号"}
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] font-sans tracking-tight">
                  Secure Dossier Bypass
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
                  <p className="text-sm text-[var(--text)] font-sans max-w-xl">
                    Play the decryption game to stabilize the handshake key and unlock my resume dossier, or bypass it using the override link.
                  </p>
                  <a
                    href="/assets/resume.pdf"
                    download="Toluwanimi_Oderinde_Resume.pdf"
                    className="cta-wipe self-start sm:self-center px-4 py-2 border border-cyber-pink/40 bg-cyber-pink/5 text-cyber-pink text-xs font-bold font-mono rounded-full"
                  >
                    BYPASS &amp; DOWNLOAD CV
                  </a>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full mt-2" />
              </div>

              <DecryptionGame />
            </div>
          </Reveal>
        </section>

        {/* Peer Feedback Slider Section */}
        <Testimonials />

        {/* Contact Form & Secure SMTP Router Section */}
        <Contact />
      </main>

      <PortfolioOverlays />
    </div>
  );
}
