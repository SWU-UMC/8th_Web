import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken);
  //mutate=> 비동기 요청을 실행하고, 콜백함수를 이용해서 후속 작업 처리함
  //mutateAsync-> Promise를 반환해서 await 사용가능
  const { mutate: likeMutate, mutateAsync } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  //   const isLiked = lp?.data.likes
  //     .map((like) => like.userId)
  //     .includes(me?.data.id as number);

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDisLikeLp = () => {
    disLikeMutate({ lpId: Number(lpId) });
  };

  if (isPending && isError) {
    return <></>;
  }

  //   return (
  //     <div className="{mt-12}">
  //       <h1>{lp?.data.title}</h1>
  //       <img src={lp?.data.thumbnail} alt={lp?.data.title} />
  //       <p> {lp?.data.content}</p>

  //       <button onClick={isLiked ? handleDisLikeLp : handleLikeLp}>
  //         <Heart
  //           color={isLiked ? "red" : "black"}
  //           fill={isLiked ? "red" : "transparent"}
  //         />
  //       </button>
  //     </div>
  //   );
  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-white">
      <div className="bg-zinc-800 p-6 rounded-xl max-w-xl w-full shadow-lg relative">
        {/* 작성자 & 제목 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <span className="text-sm font-medium">{lp?.data.author.name}</span>
          </div>
          <span className="text-xs text-gray-400">1일 전</span>
        </div>

        <h2 className="text-xl font-bold mb-4">{lp?.data.title}</h2>

        {/* 썸네일 (회전 애니메이션 추가) */}
        <div className="flex justify-center mb-6">
          <img
            src={lp?.data.thumbnail}
            alt={lp?.data.title}
            className="w-64 h-64 rounded-full object-cover border-4 border-black animate-spin-slow"
          />
        </div>

        {/* 콘텐츠 */}
        <p className="text-sm text-gray-200 mb-4 text-center">
          {lp?.data.content}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {lp?.data.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-700 px-3 py-1 rounded-full text-xs text-white"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 좋아요 버튼 */}
        <div className="flex justify-center">
          <button onClick={isLiked ? handleDisLikeLp : handleLikeLp}>
            <Heart
              color={isLiked ? "red" : "white"}
              fill={isLiked ? "red" : "transparent"}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
