import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Cast, Crew, MovieDetail } from "../types/movieDetails";

export default function MovieDetailPage(): Element {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
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
        setCast(creditRes.data.cast.slice(0, 5));
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
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="text-sm text-gray-600 mb-2">
        {movie.release_date} • {movie.runtime}분
      </p>
      <p className="mb-4 text-gray-700">{movie.overview}</p>
      <div className="mb-4">
        <strong>장르:</strong> {movie.genres.map((g) => g.name).join(", ")}
      </div>
      <div className="mb-4">
        <strong>감독:</strong> {director?.name || "정보 없음"}
      </div>
      <div className="mb-4">
        <strong>출연:</strong>
        <ul className="list-disc list-inside">
          {cast.map((actor) => (
            <li key={actor.id}>
              {actor.name} ({actor.character})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
