import { useParams } from "react-router-dom";
import CommentCard from "../components/CommentCard/CommentCard";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Likes, Tag } from "../types/lp";
import { FaHeart, FaRegHeart,FaCheckSquare } from 'react-icons/fa';
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/muations/usePostLike";
import useDeleteLike from "../hooks/muations/useDeleteLike";
import { useEffect, useState } from "react";
import { queryClient } from "../App";
import { MdEdit, MdCancel, MdDelete} from "react-icons/md";




const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const {accessToken}=useAuth();
  const {data:me}= useGetMyInfo(accessToken);
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [lpImage, setLpImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editTitle, setEditTitle]=useState("");
  const [isEditing, setIsEditing] = useState(false);

  // mutate -> 비동기 요청을 실행하고, 콜백함수를 이용해서 후속 작업 처리함
  const {mutate:likeMutate}= usePostLike()
  const {mutate:dislikeMutate}= useDeleteLike()


  const handleLikeLp= ()=>{
    // me?.data.id && 
    likeMutate({lpId:Number(lpId)})
  }

  const handleDislikeLp= ()=>{
    dislikeMutate({lpId:Number(lpId)})
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLpImage(null);
    setImageFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setLpImage(URL.createObjectURL(file));
    }
  };

  // LP 생성 성공 후 콜백
  const handleLpCreated = () => {
    // LP 목록 쿼리 무효화 (새로고침)
    queryClient.invalidateQueries({ queryKey: ['lps'] });
    // 모달 닫기
    handleCloseModal();
  };

  const { data: lp, isLoading: loading, isError } = useGetLpDetail({
    lpId: Number(lpId),
  });

  // const isLiked=lp?.likes
  // .map((like: Likes)=>like.userId)
  // .includes(me?.data.id as number);
  const isLiked = lp?.likes?.some((like: Likes) => like.userId === me?.data.id)

  const toggleEditMode = () => {
  setIsEditing(!isEditing);
  };

  const handleApplyEdit = () => {
     if (!lp) return; 
    // LP 제목 바꿔주기
    lp.title = editTitle;
    // LP 이미지 바꿔주기
    if (lpImage) {
      lp.thumbnail = lpImage;
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    if (!lp) return; 
  setEditTitle(lp.title);  // 원래 제목으로 복구
  setLpImage(lp.thumbnail);    // 원래 이미지로 복구 (이미지도 같이)
  setIsEditing(false);         // 편집모드 종료
  };

  useEffect(() => {
  if (lp) {
    setEditTitle(lp.title);
    setLpImage(lp.thumbnail);
    }
  }, [lp]);

  
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  }

  if (isError || !lp) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-black text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  // LP 생성일 포맷팅
  const formattedDate = new Date(lp.createdAt).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* 작성자 정보 및 날짜 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs">
              {lp.author?.name?.charAt(0) || lp.authorId}
            </div>
            <span>작성자 {lp.author?.name || lp.authorId}</span>
          </div>
          <div className="text-gray-400 text-sm">{formattedDate}</div>
        </div>
        
        {/* LP 제목 및 편집 버튼 */}
        <div className="w-full mb-4 flex justify-between items-center">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border border-gray-30 w-[450px] rounded-md px-2 py-1"
            />
          ) : (
            <h1 className="text-2xl font-bold">{lp.title}</h1>
          )}
          
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <button onClick={toggleEditMode} className="text-black">
                  <MdEdit className="w-5 h-5" />
                </button>
                <button 
                  className="px-3 py-1 text-black rounded-md text-sm cursor-pointer "
                  onClick={handleCloseModal}
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button onClick={handleApplyEdit} className="text-black">
                  <FaCheckSquare className="w-6 h-6" />
                </button>
                <button onClick={handleCancelEdit} className="text-black">
                  <MdCancel className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* LP 이미지 */}
        <div className="relative aspect-square mb-6 bg-gray-900 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 h-3/4 rounded-full overflow-hidden shadow-lg">
              {lp.thumbnail ? (
                <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-600" />
              )}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/6 h-1/6 bg-white rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="transform rotate-45 text-white font-bold text-2xl opacity-80">
                  {lp.title}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 태그 목록 */}
        {lp.tags && lp.tags.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">태그</h3>
            <div className="flex flex-wrap gap-2">
              {lp.tags.map((tag: Tag) => (
                <span key={tag.id} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* 좋아요 정보 */}
      <div onClick={isLiked ? handleDislikeLp:handleLikeLp} 
        className="flex items-center gap-2 cursor-pointer text-black">
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span>{lp.likes?.length || 0}개</span>     
        </div>
        {lpId && <CommentCard lpId={parseInt(lpId, 10)} />}
      </div>
      
    </div>

  );
};

export default LpDetailPage;