import { useParams } from "react-router-dom";

const MovieDetailPage=(): React.ReactElement => {
    const params=useParams();

    console.log(params); //category: "now_playing" movieId: "1125899"
    return <div>MovieDetailPage{params.movieId}</div>
}

export default MovieDetailPage;