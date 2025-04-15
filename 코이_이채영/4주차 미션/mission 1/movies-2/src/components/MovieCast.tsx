import { JSX } from "react";
import { CastResponse } from "../types/movie";

interface MovieCastProps {
    cast: CastResponse[];
}

const MovieCast = ({ cast }: MovieCastProps): JSX.Element | null => {
    if (!cast.length) return null;

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold">감독 / 출연</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                {cast.slice(0, 12).map((actor) => (
                    <div key={actor.id} className="flex items-center gap-4">
                        {actor.profile_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                                alt={actor.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        )}
                        <div>
                            <p className="text-lg font-semibold">{actor.name}</p>
                            <p className="text-sm text-gray-500">{actor.character}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieCast;
