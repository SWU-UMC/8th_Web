import { X } from "lucide-react";
import { RequestPostLpDto } from "../../types/lp";
import { useRef, useState } from "react";
import usePostLp from "../../hooks/mutations/usePostLp";
import axios from "axios";

interface PostLpCardProps {
    onClose: () => void;
}

const PostLpCard = ({ onClose }: { onClose: () => void }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    const { mutate: postLp } = usePostLp();

    const isFormValid = title.trim() && content.trim() && tags.length > 0 && thumbnail;

    const handleAddTag = () => {
        const newTag = tagInput.trim();
        if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
        }
    };

    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // 1. FormData에 파일 담기
            const formData = new FormData();
            formData.append("file", file);

            // 2. 서버로 업로드
            const res = await axios.post("/v1/uploads", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
            });

            // 3. 업로드된 이미지 URL을 thumbnail로 저장
            setThumbnail(res.data.imageUrl);
        }
    };

    const handleSubmit = () => {
        if (!isFormValid) return;

        const payload: RequestPostLpDto = {
        title,
        content,
        thumbnail: thumbnail ?? "",
        tags,
        published: true,
        };

        postLp(payload, {
        onSuccess: () => {
            onClose();
        },
        });
    };

    return (
        <div onClick={handleOverlayClick} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div ref={modalRef} className="bg-gray-800 text-white pt-12 px-6 rounded-xl max-w-md min-h-[500px] relative">
            {/* 닫기 버튼 */}
            <button className="absolute top-4 right-4 text-gray-300 hover:text-white" onClick={onClose}>
            <X size={20} />
            </button>

            {/* LP 이미지 */}
            <div className="flex justify-center mb-6 relative cursor-pointer" onClick={handleImageClick}>
            <img src="/images/lp.png" alt="LP" className="w-40 h-40 rounded-full object-cover" />
            {thumbnail && (
                <img
                src={thumbnail}
                alt="썸네일"
                className="absolute w-24 h-24 object-cover left-1/2 -translate-x-[130%] top-1/2 -translate-y-1/2 z-10 shadow-md border-2 border-white"
                />
            )}
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
            </div>

            {/* 입력 필드 */}
            <input
            type="text"
            placeholder="LP 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 text-white p-2 mb-3 rounded border border-gray-400"
            />
            <input
            type="text"
            placeholder="LP 설명"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-gray-800 text-white p-2 mb-3 rounded border border-gray-400"
            />

            {/* 태그 입력 */}
            <div className="flex mb-3">
            <input
                type="text"
                placeholder="태그 입력"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 mr-2 bg-gray-800 text-white p-2 rounded border border-gray-400"
            />
            <button onClick={handleAddTag} className="bg-gray-400 text-white px-4 rounded hover:bg-gray-300">
                Add
            </button>
            </div>

            {/* 태그 리스트 */}
            <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
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

            {/* 제출 버튼 */}
            <button
            className={`w-full py-2 rounded ${
                isFormValid ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-500 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid}
            >
            Add LP
            </button>
        </div>
        </div>
    );
    };

export default PostLpCard;