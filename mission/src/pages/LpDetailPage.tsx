import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { formatDistanceToNow } from "date-fns";

const LpDetailPage = () => {
  const { lpid } = useParams();
  const lpId = Number(lpid);
  const { data: lp, isLoading, isError } = useGetLpDetail(lpId);

  if (isLoading) return <div className="text-white p-6">Loading...</div>;
  if (isError || !lp)
    return <div className="text-white p-6">LP 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center py-10 px-4">
      <div className="bg-gray-800 rounded-xl shadow-md w-full max-w-2xl p-6">
        {/* 작성자 & 시간 */}
        <div className="text-sm text-gray-400 mb-4 flex justify-between items-center">
          <span className="font-semibold">{lp.author.name}</span>
          <span>
            {formatDistanceToNow(new Date(lp.createdAt), { addSuffix: true })}
          </span>
        </div>

        {/* CD 썸네일 */}
        <div className="flex justify-center mb-6">
          <div className="w-64 h-64 bg-black rounded-full overflow-hidden shadow-lg border-4 border-gray-700">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold mb-3 text-center">{lp.title}</h1>

        {/* 내용 */}
        <p className="text-gray-200 text-center mb-6">{lp.content}</p>

        {/* 태그 */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 좋아요 */}
        <div className="text-center text-pink-500">❤️ {lp.likes.length}</div>
      </div>
    </div>
  );
};

export default LpDetailPage;
