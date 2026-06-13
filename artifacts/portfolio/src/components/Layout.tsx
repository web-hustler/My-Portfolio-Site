import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";

function CustomCursor({ displayPct }: { displayPct: number }) {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  
  const isMobile = useIsMobile();
  const EMOJI_SIZE = isMobile ? 32 : 52; 
  const TEXT_SIZE = isMobile ? 14 : 22;  

  // Springs configured with realistic weight/inertia (mass: 0.35) for a natural trailing swing
  const springX = useSpring(mouseX, { stiffness: 180, damping: 24, mass: 0.35 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 24, mass: 0.35 });

  // Compute text X coordinate: blends lag vector with resting offset to trail dynamically in 360 deg
  const textX = useTransform([springX, springY, mouseX, mouseY], ([sX, sY, mX, mY]) => {
    const isMobileSize = typeof window !== "undefined" && window.innerWidth < 768;
    const emojiSize = isMobileSize ? 32 : 52;
    const minDistance = emojiSize + (isMobileSize ? 20 : 36);
    const restX = minDistance;
    const restY = isMobileSize ? 8 : 14;

    const dx = (sX as number) - (mX as number);
    const dy = (sY as number) - (mY as number);
    
    // Scale the trailing vector weight to feel extra smooth and pronounced during movement
    const weight = 1.8;
    const vx = dx * weight + restX;
    const vy = dy * weight + restY;
    
    const len = Math.sqrt(vx * vx + vy * vy);
    if (len < 0.1) return (mX as number) + restX;
    
    return (mX as number) + (vx / len) * minDistance;
  });

  // Compute text Y coordinate
  const textY = useTransform([springX, springY, mouseX, mouseY], ([sX, sY, mX, mY]) => {
    const isMobileSize = typeof window !== "undefined" && window.innerWidth < 768;
    const emojiSize = isMobileSize ? 32 : 52;
    const minDistance = emojiSize + (isMobileSize ? 20 : 36);
    const restX = minDistance;
    const restY = isMobileSize ? 8 : 14;

    const dx = (sX as number) - (mX as number);
    const dy = (sY as number) - (mY as number);
    
    const weight = 1.8;
    const vx = dx * weight + restX;
    const vy = dy * weight + restY;
    
    const len = Math.sqrt(vx * vx + vy * vy);
    if (len < 0.1) return (mY as number) + restY;
    
    return (mY as number) + (vy / len) * minDistance;
  });

  const [hasHover, setHasHover] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setHasHover(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const touchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX.set(e.touches[0].clientX);
        // Offset Y upwards by 55px to keep it visible above the finger
        mouseY.set(e.touches[0].clientY - 55);
        setIsVisible(true);
      }
    };

    const handleTouchEnd = () => {
      setIsVisible(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchstart", touchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchstart", touchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleDown = () => setIsMouseDown(true);
    const handleUp = () => setIsMouseDown(false);
    
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchstart", handleDown, { passive: true });
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchstart", handleDown);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  useEffect(() => {
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], .cursor-pointer, [href]");
      setIsHoveringLink(!!interactive);
    };
    
    window.addEventListener("mouseover", checkHover);
    return () => window.removeEventListener("mouseover", checkHover);
  }, []);

  const isGlowing = isMouseDown || isHoveringLink;

  return (
    <>
      {/* 👾 Emoji: Tracks mouse instantly */}
      <motion.div
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        style={{
          x: mouseX,
          y: mouseY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <span style={{ fontSize: EMOJI_SIZE, lineHeight: 1, userSelect: "none" }}>👾</span>
          {isGlowing && (
            /* Open Mouth Overlay (Masks pixels to make mouth look larger/open) */
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "65%",
                width: "32%",
                height: "16%",
                backgroundColor: "var(--background, #030712)",
                transform: "translateX(-50%)",
                transformOrigin: "bottom",
              }}
            />
          )}
        </div>
      </motion.div>

      {/* % Percentage Text: Lags Snappily but Clamped to the Right */}
      <motion.div
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        style={{
          x: textX,
          y: textY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      >
        <span
          style={{
            fontFamily: "var(--app-font-mono)",
            fontSize: TEXT_SIZE,
            color: "#ffffff",
            userSelect: "none",
            whiteSpace: "nowrap",
            textShadow: "0 2px 4px rgba(0,0,0,0.85)",
            fontWeight: "bold"
          }}
        >
          {displayPct}%
        </span>
      </motion.div>
    </>
  );
}

function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      decay: number;
    }> = [];

    let isOverInteractive = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const addParticles = (x: number, y: number, count: number, speedMultiplier = 1) => {
      const isDark = document.documentElement.classList.contains("dark");
      const isMobileSize = typeof window !== "undefined" && window.innerWidth < 768;
      const offset = isMobileSize ? 16 : 26;
      for (let i = 0; i < count; i++) {
        // Spawn behind the emoji center
        const emojiCenterX = x + offset;
        const emojiCenterY = y + offset;
        
        let color = "";
        if (isDark) {
          color = Math.random() > 0.6 
            ? "#ffffff" // white star
            : Math.random() > 0.5 
              ? "#c084fc" // purple (to match the emoji)
              : "#67e8f9"; // cyan (active highlights)
        } else {
          // Light mode: use high-contrast vibrant colors (dark gray, rich purple, deep cyan)
          color = Math.random() > 0.6 
            ? "#18181b" // dark gray star
            : Math.random() > 0.5 
              ? "#7c3aed" // vibrant purple
              : "#0891b2"; // vibrant cyan
        }

        particles.push({
          x: emojiCenterX,
          y: emojiCenterY,
          vx: (Math.random() - 0.5) * 2.2 * speedMultiplier,
          vy: (Math.random() - 0.5) * 2.2 * speedMultiplier + 0.4, // gentle drift
          size: Math.random() * 3 + 2, // 2px to 5px
          color,
          life: 1.0,
          decay: 0.015 + Math.random() * 0.02, // lifespan
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const count = isOverInteractive ? 3 : 1;
      addParticles(e.clientX, e.clientY, count);
    };

    const onMouseDown = (e: MouseEvent) => {
      // Explosive burst of sparkles on click!
      addParticles(e.clientX, e.clientY, 15, 2.5);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        addParticles(e.touches[0].clientX, e.touches[0].clientY - 55, isOverInteractive ? 3 : 1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        // Explode burst on tap
        addParticles(e.touches[0].clientX, e.touches[0].clientY - 55, 12, 2.0);
      }
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], .cursor-pointer, [href]");
      isOverInteractive = !!interactive;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mouseover", checkHover);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        
        // Draw retro pixelated squares
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mouseover", checkHover);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9997,
      }}
    />
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [hasHover, setHasHover] = useState(true);
  
  // Motion value and spring to animate scroll percentage changes smoothly
  const scrollValue = useMotionValue(0);
  const smoothScrollPct = useSpring(scrollValue, { stiffness: 50, damping: 15 });
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setHasHover(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Listen to changes in the smooth spring value and update state for display
  useEffect(() => {
    return smoothScrollPct.on("change", (latest) => {
      setDisplayPct(Math.round(latest));
    });
  }, [smoothScrollPct]);

  // Update scroll target on scroll or route transition
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
      scrollValue.set(pct);
    };
    
    update();
    const timeout = setTimeout(update, 100);

    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      clearTimeout(timeout);
    };
  }, [pathname, scrollValue]);

  return (
    <div className={`min-h-screen ${hasHover ? "cursor-none" : ""}`}>
      <ParticleTrail />
      <CustomCursor displayPct={displayPct} />
      {children}
    </div>
  );
}
