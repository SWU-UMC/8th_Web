import { Movie } from "../types/movie";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const backdropBaseUrl = "https://image.tmdb.org/t/p/original";


const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    console.log("백드롭 경로:", movie.backdrop_path);

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-auto">
            <div className="w-full max-w-3xl my-auto rounded-lg bg-white shadow-lg">
                {movie.backdrop_path && (
                    <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                        <img
                            src={`${backdropBaseUrl}${movie.backdrop_path}`}
                            alt="Backdrop"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-end justify-start p-4 " style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <h2 className="text-2xl font-bold text-white text-left">
                                {movie.title}<br />
                                <span className="text-base font-normal text-gray-300">
                                    {movie.original_title}
                                </span>
                            </h2>
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:flex-row p-6 gap-6">
                    <img
                        src={
                            movie.poster_path
                                ? `${imageBaseUrl}${movie.poster_path}`
                                : "https://placehold.co/500x750?text=No+Image"
                        }
                        alt={`${movie.title} 포스터`}
                        className="w-[250px] max-w-xs rounded-md object-cover"
                    />

                    <div className="flex flex-col justify-start gap-4 text-gray-900">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <span className=" text-black px-1 py-1">⭐</span>
                            <span className="text-xl">{movie.vote_average.toFixed(1)}</span>
                            <span className="text-sm text-gray-500">({(movie.vote_count ?? 0).toLocaleString()}명)</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-semibold">개봉일:</span>
                            <span>{movie.release_date || "정보 없음"}</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-gray-600 whitespace-nowrap">인기도:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-yellow-400 h-4 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min(movie.popularity, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>


                        <div>
                            <h3 className="mb-2 text-lg font-semibold border-b border-yellow-400 pb-1">줄거리</h3>
                            <p className="text-gray-700 leading-relaxed">{movie.overview || "줄거리 정보 없음"}</p>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <a
                                href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 rounded bg-yellow-500 px-3 py-3 text-center text-white font-semibold transition hover:bg-yellow-600 shadow-md"
                            >
                                IMDB에서 검색
                            </a>

                            <button
                                onClick={onClose}
                                className="flex-1 rounded bg-gray-600 px-3 py-3 text-center text-white font-semibold transition hover:bg-gray-700 shadow-md"
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
