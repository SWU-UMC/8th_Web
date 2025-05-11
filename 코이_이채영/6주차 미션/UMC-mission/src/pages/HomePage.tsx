import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common" // PAGINATION_ORDER import 추가
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import SortOrderButton from "../components/SortOrderButton";

const HomePage = () => {
    const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

    const [search, setSearch] = useState("");

    // const { data, isPending, isError } = useGetLpList({
    //     order: sortOrder, // PAGINATION_ORDER 형식의 값 전달
    //     limit: 50,
    // });

    const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } = useGetInfiniteLpList(10, search, sortOrder);

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
                <SortOrderButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
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
