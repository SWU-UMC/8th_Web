import { JSX } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
    { to: '/', label: '홈' },
    { to: '/movies/popular', label: '화제의 영화' },
    { to: '/movies/now_playing', label: '현재 상영작' },
    { to: '/movies/top_rated', label: '평론가 추천작' },
    { to: '/movies/upcoming', label: '개봉 예정작' },
];

export default function Navbar(): JSX.Element {
    return (
        <div className="flex gap-5 p-4 border-b border-gray-300">
            {LINKS.map(({ to, label }): JSX.Element => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }): any => {
                        return isActive ? 'underline text-[#ff0558] font-bold' : 'text-gray-500'
                    }}
                >
                    {label}
                </NavLink>
            ))}
        </div>
    );
};