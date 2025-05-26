import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Settings, UserRound } from "lucide-react";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { QUERY_KEY } from "../constants/key";
import { useQuery } from "@tanstack/react-query";


const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { data } = useQuery({
        queryKey: [QUERY_KEY.myInfo],
        queryFn: getMyInfo,
    });

    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { mutate: updateMyInfo } = useUpdateMyInfo();

    useEffect(() => {
        if (data) {
            setName(data.data.name || "");
            setBio(data.data.bio || "");
            setAvatar(data.data.avatar || null);
        }
    }, [data]);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const handleUpdate = () => {
        if (!name.trim()) {
            alert("닉네임은 비워둘 수 없습니다.");
            return;
        }
        const confirmUpdate = window.confirm("이대로 수정하시겠습니까?");
        if (confirmUpdate) {
            updateMyInfo({ name, bio, avatar });
            setIsEditMode(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    if (!data) {
        return <p className="text-white">로딩 중...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-black">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">
                    {isEditMode ? "프로필 수정" : `${data.data.name}님 환영합니다.`}
                </h1>
                {!isEditMode && (
                    <button onClick={() => setIsEditMode(true)}>
                        <Settings size={20} />
                    </button>
                )}
            </div>

            <div
                className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4 cursor-pointer"
                onClick={() => isEditMode && fileInputRef.current?.click()}
            >
                {avatar ? (
                    <img src={avatar} alt="avatar" className="object-cover w-full h-full" />
                ) : (
                    <UserRound size={40} strokeWidth={2.5} className="text-gray-400" />
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </div>

            {isEditMode ? (
                <>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mb-3 p-2 bg-gray-800 border border-gray-600 rounded w-60 text-white"
                        placeholder="닉네임"
                    />
                    <textarea
                        value={bio || ""}
                        onChange={(e) => setBio(e.target.value)}
                        className="mb-3 p-2 bg-gray-800 border border-gray-600 rounded w-60 text-white"
                        placeholder="자기소개"
                    />
                    <div className="flex gap-2">
                        <button onClick={handleUpdate} className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded">
                            저장
                        </button>
                        <button onClick={() => setIsEditMode(false)} className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded">
                            취소
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p className="mb-2 text-lg text-black">{data.data.email}</p>
                    {data.data.bio && <p className="mb-6 text-md text-gray-600">{data.data.bio}</p>}
                    <button
                        className="cursor-pointer bg-pink-300 hover:bg-pink-500 rounded-sm p-3 transition-transform"
                        onClick={handleLogout}
                    >
                        로그아웃
                    </button>
                </>
            )}
        </div>
    );
};
export default MyPage;
// customFetch hook 사용해보기