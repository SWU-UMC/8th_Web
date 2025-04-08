import { useParams } from "react-router-dom";
import { CastMember, CrewMember, MovieDetailResponse } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";


export default function MovieDetailPage() {
    const {movieId} = useParams<{ 
        movieId: string 
    }>();
    const url = `https://api.themoviedb.org/3/movie/${movieId}`
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const {
        data:movie, 
        isPending:isMoviePending, 
        isError:isMovieError
    } = useCustomFetch<MovieDetailResponse>(url, "en-US")

    const {
        data:creditsData, 
        isPending:isCreditsPending, 
        isError: isCreditsError
    } = useCustomFetch<{ cast: CastMember[]; crew: CrewMember[] }> (creditsUrl, "en-US");

    const cast = creditsData?.cast ?? [];
    const crew = creditsData?.crew ?? [];

    if (isMovieError || isCreditsError) {
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    if (isMoviePending || isCreditsPending || !movie) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div>
            {/* 작품 정보 */}
            <div className="relative w-full h-[500px] bg-cover bg-center">
                {movie.backdrop_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={`${movie.title} 배경 이미지`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    // 이미지가 없으면 검은색 배경
                    <div className="w-full h-full bg-black"></div>
                )}
                {/* 이미지 어둡게 블러 */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center px-20">
                    <h1 className="text-4xl font-bold text-white mb-8">{movie.title}</h1>
                    <p className="text-sm text-white mb-2">{movie.original_title}</p>
                    <p className="text-sm text-white mb-2">{movie.vote_average.toFixed(1)} / 10</p>
                    <p className="text-sm text-white mb-2">
                        {movie.release_date.slice(0, 4)} &nbsp;|&nbsp;&nbsp;
                        {movie.production_countries.map(c => c.name).join(', ')}
                    </p>
                    <p className="text-sm text-white">
                        {movie.runtime}분 &nbsp;|&nbsp;&nbsp;
                        {movie.genres.map(g => g.name).join(', ')} 
                    </p>
                    {movie.tagline && (
                        <p className="text-lg font-bold text-white mt-6">"{movie.tagline}"</p>
                    )}
                    <div className="mt-6 max-w-2xl">
                        <p className="text-sm text-white">{movie.overview}</p>
                    </div>
                </div>
            </div>
            {/* 감독/출연 */}
            <div className="bg-black text-white py-10 px-20 min-h-screen">
                <h2 className="text-2xl font-bold mb-10">감독/출연</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-6">
                    {[...cast, ...crew].map((person) => (
                        <div className="text-center">
                        {person.profile_path ? (
                            <img
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                            alt={person.name}
                            className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-gray-500"
                            />
                        ) : (
                            // 이미지 없으면 검은색
                            <div className="w-20 h-20 mx-auto rounded-full bg-black border-2 border-gray-500"></div>
                        )}
                        <p className="text-sm font-bold mt-2">{person.name}</p>
                        <p className="text-xs text-gray-400">
                            {"character" in person ? person.character : person.job || "정보 없음"}
                        </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};