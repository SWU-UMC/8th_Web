export type BaseMovie={
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title:string;
  video: boolean;
  vote_average:number;
  vote_count: number;
}


export type Movie= BaseMovie & {
  genre_ids: number[];
}

export type MovieResponse={
  page:number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}

type Genre={
  id: number;
  name: string;
}

type ProductionCompany={
  id: number;
  logo_path: string;
  name: string;
  orgin_country: string;
}

type ProductionContries={ 
  iso_3166_1: string;
  name: string;
  
}

type SpokenLanguages={
  english_name: string;
  iso_639_1: string;
  name: string;
}

type BelongsToCollection={
  poster_path: string;
  name: string;
  backdrop_path: string;
  id: number;
}

export type MovieDetailResponse= BaseMovie & {
  belongs_to_collection: BelongsToCollection[];
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id:string;
  orgin_country: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionContries[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
}

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  department: string;
  job: string;
  credit_id: string;
};

export type movieCredit = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};