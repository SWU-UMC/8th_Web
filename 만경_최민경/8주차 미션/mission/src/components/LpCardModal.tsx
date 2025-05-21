import React, { useState } from 'react';
import defaultLp from '../assets/default_lp.png';
import { useMutation, useQueryClient } from '@tanstack/react-query';


import { CreateLpRequest } from '../types/lp';
import { useLpCreate } from '../hooks/mutation/useLpCreate';


interface LpModalProps {
  isOpen: boolean;
  onClose: () => void;
  lpImage: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageFile: File|null; //이미지 파일 추가
}



const LpModal: React.FC<LpModalProps> = ({ 
  isOpen, onClose, lpImage, onImageChange }) => { 
  const queryClient=useQueryClient();
  const createLpMutation = useLpCreate();
  
  const [lpName, setLpName] = useState('');
  const [lpContent, setLpContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [lpImageFile, setLpImageFile] = useState<File | null>(null);

  
  const handleAddTag = () => {
    if (tagInput.trim() === '') return;
    if (tags.includes(tagInput.trim())) return; // 중복 방지
    setTags([...tags, tagInput.trim()]);
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // LP 추가 폼 제출 핸들러
  const handleSubmitLp = () => {
    // 폼 유효성 검사
    if (!lpName.trim()) {
      alert('LP 이름을 입력해주세요.');
      return;
    }

  const lpData: CreateLpRequest = {
    title: lpName,
    content: lpContent,
    tags,
    published: true,
    thumbnail: lpImageFile,
  };
  createLpMutation.mutate(lpData);
  };

  if (!isOpen) return null;

    

  return (
  <div 
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" 
    onClick={onClose}
  >
    <div
      className="bg-gray-900 text-white rounded-lg p-6 w-96 h-120 relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-3 mt-3 right-3 text-gray-400 hover:text-white text-xl"
      >
        ×
      </button>

      {/* LP 이미지 업로드 */}
      <div className="flex justify-center mb-6">
        <label htmlFor="lpImage" className="cursor-pointer">
          <img
            src={lpImage || defaultLp}
            alt="LP 이미지"
            className="w-32 h-32 object-cover rounded-full border border-gray-500"
          />
        </label>
        <input
          id="lpImage"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onImageChange}
        />
      </div>

      {/* LP 정보 입력 */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={lpName}
          onChange={(e) => setLpName(e.target.value)}
          placeholder="LP Name"
          className="bg-gray-700 rounded px-3 py-2"
        />
        <input
          type="text"
          value={lpContent}
          onChange={(e) => setLpContent(e.target.value)}
          placeholder="LP Content"
          className="bg-gray-700 rounded px-3 py-2"
        />
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="LP Tag"
            className="bg-gray-700 rounded px-3 py-2 flex-grow"
          />
          <button
            onClick={handleAddTag}
            className="bg-pink-500 text-white px-4 rounded hover:bg-pink-600"
          >
            Add
          </button>
        </div>

        {/* 해시태그 리스트 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-gray-400 hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        
        <button className="bg-pink-500 py-2 rounded mt-4 hover:bg-pink-600"
        onClick={handleSubmitLp}
        disabled={createLpMutation.isPending}
        >
          {createLpMutation.isPending? '추가 중...' : "Add LP"}
          
        </button>
      </div>
    </div>
  </div>
);
};

export default LpModal;
