import React, { useEffect, useState } from "react";
import type { MovieDetail } from "../types/movie";

interface MovieModalProps {
  movieId: number;
  onClose: () => void;
}
const MovieModal = ({ movieId, onClose }: MovieModalProps) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ko-KR`
      );
      const data = await res.json();
      setMovie(data);
    };

    fetchMovieDetail();
  }, [movieId]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div
        className="relative w-11/12 max-w-5xl bg-white rounded-lg overflow-hidden shadow-lg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-70 p-6 flex flex-col md:flex-row items-start text-white">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-[200px] rounded shadow-lg mb-4 md:mb-0 md:mr-6"
          />

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold">{movie.title}</h2>
              <button
                className="cursor-pointer text-2xl ml-4"
                onClick={onClose}
              >
                ×
              </button>
            </div>
            {movie.tagline && (
              <p className="italic text-gray-300">{movie.tagline}</p>
            )}

            <p className="mt-3">
              <strong>개봉일:</strong> {movie.release_date}
            </p>
            <p>
              <strong>런타임:</strong> {movie.runtime}분
            </p>
            <p>
              <strong>평점:</strong> {movie.vote_average}
            </p>
            <p>
              <strong>장르:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
            <p className="mt-4 text-sm leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
