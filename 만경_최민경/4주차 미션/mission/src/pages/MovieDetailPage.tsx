
import { useParams } from "react-router-dom";
import { movieCredit, MovieDetailResponse} from "../types/movie";
import useCustomFetch from "../hooks/useCustomFetch";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MovieDetailPage=(): React.ReactElement => {
    const params=useParams<{ movieId: string }>();
    const url= `https://api.themoviedb.org/3/movie/${params.movieId}`
    const {isPending, isError, data:movie}=useCustomFetch<MovieDetailResponse>(url,'en_US');

    const crediturl=`https://api.themoviedb.org/3/movie/${params.movieId}/credits?`
    const { isPending: creditPending, isError: creditError, data: credit } = 
        useCustomFetch<movieCredit>(crediturl, 'en_US');
    
    if (isError){
        return (
         <div>
            <span className="text-red-500 text-2xl">에러가 발생했습니다</span>
         </div>
        ) 
    }

    return (
        <>

        {isPending && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>
            )}
        
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
       
        <div className="mt-10  px-4">
            <h2 className="text-2xl font-semibold text-black mb-4">출연진</h2>
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