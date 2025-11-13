"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Card from "@/app/components/Card";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useTheme } from "@/app/context/ThemeContext";
import type { PokemonData } from "@/app/page";

interface ClientHomeProps {
  pokemonData: PokemonData[];
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  limit: number;
}

export default function ClientHome({
  pokemonData,
  page,
  totalPages,
  hasNext,
  hasPrevious,
}: ClientHomeProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const styles = {
    bg: isLight ? "#f1e9d2" : "#1a202c",
    text: isLight ? "#2b1d0e" : "#f7fafc",
    border: isLight ? "#8b6914" : "#4a5568",
    btnBg: isLight ? "#fffaf0" : "#2d3748",
    btnHover: isLight ? "#fff5e6" : "#3d4758",
    btnText: isLight ? "#2b1d0e" : "#f7fafc",
  };

  return (
    <>
      <ThemeToggle />
      <div
        className="flex min-h-screen items-center justify-center transition-colors duration-300"
        style={{
          backgroundColor: styles.bg,
          fontFamily: "var(--font-grotesk)",
          backgroundImage: "url('/texture/paper.png')",
          backgroundSize: "128px 128px",
          backgroundBlendMode: "multiply",
        }}
      >
        <main className="flex min-h-screen w-full flex-col items-center justify-between py-4 px-4 md:px-16 lg:px-36">
          <h1 className="text-2xl font-bold mb-2 transition-colors" style={{ color: styles.text }}>
            Pokémon Cards
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full gap-4 h-fit">
            {pokemonData.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>

          {pokemonData.length > 0 && (
            <div className="flex justify-center items-center gap-4 pt-2">
              <Link
                href={`?page=${page - 1}`}
                aria-disabled={!hasPrevious}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 border-2 ${!hasPrevious
                  ? "pointer-events-none opacity-40"
                  : "hover:scale-105 active:scale-95"
                  }`}
                style={{
                  borderColor: styles.border,
                  backgroundColor: styles.btnBg,
                  color: styles.btnText,
                }}
                onMouseEnter={(e) => {
                  if (hasPrevious)
                    e.currentTarget.style.backgroundColor = styles.btnHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = styles.btnBg;
                }}
              >
                <ChevronLeft size={18} /> Prev
              </Link>

              <span className="text-sm font-medium px-4" style={{ color: styles.text }}>
                Page {page} of {totalPages}
              </span>

              <Link
                href={`?page=${page + 1}`}
                aria-disabled={!hasNext}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 border-2 ${!hasNext
                  ? "pointer-events-none opacity-40"
                  : "hover:scale-105 active:scale-95"
                  }`}
                style={{
                  borderColor: styles.border,
                  backgroundColor: styles.btnBg,
                  color: styles.btnText,
                }}
                onMouseEnter={(e) => {
                  if (hasNext)
                    e.currentTarget.style.backgroundColor = styles.btnHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = styles.btnBg;
                }}
              >
                Next <ChevronRight size={18} />
              </Link>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
