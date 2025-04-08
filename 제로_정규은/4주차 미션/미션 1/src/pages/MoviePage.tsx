import { useState } from "react";
//import axios from "axios";
import { MovieResponse } from '../types/movie';
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react"; //아이콘 추가
import useCustomFetch from "../hooks/useCustomFetch";


export default function MoviePage() {
    const [page, setPage] = useState(1);

    const {category} = useParams<{
        category: string;
    }>();

    const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;

    const {data: movies, isPending, isError} = useCustomFetch<MovieResponse>(url, 'ko-KR');


if (isError) {
    return (
        <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
        </div>
    );
}

    return (
    <>

    {isPending && (
        <div className='flex items-center justify-center h-dvh'>
            <LoadingSpinner />
        </div>
    )}

    {!isPending && (
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4
    lg:grid-cols-5 xl:grid-cols-6'>
        {movies?.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
    )}
    
    <div className='flex items-center justify-center p-6 gap-6 mt-5'>
        {/*이전 페이지 버튼*/}
        <button
        className='bg-red-600 w-12 h-12 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center'
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}>
        <ChevronLeft size={24} color="white" />

        </button>
        {/*페이지 넘버*/}
        <span className="text-2xl font-extrabold text-black tracking-wide">Page {page}</span>

        {/*다음 페이지 버튼*/}
        <button
        className='bg-red-600 w-12 h-12 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 cursor-pointer flex items-center justify-center'
        onClick={() => setPage((prev) => prev+ 1)}>
        <ChevronRight size={24} color="white" />

        </button>
    </div>
    </>
    );
}