
import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { Plus, Search } from "lucide-react";
import PostLpCard from "../components/LpCard/PostLpCard";
import LpCreateModal from "../components/LpCreateModal";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";
import useThrottle from "../hooks/useThrottle";
import useThrottleFn from "../hooks/useTrottleFn";


const HomePage = () => {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
    const throttledSearch = useThrottle(search, 1000);
    //const savedSortOrder = localStorage.getItem("sortOrder") as PAGINATION_ORDER || "desc";
    const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(
        (localStorage.getItem("sortOrder") as PAGINATION_ORDER) || PAGINATION_ORDER.desc
    );
    //const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } = useGetInfiniteLpList(10, debouncedValue, sortOrder);
    // 무한스크롤에 useThrottle 적용
    const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } = useGetInfiniteLpList(10, throttledSearch, sortOrder);
    const throttledFetchNextPage = useThrottleFn(() => {
        if (hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, 3000);
    
    const {ref, inView} = useInView({
        threshold: 0,
    })

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("sortOrder", sortOrder);
    }, [sortOrder]);

    // useEffect(() => {
    //     if (inView && hasNextPage && !isFetching) {
    //         fetchNextPage();
    //     }
    // }, [inView, hasNextPage, isFetching, fetchNextPage]);

    // 무한스크롤에 useThrottle 적용
    useEffect(() => {
        if (inView) {
            throttledFetchNextPage();
        }
    }, [inView, throttledFetchNextPage]);

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error.</div>;
    }

    return (
        <div className="container mw-auto px-4 py-4">
            {/* 정렬 버튼 */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-100">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2"/>
                <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-full" placeholder="검색어를 입력하세요" />
                </div>
                <div className="flex border rounded-sm overflow-hidden">
                    <button
                    onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
                    className={`px-4 py-2 text-sm ${
                        sortOrder === PAGINATION_ORDER.asc ? "bg-white text-black font-bold" : "bg-black text-white"
                    }`}
                    >
                    오래된 순
                    </button>
                    <button
                    onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
                    className={`px-4 py-2 text-sm ${
                        sortOrder === PAGINATION_ORDER.desc ? "bg-white text-black font-bold" : "bg-black text-white"
                    }`}
                    >
                    최신 순
                    </button>
                </div>
            </div>

            {/* 카드 리스트 */}
            {!isPending && lps?.pages?.[0]?.data?.data?.length === 0 && (
            <div className="text-black mt-10">검색 결과가 없습니다.</div>
            )}
            <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {lps?.pages?.map((page)=>page.data.data)?.flat()?.map((lp)=>
                    <LpCard key={lp.id} lp={lp}/>
                )}
                {isFetching && <LpCardSkeletonList count={20}/>}
                <div ref={ref} className="h-2"></div>
            </div>
            <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-pink-600 hover:bg-pink-500 text-white shadow-lg flex items-center justify-center z-50"
            >
            <Plus size={25} />
            </button>
            {isModalOpen && <LpCreateModal onClose={() => setIsModalOpen(false)} />}
        </div>
        );
}

export default HomePage;