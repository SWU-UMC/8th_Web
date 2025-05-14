import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['myInfo'],
        queryFn: getMyInfo,
    });

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }

    if (isLoading) return <div className="text-white">로딩 중...</div>;
    if (isError) return <div className="text-white">오류 발생!</div>;

    return (
        <div>
            <h1 className="text-white">{data?.data?.name}님 환영합니다.</h1>
            <img src={data?.data?.avatar as string} alt={"구글 로고"} />
            <h1 className="text-white">{data?.data?.email}</h1>

            <button
                type="button"
                onClick={handleLogout}
                className="cursor-pointer w-[350px] bg-[#ff1490] text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors"
            >
                로그아웃
            </button>
        </div>


    );
};

export default MyPage;