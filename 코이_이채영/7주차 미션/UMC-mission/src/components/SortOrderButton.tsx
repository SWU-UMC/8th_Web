import React from 'react';
import { PAGINATION_ORDER } from '../enums/common';

interface SortOrderButtonProps {
    sortOrder: PAGINATION_ORDER;
    setSortOrder: (order: PAGINATION_ORDER) => void;
}

const SortOrderButton: React.FC<SortOrderButtonProps> = ({ sortOrder, setSortOrder }) => {
    return (
        <div className="flex border rounded-sm overflow-hidden w-40">
            <button
                onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
                className={`flex-1 p-2 text-center text-xs ${sortOrder === PAGINATION_ORDER.asc ? "bg-white text-black font-bold" : "bg-black text-white"}`}
            >
                오래된 순
            </button>
            <button
                onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
                className={`flex-1 p-2 text-center text-xs ${sortOrder === PAGINATION_ORDER.desc ? "bg-white text-black font-bold" : "bg-black text-white"}`}
            >
                최신 순
            </button>
        </div>
    );
};

export default SortOrderButton;
