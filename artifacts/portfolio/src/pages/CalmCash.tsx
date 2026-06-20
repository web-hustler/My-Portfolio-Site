import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
// @ts-ignore

import Footer from "../components/Footer";

const BLUE = "hsl(225 78% 65%)";

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

export default function CalmCash() {
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
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col selection:bg-foreground selection:text-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full px-4 sm:px-8 md:px-12 py-4 md:py-6 z-50 flex justify-between items-center bg-background/70 backdrop-blur-md border-b border-border/40">
        <button
          className="pointer-events-auto focus:outline-none"
          aria-label="Go to home"
          onClick={() => navigate("/")}
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

        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 text-sm md:text-lg lg:text-xl" style={{ fontFamily: "var(--app-font-mono)" }}>
          <button onClick={toggleDark} className="flex items-center gap-1.5 select-none transition-opacity hover:opacity-100 opacity-70" aria-label="Toggle dark mode">
            <span className="text-xs">{isDark ? "☽" : "☀"}</span>
            <div className="w-8 h-4 md:w-10 md:h-5 rounded-full border border-muted-foreground flex items-center px-0.5 transition-all" style={{ justifyContent: isDark ? "flex-start" : "flex-end" }}>
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-foreground transition-all" />
            </div>
          </button>
          <button onClick={() => navigate("/")} className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">work</button>
          <button onClick={() => navigate("/about")} className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">about</button>
          <a href="https://drive.google.com/file/d/1WhE-EuyVZhdLJGV8PQZkGZ5_tCaRmc5d/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">resume</a>
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
            CalmCash
          </h1>
        </FadeIn>

        {/* Metadata columns mimicking Figma layout */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-y border-border/40">
            <div>
              <p className="text-base text-zinc-500 dark:text-white uppercase tracking-widest mb-1.5 font-mono">service :</p>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-900 dark:text-white font-mono">mobile app design</p>
            </div>
            <div>
              <p className="text-base text-zinc-500 dark:text-white uppercase tracking-widest mb-1.5 font-mono">timeline :</p>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-900 dark:text-white font-mono">5-6 weeks (May - June 2026)</p>
            </div>
            <div>
              <p className="text-base text-zinc-500 dark:text-white uppercase tracking-widest mb-1.5 font-mono">role :</p>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-900 dark:text-white font-mono">product designer (ui/ux)</p>
            </div>
          </div>
        </FadeIn>

        {/* Intro copy */}
        <FadeIn delay={0.2} className="flex flex-col gap-5 mt-4 font-mono">
          <p className="text-2xl sm:text-3xl text-zinc-900 dark:text-white">
            A calmer approach to personal finance.
          </p>
          <p className="text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white">
            Designed an AI-powered personal finance experience that automatically tracks expenses, identifies spending patterns and helps users make better financial decisions.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button
              asChild
              variant="outline"
              className="group font-mono text-zinc-900 dark:text-white border-zinc-900/20 hover:border-zinc-900 dark:border-white/20 dark:hover:border-white transition-all duration-300 rounded-none bg-transparent hover:bg-zinc-900/5 dark:hover:bg-white/5 py-3 px-6 h-auto tracking-wider text-base"
            >
              <a
                href="https://app.notion.com/p/CalmCash-UX-Case-Study-3607704ef4e081dfa866d730ad565582?source=copy_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                View Notion Case Study
                <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </FadeIn>

        {/* Mockup image showcase with background removed and light mode layout backing */}
        <FadeIn delay={0.25} className="w-full flex justify-center py-8 bg-zinc-100/60 dark:bg-transparent border border-border/40 dark:border-none rounded-sm relative overflow-hidden">
          <img 
            src={isDark ? "/calmcash_mockup_dark.png" : "/calmcash_mockup_light.png"} 
            alt="CalmCash App Mockup Screens" 
            className="w-full h-auto object-contain transition-transform hover:scale-[1.01] duration-500"
          />
        </FadeIn>

        {/* Problem Section */}
        <FadeIn delay={0.3} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Problem
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              While exploring popular expense-tracking apps, I noticed a recurring pattern.
              The more features an app offered, the more overwhelming it became.
            </p>
            <p>
              Users are often expected to manually log expenses, navigate complex dashboards, and interpret financial data on their own.
            </p>
            <p>
              Over time, this creates friction and makes money management feel more complicated.
            </p>
            <p className="text-2xl tracking-widest text-center my-4 text-zinc-500 dark:text-white/40">• • •</p>
            <p className="text-base sm:text-xl leading-relaxed text-zinc-900 dark:text-white/90 italic">
              How might we design a financial companion that understands users' spending behavior and helps them track their money efficiently?
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
              By designing an app that helps users understand their spending behavior, discover saving opportunities and build better financial habits over time.
            </p>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-white/50 leading-relaxed">
              Please note the following solutions are the designs made by myself. The project was developed based on insights gathered through a small user survey, competitor analysis and personal observations of other finance applications.
            </p>
          </div>
        </FadeIn>

        {/* Solution Mockups — Alternating Layout */}
        {/* Mockup 1: Home Screen — image left, text right */}
        <FadeIn delay={0.15} className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mt-8">
          <div className="w-full md:w-[57%] flex justify-center">
            <img
              src="/calmcash_solution_home.png"
              alt="CalmCash Home Screen"
              className="w-full max-w-[360px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] h-auto object-contain rounded-2xl"
            />
          </div>
          <div className="w-full md:w-[43%] flex flex-col gap-2 font-mono">
            <p className="text-lg sm:text-2xl text-zinc-900 dark:text-white font-medium leading-snug">
              Quick overview of<br />financial health,
            </p>
            <p className="text-lg sm:text-2xl text-zinc-500 dark:text-white/60">
              Surfaces AI-powered<br />insights.
            </p>
          </div>
        </FadeIn>

        {/* Mockup 2: Activity — image right, text left */}
        <FadeIn delay={0.15} className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 mt-8">
          <div className="w-full md:w-[57%] flex justify-center">
            <img
              src="/calmcash_solution_activity.png"
              alt="CalmCash Activity Screen"
              className="w-full max-w-[360px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] h-auto object-contain rounded-2xl"
            />
          </div>
          <div className="w-full md:w-[43%] flex flex-col gap-2 font-mono text-left md:text-right">
            <p className="text-lg sm:text-2xl text-zinc-900 dark:text-white font-medium leading-snug">
              Automatically tracks<br />transactions via SMS,
            </p>
            <p className="text-lg sm:text-2xl text-zinc-500 dark:text-white/60">
              even allows manual activity<br />entry for flexibility.
            </p>
          </div>
        </FadeIn>

        {/* Mockup 3: Calm AI — image left, text right */}
        <FadeIn delay={0.15} className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mt-8">
          <div className="w-full md:w-[57%] flex justify-center">
            <img
              src="/calmcash_solution_calmai.png"
              alt="CalmCash Calm AI Chat"
              className="w-full max-w-[360px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] h-auto object-contain rounded-2xl"
            />
          </div>
          <div className="w-full md:w-[43%] flex flex-col gap-2 font-mono">
            <p className="text-lg sm:text-2xl text-zinc-900 dark:text-white font-medium leading-snug">
              Suggests practical<br />improvements,
            </p>
            <p className="text-lg sm:text-2xl text-zinc-500 dark:text-white/60">
              answers financial<br />questions instantly.
            </p>
          </div>
        </FadeIn>

        {/* Mockup 4: Goals — image right, text left */}
        <FadeIn delay={0.15} className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 mt-8">
          <div className="w-full md:w-[57%] flex justify-center">
            <img
              src="/calmcash_solution_goals.png"
              alt="CalmCash Goals Tracker"
              className="w-full max-w-[360px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] h-auto object-contain rounded-2xl"
            />
          </div>
          <div className="w-full md:w-[43%] flex flex-col gap-2 font-mono text-left md:text-right">
            <p className="text-lg sm:text-2xl text-zinc-900 dark:text-white font-medium leading-snug">
              Encourages consistent<br />saving habits,
            </p>
            <p className="text-lg sm:text-2xl text-zinc-500 dark:text-white/60">
              helps users stay<br />focused on long-term<br />priorities.
            </p>
          </div>
        </FadeIn>

        {/* Information Architecture Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Information Architecture
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              Mapping the information architecture helped establish clear relationships between features and user journeys.
            </p>
            <p>
              It ensured users could seamlessly navigate between tracking expenses, setting goals and receiving AI-driven financial insights while maintaining a simple and intuitive experience.
            </p>
          </div>
        </FadeIn>

        {/* IA Flowchart Image */}
        <FadeIn delay={0.15} className="w-full flex justify-center py-8 mt-4">
          <img
            src="/calmcash_ia_flowchart.png"
            alt="CalmCash Information Architecture Flowchart"
            className="w-full max-w-5xl h-auto object-contain rounded-sm"
          />
        </FadeIn>

        {/* Wireframes Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Wireframes
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              To quickly explore ideas, I began with low-fidelity wireframes to explore ideas and shape the user journey.
            </p>
            <p>
              The feedback and learnings from this stage helped refine the experience before designing the final prototype.
            </p>
          </div>
        </FadeIn>

        {/* Wireframes Grid Image */}
        <FadeIn delay={0.15} className="w-full flex justify-center py-8 mt-4 bg-zinc-100/60 dark:bg-white/5 border border-border/40 rounded-sm">
          <img
            src="/calmcash_wireframes.png"
            alt="CalmCash Wireframes Grid"
            className="w-full max-w-5xl h-auto object-contain rounded-sm"
          />
        </FadeIn>

        {/* Design System Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Design<br />System
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              To keep the experience consistent and easy to use, I created a simple design system for CalmCash.
            </p>
            <p>
              It served as the foundation for all screens, helping maintain visual consistency while making the design process faster and more scalable.
            </p>
          </div>
        </FadeIn>

        {/* Design System Board Image */}
        <FadeIn delay={0.15} className="w-full flex justify-center py-8 mt-4">
          <img
            src={isDark ? "/calmcash_design_system.png" : "/calmcash_design_system_light.png"}
            alt="CalmCash Design System"
            className="w-full max-w-5xl h-auto object-contain rounded-sm"
          />
        </FadeIn>

        {/* Design Decisions Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Design<br />Decisions
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-10 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                1. Introducing AI Insights:
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                Traditional budgeting requires users to manually set limits and track spending.
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-zinc-950 dark:text-white font-bold">Decision:</p>
                <p className="text-zinc-700 dark:text-white/80">
                  Integrated AI-powered insights that proactively identify spending patterns and provide recommendations.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-zinc-950 dark:text-white font-bold">Why:</p>
                <p className="text-zinc-700 dark:text-white/80">
                  Users often understand what they spent but struggle to understand why their money disappears each month.
                </p>
              </div>
              <p className="text-zinc-500 dark:text-white/60 italic">
                The AI layer transforms raw financial data into actionable guidance.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                2. Goal-Based Financial Planning:
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                Many financial apps focus heavily on transactions while neglecting long-term financial motivation.
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-zinc-950 dark:text-white font-bold">Decision:</p>
                <p className="text-zinc-700 dark:text-white/80">
                  Added dedicated goal-tracking modules for savings, investments, emergency funds, and personal goals.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-zinc-950 dark:text-white font-bold">Why:</p>
                <p className="text-zinc-700 dark:text-white/80">
                  Research suggests users are more likely to maintain financial discipline when saving toward specific outcomes rather than abstract numbers.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                3. Explainable AI Over Automated Decisions:
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                Fully automated financial decisions can create trust concerns.
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-zinc-950 dark:text-white font-bold">Decision:</p>
                <p className="text-zinc-700 dark:text-white/80">
                  AI provides recommendations and insights but leaves decision-making to the user.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-zinc-950 dark:text-white font-bold">Why:</p>
                <p className="text-zinc-700 dark:text-white/80">
                  Users wanted guidance and transparency while maintaining control over their finances.
                </p>
              </div>
              <p className="text-zinc-500 dark:text-white/60 italic">
                This balance helps build trust in AI-assisted financial management.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Technical Constraints Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Technical<br />Constraints
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-8 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                1. Mobile-First Experience
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                The solution must work effectively on small screens while maintaining readability of financial data.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                2. Limited Attention Span
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                Users typically spend less than 2-3 minutes per session reviewing finances, requiring concise and actionable information.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                3. Explainable Recommendations
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                AI suggestions must be understandable and transparent to maintain user trust.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                4. Recommendation Accuracy
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                Insights should provide value without overwhelming users with unnecessary alerts or predictions.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                5. Consistent Calm Experience
              </h3>
              <p className="text-zinc-700 dark:text-white/80">
                Every interaction should reinforce the brand promise: "Track Smart. Live Calm."
              </p>
              <p className="text-zinc-500 dark:text-white/60 italic mt-1">
                This meant avoiding cluttered dashboards, excessive charts and aggressive financial messaging.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Business Objectives Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Business<br />Objectives
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-8 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Primary Objectives:
              </h3>
              
              <div className="flex flex-col gap-2">
                <h4 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  1. Increase Financial Awareness
                </h4>
                <p className="text-zinc-700 dark:text-white/80">
                  Help users understand where their money is being spent through clear visual insights and spending summaries.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  2. Improve User Retention
                </h4>
                <p className="text-zinc-700 dark:text-white/80">
                  Create a daily-use financial companion that encourages users to return regularly and stay engaged with their finances.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  3. Encourage Goal-Based Saving
                </h4>
                <p className="text-zinc-700 dark:text-white/80">
                  Motivate users to save consistently by connecting financial habits to meaningful personal goals.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  4. Simplify Expense Management
                </h4>
                <p className="text-zinc-700 dark:text-white/80">
                  Reduce the effort required to track expenses through automation, categorization, and AI-powered recommendations.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  5. Build Trust in AI-Driven Finance
                </h4>
                <p className="text-zinc-700 dark:text-white/80">
                  Provide explainable and transparent AI insights that help users make informed financial decisions.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-8 border-t border-border/40 mt-4">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Success Metrics:
              </h3>
              <ul className="flex flex-col gap-3 list-disc list-inside text-zinc-700 dark:text-white/80">
                <li>Increased weekly active users</li>
                <li>Higher savings goal completion rate</li>
                <li>Reduced user drop-off during onboarding</li>
                <li>Increased frequency of expense tracking</li>
                <li>Higher engagement with AI insights and recommendations</li>
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Reflection Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Reflection
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              Designing CalmCash taught me that great financial products are not just about tracking numbers, they're about helping people feel more confident with their product.
            </p>
            <p>
              This was one of my first projects following the complete user-centered design process, which gave me valuable experience in moving from research and ideation to prototyping and testing.
            </p>
            <p>
              Throughout the project, I learned the importance of simplifying complex information, designing for trust and focusing on user needs rather than feature overload.
            </p>
            <p>
              Every design decision, from SMS-based tracking to AI-powered insights, was guided by the goal of making personal finance feel more approachable and less overwhelming.
            </p>
            <p>
              If I were to continue developing CalmCash, I would explore deeper user research, subscription detection, smarter goal recommendations and more personalized AI-driven financial guidance.
            </p>
            <p>
              Most importantly, this project reinforced my belief that good design isn't about adding more features, it's about creating experiences that genuinely help people.
            </p>
          </div>
        </FadeIn>

        {/* Future Section */}
        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/40 mt-8">
          <div className="md:col-span-1">
            <h2 className="font-mono text-4xl sm:text-5xl font-normal uppercase tracking-wider text-zinc-900 dark:text-white">
              Future
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6 text-base sm:text-xl leading-relaxed text-zinc-700 dark:text-white font-mono">
            <p>
              If I continue developing CalmCash, I would explore smarter AI-powered insights, subscription detection, personalized goal recommendations, spending forecasts and deeper financial guidance.
            </p>
            <p>
              I would also focus on improving personalization by adapting recommendations to individual spending habits, financial goals and lifestyle patterns.
            </p>
            <p>
              Additional features such as bill reminders, financial health scores and goal-based savings plans could further help users stay on track and make informed decisions.
            </p>
            <p>
              The goal would be to transform CalmCash from a tracking tool into a proactive financial companion that supports users throughout their financial journey while encouraging long-term financial confidence and healthier money habits.
            </p>
          </div>
        </FadeIn>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
