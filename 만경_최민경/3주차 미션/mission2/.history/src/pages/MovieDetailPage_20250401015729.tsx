import { useParams } from "react-router-dom";

const MovieDetailPage=(): React.ReactElement => {
    const params=useParams();

    console.log(params);
    return <div>MovieDetailPage</div>
}

export default MovieDetailPage;