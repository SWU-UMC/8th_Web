import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import { movieDetail } from "../types/movieDetail";
import { movieCredit} from "../types/Credit";

const MovieDetailPage=(): React.ReactElement => {
    const params=useParams<{ movieId: string }>();

    const [movie, setMovie] = useState<movieDetail | null>(null);
    const [credit, setCredit]= useState<movieCredit |null>(null);
    
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
                const {data} =await axios.get<movieDetail>(
                    `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        }
                    }
                );
                
                setMovie(data);

                const creditmovies= async(): Promise<void>=>{
            setIsPending(true); 
            
            try{
                const {data} =await axios.get<movieCredit>(
                    `https://api.themoviedb.org/3/movie/${params.movieId}/credit?language=en-US&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        }
                    }
                );
                
                setCredit(data);
                
            } catch{
                setISError(true);               
            } finally{
                setIsPending(false);
            }                   
        };
        fetchmovies();
                
            } catch{
                setISError(true);               
            } finally{
                setIsPending(false);
            }                   
        };
        fetchmovies();

    }, [params.movieId]);

    if (isError){
        return (
         <div>
            <span className="text-red-500 text-2xl">에러가 발생했습니다</span>
         </div>

        ) 
    }

    //category: "now_playing" movieId: "1125899"
    return (
    <>
        <div
        className="relative h-[400px] bg-cover " style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        }}
>
            <div className="absolute inset-0 bg-black/60 flex items-end p-6">
                <div>
                    <h1 className="text-4xl font-bold text-white">{movie?.title}</h1>
                    <p className="text-gray-300 ">{movie?.tagline}</p>
                </div>
            </div>
        </div>

        
    </>

    )
}

export default MovieDetailPage;