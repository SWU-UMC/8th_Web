import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common" // PAGINATION_ORDER import 추가
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
    const savedSortOrder = localStorage.getItem("sortOrder") as PAGINATION_ORDER || "desc";
    const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(savedSortOrder);
    const [search, setSearch] = useState("");

    useEffect(() => {
        localStorage.setItem("sortOrder", sortOrder);
    }, [sortOrder]);

    // const { data, isPending, isError } = useGetLpList({
    //     order: sortOrder, // PAGINATION_ORDER 형식의 값 전달
    //     limit: 50,
    // });

    const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } = useGetInfiniteLpList(10, search, PAGINATION_ORDER.desc);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if (isError) {
        return <div className="text-white">Error</div>;
    }

    return (
        <div className="text-white p-10 max-w-[1240px] mx-auto">
            <div className="flex justify-end mb-4">
                <div className="flex border rounded-sm overflow-hidden w-40">
                    <button
                        onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
                        className={`flex-1 p-2 text-center text-sm ${sortOrder === PAGINATION_ORDER.asc ? "bg-white text-black font-bold" : "bg-black text-white"}`}
                    >
                        오래된 순
                    </button>
                    <button
                        onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
                        className={`flex-1 p-2 text-center text-sm ${sortOrder === PAGINATION_ORDER.desc ? "bg-white text-black font-bold" : "bg-black text-white"}`}
                    >
                        최신 순
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {isPending && <LpCardSkeletonList count={20} />}
                {lps?.pages
                    ?.map((page) => page.data.data)
                    ?.flat()
                    ?.map((lp) => (
                        <LpCard key={lp.id} lp={lp} />
                    ))}
                    {isFetching && <LpCardSkeletonList count={10} />}
                <div ref={ref} className="h-2"></div>
            </div>

        </div>
    );
};

export default HomePage;
