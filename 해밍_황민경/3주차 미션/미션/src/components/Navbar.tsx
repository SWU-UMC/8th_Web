import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영중" },
  { to: "/movies/top_rated", label: "평점 높은" },
  { to: "/movies/upcomming", label: "개봉 예정" },
];

export const Navbar = (): Element => {
  return (
    <div className="flex gap-3 p-4 px-6 py-4 bg-slate-800 shadow-md">
      {LINKS.map(
        ({ to, label }): Element => (
          <NavLink
            key={to}
            to={to}
            className={({
              isActive,
            }):
              | "ext-[#b2dab1] font-bold"
              | "text-gray-300 hover:text-white transition-colors duration-200" => {
              return isActive
                ? "text-[#b2dab1] font-bold"
                : "text-gray-300 hover:text-white transition-colors duration-200";
            }}
          >
            {label}
          </NavLink>
        )
      )}
    </div>
  );
};
