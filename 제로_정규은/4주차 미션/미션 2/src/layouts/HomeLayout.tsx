import { Outlet, useNavigate } from "react-router-dom"

const HomeLayout = () => {
  const navigate = useNavigate();

  return (
    <div className='h-dvh flex flex-col font-sans'>
      <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 shadow-md">
        <div className="text-xl font-semibold tracking-wide">돌려돌려 LP판</div>
        <div className="space-x-4">
          <button
            className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-all duration-200"
            onClick={() => navigate("/login")}
          >
            로그인
          </button>
          <button
            className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-all duration-200"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </div>
      </nav>

      <main className='flex-1 bg-gray-100 p-4'>
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        ⓒ 2025 돌려돌려 LP판. All rights reserved.
      </footer>
    </div>
  )
}

export default HomeLayout
