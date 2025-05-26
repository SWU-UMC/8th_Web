import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.modal);

  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4 font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 border rounded"
          >
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
