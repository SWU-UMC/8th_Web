import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { PAGINATION_ORDER } from "../enums/common";
import LpComment from "../components/comments/LpComment";
import { IoPencilOutline, IoTrashBin } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { useEffect, useState } from "react";
import LpCommentSkeleton from "../components/comments/LpCommentSkeleton";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import { useInView } from "react-intersection-observer";
import { AiOutlineHeart } from "react-icons/ai"; //좋아요 아이콘
const LpDetailPage = () => {
    const { lpId } = useParams();
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
    const { data, isError, isLoading } = useGetLpDetail(Number(lpId));

    const { data: comments, isFetching, hasNextPage, fetchNextPage } = 
      useGetInfiniteComments(Number(lpId), 3, order);
    const { ref, inView } = useInView({
      threshold: 0,
    });

    useEffect(() => {
      if (inView && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    console.log('comments:', comments);
    if (isLoading) {
      return <div>Loading...</div>;
    };

    if (isError) {
      return <div>Error...</div>;
    };

    console.log('data:', data);

    return (
      <div className="w-10/12 mx-auto mt-10">
      <div className="p-5 flex flex-col items-center justify-center text-white min-h-screen">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full text-xl flex justify-center bg-gray-700 text-gray-300">
              {data?.data.author.avatar ? (
                <img 
                  src={data.data.author.avatar} 
                  alt={data.data.author.name} 
                />
              ) : (
                <MdPerson />
              )}
            </div>
            <div> {data?.data.author.name} </div>
          </div>
          <div>
            {data?.data.createdAt.split("T")[0]}
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-4 mb-4">
          <h1 className="text-3xl font-bold mb-4">{data?.data.title}</h1>
          <div className="flex items-center gap-4">
            {/*좋아요 아이콘*/}
          <h1 className="text-3xl"><AiOutlineHeart className="text-red-500 cursor-pointer" /></h1>
            <div className="text-xl"> <IoPencilOutline /> </div>
            <div className="text-xl"> <IoTrashBin /> </div>
          </div>
        </div>
        {/*LP 이미지 돌아가기 추가*/}
        <div className="relative w-128 h-128 rounded-full overflow-hidden border-4 border-gray-700"
        style={{ animation: 'spin 5s linear infinite' }} // 5초로 설정
        >
          <img
            src={data?.data.thumbnail}
            alt={data?.data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="w-3/4">
          <p className="text-center text-gray-300 mt-6 px-4 w-full">{data?.data.content}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {data?.data.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
            >
              #{tag.name}
            </span>
          ))}
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
            placeholder="댓글을 입력해주세요..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors duration-200"
            onClick={() => {
              // 작성 버튼 클릭 시 동작
              console.log("댓글 작성 버튼 클릭");
            }}
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
        <div ref={ref}>
            {isFetching &&
                Array.from({ length: 3 }).map((_, idx) => (
                <LpCommentSkeleton key={idx} />
            ))}
        </div>

        </div>
      </div>
      </div>
    );
}

export default LpDetailPage
