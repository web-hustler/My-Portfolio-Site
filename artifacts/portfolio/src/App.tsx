import { motion, animate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, Download, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// @ts-ignore - The alias is provided by the environment
import resumePdf from "@assets/Saumya_Resume_1780509559658.pdf";

function CustomCursor({ scrollPct }: { scrollPct: number }) {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 140, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 20, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transform: "translate(4px, 4px)",
      }}
    >
      <span style={{ fontSize: 38, lineHeight: 1, userSelect: "none" }}>👾</span>
      <span
        style={{
          fontFamily: "var(--app-font-mono)",
          fontSize: 16,
          color: "#ffffff",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {scrollPct}%
      </span>
    </motion.div>
  );
}

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
  { text: "graphic design intern, faucek", color: "blue" as const },
  { text: "calmcash · ux case study",      color: "blue" as const },
];

const CHAR_SPEED = 38; // ms per character

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [isDark, setIsDark] = useState(true);
  // displayed[i] = the string shown so far for line i
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
  // Use refs for mutable loop state to avoid closure/strict-mode issues
  const lineIdxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll progress percentage
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
      setScrollPct(pct);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Kick off typewriter after a short delay (no loading counter needed)
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
        // more chars in this line
        timerRef.current = setTimeout(() => typeChar(lineIdx, nextChar), CHAR_SPEED);
      } else {
        // line done — move to next after a pause
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
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') as string);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-sans cursor-none">
      <CustomCursor scrollPct={scrollPct} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full px-8 md:px-12 py-6 z-50 flex justify-between items-center">
        {/* Logo */}
        <div className="pointer-events-auto" data-testid="logo">
          <img src="/logo.png" alt="Logo" width="64" height="64" style={{ objectFit: 'contain' }} />
        </div>

        {/* Right nav */}
        <div className="flex items-center gap-8 text-base pointer-events-auto" style={{ fontFamily: 'var(--app-font-mono)' }}>
          {/* Dark mode toggle */}
          <button
            onClick={() => setIsDark(d => !d)}
            className="flex items-center gap-1.5 select-none transition-opacity hover:opacity-100 opacity-70 cursor-none"
            aria-label="Toggle dark mode"
          >
            <span className="text-xs">{isDark ? "☽" : "☀"}</span>
            <div className="w-8 h-4 rounded-full border border-muted-foreground flex items-center px-0.5 transition-all" style={{ justifyContent: isDark ? "flex-start" : "flex-end" }}>
              <div className="w-3 h-3 rounded-full bg-foreground transition-all" />
            </div>
          </button>
          <a href="#work" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-work">work</a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-about">about</a>
          <a href={resumePdf} download="Saumya_Kumari_Resume.pdf" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-resume">resume</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">

        {/* Centered text block */}
        <div
          className="flex flex-col items-center text-center"
          style={{ fontFamily: 'var(--app-font-mono)' }}
        >
          {LINES.map((line, i) => {
            const text = displayed[i];
            const isDone = text === line.text;
            const isTyping = text.length > 0 && !isDone;
            // Show cursor on the actively-typing line, or on the next line waiting to start
            const prevDone = i === 0 || displayed[i - 1] === LINES[i - 1].text;
            const isCurrent = (isTyping) || (prevDone && !isDone && started && text.length === 0);

            // Don't render a line until the previous one is done
            if (!started) return null;
            if (text.length === 0 && !prevDone) return null;

            const textColor = line.color === "blue" ? BLUE : undefined;

            return (
              <p
                key={i}
                className="text-xl md:text-2xl lg:text-3xl leading-loose tracking-wide flex items-center"
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
          <a
            href="#"
            className="group relative overflow-hidden flex flex-col justify-end cursor-none"
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
              <p className="text-xs uppercase tracking-widest text-white/50 mb-3" style={{ fontFamily: 'var(--app-font-mono)' }}>
                ux case study // personal project
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-3 leading-tight">CalmCash</h2>
              <div className="text-xl mb-4">💸 ✨</div>
              <p className="text-sm text-white/60 max-w-sm leading-relaxed" style={{ fontFamily: 'var(--app-font-mono)' }}>
                fintech // built Calm AI to detect spending patterns and recommend smarter financial decisions.
              </p>
            </div>
          </a>

          {/* ── Faucek card ── */}
          <a
            href="#"
            className="group relative overflow-hidden flex flex-col justify-end cursor-none"
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
              <p className="text-xs uppercase tracking-widest text-white/50 mb-3" style={{ fontFamily: 'var(--app-font-mono)' }}>
                graphic design // internship
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-3 leading-tight">Faucek</h2>
              <div className="text-xl mb-4">🎨 ✦</div>
              <p className="text-sm text-white/60 max-w-sm leading-relaxed" style={{ fontFamily: 'var(--app-font-mono)' }}>
                branding // visual experiences across social media, presentations and marketing campaigns.
              </p>
            </div>
          </a>

        </div>
      </section>

      {/* Education */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto w-full">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl mb-12 border-b border-border pb-8">Education</h2>
          </FadeIn>
          <div className="space-y-12">
            <FadeIn delay={0.1}>
              <div className="flex flex-col mb-2">
                <h3 className="text-xl font-serif mb-1">BIT Mesra (Off Campus Patna)</h3>
                <div className="text-muted-foreground">B.Tech in Computer Science Engineering</div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="uppercase tracking-widest text-muted-foreground">2023 – Present</span>
                <span className="font-medium">CGPA: 8.4</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col mb-2">
                <h3 className="text-xl font-serif mb-1">St. Karen's High School</h3>
                <div className="text-muted-foreground">12th Grade, CBSE</div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="uppercase tracking-widest text-muted-foreground">2021 – 2022</span>
                <span className="font-medium">89.6%</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col mb-2">
                <h3 className="text-xl font-serif mb-1">St. Karen's High School</h3>
                <div className="text-muted-foreground">10th Grade, CBSE</div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="uppercase tracking-widest text-muted-foreground">2019 – 2020</span>
                <span className="font-medium">93.0%</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-muted/30">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          <FadeIn>
            <h3 className="text-sm uppercase tracking-widest font-medium mb-8">Design</h3>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li>UI/UX Design</li>
              <li>Wireframing & Prototyping</li>
              <li>Design Systems</li>
              <li>Responsive Design</li>
              <li>Visual Design & Branding</li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h3 className="text-sm uppercase tracking-widest font-medium mb-8">Tools</h3>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li>Figma & Framer</li>
              <li>Adobe Photoshop</li>
              <li>Canva Pro</li>
              <li>Blender 3D</li>
              <li>AI Tools (ChatGPT, Claude, Manus)</li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h3 className="text-sm uppercase tracking-widest font-medium mb-8">Soft Skills</h3>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li>Problem Solving</li>
              <li>Creative Thinking</li>
              <li>Adaptability</li>
              <li>Team Collaboration</li>
              <li>Time Management</li>
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest font-medium mb-8">Let's create together</p>
            <a 
              href="mailto:saumyakumari794@gmail.com" 
              className="font-serif text-3xl md:text-5xl lg:text-7xl hover:opacity-70 transition-opacity inline-flex items-center gap-4 group"
              data-testid="link-email"
            >
              Get in touch
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </a>
          </FadeIn>

          <FadeIn delay={0.2} className="w-full mt-32 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Saumya Kumari. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="mailto:saumyakumari794@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="social-email">
                <span className="sr-only">Email</span>
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="social-linkedin">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
