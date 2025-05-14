import { useEffect, useState } from "react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { RequestUpdateMyInfoDto } from "../types/auth";
import { FiSettings } from "react-icons/fi"; // 톱니바퀴 아이콘

const MyPage = () => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();
  const { data, refetch } = useGetMyInfo(accessToken);
  const { mutate } = useUpdateMyInfo();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<RequestUpdateMyInfoDto>({
    name: "",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    if (data?.data && !editMode) {
      setForm({
        name: data.data.name,
        bio: data.data.bio || "",
        avatar: data.data.avatar || "",
      });
    }
  }, [data, editMode]);

  const handleSave = () => {
    if (!form.name.trim()) {
      alert("이름은 필수입니다.");
      return;
    }

    mutate(form, {
      onSuccess: () => {
        alert("수정 완료!");
        setEditMode(false);
        refetch();
      },
      onError: () => {
        alert("수정 실패");
      },
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!data?.data) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="bg-zinc-800 p-6 rounded-xl w-full max-w-md shadow-lg relative">
        {!editMode && (
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setEditMode(true)}
          >
            <FiSettings size={30} />
          </button>
        )}

        {/* 프로필 이미지 */}
        <div className="flex justify-center mb-4">
          <img
            src={form.avatar || "/my_page.png"}
            alt="프로필 이미지"
            className="w-24 h-24 rounded-full bg-gray-400 object-cover"
          />
        </div>

        {editMode ? (
          <>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 mb-2 bg-zinc-900 border border-white rounded"
              placeholder="이름"
            />
            <input
              type="text"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full p-2 mb-2 bg-zinc-900 border border-white rounded"
              placeholder="소개"
            />
            {/* <input
              type="text"
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              className="w-full p-2 mb-2 bg-zinc-900 border border-white rounded"
              placeholder="이미지 URL"
            /> */}
            <button
              className="bg-white text-black px-4 py-2 rounded w-full hover:bg-gray-200"
              onClick={handleSave}
            >
              저장
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              {data.data.name}
            </h1>
            {data.data.bio && (
              <p className="text-center text-gray-300 mb-2">{data.data.bio}</p>
            )}
            <p className="text-center text-sm text-gray-400">
              {data.data.email}
            </p>
          </>
        )}

        <button
          className="mt-6 text-sm underline text-gray-400"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;

// import { useEffect, useState } from "react";
// import { getMyInfo } from "../apis/auth";
// import { ResponseMyInfoDto } from "../types/auth";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const MyPage = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [data, setData] = useState<ResponseMyInfoDto>();

//   useEffect(() => {
//     const getData = async () => {
//       const response = await getMyInfo();
//       console.log(response);

//       setData(response);
//     };

//     getData();
//   }, []);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/");
//   };
//   return (
//     <div>
//       <h1>{data?.data?.name}님 환영합니다.</h1>
//       <img src={data?.data?.avatar as string} alt={"구글 로고"} />
//       <h1>{data?.data?.email}</h1>

//       <button
//         className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
//         onClick={handleLogout}
//       >
//         로그아웃
//       </button>
//     </div>
//   );
// };

// export default MyPage;
