"use client";

import { useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, AlertCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";
import Card from "@/app/components/Card";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useTheme } from "@/app/context/ThemeContext";
import type { PokemonData } from "@/app/lib/types";

interface ClientHomeProps {
  pokemonData: PokemonData[];
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  error?: string;
}

export default function ClientHome({
  pokemonData,
  page,
  totalPages,
  hasNext,
  hasPrevious,
  error,
}: ClientHomeProps) {
  const { theme } = useTheme();

  const styles = useMemo(() => ({
    container: {
      backgroundColor: 'var(--bg-primary)',
      fontFamily: "var(--font-grotesk)",
      backgroundImage: "url('/texture/paper.png')",
      backgroundSize: "128px 128px",
      backgroundBlendMode: "multiply" as const,
    },
    text: { color: 'var(--text-primary)' },
    button: {
      borderColor: 'var(--border-primary)',
      backgroundColor: 'var(--button-bg)',
      color: 'var(--text-primary)',
    },
    errorBox: {
      backgroundColor: 'var(--error-bg)',
      borderColor: 'var(--error-border)',
      color: 'var(--error-text)',
    }
  }), []);

  const getButtonClass = (isDisabled: boolean) =>
    `flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 border-2 ${isDisabled
      ? "pointer-events-none opacity-40"
      : "hover:scale-105 active:scale-95 cursor-pointer"
    }`;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrevious) {
        window.location.href = `?page=${page - 1}`;
      } else if (e.key === "ArrowRight" && hasNext) {
        window.location.href = `?page=${page + 1}`;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [page, hasNext, hasPrevious]);

  return (
    <>
      <ThemeToggle />
      <div
        className="flex min-h-screen items-center justify-center transition-colors duration-300"
        style={styles.container}
        suppressHydrationWarning
      >
        <main className="flex min-h-screen w-full flex-col items-center justify-between py-4 px-4 md:px-16 lg:px-36">

          <h1
            className="text-2xl font-bold mb-2 transition-colors"
            style={styles.text}
            suppressHydrationWarning
          >
            Pokémon Cards
          </h1>

          {error ? (
            <div className="flex flex-col items-center justify-center w-full flex-1 h-96 gap-4">
              <div
                className="flex flex-col items-center gap-3 p-8 rounded-xl border-2 text-center max-w-md"
                style={styles.errorBox}
                suppressHydrationWarning
              >
                <AlertCircle size={48} />
                <h2 className="text-xl font-bold">Unable to load data</h2>
                <p>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className={getButtonClass(false)}
                  style={styles.button}
                  suppressHydrationWarning
                >
                  <RefreshCcw size={18} /> Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full gap-4 h-fit">
              {pokemonData.map((item) => (
                <Card key={item.id} {...item} />
              ))}
            </div>
          )}

          {!error && pokemonData.length > 0 && (
            <div className="flex justify-center items-center gap-4 pt-2">

              <Link
                href={`?page=${page - 1}`}
                aria-disabled={!hasPrevious}
                className={getButtonClass(!hasPrevious)}
                style={styles.button}
                suppressHydrationWarning
              >
                <ChevronLeft size={18} /> Prev
              </Link>

              <span
                className="text-sm font-medium px-4"
                style={styles.text}
                suppressHydrationWarning
              >
                Page {page} of {totalPages}
              </span>

              <Link
                href={`?page=${page + 1}`}
                aria-disabled={!hasNext}
                className={getButtonClass(!hasNext)}
                style={styles.button}
                prefetch={true}
                suppressHydrationWarning
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