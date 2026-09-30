import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const updateCursorMode = (e) => {
      const target = e.target;
      const interactive = target.closest('a, button, [data-cursor]');
      
      if (interactive) {
        if (interactive.dataset.cursor) {
          setCursorText(interactive.dataset.cursor);
          setCursorVariant("text");
        } else if (interactive.tagName.toLowerCase() === 'a') {
          setCursorVariant("link");
        } else {
          setCursorVariant("hover");
        }
      } else {
        setCursorText("");
        setCursorVariant("default");
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', updateCursorMode);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', updateCursorMode);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (window.matchMedia("(pointer: coarse)").matches) return null;

  const variants = {
    default: {
      height: 12,
      width: 12,
      backgroundColor: "rgba(15, 23, 42, 0.8)", // Dark dot
      x: "-50%",
      y: "-50%",
    },
    hover: {
      height: 48,
      width: 48,
      backgroundColor: "rgba(6, 182, 212, 0.1)",
      border: "1px solid rgba(6, 182, 212, 0.5)",
      x: "-50%",
      y: "-50%",
    },
    link: {
      height: 48,
      width: 48,
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      border: "1px solid rgba(16, 185, 129, 0.5)",
      x: "-50%",
      y: "-50%",
    },
    text: {
      height: 64,
      width: 64,
      backgroundColor: "rgba(15, 23, 42, 0.9)", // Dark background for cursor text
      color: "white",
      border: "none",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "normal" // No difference blending in light mode, just a solid cursor
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center text-[10px] font-bold uppercase tracking-wider text-white"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "tween", duration: 0.15 }}
    >
      {cursorVariant === "text" && cursorText}
    </motion.div>
  );
}
