import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import {useInView} from "react-intersection-observer"
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";


const HomePage = () => {
  const [search,setSearch]=useState("")
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);
  // const {data,isPending,isError}=useGetLpList({
  //   search,
  //   limit:50
  // })\
  const {data:lps,isFetching,hasNextPage,isPending,fetchNextPage,isError}=
  useGetInfiniteLpList(10, search, order);

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
      <div className="flex justify-end items-center mb-4 mt-6 gap-3">
        <button
          className={`px-3 py-1 text-sm cursor-pointer rounded-md mr-2 transition-colors ${
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
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
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
