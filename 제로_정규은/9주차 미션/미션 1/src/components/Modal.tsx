import { useModalActions, useModalInfo } from "../hooks/useModalStore.ts";
import { useCartActions } from "../hooks/useCartStore.ts";

const Modal = () => {
  const { isOpen } = useModalInfo();
  const { clearCart } = useCartActions();
  const { closeModal } = useModalActions();

  if (!isOpen) return null;

  const handleClose = () => {
    closeModal();
  };

  const handleClearCart = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="bg-black/30 fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="flex flex-col bg-white rounded-md p-6 relative space-y-4 shadow-lg">
        <h1 className="font-semibold text-lg text-center">
          정말 삭제하시겠습니까?
        </h1>
        <div className="flex justify-center gap-4">
          <ModalButton
            onClick={handleClose}
            text="아니요"
            style="px-4 py-2 text-gray-800 bg-gray-200 hover:bg-gray-300"
          />
          <ModalButton
            onClick={handleClearCart}
            text="네"
            style="px-4 py-2 text-white bg-red-600 hover:bg-red-700"
          />
        </div>
      </div>
    </div>
  );
};

interface ModalButtonProps {
  text: string;
  onClick: () => void;
  style?: string;
}

const ModalButton = ({ text, onClick, style }: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${style} text-base font-medium rounded-xl transition`}
    >
      {text}
    </button>
  );
};

export default Modal;
