import { useRef, useState } from "react";
import { X } from "lucide-react";
import usePostLp from "../hooks/mutations/usePostLp";

const LpCreateModal = ({ onClose }: { onClose: () => void }) => {
const [lpName, setLpName] = useState("");
const [lpContent, setLpContent] = useState("");
const [lpTag, setLpTag] = useState("");
const [tags, setTags] = useState<string[]>([]);
const [thumbnail, setThumbnail] = useState<string | null>(null);

const { mutate: postLp } = usePostLp();
const fileInputRef = useRef<HTMLInputElement | null>(null);

const handleTagAdd = () => {
    if (lpTag.trim() && !tags.includes(lpTag.trim())) {
    setTags([...tags, lpTag.trim()]);
    setLpTag("");
    }
};

const handleTagRemove = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
};

const handleImageClick = () => {
    fileInputRef.current?.click();
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
        setThumbnail(reader.result as string);
    };
    reader.readAsDataURL(file);
    }
};

const isFormValid = lpName.trim() !== "" && lpContent.trim() !== "" && tags.length > 0;

const handleSubmit = () => {
    if (!isFormValid) return;

    postLp({
    title: lpName,
    content: lpContent,
    thumbnail: thumbnail ?? "",
    tags: tags,
    published: true,
    });

    onClose();
};

return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-[#1c1c1c] rounded-lg px-6 py-10 w-[350px] min-h-[500px] relative text-white flex flex-col justify-center">
        {/* 닫기 버튼 */}
        <button className="absolute top-4 right-4 text-white text-xl" onClick={onClose}>
        ✕
        </button>

        {/* LP 이미지와 썸네일 */}
        <div className="relative flex justify-center mb-10 cursor-pointer" onClick={handleImageClick}>
        <img
            src="/images/lp.png"
            alt="LP"
            className={`w-42 h-42 rounded-full object-cover transition-all duration-300 
            ${thumbnail ? 'translate-x-[25%]' : ''}`}
        />

        {thumbnail && (
            <img
            src={thumbnail}
            alt="썸네일"
            className="absolute w-42 h-42 object-cover top-1/2 left-1/2 -translate-x-[75%] -translate-y-1/2 z-10 shadow-md"
            />
        )}

        <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
        />
        </div>

        {/* 입력 필드 */}
        <input
        placeholder="LP Name"
        value={lpName}
        onChange={(e) => setLpName(e.target.value)}
        className="w-full mb-3 p-2 bg-gray-800 text-white rounded outline-none"
        />
        <input
        placeholder="LP Content"
        value={lpContent}
        onChange={(e) => setLpContent(e.target.value)}
        className="w-full mb-3 p-2 bg-gray-800 text-white rounded outline-none"
        />

        {/* 태그 입력 */}
        <div className="flex mb-3">
        <input
            placeholder="LP Tag"
            value={lpTag}
            onChange={(e) => setLpTag(e.target.value)}
            className="flex-1 p-2 bg-gray-800 text-white rounded-l outline-none"
        />
        <button
            onClick={handleTagAdd}
            className="bg-gray-500 hover:bg-gray-400 text-white px-3 rounded-r text-sm"
        >
            Add
        </button>
        </div>

        {/* 태그 리스트 */}
        <div className="flex flex-wrap gap-2 mb-6">
        {tags.map(tag => (
            <span key={tag} className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs flex items-center">
            {tag}
            <button onClick={() => handleTagRemove(tag)} className="ml-2 text-white text-xs">
                ✕
            </button>
            </span>
        ))}
        </div>

        {/* 제출 버튼 */}
        <button
        disabled={!isFormValid}
        onClick={handleSubmit}
        className={`w-full py-2 rounded ${
            isFormValid ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-500 cursor-not-allowed"
        } text-white font-semibold`}
        >
        Add LP
        </button>
    </div>
    </div>
);
};

export default LpCreateModal;