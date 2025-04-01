// useSTate: 컴포넌트 내부 상태를 만들 때 사용
// useEffect: 컴포넌트가 마운트(처음 렌더링)될 때 어떤 작업(side effect)을 수행할 때 사용
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";

//axios 라이브러리: HTTP 요청을 쉽게 해줌
import axios from "axios";

//함수형 컴포넌트 선언: 페이지 하나를 정의
const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  console.log(movies);
  console.log(import.meta.env.VITE_TMDB_TOKEN); // 확인용

  //컴포넌트가 처음 렌더링 될 때 한 번 실행되는 함수: 안쪽에서 API 요청을 함
  useEffect(() => {
    //비동기 함수 선언: 영화 데이터를 불러오는 함수
    const fetchMovies = async () => {
      //응답에 대한 타입을 정의해줍니다.
      /* axios.get으로 API에 GET 요청을 보내서
      -> await가 응답을 기다려서 받아오고
      -> 그 응답 중에서 data만 구조분해 할당 */
      const { data } = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        {
          headers: {
            Authorization: "Bearer ${import.meta.env.VITE_TMDB_TOKEN}",
          },
        }
      );

      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <ul>
      {/* 옵셔널 체인 활용 */}
      {movies?.map((movie) => (
        <li key={movie.id}>
          <h1>{movie.title}</h1>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
