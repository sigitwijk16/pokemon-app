export interface PokemonRaw {
  name: string;
  url: string;
}

export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonRaw[];
}

export interface PokemonData {
  id: string;
  name: string;
  imageUrl: string;
}

export interface PokemonPaginatedResult {
  data: PokemonData[];
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  error?: string;
}
