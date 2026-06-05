import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import resumePdf from "@assets/Saumya_Resume_1780509559658.pdf";
import { Download } from "lucide-react";

const BLUE = "hsl(225 78% 65%)";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
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
        {/* Logo — home button */}
        <button
          className="pointer-events-auto focus:outline-none"
          aria-label="Go to home"
          onClick={() => navigate("/")}
        >
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "1.5px solid currentColor",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            opacity: 0.9,
          }}>
            <img
              src={isDark ? "/logo.png" : "/logo-light.png"}
              alt="SK Logo"
              width="44"
              height="44"
              style={{ objectFit: "contain" }}
            />
          </div>
        </button>

        {/* Right nav */}
        <div className="flex items-center gap-8 text-base" style={{ fontFamily: "var(--app-font-mono)" }}>
          <button
            onClick={toggleDark}
            className="flex items-center gap-1.5 select-none transition-opacity hover:opacity-100 opacity-70"
            aria-label="Toggle dark mode"
          >
            <span className="text-xs">{isDark ? "☽" : "☀"}</span>
            <div className="w-8 h-4 rounded-full border border-muted-foreground flex items-center px-0.5 transition-all" style={{ justifyContent: isDark ? "flex-start" : "flex-end" }}>
              <div className="w-3 h-3 rounded-full bg-foreground transition-all" />
            </div>
          </button>
          <button onClick={() => navigate("/#work")} className="text-muted-foreground hover:text-foreground transition-colors">work</button>
          <button onClick={() => navigate("/about")} className="text-foreground transition-colors">about</button>
          <a href={resumePdf} download="Saumya_Kumari_Resume.pdf" className="text-muted-foreground hover:text-foreground transition-colors">resume</a>
        </div>
      </nav>

      {/* Page header — intro + photo placeholder */}
      <section className="pt-40 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <FadeIn>
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: BLUE, fontFamily: "var(--app-font-mono)" }}>about me</p>
            <h1 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">Hey.. happy to see you here.</h1>
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed" style={{ fontFamily: "var(--app-font-mono)" }}>
              <p>
                I'm <span className="text-foreground font-medium">Saumya Kumari</span>. I design, freelance, build and occasionally overthink things until they're good to-be perfect. Final-year B.TECH CSE undergrad student at BIT, Mesra.
              </p>
              <p>
                I love creating scalable, accessible design systems to be used across products. I enjoy turning ideas to experiences that makes people say, <span className="text-foreground italic">"that's really cool."</span>
              </p>
              <p>
                Additionally, I've somehow managed to get lead roles in 3 clubs/societies in my college.
              </p>
            </div>
          </FadeIn>

          {/* Photo placeholder */}
          <FadeIn delay={0.15}>
            <div
              className="w-full aspect-[3/4] max-w-sm mx-auto md:mx-0 rounded-sm border border-border flex items-center justify-center"
              style={{ background: "var(--muted)" }}
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--app-font-mono)" }}>photo coming soon</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest mb-8" style={{ color: BLUE, fontFamily: "var(--app-font-mono)" }}>presenting you</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { role: "President", org: "Megapixels" },
                { role: "Vice President", org: "Ignite" },
                { role: "Manager", org: "Esports" },
              ].map(({ role, org }, i) => (
                <div key={i} className="border border-border p-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2" style={{ fontFamily: "var(--app-font-mono)" }}>{role}</p>
                  <h3 className="font-serif text-2xl">{org}</h3>
                </div>
              ))}
            </div>
            <p className="mt-8 text-muted-foreground text-sm max-w-xl leading-relaxed" style={{ fontFamily: "var(--app-font-mono)" }}>
              Experiences that taught me how to lead teams, organize chaos and get things done.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Previously worked with */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: BLUE, fontFamily: "var(--app-font-mono)" }}>previously worked with</p>
            <div className="flex flex-wrap gap-4">
              {["Faucek", "Hiprotech", "Level Up", "Oicia", "Newvision Aesthetics", "Powdera", "Herbstonic"].map((client, i) => (
                <span
                  key={i}
                  className="border border-border px-4 py-2 text-sm text-muted-foreground"
                  style={{ fontFamily: "var(--app-font-mono)" }}
                >
                  {client}
                </span>
              ))}
            </div>
            <p className="mt-6 text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "var(--app-font-mono)" }}>
              Currently seeking internships, freelance projects and opportunities to create and make an impact.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Currently up to */}
      <section className="py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest mb-8" style={{ color: BLUE, fontFamily: "var(--app-font-mono)" }}>what i'm currently up to</p>
            <ul className="space-y-4">
              {[
                { emoji: "🔍", text: "Seeking internships/FTE opportunities to explore UI/UX and also Bengaluru a bit.." },
                { emoji: "📸", text: "Love to capture emotions.. photography (hobby)" },
                { emoji: "🍛", text: "Biryani or pizza (can't choose).. foodie" },
              ].map(({ emoji, text }, i) => (
                <li key={i} className="flex items-start gap-4 text-muted-foreground" style={{ fontFamily: "var(--app-font-mono)" }}>
                  <span className="text-xl mt-0.5">{emoji}</span>
                  <span className="text-base leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-muted/30">
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
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
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

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
        <FadeIn>
          <p className="text-sm uppercase tracking-widest font-medium mb-6" style={{ fontFamily: "var(--app-font-mono)" }}>get my resume</p>
          <a
            href={resumePdf}
            download="Saumya_Kumari_Resume.pdf"
            className="inline-flex items-center gap-3 border border-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
            style={{ fontFamily: "var(--app-font-mono)" }}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground" style={{ fontFamily: "var(--app-font-mono)" }}>
          <span>© {new Date().getFullYear()} Saumya Kumari. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
