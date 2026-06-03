import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, MapPin, Download } from "lucide-react";
import { useEffect, useRef } from "react";
// @ts-ignore - The alias is provided by the environment
import resumePdf from "@assets/Saumya_Resume_1780509559658.pdf";

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

const RevealText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') as string);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 mix-blend-difference text-white flex justify-between items-center pointer-events-none">
        <div className="font-serif text-xl tracking-tight pointer-events-auto">SK.</div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase pointer-events-auto">
          <a href="#work" className="hover:opacity-70 transition-opacity">Work</a>
          <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12">
        <div className="max-w-6xl mx-auto w-full">
          <RevealText text="Saumya" className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none tracking-tighter -ml-2" />
          <RevealText text="Kumari" delay={0.1} className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none tracking-tighter -ml-2 mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12 md:mt-24">
            <FadeIn delay={0.3} className="md:col-span-4 lg:col-span-3 text-muted-foreground flex flex-col gap-2">
              <span className="text-sm uppercase tracking-widest font-medium text-foreground">Role</span>
              <span>UI/UX Designer</span>
              <span>Design Enthusiast</span>
            </FadeIn>
            
            <FadeIn delay={0.4} className="md:col-span-4 lg:col-span-3 text-muted-foreground flex flex-col gap-2">
              <span className="text-sm uppercase tracking-widest font-medium text-foreground">Location</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Patna, India</span>
            </FadeIn>

            <FadeIn delay={0.5} className="md:col-span-4 lg:col-span-6">
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-serif max-w-2xl text-foreground">
                Creative and detail-oriented designer blurring the line between structured systems and beautiful, scalable digital experiences.
              </p>
              <div className="mt-8 flex gap-6">
                <a href={resumePdf} download="Saumya_Kumari_Resume.pdf" className="inline-flex items-center gap-2 border-b border-foreground pb-1 hover:opacity-70 transition-opacity uppercase text-sm tracking-widest font-medium" data-testid="link-resume">
                  <Download className="w-4 h-4" /> Resume
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-foreground text-background">
        <div className="max-w-6xl mx-auto w-full">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl mb-16 md:mb-24">Selected Work</h2>
          </FadeIn>

          <div className="space-y-32">
            {/* Project 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <FadeIn className="lg:col-span-7">
                <div className="aspect-[4/3] bg-muted/20 overflow-hidden group">
                  <img 
                    src="/calmcash-project.png" 
                    alt="CalmCash Fintech App Wireframes" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="lg:col-span-5 flex flex-col items-start">
                <span className="text-sm uppercase tracking-widest opacity-60 mb-4">UX Case Study</span>
                <h3 className="font-serif text-3xl md:text-4xl mb-6">CalmCash</h3>
                <p className="opacity-80 leading-relaxed mb-8">
                  A fintech mobile app focused on simplifying personal expense tracking and money management. Developed user-centric solutions through deep user research to solve complex financial navigation.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 border border-background/20 rounded-full text-xs">User Research</span>
                  <span className="px-3 py-1 border border-background/20 rounded-full text-xs">Wireframing</span>
                  <span className="px-3 py-1 border border-background/20 rounded-full text-xs">Prototyping</span>
                  <span className="px-3 py-1 border border-background/20 rounded-full text-xs">Figma</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Experience */}
          <div>
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-5xl mb-12 border-b border-border pb-8">Experience</h2>
            </FadeIn>
            
            <div className="space-y-16">
              <FadeIn delay={0.1}>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="text-xl md:text-2xl font-serif">Graphic Design Intern</h3>
                  <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2 md:mt-0">May '25 – Feb '26</span>
                </div>
                <div className="text-lg mb-4 text-foreground/80">Faucek &mdash; Remote, Jaipur</div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Designed creative content for 20+ brands. Created social media and digital branding systems, developed marketing creatives, and collaborated directly with clients managing multiple design projects simultaneously.
                </p>
                <div className="text-sm text-muted-foreground">
                  <span className="text-foreground uppercase tracking-widest text-xs font-medium mr-2">Tools:</span> 
                  Adobe Photoshop, Canva Pro, Manus, Gamma
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Education */}
          <div>
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
