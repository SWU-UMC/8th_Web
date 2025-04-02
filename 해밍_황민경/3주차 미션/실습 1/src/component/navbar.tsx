// navbar.tsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex gap-4">
      <Link to={"/"} className="hover:underline">
        홈 페이지로 이동
      </Link>
      <Link to="/movies" className="hover:underline">
        영화 목록 페이지로 이동
      </Link>
    </nav>
  );
};

export default Navbar;
