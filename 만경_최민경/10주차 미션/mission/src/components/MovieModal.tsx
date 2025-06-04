import { useEffect } from "react";
import { Movie } from "../types/movie";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const fallbackImage = "https://placehold.co/600x400";

    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // 날짜 포맷팅 함수
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60 p-4"
            onClick={handleBackdropClick}
        >
            <div className="relative max-h-[90vh]  w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-2xl">
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 cursor-pointer z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                >
                    ✕
                </button>

                {/* 영화 포스터와 정보 */}
                <div className="flex flex-col md:flex-row">
                    {/* 포스터 이미지 */}
                    <div className="flex-shrink-0 md:w-1/3">
                        <img
                            src={movie.poster_path 
                                ? `${imageBaseUrl}${movie.poster_path}` 
                                : fallbackImage
                            }
                            alt={`${movie.title} 포스터`}
                            className="h-full w-full object-cover md:rounded-l-lg"
                        />
                    </div>

                    {/* 영화 정보 */}
                    <div className="flex-1 p-6 md:p-8">
                        {/* 제목과 평점 */}
                        <div className="mb-4">
                            <h2 className="mb-2 text-3xl font-bold text-gray-900">{movie.title}</h2>
                            {movie.original_title !== movie.title && (
                                <h3 className="mb-2 text-xl text-gray-600">{movie.original_title}</h3>
                            )}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-md bg-blue-500 px-3 py-1 text-white font-bold">
                                        ★ {movie.vote_average.toFixed(1)}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        ({movie.vote_count}명 평가)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 기본 정보 */}
                        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <h4 className="font-semibold text-gray-700">개봉일</h4>
                                <p className="text-gray-600">{formatDate(movie.release_date)}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700">언어</h4>
                                <p className="text-gray-600">{movie.original_language.toUpperCase()}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700">인기도</h4>
                                <p className="text-gray-600">{movie.popularity.toFixed(0)}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700">성인 등급</h4>
                                <p className="text-gray-600">{movie.adult ? '19세 이상' : '전체 관람가'}</p>
                            </div>
                        </div>

                        
                        <div className="mb-6">
                            <h4 className="mb-3 font-semibold text-gray-700">줄거리</h4>
                            <p className="leading-relaxed text-gray-600">
                                {movie.overview || '줄거리 정보가 없습니다.'}
                            </p>
                        </div>

                
                        <div className="flex flex-wrap gap-3">
                            <button className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 transition-colors">
                                IMDb에서 보기
                            </button>
                            <button className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors">
                                예고편 보기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;