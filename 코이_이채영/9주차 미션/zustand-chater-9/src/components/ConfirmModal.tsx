import { useCartStore } from "../store/cartStore";

const ConfirmModal = () => {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeModal = useCartStore((state) => state.closeModal);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!isOpen) return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4 font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button onClick={closeModal} className="px-4 py-2 border rounded">
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
