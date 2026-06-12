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
          <div className="w-11 h-11 md:w-16 md:h-16 lg:w-18 lg:h-18 border-[1.5px] border-current rounded-full flex items-center justify-center overflow-hidden opacity-90">
            <img
              src={isDark ? "/logo.png" : "/logo-light.png"}
              alt="SK Logo"
              className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14"
              style={{ objectFit: 'contain' }}
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
          <a href="https://drive.google.com/file/d/1cVDzfd44xkL8TPUypRggdEhUfxoRmRRr/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors" data-testid="nav-resume">resume</a>
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
            <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
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
            {/* Background pattern */}
            <div className="absolute inset-0" style={{ background: 'hsl(225 78% 14%)' }}>
              <svg viewBox="0 0 800 700" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <rect width="800" height="700" fill="hsl(225 78% 14%)" />
                {/* phone frame centre */}
                <rect x="240" y="60" width="320" height="520" rx="32" fill="hsl(222 30% 9%)" stroke="hsl(225 78% 50%)" strokeWidth="2" opacity="0.9" />
                <rect x="255" y="90" width="290" height="470" rx="18" fill="hsl(222 30% 12%)" />
                <rect x="270" y="102" width="260" height="20" rx="4" fill="hsl(222 20% 16%)" />
                <rect x="268" y="136" width="264" height="100" rx="12" fill="hsl(225 78% 40%)" />
                <rect x="283" y="152" width="80" height="8" rx="4" fill="hsl(220 15% 95% / 0.5)" />
                <rect x="283" y="170" width="140" height="16" rx="4" fill="hsl(220 15% 95% / 0.9)" />
                <rect x="268" y="252" width="264" height="48" rx="8" fill="hsl(222 22% 18%)" />
                <circle cx="294" cy="276" r="14" fill="hsl(225 78% 35%)" />
                <rect x="316" y="266" width="100" height="8" rx="4" fill="hsl(220 15% 85%)" />
                <rect x="460" y="268" width="56" height="10" rx="4" fill="hsl(225 78% 65%)" />
                <rect x="268" y="308" width="264" height="48" rx="8" fill="hsl(222 22% 18%)" />
                <circle cx="294" cy="332" r="14" fill="hsl(225 78% 28%)" />
                <rect x="316" y="322" width="80" height="8" rx="4" fill="hsl(220 15% 85%)" />
                <rect x="460" y="324" width="56" height="10" rx="4" fill="hsl(0 70% 65%)" />
                <rect x="268" y="364" width="264" height="48" rx="8" fill="hsl(222 22% 18%)" />
                <circle cx="294" cy="388" r="14" fill="hsl(225 78% 35%)" />
                <rect x="316" y="378" width="120" height="8" rx="4" fill="hsl(220 15% 85%)" />
                <rect x="460" y="380" width="56" height="10" rx="4" fill="hsl(225 78% 65%)" />
                <rect x="268" y="430" width="264" height="52" rx="10" fill="hsl(222 22% 16%)" />
                <circle cx="310" cy="456" r="8" fill="hsl(225 78% 58%)" />
                <circle cx="360" cy="456" r="8" fill="hsl(222 22% 28%)" />
                <circle cx="410" cy="456" r="8" fill="hsl(222 22% 28%)" />
                <circle cx="460" cy="456" r="8" fill="hsl(222 22% 28%)" />
                {/* decorative glows */}
                <circle cx="90" cy="90" r="50" fill="hsl(225 78% 50% / 0.07)" />
                <circle cx="710" cy="580" r="70" fill="hsl(225 78% 50% / 0.07)" />
                <circle cx="700" cy="110" r="25" fill="hsl(225 78% 50% / 0.1)" />
              </svg>
            </div>
            {/* Dark overlay — lifts on hover */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-500" />
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              <p className="text-sm sm:text-base uppercase tracking-widest text-white/90 mb-3" style={{ fontFamily: 'var(--app-font-mono)' }}>
                ux case study // personal project
              </p>
              <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 leading-tight font-medium">CalmCash</h2>
              <div className="text-2xl sm:text-3xl mb-4">💸 ✨</div>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-md sm:max-w-lg md:max-w-xl leading-relaxed" style={{ fontFamily: 'var(--app-font-mono)' }}>
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
            {/* Background geometric pattern */}
            <div className="absolute inset-0" style={{ background: 'hsl(28 60% 18%)' }}>
              <svg viewBox="0 0 800 700" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <rect width="800" height="700" fill="hsl(28 60% 18%)" />
                {/* scattered geometric shapes */}
                <polygon points="80,60 120,130 40,130" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.5" />
                <rect x="200" y="50" width="50" height="50" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
                <circle cx="380" cy="90" r="28" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
                <polygon points="520,40 560,110 480,110" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.5" />
                <rect x="640" y="55" width="45" height="45" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" transform="rotate(20,662,77)" />
                <path d="M720,160 Q760,140 740,180 Q720,200 700,180 Q700,160 720,160" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
                <polygon points="50,240 90,310 10,310" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
                <circle cx="170" cy="280" r="22" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.35" />
                <path d="M280,250 L280,320 M245,285 L315,285" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.35" />
                <rect x="380" y="240" width="55" height="55" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
                <polygon points="520,220 565,295 475,295" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.5" />
                <path d="M630,260 Q670,230 680,270 Q690,310 650,310 Q610,310 630,260" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
                <path d="M730,240 Q760,270 730,300 Q700,270 730,240" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
                <circle cx="90" cy="430" r="30" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.35" />
                <polygon points="200,390 240,460 160,460" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.45" />
                <rect x="320" y="400" width="48" height="48" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" transform="rotate(15,344,424)" />
                <path d="M480,420 Q520,395 510,435 Q500,475 470,455 Q450,435 480,420" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
                <path d="M600,400 L630,440 L570,440 Z" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.45" />
                <path d="M50,560 Q90,530 100,570 Q110,610 70,600 Q30,590 50,560" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
                <rect x="170" y="550" width="42" height="42" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.35" />
                <polygon points="310,540 350,610 270,610" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
                <circle cx="450" cy="580" r="26" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.35" />
                <path d="M560,550 L560,620 M525,585 L595,585" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.35" />
                <rect x="650" y="545" width="50" height="50" fill="none" stroke="hsl(28 80% 70%)" strokeWidth="2.5" opacity="0.4" />
              </svg>
            </div>
            {/* Dark overlay — lifts on hover */}
            <div className="absolute inset-0 bg-black/65 group-hover:bg-black/20 transition-all duration-500" />
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              <p className="text-sm sm:text-base uppercase tracking-widest text-white/90 mb-3" style={{ fontFamily: 'var(--app-font-mono)' }}>
                graphic design // internship
              </p>
              <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 leading-tight font-medium">Faucek</h2>
              <div className="text-2xl sm:text-3xl mb-4">🎨 ✦</div>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-md sm:max-w-lg md:max-w-xl leading-relaxed" style={{ fontFamily: 'var(--app-font-mono)' }}>
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
