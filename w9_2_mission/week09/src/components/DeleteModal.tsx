import { useCartActions } from "../hooks/useCartStore";
import useModalStore from "../hooks/useModalStore";

const DeleteModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { clearCart } = useCartActions();

  if (!isOpen) return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4 font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={closeModal}
          >
            아니요
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
