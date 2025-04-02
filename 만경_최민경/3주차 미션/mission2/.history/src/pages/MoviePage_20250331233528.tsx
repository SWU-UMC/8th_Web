import { useEffect, useState } from "react"
import axios from 'axios';
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
// import { fetchModule } from "vite";

export default function MoviePage(): React.ReactElement{
    const [movies, setMovies]=useState<Movie[]>([]);
    
    //1. 로딩 상태
    const [isPending, setIsPending]=useState(false);
    //2. 에러 상태
    const [isError, setISError]=useState(false);
    //3. 페이지 처리
    const [page, setPage]=useState(1);



    useEffect((): void => { 
        
        const fetchmovies= async(): Promise<void>=>{
            setIsPending(true); //데이터를 호출하는 중이므로
            
            try{
                const {data} =await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        }
                    }
                );
                
                setMovies(data.results);
                
            } catch{
                setISError(true);               
            } finally{
                setIsPending(false);
            }                   
        };

        fetchmovies();
    }, [page]);

    if (isError){
        return (
         <div>
            <span className="text-red-500 text-2xl">에러가 발생했습니다</span>
         </div>

        ) 
    }

    // if(!isPending){
    //     return <LoadingSpinner/>
    // }
    
    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
                <button
                    className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                    hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
                    cursor-pointer disabled:cursor-not-allowed" 
                    disabled={page===1} 
                onClick={() :void=> setPage((prev): number => prev-1)}>
                    {'<'}                   
                </button>
                <span>{page} 페이지</span>
                <button
                className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer"  
                onClick={() :void=> setPage((prev): number => prev+1)}>
                    {'>'}                   
                </button>               
            </div>
            
            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
                </div>
            )}

            {!isPending && (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md: gir-cols-4 lg: grid-cols-5 xl:grid-cols-6">
                {movies && movies.map((movie):  React.ReactElement => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
                </div>
            )}
        </>      
    );
}