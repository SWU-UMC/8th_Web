import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useUserUpdate from "../hooks/mutations/useUserUpdate";
import profileImg from "../assets/profile.png";

const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ['myInfo'],
        queryFn: getMyInfo,
    });

    useEffect(() => {
        if (data) {
            setName(data.data.name || "");
            setBio(data.data.bio || "");
            setAvatar(data.data.avatar || "");
        }
    }, [data]);

    const { mutate: updateUserInfo } = useUserUpdate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleUpdate = () => {
        const confirmUpdate = window.confirm("해당 정보로 수정하시겠습니까?");
        if (confirmUpdate) {
            updateUserInfo({ name, bio, avatar });
            setIsEditMode(false);
        }
    };

    if (isLoading) return <div className="text-white">로딩 중...</div>;
    if (isError) return <div className="text-white">오류 발생!</div>;

    return (
        <div className="flex justify-center p-4">
            <div className=" py-5">
                <div className="flex items-center justify-center space-x-6 mb-6">
                    <div className="w-32 h-32">
                        <img
                            src={avatar || profileImg}
                            alt="프로필 사진"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>

                    <div className="text-white">
                        {isEditMode ? (
                            <>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block bg-gray-600 text-white p-2 rounded mb-2 w-64"
                                    placeholder="이름"
                                />
                                <input
                                    type="text"
                                    value={bio || ""}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="block bg-gray-600 text-white p-2 rounded mb-2 w-64"
                                    placeholder="바이오"
                                />
                                <h2 className="text-lg my-2 w-64">{data?.data?.email}</h2>
                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl font-semibold mb-2 w-64">
                                    {data?.data?.name}
                                </h1>
                                {data?.data?.bio && (
                                    <p className="text-lg my-2 w-64">{data?.data?.bio}</p>
                                )}
                                <h2 className="text-lg my-2 w-64">{data?.data?.email}</h2>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex space-x-4">
                    {isEditMode ? (
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="w-full bg-[#1f1f1f] text-white py-3 rounded-md text-lg font-medium hover:bg-[#1a1a1a] transition-colors"
                        >
                            저장하기
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsEditMode(true)}
                            className="w-full bg-[#1f1f1f] text-white py-3 rounded-md text-lg font-medium hover:bg-[#1a1a1a] transition-colors"
                        >
                            정보 수정
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full bg-[#ff1490] text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors"
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
