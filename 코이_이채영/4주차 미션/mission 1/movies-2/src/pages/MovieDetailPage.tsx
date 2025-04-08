import { JSX } from "react";
import { useParams } from "react-router-dom";
import { MovieDetailResponse } from "../types/movie";
import useCustomFetch from "../hooks/useCustomFetch";


const MovieDetailPage = (): JSX.Element => {
    const params = useParams();

    const url = `https://api.themoviedb.org/3/movie/${params.movieId}`

    const { isPending, isError, data: movie } = useCustomFetch<MovieDetailResponse>(url, "ko-KR");

    if (isError) {
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div>
            MovieDetailPage{params.movieId}
            {movie?.id}
            {movie?.production_companies.map((company) => company.name)}
            {movie?.original_title}
            {movie?.overview}
        </div>
    );
};
export default MovieDetailPage;
