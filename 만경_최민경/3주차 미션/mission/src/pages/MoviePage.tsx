import { useEffect, useState } from "react"
import axios from 'axios';
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
// import { fetchModule } from "vite";

export default function MoviePage(): React.ReactElement{
    const [movies, setMovies]=useState<Movie[]>([]);


    useEffect((): void => {
        const fetchmovies= async(): Promise<void>=>{
            const {data} =await axios.get<MovieResponse>(
                'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    }
                }
            );
            
            setMovies(data.results);
                    
        };

        fetchmovies();
    }, []);
    
    return (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md: gir-cols-4 lg: grid-cols-5 xl:grid-cols-6">
            {movies && movies.map((movie):  React.ReactElement => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}