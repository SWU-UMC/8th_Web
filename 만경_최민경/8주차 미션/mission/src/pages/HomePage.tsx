import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import {useInView} from "react-intersection-observer"
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";
import useThrottle from "../hooks/useThrottle";


const HomePage = () => {
  const [search,setSearch]=useState("")
  const debouncedValue=useDebounce(search,SEARCH_DEBOUNCE_DELAY);
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);
  //debounced
  const {data:lps,isFetching,hasNextPage, isPending, fetchNextPage, isError}=
  useGetInfiniteLpList(10, debouncedValue, order);

  const [scrollPosition, setScrollPosition] = useState(0);
  const throttledScrollPosition = useThrottle(scrollPosition, 3000);
  useEffect(() => {
    console.log("Throttled scroll:", throttledScrollPosition);
  }, [throttledScrollPosition]);
  // 스크롤 이벤트 리스너 설정
  useEffect(() => {
    const handleScroll = () => {
      
      setScrollPosition(window.scrollY);
    }
    
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 

  //ref: 특정한 HTML 요소를 감시할 수 있다.
  //inView: 화면에 요소가 보이면 True가 됨.
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const handleOrderChange = (newOrder: PAGINATION_ORDER) => {
    setOrder(newOrder);
  };

  useEffect(()=> {
    if(inView){
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching,hasNextPage,fetchNextPage])


  if(isError){
    return <div className="mt-20">Error...</div>
  }

  return (
    <>
      <div className="flex justify-end items-center animate-blink mb-4 mt-6 gap-3">
        <input className="border p-4 rounded-sm"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />
        <button
          className={`px-3 py-1  text-sm cursor-pointer rounded-md mr-2 transition-colors ${
            order === PAGINATION_ORDER.asc
              ? 'bg-blue-200 text-gray-800 font-medium'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
        >
          오래된순
        </button>
        <button
          className={`px-3 py-1 text-sm cursor-pointer rounded-md transition-colors ${
            order === PAGINATION_ORDER.desc
              ? 'bg-blue-200 text-gray-800 font-medium'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
        >
          최신순
        </button>
      </div>
  
      <div className="container mx-auto px-4 py-6">
        {/*  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isPending && <LpCardSkeletonList count={20} />}
          {lps?.pages
            ?.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
          {isFetching && <LpCardSkeletonList count={20} />}
        </div>
        <div ref={ref} className="h-2"></div>
      </div>
    </>
  );
  
  
}

export default HomePage;
