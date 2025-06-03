import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import { Movie, MovieFilters, MovieResponse } from "../types/movie";
import MovieModal from "../components/MovieModal";

export default function HomePage() {
    const [filters, setFilters] = useState<MovieFilters>({
        query: "어벤져스",
        include_adult: false,
        language: "ko-KR",
    });

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const axiosRequestConfig = useMemo(
        (): { params: MovieFilters } => ({
            params: filters,
        }),
        [filters],
    )

    const { data, error, isLoading } = useFetch<MovieResponse>("/search/movie",
        axiosRequestConfig,
    );

    const handleMovieFilters = useCallback(
        (filters: MovieFilters) => {
            setFilters(filters);
        }, [setFilters]);

    const handleSelectMovie = (movie: Movie) => {
        setSelectedMovie(movie); 
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto">
            <MovieFilter onChange={handleMovieFilters} />
            {isLoading ? (
                <div>로딩 중입니다...</div>
            ) : (
                <MovieList movies={data?.results || []} onSelect={handleSelectMovie}/>
            )}

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
            )}

        </div>
    );
}