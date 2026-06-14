import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Mail, Linkedin, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
// @ts-ignore - The alias is provided by the environment


const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const BLUE = "hsl(225 78% 65%)";

const LINES = [
  { text: "saumya kumari",                color: "foreground" as const },
  { text: "ui/ux designer",               color: "foreground" as const },
  { text: "design lead intern, faucek", color: "blue" as const },
  { text: "calmcash · ux case study",      color: "blue" as const },
];

const CHAR_SPEED = 38; // ms per character

export default function App() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [displayed, setDisplayed] = useState(["", "", "", ""]);
  const [started, setStarted] = useState(false);

  // Apply / remove the .dark class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const lineIdxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Kick off typewriter after a short delay
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Typewriter: type each line sequentially
  useEffect(() => {
    if (!started) return;
    lineIdxRef.current = 0;

    const typeChar = (lineIdx: number, charIdx: number) => {
      if (lineIdx >= LINES.length) return;

      const fullText = LINES[lineIdx].text;
      const nextChar = charIdx + 1;

      setDisplayed(prev => {
        const next = [...prev];
        next[lineIdx] = fullText.slice(0, nextChar);
        return next;
      });

      if (nextChar < fullText.length) {
        timerRef.current = setTimeout(() => typeChar(lineIdx, nextChar), CHAR_SPEED);
      } else {
        const nextLine = lineIdx + 1;
        if (nextLine < LINES.length) {
          timerRef.current = setTimeout(() => typeChar(nextLine, 0), 180);
        }
      }
    };

    timerRef.current = setTimeout(() => typeChar(0, -1), 100);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [started]);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-sans">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full px-4 sm:px-8 md:px-12 py-4 md:py-6 z-50 flex justify-between items-center bg-background/70 backdrop-blur-md border-b border-border/40">
        {/* Logo — home button */}
        <button
          className="pointer-events-auto focus:outline-none"
          data-testid="logo"
          aria-label="Go to home"
          onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="w-11 h-11 md:w-16 md:h-16 lg:w-18 lg:h-18 border-[1.5px] border-current rounded-full relative overflow-hidden opacity-90">
            <img
              src="/logo.png"
              alt="SK Logo Dark"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: isDark ? 1 : 0 }}
            />
            <img
              src="/logo-light.png"
              alt="SK Logo Light"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: isDark ? 0 : 1 }}
            />
          </div>
        </button>

        {/* Right nav */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 text-sm md:text-lg lg:text-xl pointer-events-auto" style={{ fontFamily: 'var(--app-font-mono)' }}>
          {/* Dark mode toggle */}
          <button
            onClick={() => setIsDark(d => !d)}
            className="flex items-center gap-1.5 select-none transition-opacity hover:opacity-100 opacity-70"
            aria-label="Toggle dark mode"
          >
            <span className="text-xs">{isDark ? "☽" : "☀"}</span>
            <div className="w-8 h-4 md:w-10 md:h-5 rounded-full border border-muted-foreground flex items-center px-0.5 transition-all" style={{ justifyContent: isDark ? "flex-start" : "flex-end" }}>
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-foreground transition-all" />
            </div>
          </button>
          <a href="#work" className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors" data-testid="nav-work">work</a>
          <button onClick={() => navigate("/about")} className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors" data-testid="nav-about">about</button>
          <a href="https://drive.google.com/file/d/1WhE-EuyVZhdLJGV8PQZkGZ5_tCaRmc5d/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors" data-testid="nav-resume">resume</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">

        {/* Centered text block */}
        <div
          className="flex flex-col items-center text-center px-4"
          style={{ fontFamily: 'var(--app-font-mono)' }}
        >
          {LINES.map((line, i) => {
            const text = displayed[i];
            const isDone = text === line.text;
            const isTyping = text.length > 0 && !isDone;
            const prevDone = i === 0 || displayed[i - 1] === LINES[i - 1].text;
            const isCurrent = (isTyping) || (prevDone && !isDone && started && text.length === 0);

            if (!started) return null;
            if (text.length === 0 && !prevDone) return null;

            const textColor = line.color === "blue" ? BLUE : undefined;

            return (
              <p
                key={i}
                className="text-base sm:text-xl md:text-3xl lg:text-4xl leading-loose lg:leading-loose tracking-wide flex items-center flex-wrap justify-center"
                style={{ color: textColor, minHeight: "1.8em" }}
              >
                {text}
                {/* blinking cursor on the active line */}
                {isCurrent && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.53, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-px inline-block w-[2px] h-[0.85em] align-middle"
                    style={{ background: textColor ?? "currentColor" }}
                  />
                )}
                {/* pipe appears after blue lines finish */}
                {line.color === "blue" && isDone && (
                  <span className="ml-3 opacity-50">|</span>
                )}
              </p>
            );
          })}
        </div>

        {/* Chevron bottom */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: displayed[LINES.length - 1] === LINES[LINES.length - 1].text ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="#work" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="scroll-down">
            <motion.div
              animate={displayed[LINES.length - 1] === LINES[LINES.length - 1].text ? {
                opacity: [0.3, 1, 0.3],
                y: [0, 6, 0]
              } : {}}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* Work & Experience — full-bleed card grid */}
      <section id="work" className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: '80vh' }}>

          {/* ── CalmCash card ── */}
          <button
            onClick={() => navigate("/calmcash")}
            className="group relative overflow-hidden flex flex-col justify-end text-left w-full focus:outline-none"
            style={{ minHeight: '70vh' }}
            data-testid="card-calmcash"
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-zinc-900 transition-colors duration-500">
              <img
                src="/calmcash-thumbnail.png"
                alt="CalmCash Thumbnail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Overlay — lifts on hover */}
            <div className={`absolute inset-0 transition-all duration-500 ${isDark ? "bg-black/60 group-hover:bg-black/20" : "bg-white/80 group-hover:bg-black/45"}`} />
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              <p className={`text-sm sm:text-base uppercase tracking-widest mb-3 transition-colors duration-500 ${isDark ? "text-white/90" : "text-slate-800 group-hover:text-white/90"}`} style={{ fontFamily: 'var(--app-font-mono)' }}>
                ux case study // personal project
              </p>
              <h2 className={`font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight font-medium transition-colors duration-500 ${isDark ? "text-white" : "text-slate-900 group-hover:text-white"}`}>CalmCash</h2>
              <div className="text-2xl sm:text-3xl mb-4">💸 ✨</div>
              <p className={`text-base sm:text-lg md:text-xl max-w-md sm:max-w-lg md:max-w-xl leading-relaxed transition-colors duration-500 ${isDark ? "text-white/90" : "text-slate-700 group-hover:text-white/90"}`} style={{ fontFamily: 'var(--app-font-mono)' }}>
                fintech // built Calm AI to detect spending patterns and recommend smarter financial decisions.
              </p>
            </div>
          </button>

          {/* ── Faucek card ── */}
          <button
            onClick={() => navigate("/faucek")}
            className="group relative overflow-hidden flex flex-col justify-end text-left w-full focus:outline-none"
            style={{ minHeight: '70vh' }}
            data-testid="card-faucek"
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-zinc-900 transition-colors duration-500">
              <img
                src="/faucek-thumbnail.png"
                alt="Faucek Thumbnail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Overlay — lifts on hover */}
            <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? "bg-black/65 group-hover:bg-black/20" : "bg-white/80 group-hover:bg-black/45"}`} />
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              <p className={`text-sm sm:text-base uppercase tracking-widest mb-3 transition-colors duration-500 ${isDark ? "text-white/90" : "text-amber-950/90 group-hover:text-white/90"}`} style={{ fontFamily: 'var(--app-font-mono)' }}>
                graphic design // internship
              </p>
              <h2 className={`font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight font-medium transition-colors duration-500 ${isDark ? "text-white" : "text-amber-950 group-hover:text-white"}`}>Faucek</h2>
              <div className="text-2xl sm:text-3xl mb-4">🎨 ✦</div>
              <p className={`text-base sm:text-lg md:text-xl max-w-md sm:max-w-lg md:max-w-xl leading-relaxed transition-colors duration-500 ${isDark ? "text-white/90" : "text-amber-900 group-hover:text-white/90"}`} style={{ fontFamily: 'var(--app-font-mono)' }}>
                branding // visual experiences across social media, presentations and marketing campaigns.
              </p>
            </div>
          </button>

        </div>
      </section>

      {/* Footer / Contact */}
      <Footer />
    </div>
  );
}
