import { useRef, useState } from "react";
import { X } from "lucide-react";
import usePostLp from "../../hooks/mutations/usePostLp";
import { uploadImage } from "../../apis/lp";

interface Props {
  onClose: () => void;
}

const LpModal = ({ onClose }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("/lp_basic.png");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const { mutate: postLpMutate } = usePostLp();

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadedUrl = await uploadImage(file);
        setCustomImage(uploadedUrl); // LP 모달에서 보여줄 이미지
        setThumbnail(uploadedUrl); // 서버 전송용 URL
      } catch (err) {
        alert("이미지 업로드에 실패했습니다.");
        console.error(err);
      }
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handlePostLp = () => {
    if (!title || !content || !thumbnail) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    postLpMutate({
      title,
      content,
      thumbnail,
      tags,
    });

    onClose(); // 성공 시 닫기
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-800 p-6 rounded-xl w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-white">
          <X />
        </button>

        {/* 썸네일 영역 */}
        <div className="flex justify-center mb-4 relative w-full h-40">
          {customImage && (
            <img
              src={customImage}
              alt="업로드 이미지"
              className="w-40 h-40 object-cover rounded z-20 absolute left-1/2 -translate-x-1/2"
            />
          )}
          <img
            src="/lp_basic.png"
            alt="LP 기본 이미지"
            onClick={handleThumbnailClick}
            className={`w-32 h-32 object-cover rounded-full cursor-pointer transition-all duration-200 z-10 ${
              customImage ? "absolute right-10 top-1/2 -translate-y-1/2" : ""
            }`}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* 입력 필드 */}
        <input
          type="text"
          placeholder="LP Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 rounded bg-zinc-700 text-white"
        />
        <input
          type="text"
          placeholder="LP Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-2 p-2 rounded bg-zinc-700 text-white"
        />

        {/* 태그 입력 */}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="LP Tag"
            className="flex-1 p-2 rounded bg-zinc-700 text-white"
          />
          <button
            onClick={handleAddTag}
            className="bg-gray-500 px-3 py-2 rounded text-white text-sm"
          >
            Add
          </button>
        </div>

        {/* 태그 목록 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-zinc-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm"
            >
              {tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={handlePostLp}
          className="w-full bg-pink-600 text-white font-semibold py-2 rounded mt-2"
        >
          Add LP
        </button>
      </div>
    </div>
  );
};

export default LpModal;
