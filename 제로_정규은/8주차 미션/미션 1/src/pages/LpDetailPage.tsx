import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { PAGINATION_ORDER } from "../enums/common";
import LpComment from "../components/comments/LpComment";
import { IoPencilOutline, IoTrashBin } from "react-icons/io5";
import { MdCheck, MdPerson } from "react-icons/md";
import { useEffect, useState } from "react";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { IoMdHeart } from "react-icons/io";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import usepPostComment from "../hooks/mutations/useComment";
import { useDeleteLp, useUpdateLp } from "../hooks/mutations/useLpDetail";
import { queryClient } from "../App";
import { QUERY_KEY } from "../constants/key";

const LpDetailPage = () => {
  const navigate = useNavigate();
    const { lpId } = useParams();
    const { accessToken } = useAuth();
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
    const { data: lp, isError, isLoading } = useGetLpDetail({lpId: Number(lpId)});
    const { data: comments, isFetching, hasNextPage, fetchNextPage } = 
      useGetInfiniteComments(Number(lpId), 3, order);
    const { ref, inView } = useInView({
      threshold: 0,
    });

    const {data: me} = useGetMyInfo(accessToken);
    const isMe = me?.data.id === lp?.data.author.id;
    useEffect(() => {
      if (lp?.data?.tags) {
        setTags(lp.data.tags);
      }
    }, [lp?.data?.tags]);

    const {mutate: updateLp} = useUpdateLp();
    const {mutate: deleteLp} = useDeleteLp();

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(lp?.data.title || "");
    const [content, setContent] = useState(lp?.data.content || ""); // 내용 상태
    const [thumbnail, setThumbnail] = useState(lp?.data.thumbnail || ""); // 썸네일 상태
    const [tags, setTags] = useState(lp?.data.tags || []); // 태그 상태
    const [newTag, setNewTag] = useState(""); // 새 태그 입력 상태

    const handleEditLp = () => {
      setIsEditing(true);
      setTitle(lp?.data.title || "");
      setContent(lp?.data.content || "");
      setThumbnail(lp?.data.thumbnail || "");
      setTags(lp?.data.tags || []);
    };

    const saveEditLp = () => {
      updateLp({
        lpId: Number(lpId),
        title,
        content,
        thumbnail,
        tags: tags.map((tag) => tag.name),
        published: true,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          // LP 상세 정보 쿼리를 무효화하여 최신 데이터 다시 가져오기
          queryClient.invalidateQueries({
              queryKey: [QUERY_KEY.lps, Number(lpId)], 
              exact: true,
          });
          alert("저장되었습니다!"); 
        },
      },)
    };

    const handleDeleteTag = (tagId: number) => {
      setTags(tags.filter((tag) => tag.id !== tagId));
    };

    const handleAddTag = () => {
      if (!newTag.trim()) return;
      setTags([...tags, { id: Date.now(), name: newTag }]); // 임시 ID 생성
      setNewTag("");
    };

    const handleDeleteLp = () => {
      deleteLp({lpId: Number(lpId)});
      navigate("/my");
    };

    const {mutate: likeMutate} = usePostLike();
    const {mutate: dislikeMutate} = useDeleteLike();

    const {mutate: sendComment} = usepPostComment();

    const isLiked = lp?.data.likes
      .map((like) => like.userId)
      .includes(me?.data.id as number);

    const handleLikeLp = () => {
      likeMutate({lpId: Number(lpId)});
    };

    const handleDislikeLp = () => {
      dislikeMutate({lpId: Number(lpId)});
    };

    const [comment, setComment] = useState<string>("");
    const handleSendComment = () => {
      if (!comment.trim()) {
        alert("댓글을 입력하세요."); // 댓글이 비어있을 경우 경고창 표시
        return;
      }
      sendComment({lpId: Number(lpId), content: comment});
      setComment("");
    };

    useEffect(() => {
      if (inView && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if (isLoading) {
      return <div>Loading...</div>;
    };

    if (isError) {
      return <div>Error...</div>;
    };
    if (!lp) return null;
    return (
      <div className="w-10/12 mx-auto mt-10">
      <div className="p-5 flex flex-col items-center justify-center text-white min-h-screen">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full text-xl flex items-center justify-center bg-gray-700 text-gray-300">
              {lp.data.author.avatar ? (
                <img 
                  src={lp.data.author.avatar} 
                  alt={lp.data.author.name} 
                />
              ) : (
                <MdPerson />
              )}
            </div>
            <div className="text-xl font-bold"> {lp.data.author.name} </div>
          </div>
          <div>
            {lp.data.createdAt.split("T")[0]}
          </div>
        </div>
        <div className="flex items-center justify-around w-full gap-4 mb-4">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold mb-4 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <h1 className="text-3xl font-bold mb-4">{lp.data.title}</h1>
          )}

          {isMe && (
            <div className="flex items-center gap-4">
              {isEditing ? (
                <button className="text-xl" onClick={saveEditLp}>
                  <MdCheck />
                </button>
              ) : (
                <>
                  <button className="text-xl" onClick={handleEditLp}> <IoPencilOutline /> </button>
                  <button className="text-xl" onClick={handleDeleteLp}> <IoTrashBin /> </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="relative w-128 h-128 rounded-full overflow-hidden border-4 border-gray-700 animate-spin-slow">
          <img
            src={lp.data.thumbnail || "https://media.istockphoto.com/id/1408806884/photo/12-inch-vinyl-lp-record-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=RF9dJiOjNmu4pmLSnNWITncbOspZ7BYvTyAQis_OK1U="}
            alt={lp.data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        {isEditing && (
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="썸네일 URL을 입력하세요"
            className="mt-4 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        )}
        <div className="w-3/4">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="text-center text-gray-300 mt-6 px-4 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-center text-gray-300 mt-6 px-4 w-full">
              {lp.data.content}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
            >
              #{tag.name}
              {isEditing && (
                <button
                  className="m-1 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteTag(tag.id)}
                >
                  x
                </button>
              )}
            </span>
          ))}
        </div>
        {isEditing && (
          <div className="flex items-center gap-2 mt-4">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="태그를 입력하세요"
              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors duration-200"
              onClick={handleAddTag}
            >
              추가
            </button>
          </div>
        )}

        <div className="flex items-center justify-center text-xl my-4 gap-2">
          <button className={`items-center ${isLiked ? "text-red-500": ""}`} 
            onClick={isLiked ? handleDislikeLp : handleLikeLp}>
            <IoMdHeart />
          </button>
          <div> {lp.data.likes.length} </div>
        </div>
        <div className="flex items-center justify-between w-full mt-4 mb-4">
          <div>댓글</div>
          <div className="flex border border-gray-300 rounded overflow-hidden text-sm font-bold">
            <button
              className={`px-4 py-2 text-center w-30 ${
                order === PAGINATION_ORDER.asc
                ? "bg-white text-black"
                : "bg-black text-white"
              }`}
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
            >
              오래된 순
            </button>
            <button
              className={`px-4 py-2 text-center w-30 ${
                order === PAGINATION_ORDER.asc
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
            >
              최신순
            </button>
          </div>
        </div>
        <div className="flex items-center w-full m-2 gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors duration-200"
            onClick={handleSendComment}
          >
            작성
          </button>
        </div>
      <div className="w-full mt-2">
        
        {comments?.pages?.map((page) => page.data.data)
          ?.flat()
          ?.map((comment) => (
            <LpComment key={comment.id} comment={comment} />
          ))}
          <div ref={ref}>{isFetching && <LpCardSkeletonList count={5} />}</div>
        </div>
      </div>
      </div>
    );
}

export default LpDetailPage