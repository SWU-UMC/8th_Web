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
                
            } catch{
                setISError(true);               
            } finally{
                setIsPending(false);
            }                   
        };
        fetchmovies();

        const creditmovies= async(): Promise<void>=>{
            setIsPending(true); 
            
            try{
                const {data} =await axios.get<movieCredit>(
                    `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=en-US&page=${page}`,
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
        creditmovies();
        

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
        <div className="relative h-[400px] bg-cover"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
            }}
        >
            <div className="absolute inset-0 bg-black/60 flex flex-col max-w-3xl  justify-between p-6 text-white">
                
                <div>
                    <p className="mb-1"><strong>개봉일:</strong> {movie?.release_date}</p>
                    <p className="mb-1"><strong>런타임:</strong> {movie?.runtime}분</p>
                    <p className="mb-1"><strong>평점:</strong> {movie?.vote_average}</p>
                    <p className="mb-4"><strong>줄거리: </strong>{movie?.overview}</p>
                </div>
                <div>
                    <h1 className="text-4xl font-bold">{movie?.title}</h1>
                    <p className="text-gray-300">{movie?.tagline}</p>
                </div>
            </div>
        </div>

        <div className=" bg-black px-4">
            <h2 className="text-2xl font-semibold text-white mb-4">출연진</h2>
            <div className="flex overflow-x-auto gap-4">
                {credit?.cast.slice(0, 10).map((actor) => (
                <div key={actor.id} className="min-w-[120px] text-center text-white">
                    <img
                    src={
                        actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/default-avatar.png"
                    }
                    alt={actor.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
                    />
                    <p className="text-sm font-medium">{actor.name}</p>
                    <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
                ))}
            </div>
            </div>
      
    </>

    )
}

export default MovieDetailPage;