import { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropBaseUrl = "https://image.tmdb.org/t/p/original";
  const popularityPercent = Math.min(100, Math.round((movie.popularity ?? 0) / 10));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg">
        {/* 배경 이미지 */}
        <div className="relative h-48 w-full">
          {movie.backdrop_path && (
            <img
              src={backdropBaseUrl + movie.backdrop_path}
              alt={movie.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
            <div className="text-white">
              <div className="text-2xl font-bold">{movie.title}</div>
              <div className="text-sm opacity-80">{movie.original_title}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/70"
          >
            ✕
          </button>
        </div>

        {/* 상세 정보 */}
        <div className="flex gap-6 p-6">
          {movie.poster_path && (
            <img
              src={imageBaseUrl + movie.poster_path}
              alt={movie.title}
              className="h-60 w-40 rounded object-cover shadow"
            />
          )}

          <div className="flex flex-1 flex-col gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-lg text-yellow-400">★</span>
              <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
              <span className="text-sm text-gray-500">({movie.vote_count?.toLocaleString()}개 평가)</span>
            </div>

            <div>개봉일: {movie.release_date}</div>

            <div className="flex items-center gap-2">
              인기도:
              <div className="h-3 w-32 overflow-hidden rounded bg-gray-200">
                <div
                  className="h-3 bg-blue-500"
                  style={{ width: `${popularityPercent}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{popularityPercent}%</span>
            </div>

            <div className="mt-2 line-clamp-5 text-gray-800">{movie.overview}</div>

            <div className="mt-3 flex gap-2">
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                TMDB에서 자세히 보기
              </a>
              <button
                onClick={onClose}
                className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
