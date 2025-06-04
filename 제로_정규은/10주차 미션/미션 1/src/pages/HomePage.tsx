import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import useFetch from "../hooks/useFetch"
import { MovieFilters, MovieResponse, Movie } from "../types/movie"

export default function HomePage() {
    const [filter, setFilter] = useState<MovieFilters>({
        query: '해리포터',
        include_adult: false,
        language: 'ko-KR',
    });

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const axiosRequestConfig = useMemo(
        () => ({
        params: filter,
    }), [filter]);

    const { data, error, isLoading } = useFetch<MovieResponse>(
        '/search/movie', 
        axiosRequestConfig,
    );

    const handleMovieFilters = useCallback(
        (filter: MovieFilters) => {
        setFilter(filter);
    }, [setFilter]);

    const handleCardClick = useCallback((movie: Movie) => {
        setSelectedMovie(movie);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedMovie(null);
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <MovieFilter onChange={handleMovieFilters} />
                {isLoading ? (
                    <div>로딩 중입니다</div>
                ) : (
                    <MovieList movies={data?.results || []} onCardClick={handleCardClick} />
                )}
            </div>

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </>
    )
}
