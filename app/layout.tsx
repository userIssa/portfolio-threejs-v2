import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Issa | Software Engineer & Ethical Hacker Portfolio",
  description:
    "Personal portfolio website for Toluwanimi Oderinde (Issa), showcasing custom software engineering microservices, full-stack React systems, and cybersecurity penetration testing certifications.",
  keywords: [
    "Toluwanimi Oderinde",
    "Issa",
    "Software Engineer",
    "Ethical Hacker",
    "Cyber Security",
    "Full Stack Developer",
    "React Native",
    "Next.js",
    "Docker",
  ],
};

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem('issa-theme');
    var isDark = stored === 'dark';
    var root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  } catch (e) {
    document.documentElement.classList.remove('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${firaCode.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
