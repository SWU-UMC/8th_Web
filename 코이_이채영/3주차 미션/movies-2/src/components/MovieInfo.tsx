import { JSX } from "react";
import { CastResponse, Movie } from "../types/movie";
import MovieCast from "./MovieCast";

interface MovieInfoProps {
    movie: Movie;
    cast: CastResponse[];
}

const MovieInfo = ({ movie, cast }: MovieInfoProps): JSX.Element => {
    return (
        <div className="mt-6 flex gap-6">
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-md m-10"
            />
            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xl font-semibold mb-5">
                    <span className="text-yellow-400 text-3xl">⭐</span>
                    <span className="text-3xl">{(movie.vote_average ?? 0).toFixed(1)} / 10</span>
                    <span className="text-gray-500 text-lg">({(movie.vote_count ?? 0).toLocaleString()}명 평가)</span>
                </div>
                <p className="mt-2 text-lg mr-20">{movie.overview}</p>
                <MovieCast cast={cast} />
            </div>
        </div>
    );
};

export default MovieInfo;
