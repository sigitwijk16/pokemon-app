import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Card from "@/app/components/Card";

export interface PokemonData {
  id: string;
  name: string;
  imageUrl: string;
}

interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

async function getPokemonData(page: number, limit: number) {
  const offset = (page - 1) * limit;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  const responseJson: PokemonApiResponse = await response.json();

  const pokemonList = responseJson.results.map(
    (pokemon: { name: string; url: string }) => {
      const id = pokemon.url.split("/")[6];
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      return { ...pokemon, id, imageUrl };
    }
  );

  return {
    pokemon: pokemonList,
    totalCount: responseJson.count,
    hasNext: responseJson.next !== null,
    hasPrevious: responseJson.previous !== null,
  };
}

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;

  const { pokemon: pokemonData, totalCount, hasNext, hasPrevious } = await getPokemonData(page, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#f1e9d2]"
      style={{
        fontFamily: "var(--font-grotesk)",
        backgroundImage: "url('/texture/paper.png')",
        backgroundSize: "128px 128px",
        backgroundBlendMode: "multiply",
      }}
    >
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-4 px-4 md:px-16 lg:px-36">
        <h1 className="text-xl text-[#2b1d0e] pb-4">Pokemon Cards</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full gap-2 h-fit">
          {pokemonData.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
              id={item.id}
            />
          ))}
        </div>

        {totalCount > limit && (
          <div className="flex justify-center items-center gap-4 pt-4">
            <Link
              href={`?page=${page - 1}`}
              className={`flex items-center gap-2 px-4 py-2 border border-[#bfa97a] bg-[#fffaf0] hover:bg-gray-100 text-gray-800 rounded-md transition-colors ${!hasPrevious ? "pointer-events-none opacity-50" : ""
                }`}
              aria-disabled={!hasPrevious}
            >
              <ChevronLeft size={16} /> Prev
            </Link>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Link
              href={`?page=${page + 1}`}
              className={`flex items-center gap-2 px-4 py-2 border border-[#bfa97a] bg-[#fffaf0] hover:bg-gray-100 text-gray-800 rounded-md transition-colors ${!hasNext ? "pointer-events-none opacity-50" : ""
                }`}
              aria-disabled={!hasNext}
            >
              Next <ChevronRight size={16} />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}