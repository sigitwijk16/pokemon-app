"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";
import type { PokemonData } from "@/app/page";

export default function Card({ name, imageUrl }: PokemonData) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const rotateX = useSpring(0, { stiffness: 400, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 400, damping: 30 });

  const colors = theme === "light"
    ? {
      glow1: "255, 255, 255",
      glow2: "250, 250, 250",
      base: "#d4a574",
      shadow: "139, 105, 20",
      border: "#b8860b",
    }
    : {
      glow1: "100, 180, 255",
      glow2: "80, 120, 200",
      base: "#2d3748",
      shadow: "100, 150, 255",
      border: "#4a5568",
    };

  const background = useMotionTemplate`
    radial-gradient(
      200px circle at ${mouseX}% ${mouseY}%,
      rgba(${colors.glow1}, ${theme === "light" ? 0.5 : 0.5}),
      rgba(${colors.glow2}, ${theme === "light" ? 0.3 : 0.5}) 25%,
      ${colors.base} 75%
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
    rotateY.set(((x - 50) / 50) * 20);
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
      className="aspect-4/5 text-center rounded-xl p-4 border-2"
      style={{
        background,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        fontFamily: "var(--font-grotesk), var(--font-fallback)",
        borderColor: colors.border,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 20px 40px rgba(${colors.shadow}, 0.3), 0 0 60px rgba(${colors.shadow}, 0.15)`,
      }}
      transition={{
        scale: { type: "spring", stiffness: 400, damping: 25 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h2
        className={`text-xl mb-2 text-left font-semibold ${theme === "light" ? "text-[#2b1d0e]" : "text-gray-50"
          }`}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
      <div
        className={`rounded-2xl w-full h-fit p-4 ${theme === "light"
          ? "border-2 border-[#8b6914] bg-white/70 backdrop-blur-sm"
          : "border-2 border-[#4a5568] bg-gray-800/70 backdrop-blur-sm"
          }`}
      >
        <Image
          src={imageUrl}
          style={{ width: "100%", height: "auto", margin: "0 auto" }}
          height={100}
          width={100}
          priority
          alt={`Image of pokemon ${name}`}
        />
      </div>
    </motion.div >
  );
}