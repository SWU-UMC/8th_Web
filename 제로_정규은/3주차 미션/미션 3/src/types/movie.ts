export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string; //영화 줄거리
    popularity: number;//인기지수
    poster_path: string;
    release_date: string;//개봉날짜
    title: string;
    video: boolean;
    vote_average: number;
};

//영화 상세 정보
export type MovieDetail = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: object | null;
    genres: {id: number; name: string}[];
    homepage: string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
};

//API응답
export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

//감독 및 출연진
export type Cast = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
};

export type Crew = {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
};

export type Credits = {
    id: number;
    cast: Cast[];
    crew: Crew[];
};

