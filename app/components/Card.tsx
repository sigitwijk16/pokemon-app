"use client";

import { useRef, useMemo, memo } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring
} from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";
import type { PokemonData } from "@/app/lib/types";

const Card = memo(function Card({ name, imageUrl }: PokemonData) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const styles = useMemo(() => isLight
    ? {
      glow1: "255, 255, 255",
      glow2: "250, 250, 250",
      base: "#d4a574",
      shadow: "139, 105, 20",
      border: "#b8860b",
      textColor: "text-[#2b1d0e]",
      innerCardBg: "bg-[#f2e4d5] border-[#b8860b]"
    }
    : {
      glow1: "100, 180, 255",
      glow2: "80, 120, 200",
      base: "#2d3748",
      shadow: "100, 150, 255",
      border: "#4a5568",
      textColor: "text-gray-50",
      innerCardBg: "bg-[#232d3c] border-[#4a5568]"
    }, [isLight]);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const background = useMotionTemplate`
    radial-gradient(
      150px circle at ${mouseX}% ${mouseY}%,
      rgba(${styles.glow1}, ${isLight ? 0.5 : 0.5}),
      rgba(${styles.glow2}, ${isLight ? 0.3 : 0.5}) 25%,
      ${styles.base} 75%
    )
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    mouseX.set(x);
    mouseY.set(y);

    rotateX.set(((y - 50) / 50) * 20);
    rotateY.set(((x - 50) / 50) * -20);
  };

  const handleMouseLeave = () => {
    mouseX.set(50);
    mouseY.set(50);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative aspect-4/5 w-full rounded-xl p-4 border-2 cursor-pointer"
      aria-label={`Pokemon card for ${name}`}
      style={{
        background,
        rotateX,
        rotateY,
        borderColor: styles.border,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 20px 40px rgba(${styles.shadow}, 0.3), 0 0 60px rgba(${styles.shadow}, 0.15)`,
        zIndex: 10
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="h-full flex flex-col justify-between pointer-events-none"
      >
        <h2 className={`text-xl font-bold capitalize mb-2 ${styles.textColor}`}>
          {name}
        </h2>

        <div
          className={`relative grow flex items-center justify-center rounded-2xl border-2 p-4 transition-colors ${styles.innerCardBg}`}
        >
          <Image
            src={imageUrl}
            alt={name}
            width={200}
            height={200}
            className="w-full h-auto object-contain drop-shadow-xl"
            priority={false}
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
});

export default Card;