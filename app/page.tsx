import ClientHome from "@/app/components/ClientHome";

interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface PokemonData {
  id: string;
  name: string;
  imageUrl: string;
}

async function getPokemonData(page: number, limit: number) {
  const offset = (page - 1) * limit;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    { next: { revalidate: 3600 } }
  );
  const responseJson: PokemonApiResponse = await response.json();

  const pokemonList: PokemonData[] = responseJson.results.map((pokemon) => {
    const id = pokemon.url.split("/")[6];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return { id, name: pokemon.name, imageUrl };
  });

  return {
    pokemon: pokemonList,
    totalCount: responseJson.count,
    hasNext: responseJson.next !== null,
    hasPrevious: responseJson.previous !== null,
  };
}

interface HomeProps {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;

  const { pokemon, totalCount, hasNext, hasPrevious } = await getPokemonData(page, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <ClientHome
      pokemonData={pokemon}
      page={page}
      totalPages={totalPages}
      hasNext={hasNext}
      hasPrevious={hasPrevious}
      limit={limit}
    />
  );
}
