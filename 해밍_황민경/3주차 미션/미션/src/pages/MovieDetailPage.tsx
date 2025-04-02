import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  Cast,
  Crew,
  MovieDetail,
  MovieDetailResponse,
} from "../types/movieDetails";
import CastCard from "../components/CastCard";

export default function MovieDetailPage(): Element {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetailResponse | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [director, setDirector] = useState<Crew | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }),
        ]);

        setMovie(movieRes.data);
        setCast(creditRes.data.cast.slice(0, 20));
        const director = creditRes.data.crew.find(
          (crew: Crew) => crew.job === "Director"
        );
        setDirector(director || null);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="text-red-500 text-center mt-10 text-2xl">
        영화를 불러오는 데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white">
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-10 w-[50%]">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-300 mb-1">
            평균 {movie.vote_average.toFixed(1)} •{" "}
            {movie.release_date.slice(0, 4)} • {movie.runtime}분
          </p>
          <p className="italic text-[#b2dab1] mb-4">{movie.tagline}</p>
          <p className="text-sm text-gray-300 line-clamp-5 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="p-10 mt-6 bg-slate-800 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4 border-b border-white pb-1">
          감독/출연
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
          {director && <CastCard person={director} type="crew" />}
          {cast.map((actor) => (
            <CastCard key={actor.id} person={actor} type="cast" />
          ))}
        </div>
      </div>
    </div>
  );
}
