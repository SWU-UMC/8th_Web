import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const MovieDetailPage=(): React.ReactElement => {
    const params=useParams();

    const [movies, setMovies]=useState<Movie[]>([]);
    
    //1. 로딩 상태
    const [isPending, setIsPending]=useState(false);
    //2. 에러 상태
    const [isError, setISError]=useState(false);
    //3. 페이지 처리
    const [page, setPage]=useState(1);

    const {category}=useParams<{
        category: string;
    }>();



    useEffect((): void => { 
        
        const fetchmovies= async(): Promise<void>=>{
            setIsPending(true); //데이터를 호출하는 중이므로
            
            try{
                const {data} =await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/account/${params.movieId}?language=en-US&page=${page}`,
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

    //category: "now_playing" movieId: "1125899"
    return <div></div>
}

export default MovieDetailPage;