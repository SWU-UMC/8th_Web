import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col bg-black  ">
        <nav className=" flex justify-between items-center px-6 py-4" >
          <div className="text-pink-500 font-bold text-xl">만경코딩</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm text-white">로그인</button>
            <button className="px-3 py-1 text-sm bg-pink-500 rounded text-black">회원가입</button>
      </div>
        </nav>
        <main className="flex-1">
            <Outlet/>
        </main>
        <footer></footer>
    </div>
    
  )
}

export default HomeLayout;
