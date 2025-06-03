import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}

const MovieList = ({ movies, onSelect }: MovieListProps) => {
    if (movies.length === 0) {
        return (
            <div className="flex h-60 items-center justify-center">
                <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
                <div key={movie.id} onClick={() => onSelect(movie)} className="cursor-pointer">
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    )
};

export default MovieList;