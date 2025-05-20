
import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { Plus } from "lucide-react";
import PostLpCard from "../components/LpCard/PostLpCard";


const HomePage = () => {
    const [search, setSearch] = useState("");
    //const savedSortOrder = localStorage.getItem("sortOrder") as PAGINATION_ORDER || "desc";
    const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(
        (localStorage.getItem("sortOrder") as PAGINATION_ORDER) || PAGINATION_ORDER.desc
    );
    const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } = useGetInfiniteLpList(10, search, sortOrder);
    const {ref, inView} = useInView({
        threshold: 0,
    })

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("sortOrder", sortOrder);
    }, [sortOrder]);

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error.</div>;
    }

    return (
        <div className="container mw-auto px-4 py-4">
            {/* 정렬 버튼 */}
            <div className="flex justify-end mb-2">
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
            <input value={search} onChange={(e)=>setSearch(e.target.value)} />
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
            {isModalOpen && <PostLpCard onClose={() => setIsModalOpen(false)} />}
        </div>
        );
}

export default HomePage;