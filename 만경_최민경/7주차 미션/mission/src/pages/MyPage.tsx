import { useEffect, useRef, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaCog,FaPlus, FaTimes } from 'react-icons/fa';
import LpModal from "../components/LpCardModal";
import useUpdateProfile from "../hooks/muations/useUpdateProfile";



const MyPage = () => {
    const navigate=useNavigate();
    const {logout}=useAuth();
    const [data,setData]=useState<ResponseMyInfoDto>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    //Lp 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lpImage, setLpImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // 편집 모드 상태
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState<string>("");
    const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    
    const updateProfileMutation = useUpdateProfile();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const fileURL = URL.createObjectURL(e.target.files[0]);
        setLpImage(fileURL);
      }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      }
    };
    
    useEffect(()=> {
        const getData=async() =>{
            const response=await getMyInfo();
            console.log(response);

            setData(response);

            // 초기 데이터 설정
            setName(response.data?.name || "");
            setBio(response.data?.bio || "");
            setAvatar(response.data?.avatar || "");
            setPreviewUrl(response.data?.avatar || "");
        }
        getData();
    },[])

    const handleLogout=async()=> {
      await logout();
      navigate("/")
    }

    // 편집 모드 시작
  const startEditing = () => {
    setIsEditing(true);
    // 현재 값으로 편집 상태 초기화
    setName(data.data?.name || "");
    setBio(data.data?.bio || "");
    setPreviewUrl(data.data?.avatar || "");
    setNewAvatarFile(null);
  };
  
  // 편집 취소
  const cancelEditing = () => {
    setIsEditing(false);
    setPreviewUrl(data.data?.avatar || "");
  };
  
  // 프로필 업데이트 
  const saveProfile = () => {
    
    if (!name.trim()) {
      alert("이름은 필수 입력 항목입니다.");
      return;
    }
    
    const formData = new FormData();
    formData.append("name", name);
    
    
    if (bio.trim()) {
      formData.append("bio", bio);
    }
    
    if (newAvatarFile) {
      formData.append("avatar", newAvatarFile);
    }
    
    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        setIsEditing(false);
        // 성공 후 데이터 새로고침
        const refreshData = async () => {
          const response = await getMyInfo();
          setData(response);
        };
        refreshData();
      },
      onError: (error) => {
        console.error("프로필 업데이트 실패:", error);
        alert("프로필 업데이트에 실패했습니다.");
      }
    });
  };

return (
    <div className="flex justify-center pt-10 min-h-screen">
      <div className="w-full max-w-md px-6 py-8">
        {/* 프로필 섹션 */}
        <div className="mb-6">
          {/* 프로필 이미지 */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={isEditing ? previewUrl : data.data?.avatar as string || "default.png"}
                alt="프로필 이미지"
                className="w-32 h-32 rounded-full object-cover border border-gray-500"
              />
              {isEditing && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-pink-500 rounded-full p-2 cursor-pointer hover:bg-pink-600"
                  >
                    <FaCog size={14} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>
          
           <div className="text-center">
            {isEditing ? (
              <>
                
                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름 (필수)"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 text-center"
                    required
                  />
                </div>
                           
                <div className="mb-4">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="자기소개 (선택사항)"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 text-center"
                    rows={3}
                  />
                </div>
                            
                <p className="text-sm text-gray-500 mb-4">{data.data?.email}</p>
                           
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 flex items-center"
                    disabled={updateProfileMutation.isPending}
                  >
                    <FaTimes className="mr-1" /> 취소
                  </button>
                  <button
                    onClick={saveProfile}
                    className={`px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center
                            ${updateProfileMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? (
                      '저장 중...'
                    ) : (
                      <>
                        <FaCheck className="mr-1" /> 저장
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* 표시 모드 */}
                <h1 className="text-3xl font-bold mb-2">{data.data?.name}</h1>
                <p className="text-gray-400 mb-2">
                  {data.data?.bio || `안녕하세요. 저는 ${data.data?.name}입니다.`}
                </p>
                <p className="text-sm text-gray-500 mb-4">{data.data?.email}</p>
                
                {/* 편집 버튼 */}
                <button
                  onClick={startEditing}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center mx-auto"
                >
                  <FaCog className="mr-2" /> 프로필 설정
                </button>
              </>
            )}
          </div>
        </div>
    
        <button
          onClick={openModal}
          className="fixed bottom-6 left-6 w-14 h-14 rounded-full cursor-pointer bg-pink-500 
          text-white flex items-center justify-center shadow-lg hover:bg-pink-600 transition"
        >
          <FaPlus />
        </button>

        {/* LP 등록 모달 */}
        <LpModal
          isOpen={isModalOpen}
          onClose={closeModal}
          lpImage={lpImage}
          onImageChange={handleImageChange}
          imageFile={imageFile}
        />
      </div>
    </div>
  );
};

export default MyPage;