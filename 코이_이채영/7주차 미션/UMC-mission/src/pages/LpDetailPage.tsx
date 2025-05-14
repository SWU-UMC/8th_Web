import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { getLpDetail } from "../apis/lp";
import { Likes, ResponseLpDetailDto } from "../types/lp";
import LpImage from "../assets/lp.png";
import Profile from "../assets/profile.png"
import CommentList from "../components/CommentCard/CommentList";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useLpDelete from "../hooks/mutations/useLpDelete";
import useLpUpdate from "../hooks/mutations/useLpUpdate";

const LpDetailPage = () => {
    const { lpId } = useParams<{ lpId: string }>();
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const [lpData, setLpData] = useState<ResponseLpDetailDto["data"] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [likesCount, setLikesCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState(false);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>("");
    const [editContent, setEditContent] = useState<string>("");
    const [editThumbnail, setEditThumbnail] = useState<string>("");
    const [editTags, setEditTags] = useState<{ id: number; name: string }[]>([]);

    const { data: me } = useGetMyInfo(accessToken);
    const { mutate: likeMutate } = usePostLike();
    const { mutate: disLikeMutate } = useDeleteLike();
    const { mutate: deleteLpMutate } = useLpDelete();
    const { mutate: updateLpMutate } = useLpUpdate(Number(lpId));

    useEffect(() => {
        const fetchLpData = async () => {
            if (!lpId) return;
            try {
                setLoading(true);
                const response = await getLpDetail(parseInt(lpId));
                if (response.data) {
                    setLpData(response.data);
                    setLikesCount(response.data.likes.length);
                    setEditTitle(response.data.title);
                    setEditContent(response.data.content);
                    setEditThumbnail(response.data.thumbnail);
                    setEditTags(response.data.tags);

                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching LP data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLpData();
    }, [lpId, navigate, me]);

    useEffect(() => {
        if (lpData && me) {
            const liked = lpData.likes.some((like: Likes) => like.userId === me.data.id);
            setIsLiked(liked);
        }
    }, [lpData, me]);
    
    const handleLikeLp = () => {
        if (!lpData || !me) return;

        likeMutate({ lpId: Number(lpId) });

        setLikesCount((prev) => prev + 1);
        setIsLiked(true);
    };

    const handleDisLikeLp = () => {
        if (!lpData || !me) return;

        disLikeMutate({ lpId: Number(lpId) });

        setLikesCount((prev) => prev - 1);
        setIsLiked(false);
    };

    const handleDelete = () => {
        if (!lpId) return;

        if (window.confirm("정말로 이 LP를 삭제하시겠습니까?")) {
            deleteLpMutate(Number(lpId), {
                onSuccess: () => {
                    alert("LP가 삭제되었습니다!");
                    navigate("/"); // 삭제 후 홈이나 목록으로 이동
                },
                onError: (error) => {
                    console.error("삭제 실패:", error);
                    alert("LP 삭제에 실패했습니다.");
                },
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!lpData) {
        return <div>LP를 찾을 수 없습니다.</div>;
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        if (!editTitle || !editContent || !editThumbnail) {
            alert("모든 필드를 채워주세요.");
            return;
        }

        const updatedLpData = {
            title: editTitle,
            content: editContent,
            thumbnail: editThumbnail,
            tags: editTags.map((tag) => tag.name),
            published: true,
        };

        try {
            updateLpMutate(updatedLpData);
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error("수정 실패:", error);
            alert("LP 수정에 실패했습니다.");
        }
    };

    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditThumbnail(reader.result as string); // 이미지 URL로 상태 업데이트
            };
            reader.readAsDataURL(file); // 파일을 읽어 데이터 URL로 변환
        }
    };

    const parsedLpId = lpId ? parseInt(lpId) : undefined;

    return (
        <div className="text-white bg-[#1c1c1c] rounded-xl p-10 max-w-[700px] mx-auto flex flex-col text-center">
            <div>
                <div className="mt-4 flex items-center gap-2">
                    <img
                        src={lpData.author.avatar || Profile}
                        alt={lpData.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />

                    <h3 className="text-lg font-bold">{lpData.author.name}</h3>
                </div>

                <div className="flex justify-between items-center mt-8">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="text-2xl font-bold bg-transparent border-b border-gray-400 focus:outline-none focus:border-white text-white mr-8 w-full"
                            placeholder="제목을 입력하세요"
                        />
                    ) : (
                        <h1 className="text-2xl text-left font-bold mr-8">{lpData.title}</h1>
                    )}


                    <div className="flex gap-4">

                        {me?.data.id === lpData.authorId && (
                            <>
                                {isEditing ? (
                                    <>
                                        <button onClick={handleSaveEdit} className="text-md border-1 border-white px-3 rounded-md" style={{ whiteSpace: 'nowrap' }}>저장</button>
                                        <button onClick={handleCancelEdit} className="text-md border-1 border-red-500 px-3 text-red-500 rounded-md" style={{ whiteSpace: 'nowrap' }}>취소</button>
                                    </>
                                ) : (
                                    <button onClick={handleEdit} className="text-xl"><FaEdit /></button>
                                )}
                                <button onClick={handleDelete} className="text-xl text-red-500">
                                    <FaTrash />
                                </button>
                            </>
                        )}

                        <div className="flex items-center gap-2 bg-[#333333] rounded-full px-4 py-2">
                            <button onClick={isLiked ? handleDisLikeLp : handleLikeLp} className="text-xl">
                                {isLiked ? (
                                    <FaHeart color="red" />
                                ) : (
                                    <FaRegHeart color="white" />
                                )}
                            </button>
                            <span className="text-sm">{likesCount}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center mt-12 mb-12 translate-x-[-80px]">
                    <div className="relative w-64 h-64">
                        <img
                            src={LpImage}
                            alt="Spinning LP"
                            className="absolute opacity-50 top-2 left-40 w-60 h-60 object-cover animate-[spin_5s_linear_infinite] pointer-events-none"
                        />
                        <img
                            src={isEditing ? editThumbnail : lpData.thumbnail}
                            alt={lpData.title}
                            className="w-64 h-64 object-cover rounded-lg relative z-10 cursor-pointer"
                            onClick={() => {
                                if (isEditing) {
                                    document.getElementById("thumbnailInput")?.click();
                                }
                            }}
                        />
                        {isEditing && (
                            <input
                                id="thumbnailInput"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                            />
                        )}
                    </div>
                </div>

                <div className="mb-8 text-left">
                    <div className="bg-[#2c2c2c] p-5 rounded-md border border-gray-300 leading-relaxed shadow-md">
                        {isEditing ? (
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="bg-[#333333] text-white p-2 rounded w-full text-sm"
                                rows={5}
                            />
                        ) : (
                            <p className="whitespace-pre-wrap text-sm text-gray-200">{lpData.content}</p>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                        {isEditing ? (
                            <div className="flex flex-wrap gap-2">
                                {editTags.map((tag, index) => (
                                    <div key={index} className="flex items-center bg-gray-700 rounded-full px-2">
                                        <input
                                            type="text"
                                            value={tag.name}
                                            onChange={(e) => {
                                                const newTags = [...editTags];
                                                newTags[index].name = e.target.value;
                                                setEditTags(newTags);
                                            }}
                                            className="bg-gray-700 text-white py-1 px-1 min-w-15 rounded-l-full text-sm focus:outline-none"
                                            placeholder="태그 입력"
                                            style={{ width: `${tag.name.length + 3}ch` }} // 글자 수에 따라 동적으로 넓이 조정
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newTags = editTags.filter((_, i) => i !== index);
                                                setEditTags(newTags); // 태그 삭제
                                            }}
                                            className="text-gray-500 bg-transparent hover:text-red-500 rounded-full p-1"
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setEditTags([...editTags, { id: Date.now(), name: "" }])}
                                    className="bg-[#ff1490] px-2 py-1 rounded-full text-white text-sm hover:bg-pink-600"
                                >
                                    태그 추가
                                </button>
                            </div>
                        ) : (
                            lpData.tags.map((tag) => (
                                <span key={tag.id} className="bg-gray-700 text-white py-1 px-3 rounded-full text-sm">
                                    #{tag.name}
                                </span>
                            ))
                        )}
                    </div>

                </div>
            </div>
            {parsedLpId && <CommentList lpId={parsedLpId} />}
        </div>
    );
};

export default LpDetailPage;
