import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore

import Footer from "../components/Footer";

const SpaceInvaderIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="20"
    height="15"
    viewBox="0 0 11 8"
    fill="currentColor"
    className={`shrink-0 ${className}`}
  >
    {/* Row 0: ..1000001.. */}
    <rect x="2" y="0" width="1" height="1" />
    <rect x="8" y="0" width="1" height="1" />
    {/* Row 1: ...10001... */}
    <rect x="3" y="1" width="1" height="1" />
    <rect x="7" y="1" width="1" height="1" />
    {/* Row 2: ..1111111.. */}
    <rect x="2" y="2" width="7" height="1" />
    {/* Row 3: .110111011. */}
    <rect x="1" y="3" width="2" height="1" />
    <rect x="4" y="3" width="3" height="1" />
    <rect x="8" y="3" width="2" height="1" />
    {/* Row 4: 11111111111 */}
    <rect x="0" y="4" width="11" height="1" />
    {/* Row 5: 1.1111111.1 */}
    <rect x="0" y="5" width="1" height="1" />
    <rect x="2" y="5" width="7" height="1" />
    <rect x="10" y="5" width="1" height="1" />
    {/* Row 6: 1.1.....1.1 */}
    <rect x="0" y="6" width="1" height="1" />
    <rect x="2" y="6" width="1" height="1" />
    <rect x="8" y="6" width="1" height="1" />
    <rect x="10" y="6" width="1" height="1" />
    {/* Row 7: ...11.11... */}
    <rect x="3" y="7" width="2" height="1" />
    <rect x="6" y="7" width="2" height="1" />
  </svg>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const BrandLink = ({ href, children }: { href?: string; children: React.ReactNode }) => {
  const baseClasses = "relative inline-block font-semibold text-violet-400 dark:text-violet-300 transition-all duration-300";
  const hoverStyle = "after:absolute after:left-0 after:bottom-[-2px] after:h-[1.5px] after:w-0 after:bg-violet-400 dark:after:bg-violet-300 after:transition-all after:duration-300 hover:after:w-full hover:text-violet-300 dark:hover:text-violet-200 hover:drop-shadow-[0_0_6px_rgba(167,139,250,0.5)]";
  if (!href) {
    return <span className={`${baseClasses} cursor-default`}>{children}</span>;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${hoverStyle}`}
    >
      {children}
    </a>
  );
};

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
    <div className="min-h-screen bg-background text-foreground font-mono transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full px-4 sm:px-8 md:px-12 py-4 md:py-6 z-50 flex justify-between items-center bg-background/70 backdrop-blur-md border-b border-border/40">
        <button
          className="pointer-events-auto focus:outline-none"
          aria-label="Go to home"
          onClick={() => navigate("/")}
        >
          <div className="w-11 h-11 md:w-16 md:h-16 lg:w-18 lg:h-18 border-[1.5px] border-current rounded-full flex items-center justify-center overflow-hidden opacity-90">
            <img src={isDark ? "/logo.png" : "/logo-light.png"} alt="SK Logo" className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14" style={{ objectFit: "contain" }} />
          </div>
        </button>

        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 text-sm md:text-lg lg:text-xl">
          <button onClick={toggleDark} className="flex items-center gap-1.5 select-none transition-opacity hover:opacity-100 opacity-70" aria-label="Toggle dark mode">
            <span className="text-xs">{isDark ? "☽" : "☀"}</span>
            <div className="w-8 h-4 md:w-10 md:h-5 rounded-full border border-muted-foreground flex items-center px-0.5 transition-all" style={{ justifyContent: isDark ? "flex-start" : "flex-end" }}>
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-foreground transition-all" />
            </div>
          </button>
          <button onClick={() => navigate("/")} className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">work</button>
          <button onClick={() => navigate("/about")} className="text-foreground dark:text-white transition-colors">about</button>
          <a href="https://drive.google.com/file/d/1WhE-EuyVZhdLJGV8PQZkGZ5_tCaRmc5d/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">resume</a>
        </div>
      </nav>

      {/* Main content */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 pt-56 pb-8 text-sm md:text-base leading-relaxed">

        {/* 2-Column Grid for Photo and Biography */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          
          {/* Left Column: Photo */}
          <div className="md:col-span-4">
            <FadeIn delay={0.1}>
              <div className="w-full max-w-[300px] mx-auto md:mx-0 overflow-hidden">
                <img 
                  src="/profile_mirror.png" 
                  alt="Saumya Kumari mirror selfie" 
                  className="w-full h-auto object-contain block"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Main welcome & bio text */}
          <div className="md:col-span-8 flex flex-col gap-6 text-foreground/90 dark:text-white">
            <FadeIn delay={0.1}>
              <h1 className="font-bold text-base md:text-lg lg:text-xl text-foreground dark:text-white mb-4">
                Hey.. happy to see you here.
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p>
                I'm Saumya Kumari, I design, freelance, build and occasionally overthink things until they're good to-be perfect.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p>
                Final-year B.TECH CSE undergrad student at BIT, Mesra. I love creating scalable, accessible design systems to be used across products.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p>
                I enjoy turning ideas to experiences that makes people to say, <span className="italic">"that's really cool."</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p>
                Additionally, I've somehow managed to get lead roles in 3 different clubs/societies in my college.
              </p>
            </FadeIn>

            {/* Club Roles - styled as regular lines without border-left to match Figma */}
            <FadeIn delay={0.35}>
              <div className="my-2 flex flex-col gap-2 font-mono text-muted-foreground dark:text-white select-none">
                <p>Presenting you,</p>
                <p className="text-foreground dark:text-white font-semibold">President, Megapixels Club</p>
                <p className="text-foreground dark:text-white font-semibold">Vice President, Ignite Club</p>
                <p className="text-foreground dark:text-white font-semibold">Manager, Esports Club</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p>
                Experiences that taught me how to lead teams, organize chaos <br className="hidden md:inline" /> and get things done.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Middle Section: Space Invader text blocks */}
        <div className="mt-12 md:mt-16 flex flex-col gap-8">
          <FadeIn delay={0.15}>
            <div className="flex items-start gap-4">
              <span className="shrink-0 text-lg md:text-xl select-none mt-0.5">👾</span>
              <p className="text-foreground/90 dark:text-white">
                Currently, I'm seeking internships, freelance projects and opportunities to create and make an impact. Also, making pocket money by freelancing and obviously ready and needed to expand it more.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex items-start gap-4">
              <span className="shrink-0 text-lg md:text-xl select-none mt-0.5">👾</span>
              <p className="text-foreground/90 dark:text-white">
                I've previously designed for <BrandLink href="https://faucek.com/">Faucek</BrandLink> and designed social media content for <BrandLink href="https://hiprotech.org/">Hiprotech</BrandLink>, <BrandLink href="https://www.instagram.com/levelupglounge/?hl=en">Level Up</BrandLink> and branding content for <BrandLink href="https://oiciaindia.mystore.digital/">Oicia</BrandLink>, <BrandLink>Newvision Aesthetics</BrandLink>, <BrandLink>Powdera</BrandLink>, <BrandLink href="https://herbstonic.com/">Herbstonic</BrandLink>
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Bottom Section: What I'm currently up to */}
        <FadeIn delay={0.45}>
          <div className="mt-12 md:mt-16 pt-8 border-t border-border/20">
            <h2 className="font-bold text-muted-foreground dark:text-white mb-8 uppercase tracking-widest">
              WHAT I'M CURRENTLY UPTO:
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <span className="shrink-0 text-xl md:text-2xl select-none">🤞</span>
                <p className="text-foreground/90 dark:text-white text-base md:text-lg">
                  working on more case studies
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="shrink-0 text-xl md:text-2xl select-none">🤞</span>
                <p className="text-foreground/90 dark:text-white text-base md:text-lg">
                  seeking internships/FTE opportunities to explore UI/UX and also Bengaluru a bit..
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="shrink-0 text-xl md:text-2xl select-none">🤞</span>
                <p className="text-foreground/90 dark:text-white text-base md:text-lg">
                  love to capture emotions.. photography 📸 (hobby)
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="shrink-0 text-xl md:text-2xl select-none">🤞</span>
                <p className="text-foreground/90 dark:text-white text-base md:text-lg">
                  biryani or pizza.. can't choose (foodie)
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
