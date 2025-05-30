import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../slices/modalSlice';
import { clearCart } from '../slices/cartSlice';
import { RootState } from '@reduxjs/toolkit/query';

const Modal = (): React.ReactElement | null => {
    const { isOpen } = useSelector((state: RootState) => state.modal);
    const dispatch = useDispatch();

    
    if (!isOpen) {
        return null;
    }

    
    const handleCancel = () => {
        dispatch(closeModal());
    };

    // 네 버튼 클릭 시 - 장바구니 초기화 + 모달 닫기
    const handleConfirm = () => {
        dispatch(clearCart()); // 장바구니 초기화
        dispatch(closeModal()); // 모달 닫기
    };
    return (
        <div className="fixed inset-0  bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
                <h2 className="text-lg font-semibold mb-4 text-center">
                    정말 삭제하시겠습니까?
                </h2>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    >
                        아니요
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;