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