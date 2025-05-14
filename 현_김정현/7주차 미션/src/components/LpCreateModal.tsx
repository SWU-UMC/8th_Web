import { X } from "lucide-react";
import { useRef, useState } from "react";

const LpCreateModal = ({ onClose }: { onClose: () => void }) => {
    const [lpName, setLpName] = useState("");
    const [lpContent, setLpContent] = useState("");
    const [lpTag, setLpTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState<string | null>(null);

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
        const imageUrl = URL.createObjectURL(file);
        setThumbnail(imageUrl);
        }
    };

    const isFormValid = lpName && lpContent && tags.length > 0;

    const handleSubmit = () => {
        if (!isFormValid) return;
        console.log("LP 생성", { lpName, lpContent, tags, thumbnail });
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-800 text-white pt-12 px-6 rounded-xl w-full max-w-md min-h-[500px] relative">
            {/* 닫기 버튼 */}
            <button className="absolute top-4 right-4 text-gray-300 hover:text-white" onClick={onClose}>
            <X size={20} />
            </button>

            {/* LP 이미지 */}
            {/* LP 이미지 */}
            <div className="flex justify-center mb-6 relative cursor-pointer" onClick={handleImageClick}>
                <img src="/images/lp.png" alt="LP" className="w-40 h-40 rounded-full object-cover" />
                {thumbnail && (
                    <img
                    src={thumbnail}
                    alt="썸네일"
                    className="absolute w-40 h-40 object-cover top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 z-10 shadow-md"
                    />
                )}
                <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
            </div>
            {/* 입력 필드 */}
            <input
            type="text"
            placeholder="이름"
            className="w-full bg-gray-800 text-white p-2 mb-3 rounded border border-gray-400"
            />
            <input
            type="text"
            placeholder="LP Content"
            className="w-full bg-gray-800 text-white p-2 mb-3 rounded border border-gray-400"
            />

            <div className="flex mb-3">
            <input
                type="text"
                placeholder="LP Tag"
                value={lpTag}
                onChange={(e) => setLpTag(e.target.value)}
                className="flex-1 mr-2 bg-gray-800 text-white p-2 rounded border border-gray-400"
            />
            <button onClick={handleTagAdd} className="bg-gray-400 text-white px-4 rounded hover:bg-gray-300">Add</button>
            </div>
            {/* 태그 리스트 */}
            <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
                <span key={tag} className="bg-gray-800 text-white px-2 py-1 rounded text-xs flex items-center border border-gray-400">
                {tag}
                <button onClick={() => handleTagRemove(tag)} className="ml-2 text-white text-xs">
                    ✕
                </button>
                </span>
            ))}
            </div>

            <button className="bg-gray-400 text-white w-full py-2 rounded hover:bg-gray-300">
            Add LP
            </button>
        </div>
        </div>
    );
    };

export default LpCreateModal;