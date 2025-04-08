import { JSX } from "react";

export const LoadingSpinner = () : JSX.Element => {
    return (
        <div className="size-12 animate-spin rounded-full border-5
        border-t-transparent border-[#ff0558]" role="status"><span className="sr-only">로딩 중...</span></div>
    );
};