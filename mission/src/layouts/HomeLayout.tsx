import { Link, Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col bg-black">
      <nav className="h-16 bg-[#111] text-[#ff1490] flex items-center justify-between px-4">
        <div className="text-xl font-semibold">돌려돌려LP판</div>
        <div className="space-x-2">
          <Link
            to="/login"
            className="bg-black text-white text-sm px-3 py-1 rounded"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="bg-[#ff1490] text-white text-sm px-3 py-1 rounded"
          >
            회원가입
          </Link>
        </div>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default HomeLayout;
