import { useCartActions } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const ConfirmModal = () => {
    const { isOpen, closeModal } = useModalStore();
    const { clearCart } = useCartActions();

    const handleCancel = () => closeModal();
    const handleConfirm = () => {
    clearCart();
    closeModal();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white/0 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="mb-4 font-bold">정말 삭제하시겠습니까?</p>
            <div className="flex justify-center gap-4">
            <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
            >
                아니요
            </button>
            <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            >
                네
            </button>
            </div>
        </div>
        </div>
    );
};

export default ConfirmModal;