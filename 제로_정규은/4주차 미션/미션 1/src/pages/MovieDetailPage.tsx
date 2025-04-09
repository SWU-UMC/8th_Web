//import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieDetailResponse, MovieCreditsResponse  } from '../types/movie';

const MovieDetailPage = () => {

  const params = useParams();
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}`;

  const {
    isPending,
    isError,
    data: movie
}= useCustomFetch<MovieDetailResponse>(url, "ko-KR");
const creditsUrl = `https://api.themoviedb.org/3/movie/${params.movieId}/credits`;
const {
  data: credits
} = useCustomFetch<MovieCreditsResponse>(creditsUrl, "ko-KR");
if (isPending) {
return <div>Loading...</div>;
}

if (isError) {
    return (
    <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다 .</span>
    </div>
    );
}

return (
    <div className="text-white">
         {/*영화 정보*/}
    <div
      className="relative w-full h-[400px] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
      }}
    >
      <div className="bg-black/60 p-6 w-full">
        <h1 className="text-4xl font-bold italic">{movie?.original_title}</h1>
        <p className="text-lg mt-2">
          평균 ⭐{movie?.vote_average} | {movie?.release_date.split("-")[0]} | ⏳{movie?.runtime}분
        </p>
        <p className="italic text-yellow-400 mt-2">{movie?.tagline}</p>
        <p className="mt-4">{movie?.overview}</p>
      </div>
    </div>

    {/*감독 및 출연진*/}
    <div className="p-10 bg-black">
      <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {/*감독*/}
    {credits?.crew
      .filter((person) => person.job === "Director")
      .map((director) => (
        <div key={director.id} className="text-center">
          <img
            src={
              director.profile_path
                ? `https://image.tmdb.org/t/p/w185/${director.profile_path}`
                : "/default-profile.png"
            }
            alt={director.name}
            className="w-24 h-24 rounded-full object-cover mx-auto"
          />
          <p className="mt-2 font-medium">{director.name}</p>
          <small className="text-gray-400">감독</small>
        </div>
      ))}

    {/*출연진*/}
    {credits?.cast.slice(0, 20).map((person) => (
      <div key={person.id} className="text-center">
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
              : "/default-profile.png"
          }
          alt={person.name}
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
        <p className="mt-2 font-medium">{person.name}</p>
        <small className="text-gray-400">{person.character}</small>
      </div>
    ))}
  </div>
    </div>

    {/*미션 확인 코드*/}

    {/*<div className="p-10 bg-black">    
    <p>MovieDetailPage{params.movieId}</p>
    <p>{movie?.id}</p>
    <p>{movie?.production_companies.map((company ) => company.name)}</p>
    <p>{movie?.original_title}</p>
    <p>{movie?.overview}</p>
    </div>*/}
    </div>
    );
};  
    
    
export default MovieDetailPage; 

