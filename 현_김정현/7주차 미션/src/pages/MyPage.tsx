import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";

const MyPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto>();

    useEffect(() => {
        const getData = async() => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, []);

    const handleLogout = async() => {
        await logout();
        navigate("/");
    }
    // 이미지 없을 때 처리 추가하기 
    return (
    <div className="flex flex-col items-center justify-center h-full">
        <h1 className="mb-4">{data?.data.name}님 환영합니다.</h1>
        <div className="w-30 h-30 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
            {data?.data.avatar ? (
            <img src={data.data.avatar} alt="Avatar" className="object-cover w-full h-full" />
            ) : (
                <UserRound size={40} strokeWidth={2.5} className="text-gray-400" />
            )}
        </div>
        <h1 className="mb-4">{data?.data.email}</h1>

        <button className="cursor-pointer bg-pink-200 hover:bg-pink-300 rounded-sm p-3 hover:scale-90" onClick={handleLogout}>
            로그아웃
        </button>
    </div>
    );
};

export default MyPage;

// customFetch hook 사용해보기