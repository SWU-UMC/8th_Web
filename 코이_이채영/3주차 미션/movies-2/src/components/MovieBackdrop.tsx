import { JSX } from "react";
import { Movie } from "../types/movie";

type MovieBackdropProps = {
    movie: Movie;
};

export default function MovieBackdrop({ movie }: MovieBackdropProps): JSX.Element {
    return (
        <div className="relative w-screen h-[50vh]">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
            ></div>
            <div className="absolute bottom-10 left-10 text-white">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <h2 className="text-lg italic text-gray-300">{movie.original_title}</h2>
                <p className="text-md mt-2">
                    {movie.release_date} | {movie.genres?.map((g) => g.name).join(", ")} | {movie.production_countries?.[0]?.iso_3166_1}
                </p>
                <p className="text-md">
                    {movie.runtime}분 | {movie.adult ? "청소년 관람불가" : "전체 관람가"}
                </p>
            </div>
        </div>
    );
}
