import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
// @ts-ignore

import Footer from "../components/Footer";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Faucek() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.8;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col selection:bg-foreground selection:text-background">
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

        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 text-sm md:text-lg lg:text-xl" style={{ fontFamily: "var(--app-font-mono)" }}>
          <button onClick={toggleDark} className="flex items-center gap-1.5 select-none transition-opacity hover:opacity-100 opacity-70" aria-label="Toggle dark mode">
            <span className="text-xs">{isDark ? "☽" : "☀"}</span>
            <div className="w-8 h-4 md:w-10 md:h-5 rounded-full border border-muted-foreground flex items-center px-0.5 transition-all" style={{ justifyContent: isDark ? "flex-start" : "flex-end" }}>
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-foreground transition-all" />
            </div>
          </button>
          <button onClick={() => navigate("/")} className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">work</button>
          <button onClick={() => navigate("/about")} className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">about</button>
          <a href="https://drive.google.com/file/d/1cVDzfd44xkL8TPUypRggdEhUfxoRmRRr/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">resume</a>
        </div>
      </nav>

      {/* Main page wrapper */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 sm:pt-40 pb-24 flex flex-col gap-12">
        
        {/* Back Link */}
        <FadeIn delay={0.05}>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-white/60 dark:hover:text-white transition-colors uppercase tracking-widest font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> back to projects
          </button>
        </FadeIn>

        {/* Title Block */}
        <FadeIn delay={0.1}>
          <h1 className="font-mono text-6xl sm:text-7xl md:text-8xl font-normal tracking-tight text-zinc-900 dark:text-white">
            Faucek
          </h1>
        </FadeIn>

        {/* Metadata columns */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-y border-border/40">
            <div>
              <p className="text-base text-zinc-500 dark:text-white uppercase tracking-widest mb-1.5 font-mono">service :</p>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-900 dark:text-white font-mono">design systems</p>
            </div>
            <div>
              <p className="text-base text-zinc-500 dark:text-white uppercase tracking-widest mb-1.5 font-mono">timeline :</p>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-900 dark:text-white font-mono">May 2025 – Feb 2026</p>
            </div>
            <div>
              <p className="text-base text-zinc-500 dark:text-white uppercase tracking-widest mb-1.5 font-mono">role :</p>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-900 dark:text-white font-mono">design lead intern</p>
            </div>
          </div>
        </FadeIn>

        {/* Intro copy */}
        <FadeIn delay={0.2} className="flex flex-col gap-5 mt-4 font-mono">
          <p className="text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white">
            I joined as a design lead intern and became the sole designer responsible for building and maintaining the visual communication system across marketing, sales, client delivery and e-commerce.
          </p>
        </FadeIn>

        {/* Hero Mockup Image */}
        <FadeIn delay={0.25} className="w-full flex justify-center py-8 bg-zinc-100/60 dark:bg-white/5 border border-border/40 rounded-sm relative overflow-hidden">
          <img
            src="/faucek_hero_mockup.png"
            alt="Faucek Website Screens Collage"
            className="w-full h-auto object-contain transition-transform hover:scale-[1.01] duration-500"
          />
        </FadeIn>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Problem Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Problem
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              When I joined Faucek (Marketing agency/startup), the design functioning of the company was okay but not that good, it lacked ownership and consistency.
            </p>
            <p>
              As the only designer in the company, I had to support multiple departments simultaneously while ensuring quality, speed and brand consistency across all client and company deliverables.
            </p>
            <p className="text-2xl tracking-widest text-center my-4 text-zinc-500 dark:text-white/40">• • •</p>
            <p className="text-base sm:text-xl leading-relaxed text-zinc-900 dark:text-white/90 italic">
              How might we build a cohesive visual ecosystem across its services, marketing, sales and client communications?
            </p>
          </div>
        </FadeIn>

        {/* Challenges Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Challenges
            </h2>
          </div>
          <div className="md:col-span-2 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <ul className="flex flex-col gap-3 list-disc list-inside">
              <li>Multiple clients across different industries</li>
              <li>Constant design requests</li>
              <li>No established design system</li>
              <li>Tight marketing deadlines</li>
              <li>Need for direct client communication</li>
              <li>Balancing company branding with client requirements</li>
            </ul>
          </div>
        </FadeIn>

        {/* Design Audit Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Design<br />Audit
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              When I joined Faucek, the company had already established its presence as a marketing agency and was actively serving clients across multiple domains.
            </p>
            <p>
              However, as the business expanded its offerings, there was an opportunity to create greater consistency and cohesion across its visual communication.
            </p>
          </div>
        </FadeIn>

        {/* Key Findings Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Key<br />Findings
            </h2>
          </div>
          <div className="md:col-span-2 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <ul className="flex flex-col gap-3 list-disc list-inside">
              <li>Different design assets followed different visual styles.</li>
              <li>Service portfolios needed a more structured and polished presentation.</li>
              <li>Marketing and sales materials could be more consistent.</li>
              <li>Brand communication varied across platforms and deliverables.</li>
              <li>A dedicated design ownership was needed to streamline design decisions.</li>
            </ul>
          </div>
        </FadeIn>

        {/* Opportunity Areas Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Opportunity<br />Areas
            </h2>
          </div>
          <div className="md:col-span-2 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <ul className="flex flex-col gap-3 list-disc list-inside">
              <li>Establish a cohesive visual identity across all touchpoints.</li>
              <li>Standardize design patterns for marketing and sales materials.</li>
              <li>Improve the presentation of service offerings through structured portfolios.</li>
              <li>Enhance brand perception through high-quality design execution.</li>
              <li>Create a scalable design workflow capable of supporting both company and client requirements.</li>
            </ul>
          </div>
        </FadeIn>

        {/* Approach Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Approach
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              To create a more cohesive and scalable design ecosystem, I focused on establishing consistency across all the visual communication while supporting the growing needs of both the company and its clients.
            </p>
            <p>
              Every asset, from company profiles and portfolios to social media creatives and e-commerce designs was created to contribute to a unified visual ecosystem that could support company's diverse services and client engagements.
            </p>
          </div>
        </FadeIn>

        {/* Solution Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Solution
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              These designs were created to address a wide range of business and client requirements while maintaining consistency across company's visual ecosystem.
            </p>
          </div>
        </FadeIn>

        {/* ═══════════════════════════════════════════════════ */}
        {/* FAUCEK Logo */}
        <FadeIn delay={0.15} className="w-full flex justify-center py-12 mt-4">
          <img
            src="/faucek_logo_banner.jpg"
            alt="FAUCEK Logo"
            className="w-full max-w-2xl h-auto object-contain"
          />
        </FadeIn>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Company Profile Section */}
        <FadeIn delay={0.1} className="pt-16 border-t border-border/40 mt-8">
          <h2 className="font-mono text-3xl sm:text-4xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white mb-10">
            Company Profile
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} className="w-full overflow-hidden rounded-sm bg-zinc-100/60 dark:bg-white/5 border border-border/40">
          <img
            src="/faucek_company_profile.png"
            alt="Company Profile Sheets Collage"
            className="w-full h-auto object-contain transition-transform hover:scale-[1.01] duration-500"
          />
        </FadeIn>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Social Media Section */}
        <FadeIn delay={0.1} className="pt-16 border-t border-border/40 mt-8">
          <h2 className="font-mono text-3xl sm:text-4xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white mb-10">
            Social Media
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} className="w-full overflow-hidden rounded-sm bg-zinc-100/60 dark:bg-white/5 border border-border/40">
          <img
            src="/faucek_social_media.png"
            alt="Social Media Creatives Grid"
            className="w-full h-auto object-contain transition-transform hover:scale-[1.01] duration-500"
          />
        </FadeIn>

        {/* ═══════════════════════════════════════════════════ */}
        {/* HerbsTONIC Section */}
        <FadeIn delay={0.1} className="pt-16 border-t border-border/40 mt-8 flex flex-col items-center">
          <img
            src="/faucek_herbstonic_logo.png"
            alt="HerbsTONIC Logo"
            className="w-36 h-36 md:w-56 md:h-56 object-contain mb-10"
          />
        </FadeIn>

        <FadeIn delay={0.1} className="pt-16 border-t border-border/40 mt-8">
          <h2 className="font-mono text-3xl sm:text-4xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white mb-10">
            Website Banners
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} className="w-full overflow-hidden rounded-sm bg-zinc-100/60 dark:bg-white/5 border border-border/40">
          <img
            src="/faucek_herbstonic_banners.png"
            alt="HerbsTONIC Website Banners"
            className="w-full h-auto object-contain transition-transform hover:scale-[1.01] duration-500"
          />
        </FadeIn>

        <FadeIn delay={0.1} className="pt-16 border-t border-border/40 mt-8">
          <h2 className="font-mono text-3xl sm:text-4xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white mb-10">
            E-commerce Designs
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} className="w-full overflow-hidden rounded-sm bg-zinc-100/60 dark:bg-white/5 border border-border/40">
          <img
            src="/faucek_herbstonic_creatives.png"
            alt="HerbsTONIC E-commerce Creatives"
            className="w-full h-auto object-contain transition-transform hover:scale-[1.01] duration-500"
          />
        </FadeIn>

        {/* ═══════════════════════════════════════════════════ */}
        {/* powdera Section */}
        <FadeIn delay={0.1} className="pt-16 border-t border-border/40 mt-8 flex flex-col items-center">
          <img
            src="/faucek_powdera_logo.png"
            alt="powdera Logo"
            className="w-32 md:w-40 h-auto object-contain mb-10"
          />
        </FadeIn>

        <FadeIn delay={0.1} className="pt-16 border-t border-border/40 mt-8">
          <h2 className="font-mono text-3xl sm:text-4xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white mb-10">
            E-commerce Designs
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} className="w-full overflow-hidden rounded-sm bg-zinc-100/60 dark:bg-white/5 border border-border/40">
          <img
            src="/faucek_powdera_creatives.png"
            alt="powdera E-commerce Creatives"
            className="w-full h-auto object-contain transition-transform hover:scale-[1.01] duration-500"
          />
        </FadeIn>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Others Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Others
            </h2>
          </div>
          <div className="md:col-span-2 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <ul className="flex flex-col gap-6 list-none pl-0">
              <li>
                <span className="text-zinc-950 dark:text-white font-bold">Clients:</span> Worked for multiple other clients from this company to help establish their presence in the market.
              </li>
              <li>
                <span className="text-zinc-950 dark:text-white font-bold">Stationery:</span> Designed letterheads, envelopes and business cards matching brand identity.
              </li>
              <li>
                <span className="text-zinc-950 dark:text-white font-bold">Design system for internal team:</span> Created a structured set of guidelines, components and assets for internal members.
              </li>
              <li>
                <span className="text-zinc-950 dark:text-white font-bold">Brand guideline booklet:</span> Designed comprehensive brand books detailing logo usage, color palettes and typography for different clients of the company.
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Impact Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Impact
            </h2>
          </div>
          <div className="md:col-span-2 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              Designed 80+ creatives (including company profiles, social media creatives, website banners, stationery and e-commerce posts) within tight deadlines while maintaining premium visual aesthetics. The visual identity systems established for clients like HerbsTONIC and Powdera helped in elevating their overall brand perception.
            </p>
          </div>
        </FadeIn>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Learnings Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Learnings
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-10 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                Taking ownership of your work
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                One of the biggest lessons I learned was to take complete ownership of my work. When you're responsible for the outcome, you naturally become more dedicated, proactive and invested in delivering your best.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                Never stop exploring ideas
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                Great ideas often come from places no one expects. I learned to constantly push my creative thinking, explore different directions, and look beyond the first solution that comes to mind.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                Understanding brand requirements
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                Every design should feel like it belongs to the company. I learned how important it is to maintain consistency so that people can instantly recognize and connect a design with Faucek.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                Design should solve problems
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                A design can look beautiful, but if it doesn't solve a problem, it misses the point. I learned to focus on creating designs that communicate clearly and serve a purpose.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                Listening before designing
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                Working with clients taught me that good design starts with understanding people. Learning to listen, understand requirements, and challenge my own assumptions helped me create stronger solutions.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                Building your LinkedIn early matters a lot
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                One thing Yash sir (CEO @ Faucek) made me realized early on is that building your LinkedIn and professional presence can open unexpected opportunities. The earlier you start, the more valuable it becomes over time.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Moments Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Moments
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-12 font-mono">
            <p className="text-base sm:text-xl text-zinc-700 dark:text-white/80">
              Just sharing some precious moments.
            </p>
            
            {/* CEO block */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-12">
                <div className="max-w-[240px] w-full bg-zinc-100/60 dark:bg-white/5 border border-border/40 rounded-sm p-2 flex justify-center items-center">
                  <img
                    src="/faucek_video_vertical.jpeg"
                    alt="Orientation meeting"
                    className="w-full h-auto object-contain rounded-sm"
                  />
                </div>
                <div className="flex items-center">
                  <p className="text-xl sm:text-2xl text-zinc-900 dark:text-white font-bold text-center sm:text-left">
                    The Best CEO..
                  </p>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-zinc-700 dark:text-white/80">
                Orientation meeting..(intro time)
              </p>
            </div>

            {/* Chill evening block */}
            <div className="flex flex-col gap-4">
              <div className="bg-zinc-100/60 dark:bg-white/5 border border-border/40 rounded-sm p-3 flex justify-center">
                <img
                  src="/faucek_video_horizontal1.jpeg"
                  alt="Chill evening with the team"
                  className="w-full h-auto object-contain rounded-sm"
                />
              </div>
              <p className="text-lg sm:text-xl text-zinc-700 dark:text-white/80">
                Chill evening with the team..
              </p>
            </div>

            {/* Receiving love block */}
            <div className="flex flex-col gap-4">
              <div className="bg-zinc-100/60 dark:bg-white/5 border border-border/40 rounded-sm p-3 flex justify-center">
                <img
                  src="/faucek_video_horizontal2.jpeg"
                  alt="Faucek Team Meeting"
                  className="w-full h-auto object-contain rounded-sm"
                />
              </div>
              <p className="text-lg sm:text-xl text-zinc-700 dark:text-white/80">
                Receiving love & guidance from the best team..
              </p>
            </div>
          </div>
        </FadeIn>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
