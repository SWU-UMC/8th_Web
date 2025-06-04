import type { Movie } from "../types/movie";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const backdropBaseUrl = "https://image.tmdb.org/t/p/original";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="relative w-[90%] max-w-4xl rounded-lg bg-white shadow-lg overflow-hidden">
            {movie.backdrop_path && (
            <div
                className="relative h-80 bg-cover bg-center"
                style={{
                backgroundImage: `url(${backdropBaseUrl}${movie.backdrop_path})`,
                }}
            >
                {/*제목 + 원제*/}
                <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
                    <h2 className="text-2xl font-bold">{movie.title}</h2>
                    <p className="text-md">{movie.original_title}</p>
                </div>
            </div>
            )}

            {/* 닫기 버튼 */}
            <button
            className="absolute top-4 right-5 text-white text-2xl font-bold z-10"
            onClick={onClose}
            >
            &times;
            </button>

            <div className=" -mt-2  relative z-20 flex gap-6 px-6 py-6 bg-white rounded-t-lg">
            <img
                src={
                movie.poster_path
                    ? `${imageBaseUrl}${movie.poster_path}`
                    : "https://via.placeholder.com/640x480"
                }
                alt={movie.title}
                className="w-60 rounded-lg shadow-lg"
            />
            <div className="flex-1">
                <div className="text-sm text-gray-600 mb-2">
                <span className="text-blue-600 font-bold text-lg mr-2">
                    {movie.vote_average.toFixed(1)}
                </span>
                <span>({movie.vote_count.toLocaleString()} 평가)</span>
                </div>
                <p className="my-8 text-md text-center">
                    <p className="pb-2 font-bold">개봉일</p> 
                    {movie.release_date}
                </p>
                <p className="my-8 text-center">
                    <p className="text-md font-bold">줄거리</p> <br />
                    {movie.overview}
                </p>
                <div className="mt-4 flex gap-2">
                <a
                    href={`https://www.imdb.com/find?q=${encodeURIComponent(
                    movie.title
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                    IMDb에서 검색
                </a>
                <button
                    onClick={onClose}
                    className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
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
