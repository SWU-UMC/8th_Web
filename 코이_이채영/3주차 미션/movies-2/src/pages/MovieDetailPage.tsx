import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CastResponse, Movie, Video } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieBackdrop from "../components/MovieBackdrop";
import MovieInfo from "../components/MovieInfo";
import MovieVideos from "../components/MovieVideos";


const MovieDetailPage = (): JSX.Element => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [cast, setCast] = useState<CastResponse[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const { data: movieData } = await axios.get<Movie>(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KO`, {
                    headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
                });
                setMovie(movieData);

                const { data: creditsData } = await axios.get<{ cast: CastResponse[] }>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KO`,
                    { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` } }
                );
                setCast(creditsData.cast.slice(0, 12));

                const { data: videosData } = await axios.get<{ results: Video[] }>(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KO`,
                    { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` } }
                );
                setVideos(videosData.results.filter(video => video.site === "YouTube"));

                setIsLoading(false);
            } catch (error) {
                console.error("영화 정보를 불러오는 중 오류 발생:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchMovieData();
    }, [movieId]);

    if (isLoading) return (
        <div className="flex items-center justify-center h-dvh">
            <LoadingSpinner />
        </div>
    );

    if (isError) return <div className="text-center text-red-500 mt-10">영화 정보를 불러오지 못했습니다.</div>;

    return (
        <div>
            {movie && (
                <>
                    <MovieBackdrop movie={movie} />
                    <MovieInfo movie={movie} cast={cast} />
                    <MovieVideos videos={videos} />
                </>
            )}
        </div>
    );
};

export default MovieDetailPage;
