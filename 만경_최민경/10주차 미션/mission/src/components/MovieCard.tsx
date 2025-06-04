import { useState } from "react";
import { Movie } from "../types/movie";
import MovieModal from "./MovieModal";

interface MovieCardProps{
    movie: Movie;
}

const MovieCard = ({movie}: MovieCardProps) => {
    const [isModalOpen, setIsModalOpen]=useState(false);
    const imageBaseUrl= "https://image.tmdb.org/t/p/w500";
    const fallbackImageImage="https://placehold.co/600x400"

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

  return (
    <>
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md
    transition-all hover:shadow-lg" 
    onClick={handleCardClick}>
        <div className="relative h-80 overflow-hidden">
            <img src={movie.poster_path
            ? `${imageBaseUrl}${movie.poster_path}`
            : fallbackImageImage} 
            alt={`${movie.title} 포스터`}
            className="h-full w-full object-cover transition-transform duration-300 
            ease-in-out hover:scale-105"

            />
            <div className="absoulte right-2 top-2 rounded-md bg-blue-500
            px-2 py-1 text-sm font-bold text-white">
                {movie.vote_average.toFixed(1)}
            </div>
        </div>

        <div className="p-4">
            <h3 className="mb-2 text-lg font-bold text-gray-800">{movie.title}</h3>
            <p className="text-sm text-gray-600">
                {movie.release_date} | {movie.original_language.toUpperCase()}
            </p>
            <p className="mt-2 text-sm text-gray-700">
                {movie.overview.length > 100
                ? `${movie.overview.slice(0,100)}...`
                : movie.overview}
            </p>
        </div>
    </div>
    {isModalOpen && (
        <MovieModal movie={movie} onClose={handleCloseModal} />
    )}
    </>
  )
}

export default MovieCard