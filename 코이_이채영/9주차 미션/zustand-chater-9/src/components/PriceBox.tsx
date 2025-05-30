import { FaTrash } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";

const PriceBox = () => {
  const total = useCartStore((state) => state.total);
  const openModal = useCartStore((state) => state.openModal);

  const handleInitializeCart = () => {
    openModal();
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 rounded-lg flex items-center justify-between">
      <button
        onClick={handleInitializeCart}
        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200 flex items-center gap-2"
      >
        <FaTrash className="w-5 h-5" />
        전체 삭제
      </button>
      <div className="text-lg font-medium text-gray-800">
        Total: <span className="font-bold">{total.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default PriceBox;
