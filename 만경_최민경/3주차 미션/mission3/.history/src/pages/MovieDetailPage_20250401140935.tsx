import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import { movieDetail, movieDetailResponse } from "../types/movieDetail";

const MovieDetailPage=(): React.ReactElement => {
    const params=useParams<{ movieId: string }>();

    const [movie, setMovie] = useState<movieDetail | null>(null);
    
    
    const [isPending, setIsPending]=useState(false);
    
    const [isError, setISError]=useState(false);
    
    const [page, setPage]=useState(1);

    const {category}=useParams<{
        category: string;
    }>();



    useEffect((): void => { 
        
        const fetchmovies= async(): Promise<void>=>{
            setIsPending(true); //데이터를 호출하는 중이므로
            
            try{
                const {data} =await axios.get<movieDetailResponse>(
                    `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        }
                    }
                );
                
                setMovies(data);
                
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
    return <div>MovieDetailPage</div>
}

export default MovieDetailPage;