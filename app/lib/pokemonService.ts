import { PokemonApiResponse, PokemonPaginatedResult } from "@/app/lib/types";

const POKE_API_BASE = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemonData(
  page: number = 1,
  limit: number = 10
): Promise<PokemonPaginatedResult> {
  try {
    const safePage = Math.max(1, page);
    const offset = (safePage - 1) * limit;

    const response = await fetch(
      `${POKE_API_BASE}?offset=${offset}&limit=${limit}`,
      {
        next: { revalidate: 3600 },
        cache: "force-cache"
      }
    );

    if (!response.ok) {
      throw new Error(`PokeAPI responded with status: ${response.status}`);
    }

    const data: PokemonApiResponse = await response.json();

    const pokemonList = data.results.map((pokemon) => {
      const idMatch = pokemon.url.match(/\/(\d+)\/$/);
      const id = idMatch ? idMatch[1] : "0";

      return {
        id,
        name: pokemon.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      };
    });

    const totalPages = Math.ceil(data.count / limit);

    return {
      data: pokemonList,
      totalPages,
      hasNext: !!data.next,
      hasPrevious: !!data.previous,
      error: undefined
    };
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    return {
      data: [],
      totalPages: 0,
      hasNext: false,
      hasPrevious: false,
      error: "Failed to load Pokemon. Please try again later."
    };
  }
}
