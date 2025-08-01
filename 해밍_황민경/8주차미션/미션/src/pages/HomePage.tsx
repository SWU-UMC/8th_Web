import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";
import { FiSearch, FiX } from "react-icons/fi";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  // const { data, isPending, isError } = useGetLpList({
  //   search,
  //   limit: 50,
  // });

  //정렬 코드
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedValue, order);

  //ref, inView
  //ref-> 특정한 HTML요소를 감시할 수 있다.
  //inView -> 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage, order]);

  if (isPending) {
    return <div className={"mt-20"}>Loading...</div>;
  }

  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }

  // return (
  //   <div className="container mx-auto px-4 py-6">
  //     <input value={search} onChange={(e) => setSearch(e.target.value)} />
  //     <div
  //       className={
  //         "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  //       }
  //     >
  //       {isPending && <LpCardSkeletonList count={20} />}
  //       {lps?.pages
  //         ?.map((page) => page.data.data)
  //         ?.flat()
  //         ?.map((lp) => (
  //           <LpCard key={lp.id} lp={lp} />
  //         ))}
  //       {isFetching && <LpCardSkeletonList count={20} />}
  //     </div>
  //     <div ref={ref} className="h-2" />
  //   </div>
  // );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative w-full max-w-md mx-auto mb-6">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-black transition"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-black"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`px-4 py-1 rounded-full border ${
            order === PAGINATION_ORDER.desc
              ? "bg-black text-white border-white"
              : "bg-white text-black"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={`px-4 py-1 rounded-full border ${
            order === PAGINATION_ORDER.asc
              ? "bg-black text-white border-white"
              : "bg-white text-black"
          }`}
        >
          오래된순
        </button>
      </div>
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        }
      >
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2" />
    </div>
  );
};

export default HomePage;
