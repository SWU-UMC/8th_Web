import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { HiOutlineMenuAlt3 } from "react-icons/hi"; // 햄버거 아이콘
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";
import useLogout from "../hooks/mutations/useLogout";


const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const logoutMutation = useLogout();

    const { data } = useQuery({
        queryKey: ['myInfo'],
        queryFn: getMyInfo,
        enabled: !!accessToken,
    });

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                alert("로그아웃 되었습니다.");
                navigate("/");
            }
        });
    };

    return (
        <nav className="h-16 bg-[#111] text-[#ff1490] flex items-center justify-between px-4 top-0 left-0 right-0 z-60">
            <div className="flex items-center space-x-4">
                <button onClick={toggleSidebar} className="text-white text-2xl">
                    <HiOutlineMenuAlt3 />
                </button>
                <Link to="/" className="text-xl font-semibold">
                    돌려돌려LP판
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <button className=" text-white text-sm px-1 py-1 rounded">
                    <FaSearch />
                </button>
                {!accessToken ? (
                    <>
                        <Link
                            to={"/login"}
                            className=" text-white text-sm px-2 py-1 rounded"
                        >
                            로그인
                        </Link>
                        <Link
                            to={"/signup"}
                            className="bg-[#ff1490] text-white text-sm px-3 py-1 rounded"
                        >
                            회원가입
                        </Link>
                    </>
                ) : (
                    <>
                        <p className="text-white text-base">{data?.data.name}님 환영합니다.</p>
                        <Link
                            to={"/"}
                            onClick={handleLogout}
                            className="bg-black text-white text-sm px-3 py-1 rounded"
                        >
                            로그아웃
                        </Link>
                    </>
                )}
            </div>

        </nav>
    )
}

export default Navbar;
