export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genres: { id: number; name: string }[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    production_countries: { iso_3166_1: string; name: string }[];
    runtime: number;
};

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export interface CastResponse {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
};

export interface Video {
    key: string;
    site: string;
    name?: string;
    type?: string;
};

