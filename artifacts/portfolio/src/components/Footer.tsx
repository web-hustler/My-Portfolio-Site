import React from "react";
import { motion } from "framer-motion";

const slideUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }
};

export default function Footer() {
  return (
    <footer className="w-full mt-auto pt-20 md:pt-32">
      <div className="w-full px-6 md:px-12 lg:px-24 pt-16 pb-24 md:pb-32 font-mono text-base md:text-lg text-zinc-800 dark:text-white">
        <div className="max-w-6xl mx-auto w-full">
          {/* Top section: right-aligned text with slide up animation */}
          <motion.div 
            {...slideUp}
            className="flex justify-end text-right mb-12 leading-relaxed text-zinc-800 dark:text-white"
          >
            <div>
              <p>keep getting better.</p>
              <p>always learning, always happy.</p>
              <p className="mt-1">
                vibe coded with <span className="hover:scale-110 inline-block transition-transform duration-300">🤍</span>
              </p>
            </div>
          </motion.div>

          {/* Bottom section: Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-8 border-t border-border">
            {/* Left Side with slide up animation */}
            <motion.div 
              {...slideUp}
              transition={{ ...slideUp.transition, delay: 0.1 }}
              className="flex flex-col justify-between leading-relaxed text-zinc-800 dark:text-white"
            >
              <div>
                <p>let's talk design,</p>
                <p>ideas, food,</p>
                <p>or the next big thing.</p>
              </div>
              <div className="mt-6">
                <a 
                  href="mailto:saumyakumari794@gmail.com" 
                  className="text-zinc-800 dark:text-white hover:opacity-80 underline underline-offset-4 transition-all duration-300 font-semibold w-fit"
                >
                  saumyakumari794@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Right Side with slide up animation */}
            <motion.div 
              {...slideUp}
              transition={{ ...slideUp.transition, delay: 0.2 }}
              className="flex flex-col justify-between md:items-end md:text-right leading-relaxed text-zinc-800 dark:text-white"
            >
              <div>
                <p>find me</p>
                <p>let's connect</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:justify-end mt-6">
                <a 
                  href="https://www.linkedin.com/in/saumya-kumari-bb98351b9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 hover:opacity-80 transition-colors duration-300 group text-zinc-800 dark:text-white"
                >
                  <span className="text-sky-400 group-hover:animate-pulse">●</span> linkedin
                </a>
                <a 
                  href="https://www.instagram.com/_saumya794_?igsh=ZGlpMHhlZWluYjJ2" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 hover:opacity-80 transition-colors duration-300 group text-zinc-800 dark:text-white"
                >
                  <span className="text-pink-500 group-hover:animate-pulse">●</span> instagram
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
