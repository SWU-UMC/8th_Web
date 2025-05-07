
import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { Heart } from "lucide-react";


const HomePage = () => {
    const [search, setSearch] = useState("정현");
    const [orderUI, setOrderUI] = useState<"latest" | "oldest">("latest");
    // UI 상태를 API용 enum으로 매핑
    const order: PAGINATION_ORDER = orderUI === "latest" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc;

    const {data, isPending, isError} = useGetLpList({
        cursor: 0,
        search,
        order,
        limit: 20,
    
    });

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error.</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-end mb-4 space-x-2">
                <button
                onClick={() => setOrderUI("oldest")}
                className={`px-3 py-1 rounded text-sm ${
                    orderUI === "oldest" ? "bg-pink-400 text-white" : "bg-gray-200"
                }`}
                >
                오래된 순
                </button>
                <button
                onClick={() => setOrderUI("latest")}
                className={`px-3 py-1 rounded text-sm ${
                    orderUI === "latest" ? "bg-pink-400 text-white" : "bg-gray-200"
                }`}
                >
                최신 순
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data?.map((lp) => (
                <div
                    key={lp.id}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
                >
                    <img
                    src={lp.thumbnail}
                    alt={lp.title}
                    className="w-full h-48 object-cover"
                    />
                    <div className="p-2">
                    <h2 className="text-sm font-semibold truncate">{lp.title}</h2>
                    <div className="text-xs text-gray-500">
                        {new Date(lp.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                        <Heart size={18} strokeWidth={2} className="mr-2" />
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        );
}

export default HomePage;