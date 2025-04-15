import { NavLink } from "react-router-dom";

const LINKS = [
    { to: "/", label: "HOME" },
    { to: "/movies/popular", label: "지금 뜨는 영화" },
    { to: "/movies/now_playing", label: "절찬 상영" },
    { to: "/movies/top_rated", label: "고평점 영화" },
    { to: "/movies/upcoming", label: "개봉 임박" },
];

export const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <NavLink to="/" className="text-2xl font-bold text-red-500">
                    🎬 ZeroMovie
                </NavLink>

                {/*네비게이션 링크*/}
                <div className="flex gap-6">
                    {LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg transition duration-300 ${
                                    isActive
                                        ? "bg-red-500 text-white font-bold shadow-md"
                                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};
