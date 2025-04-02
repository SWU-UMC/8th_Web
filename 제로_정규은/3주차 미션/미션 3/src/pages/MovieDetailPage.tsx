import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// 영화 상세 정보 정의
interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    tagline: string;
    overview: string;
}

//출연진 정보 정의
interface Cast {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
}

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>(); //영화 id
    const [movie, setMovie] = useState<Movie | null>(null); //영화 상세정보
    const [credits, setCredits] = useState<Cast[]>([]); //출연진 정보
    const [loading, setLoading] = useState<boolean>(true); //로딩상태
    const [error, setError] = useState<string | null>(null); //에러상태

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                //영화 정보 요청
                const movieRes = await fetch(`${BASE_URL}/movie/${movieId}?language=ko-KR`, {
                    headers: { Authorization: `Bearer ${API_KEY}` },
                });

                //출연진 정보 요청
                const creditsRes = await fetch(`${BASE_URL}/movie/${movieId}/credits?language=ko-KR`, {
                    headers: { Authorization: `Bearer ${API_KEY}` },
                });

                //요청 실패 시 에러 처리
                if (!movieRes.ok || !creditsRes.ok) throw new Error("영화 정보를 불러오는 데 실패했습니다.");

                const movieData: Movie = await movieRes.json();
                const creditsData = await creditsRes.json();

                setMovie(movieData);
                setCredits(creditsData.cast.slice(0, 20)); //20명까지 표시
            } catch (err) {
                setError("영화 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (movieId) fetchMovieDetails(); //movieId가 존재할 때 데이터 요청
    }, [movieId]);

    if (loading) return <div className="text-center text-white p-10">로딩 중...</div>;
    if (error) return <div className="text-center text-red-500 p-10">{error}</div>;
    if (!movie) return <div className="text-center text-gray-400 p-10">영화 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="text-white">
            {/*영화 정보*/}
            
            <div
                className="relative w-full h-[400px] bg-cover bg-center flex items-end"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                }}
            >
                <div className="bg-black/60 p-6 w-full">
                    <h1 className="text-4xl font-bold italic">{movie.title}</h1>
                    <p className="text-lg mt-2">
                        평균 ⭐{movie.vote_average} | {movie.release_date.split("-")[0]} | ⏳{movie.runtime}분
                    </p>
                    <p className="italic text-yellow-400 mt-2">{movie.tagline}</p>
                    <p className="mt-4">{movie.overview}</p>
                </div>
            </div>

            {/*감독 및 출연진*/}
            <div className="p-10 bg-black">
                <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {credits.map((person) => (
                        <div key={person.id} className="text-center">
                            <img src={
                                    person.profile_path
                                        ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
                                        : "/default-profile.png"}
                                alt={person.name}
                                className="w-24 h-24 rounded-full object-cover mx-auto"
                            />
                            <p className="mt-2 font-medium">{person.name}</p>
                            <small className="text-gray-400">{person.character}</small>
                        </div>
                    ))}
                </div>
            </div>
            </div>
    );
};

export default MovieDetailPage;
