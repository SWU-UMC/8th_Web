// components/AddLpPopup.tsx
import React, { useRef, useState } from "react";
import LpImage from "../assets/lp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { RequestLpDto } from "../types/lp";
import { createLp } from "../apis/lp";
import useCreateLp from "../hooks/mutations/useLpCreate";

interface AddLpPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddLpPopup: React.FC<AddLpPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [inputValue, setInputValue] = useState('');

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState("");
    const [published, setPublished] = useState(true);

    const { mutate: addLp } = useCreateLp();

    const handleSave = () => {
        const lpData: RequestLpDto = {
            title,
            content,
            thumbnail,
            tags,
            published,
        };
        addLp(lpData, {
            onSuccess: () => {
                onClose(); // 저장 성공 시 팝업 닫기
                window.location.reload();
            }
        });
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                setThumbnail(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePopupClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 이벤트 전파를 막음
    };

    

    const handleAddTag = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
            setInputValue('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="relative bg-white text-black p-6 rounded-xl w-96 shadow-lg" onClick={handlePopupClick}>
                <button
                    onClick={onClose}
                    className="absolute top-5 right-6 text-black hover:text-gray-700 text-xl"
                    aria-label="닫기"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>


                <h2 className="text-xl font-bold mb-4">LP 추가하기</h2>


                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                <div className="relative w-48 h-48 mx-auto mb-4 cursor-pointer flex items-center justify-center" onClick={handleImageClick}>

                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="업로드된 미리보기"
                            className="absolute top-0 left-[-50px] w-48 h-48 object-cover border-1 border-gray-300 bg-white"
                        />
                    )}

                    <img
                        src={LpImage}
                        alt="LP 이미지"
                        className={`w-40 h-40 transition-all duration-300 ${previewImage ? "ml-25" : ""
                            }`}
                    />
                </div>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="LP 이름 입력"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />

                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="LP 컨텐츠 입력"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />

                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="LP 태그 입력"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        className="px-4 py-2 bg-[#e60073] text-white rounded"
                        onClick={() => {
                            handleAddTag()
                        }}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        추가
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, idx) => (
                        <div
                            key={idx}
                            className="bg-white border-1 border-gray-300 text-gray-800 px-3 py-1 rounded-full flex items-center text-sm"
                        >
                            {tag}
                            <button
                                className="ml-2 text-pink-500 hover:text-pink-700"
                                onClick={() => handleRemoveTag(tag)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        className="w-full px-4 py-2 bg-[#e60073] text-white rounded"
                        onClick={handleSave }
                    >

                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddLpPopup;
