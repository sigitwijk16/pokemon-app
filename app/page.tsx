import ClientHome from "@/app/components/ClientHome";
import { getPokemonData } from "@/app/lib/pokemonService";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = 10;

  const { data, totalPages, hasNext, hasPrevious, error } = await getPokemonData(page, limit);

  return (
    <ClientHome
      pokemonData={data}
      page={page}
      totalPages={totalPages}
      hasNext={hasNext}
      hasPrevious={hasPrevious}
      error={error}
    />
  );
}