"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface RevealTextProps {
  text?: string;
  textColor?: string;
  overlayColor?: string;
  fontSize?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  letterImages?: string[];
}

export function RevealText({
  text = "STUNNING",
  textColor = "text-white",
  overlayColor = "text-red-500",
  fontSize = "text-[250px]",
  letterDelay = 0.08,
  overlayDelay = 0.05,
  overlayDuration = 0.4,
  springDuration = 600,
  letterImages = [],
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const lastLetterDelay = (text.length - 1) * letterDelay;
    const totalDelay = lastLetterDelay * 1000 + springDuration;
    const timer = setTimeout(() => setShowOverlay(true), totalDelay);
    return () => clearTimeout(timer);
  }, [text.length, letterDelay, springDuration]);

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`${fontSize} font-black tracking-tight cursor-pointer relative overflow-hidden`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * letterDelay,
              type: "spring",
              damping: 8,
              stiffness: 200,
              mass: 0.8,
            }}
          >
            {/* Capa base */}
            <motion.span
              className={`absolute inset-0 ${textColor}`}
              animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
              transition={{ duration: 0.1 }}
            >
              {letter}
            </motion.span>

            {/* Capa imagen revelada al hover por letra */}
            {letterImages.length > 0 && (
              <motion.span
                className="bg-cover bg-no-repeat bg-clip-text text-transparent"
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  backgroundPosition: hoveredIndex === index ? "10% center" : "0% center",
                }}
                transition={{
                  opacity: { duration: 0.1 },
                  backgroundPosition: { duration: 3, ease: "easeInOut" },
                }}
                style={{
                  backgroundImage: `url('${letterImages[index % letterImages.length]}')`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {letter}
              </motion.span>
            )}

            {/* Sweep overlay color al final del reveal inicial */}
            {showOverlay && (
              <motion.span
                className={`pointer-events-none absolute inset-0 ${overlayColor}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: index * overlayDelay,
                  duration: overlayDuration,
                  times: [0, 0.1, 0.7, 1],
                  ease: "easeInOut",
                }}
              >
                {letter}
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
