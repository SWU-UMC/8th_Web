import { JSX } from "react";
import { Video } from "../types/movie";

interface MovieVideosProps {
    videos: Video[];
}

const MovieVideos = ({ videos }: MovieVideosProps): JSX.Element | null => {
    if (!videos.length) return null;

    return (
        <div className="mt-8 m-10">
            <h2 className="text-2xl font-semibold">동영상</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {videos.slice(0, 3).map((video) => (
                    <div key={video.key} className="w-full aspect-video">
                        <iframe
                            className="w-full h-full rounded-lg shadow-md"
                            src={`https://www.youtube.com/embed/${video.key}`}
                            title={video.name || "YouTube video player"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieVideos;
