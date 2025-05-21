import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart, Image, Pencil, Save, Send, Trash2, UserRound } from "lucide-react";
import useGetMtInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { useEffect, useRef, useState } from "react";
import { getUserById } from "../apis/user";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import useGetInfiniteCommentList from "../hooks/queries/useGetInfiniteCommentList";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import { usePostComment } from "../hooks/mutations/usePostComment";
import CommentList from "../components/Comment/CommentList";

const LpDetailPage = () => {
    const {lpId} = useParams();
    const {accessToken, user} = useAuth();

    const {data:lp, isPending, isError} = useGetLpDetail({lpId:Number(lpId)});
    const {data:me} = useGetMtInfo(accessToken); 
    // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리
    // mutateAsync -> Promise를 반환해서 await 사용 가능v
    const {mutate:likeMutate} = usePostLike();
    const {mutate:disLikeMutate} = useDeleteLike();

    const { mutate: updateLp } = useUpdateLp();
    const { mutate: deleteLp } = useDeleteLp();
    const { mutate: postCommentMutate } = usePostComment(Number(lpId));

    const [author, setAuthor] = useState<any>(null);
    const [editMode, setEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editTags, setEditTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [editThumbnail, setEditThumbnail] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>(
        (localStorage.getItem("commentSortOrder") as PAGINATION_ORDER) || PAGINATION_ORDER.desc
    );
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {ref, inView} = useInView({
        threshold: 0,
    });
    const {
        data: comments,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useGetInfiniteCommentList(Number(lpId), commentOrder);

    // const isLiked = lp?.data.likes.map((like)=> like.userId).includes(me?.data.id as number);
    const isLiked = lp?.data.likes.some((like)=> like.userId === me?.data.id);

        
    useEffect(() => {
        if (lp) {
            setEditTitle(lp.data.title);
            setEditContent(lp.data.content);
            setEditTags(lp.data.tags.map((t) => t.name));
            setEditThumbnail(lp.data.thumbnail);
            }
        }, [lp]);

    const handleLikeLp = () => {
        likeMutate({lpId:Number(lpId)});
    }

    const handleDislikeLp = () => {
        me?.data.id && disLikeMutate({lpId:Number(lpId)});
    }
    const handleEditToggle = () => setEditMode(!editMode);

    const handleAddTag = () => {
        const newTag = tagInput.trim();
        if (newTag && !editTags.includes(newTag)) {
        setEditTags([...editTags, newTag]);
        setTagInput("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        setEditTags(editTags.filter((t) => t !== tag));
    };

    const handleSave = () => {
        updateLp({
        lpId: Number(lpId),
        title: editTitle,
        content: editContent,
        thumbnail: editThumbnail,
        published: true,
        tags: editTags,
    
        });
        setEditMode(false);
    };

    const handleDelete = () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            deleteLp(
                { lpId: Number(lpId) },
                {
                    onSuccess: () => {
                        alert("삭제되었습니다.");
                        navigate("/");
                    },
                    onError: (error) => {
                        console.error("삭제 실패:", error);
                        alert("삭제 중 오류가 발생했습니다.");
                    },
                }
            );
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditThumbnail(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const navigate = useNavigate();


    if (isPending && isError) {
        return 
    }

    // 작성자 정보 요청
    useEffect(() => {const fetchAuthor = async () => {
        if (!lp?.data.authorId) return;
        try {
            const res = await getUserById(lp.data.authorId);
            setAuthor(res.data);
        } catch (e) {
            console.error("작성자 정보를 불러오지 못했습니다.", e);
        }};
        fetchAuthor();
    }, [lp?.data.authorId]);

    useEffect(() => {
        if (inView && hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetching, fetchNextPage]);

    useEffect(() => {
        localStorage.setItem("commentSortOrder", commentOrder);
    }, [commentOrder]);

    if (isPending || isError) {
        return <div className="text-white text-center mt-10">로딩 중입니다...</div>;
    }
    console.log("썸네일 URL:", lp?.data.thumbnail);

    return (
        <div className="text-white bg-[#1c1c1c] rounded-xl p-6 md:p-10 max-w-xl mx-auto mt-8 flex flex-col items-center text-center shadow-xl">
        {/* 작성자 정보 */}
        <div className="flex items-center gap-3 mb-4 w-full justify-between">
            <div className="flex items-center gap-2">
            {author?.avatar ? (
                <img src={author.avatar} className="w-8 h-8 rounded-full object-cover" />
            ) : (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <UserRound className="text-white w-5 h-5" />
                </div>
            )}
            <span className="text-sm font-semibold">{author?.name}</span>
            </div>
            <span className="text-xs text-gray-400">
            {lp?.data.updatedAt && new Date(lp.data.updatedAt).toLocaleDateString("ko-KR")}
            </span>
        </div>

        {/* 제목 & 버튼 */}
        <div className="flex items-center justify-between w-full mb-6">
            {editMode ? (
            <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 bg-gray-800 text-white text-lg font-bold p-2 mr-4 rounded"
            />
            ) : (
            <h1 className="text-xl font-bold text-left">{lp?.data.title}</h1>
            )}
            <div className="flex gap-3 items-center">
            {editMode && (
                <>
                <button onClick={handleImageClick}>
                    <Image size={20} />
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />
                </>
            )}
            <button onClick={editMode ? handleSave : handleEditToggle} className="text-white hover:text-green-400 cursor-pointer">
                {editMode ? <Save size={20} /> : <Pencil size={20} />}
            </button>
            <button onClick={handleDelete} className="text-white hover:text-red-500 cursor-pointer">
                <Trash2 size={20} />
            </button>
            </div>
        </div>

        {/* 썸네일 */}
        <div className="w-64 h-64 mb-8 relative">
            <img
            src={editThumbnail}
            alt="썸네일"
            className="rounded-lg w-full h-full object-cover shadow-lg"
            />
        </div>

        {/* 내용 */}
        {editMode ? (
            <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full bg-gray-800 text-white p-2 rounded border border-gray-400 mb-4"
            rows={5}
            />
        ) : (
            <p className="text-sm text-gray-300 leading-relaxed mb-8 whitespace-pre-wrap">
            {lp?.data.content}
            </p>
        )}

        {/* 태그 */}
        {editMode ? (
            <>
            <div className="flex mb-3 w-full">
                <input
                type="text"
                placeholder="태그 입력"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 mr-2 bg-gray-800 text-white p-2 rounded border border-gray-400"
                />
                <button onClick={handleAddTag} className="bg-gray-500 text-white px-4 rounded hover:bg-pink-500 cursor-pointer">
                Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4 w-full">
                {editTags.map((tag) => (
                <span
                    key={tag}
                    className="bg-gray-800 text-white px-2 py-1 rounded text-xs flex items-center border border-gray-400"
                >
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-white text-xs">
                    ✕
                    </button>
                </span>
                ))}
            </div>
            </>
        ) : (
            lp?.data.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {lp.data.tags.map((tag) => (
                    <span
                        key={tag.id}
                        className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                    >
                        # {tag.name}
                    </span>
                    ))}
                </div>
            )
        )
    }

        {/* 좋아요 */}
        <button
            onClick={isLiked ? handleDislikeLp : handleLikeLp}
            className="flex items-center space-x-1 text-pink-500 cursor-pointer"
        >
            <Heart size={16} fill={isLiked ? "currentColor" : "transparent"} />
            <span className="text-sm">{lp?.data.likes.length}</span>
        </button>

        {/* 댓글 */}
        <div className="mt-10 w-full text-left">
            <div className="flex justify-between space-x-2 mb-2">
            <h2 className="text-white text-lg font-bold mb-2">댓글</h2>
            <div className="flex border rounded-sm overflow-hidden">
                <button
                    onClick={() => setCommentOrder(PAGINATION_ORDER.asc)}
                    className={`px-3 py-1 cursor-pointer text-sm ${
                        commentOrder === PAGINATION_ORDER.asc ? "bg-white text-black font-bold" : "bg-black text-white"
                    }`}>
                    오래된 순
                </button>
                <button
                    onClick={() => setCommentOrder(PAGINATION_ORDER.desc)}
                    className={`px-3 py-1 cursor-pointer text-sm ${
                        commentOrder === PAGINATION_ORDER.desc ? "bg-white text-black font-bold" : "bg-black text-white"
                    }`}>
                    최신 순
                </button>
            </div>
            </div>
            <div className="flex items-center gap-2 pt-4">
                <input
                    type="text"
                    className="flex-1 bg-[#1c1c1c] text-white p-2 rounded border border-gray-400"
                    placeholder="댓글을 입력해주세요"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                />
                <button className="p-2 bg-gray-600 rounded hover:bg-pink-500 text-sm cursor-pointer"
                onClick={() => {
                    if (commentContent.trim()) {
                        postCommentMutate(commentContent);
                        setCommentContent(""); // 전송 후 초기화
                    }
                }}>
                    작성
                </button>
            </div>

            <div className="space-y-4 pt-5">
                <CommentList lpId={Number(lpId)} order={commentOrder} />
            </div>

            {hasNextPage && (
            <div ref={ref} className="h-6 mt-4">
                {isFetching && <p className="text-gray-400 text-sm">불러오는 중...</p>}
            </div>
            )}
        </div>
        </div>
    );
}

export default LpDetailPage;
