import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import resumePdf from "@assets/Saumya_Resume_1780509559658.pdf";

const BLUE = "hsl(225 78% 65%)";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Avatar = () => (
  <span
    className="inline-flex items-center justify-center shrink-0 w-7 h-7 rounded-full border border-border text-xs overflow-hidden"
    style={{ background: "var(--muted)" }}
  >
    <img src={isDark => isDark ? "/logo.png" : "/logo-light.png"} alt="" className="w-full h-full object-contain" />
  </span>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3 text-sm leading-relaxed" style={{ fontFamily: "var(--app-font-mono)" }}>
    <span className="inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-full border border-border mt-0.5 text-xs" style={{ background: "var(--muted)" }}>✦</span>
    <span className="text-muted-foreground">{children}</span>
  </div>
);

export default function About() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleDark = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDark(d => !d);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full px-8 md:px-12 py-6 z-50 flex justify-between items-center">
        <button
          className="pointer-events-auto focus:outline-none"
          aria-label="Go to home"
          onClick={() => navigate("/")}
        >
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            border: "1.5px solid currentColor",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", opacity: 0.9,
          }}>
            <img src={isDark ? "/logo.png" : "/logo-light.png"} alt="SK Logo" width="44" height="44" style={{ objectFit: "contain" }} />
          </div>
        </button>

        <div className="flex items-center gap-8 text-base" style={{ fontFamily: "var(--app-font-mono)" }}>
          <button onClick={toggleDark} className="flex items-center gap-1.5 select-none transition-opacity hover:opacity-100 opacity-70" aria-label="Toggle dark mode">
            <span className="text-xs">{isDark ? "☽" : "☀"}</span>
            <div className="w-8 h-4 rounded-full border border-muted-foreground flex items-center px-0.5 transition-all" style={{ justifyContent: isDark ? "flex-start" : "flex-end" }}>
              <div className="w-3 h-3 rounded-full bg-foreground transition-all" />
            </div>
          </button>
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">work</button>
          <button onClick={() => navigate("/about")} className="text-foreground transition-colors">about</button>
          <a href={resumePdf} download="Saumya_Kumari_Resume.pdf" className="text-muted-foreground hover:text-foreground transition-colors">resume</a>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 pt-36 pb-24">

        {/* Top: photo + intro */}
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-16">
            {/* Photo */}
            <div className="shrink-0">
              <div
                className="w-44 h-52 md:w-52 md:h-64 border border-border rounded-sm flex items-center justify-center"
                style={{ background: "var(--muted)" }}
              >
                <p className="text-xs text-muted-foreground text-center px-4 leading-relaxed" style={{ fontFamily: "var(--app-font-mono)" }}>
                  photo<br />coming<br />soon
                </p>
              </div>
            </div>

            {/* Intro text */}
            <div className="flex flex-col gap-5 text-sm leading-relaxed" style={{ fontFamily: "var(--app-font-mono)" }}>
              <p className="font-medium text-base text-foreground">Hey.. happy to see you here.</p>

              <p className="text-foreground">
                I'm Saumya Kumari, I design, freelance, build and occasionally overthink things until they're good to-be perfect. Final-year B.TECH CSE undergrad student at BIT, Mesra.
              </p>

              <p className="text-foreground">
                I love creating scalable, accessible design systems to be used across products. I enjoy turning ideas to experiences that makes people to say, <span className="italic">"that's really cool."</span>
              </p>

              <p className="text-foreground">
                Additionally, I've somehow managed to get lead roles in 3 clubs/societies in my college. Presenting you — President, Megapixels · Vice President, Ignite · Manager, Esports. Experiences that taught me how to lead teams, organize chaos and get things done.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Avatar-prefixed paragraphs */}
        <div className="flex flex-col gap-6 mb-16">
          <FadeIn delay={0.05}>
            <div className="flex items-start gap-4">
              <span className="shrink-0 text-xl mt-0.5">👾</span>
              <p className="text-sm text-foreground leading-relaxed" style={{ fontFamily: "var(--app-font-mono)" }}>
                Currently, I'm seeking internships, freelance projects and opportunities to create and make an impact. Also, making pocket money by freelancing and obviously ready and needed to expand it more.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-start gap-4">
              <span className="shrink-0 text-xl mt-0.5">👾</span>
              <p className="text-sm text-foreground leading-relaxed" style={{ fontFamily: "var(--app-font-mono)" }}>
                I've previously designed for Faucek and designed social media content for Hiprotech, Level Up and branding content for Oicia, Newvision Aesthetics, Powdera, Herbstonic.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Currently up to */}
        <FadeIn delay={0.2}>
          <div className="border-t border-border pt-12">
            <p className="text-xs uppercase tracking-widest mb-8 text-muted-foreground" style={{ fontFamily: "var(--app-font-mono)" }}>
              what i'm currently up to
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: "🤞", text: "Seeking internships/FTE opportunities to explore UI/UX and also Bengaluru a bit.." },
                { icon: "🤞", text: "Love to capture emotions.. photography (hobby)" },
                { icon: "🤞", text: "Biryani or pizza (can't choose).. foodie" },
              ].map(({ icon, text }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="shrink-0 text-2xl">{icon}</span>
                  <span className="text-sm text-foreground leading-relaxed" style={{ fontFamily: "var(--app-font-mono)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Education */}
        <FadeIn delay={0.1}>
          <div className="border-t border-border pt-12 mt-12">
            <p className="text-xs uppercase tracking-widest mb-8 text-muted-foreground" style={{ fontFamily: "var(--app-font-mono)" }}>education</p>
            <div className="flex flex-col gap-8">
              {[
                { school: "BIT Mesra (Off Campus Patna)", degree: "B.Tech in Computer Science Engineering", year: "2023 – Present", score: "CGPA: 8.4" },
                { school: "St. Karen's High School", degree: "12th Grade, CBSE", year: "2021 – 2022", score: "89.6%" },
                { school: "St. Karen's High School", degree: "10th Grade, CBSE", year: "2019 – 2020", score: "93.0%" },
              ].map(({ school, degree, year, score }, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <p className="font-medium text-foreground" style={{ fontFamily: "var(--app-font-mono)" }}>{school}</p>
                    <p className="text-sm text-foreground" style={{ fontFamily: "var(--app-font-mono)" }}>{degree}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-foreground uppercase tracking-widest" style={{ fontFamily: "var(--app-font-mono)" }}>{year}</p>
                    <p className="text-sm font-medium" style={{ fontFamily: "var(--app-font-mono)" }}>{score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

      </main>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground" style={{ fontFamily: "var(--app-font-mono)" }}>
          <span>© {new Date().getFullYear()} Saumya Kumari. All rights reserved.</span>
          <a href={resumePdf} download="Saumya_Kumari_Resume.pdf" className="hover:text-foreground transition-colors">Download Resume ↓</a>
        </div>
      </footer>
    </div>
  );
}
