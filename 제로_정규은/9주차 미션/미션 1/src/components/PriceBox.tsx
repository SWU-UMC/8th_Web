import { useCartInfo } from "../hooks/useCartStore.ts";
import { useModalActions } from "../hooks/useModalStore.ts";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalActions();

  const handleClearCart = () => {
    openModal();
  };

  return (
    <div className="flex justify-between items-center px-14 py-4 font-semibold">
      <button
        onClick={handleClearCart}
        className="border border-red-500 text-red-600 rounded-xl px-4 py-1 hover:bg-red-50 transition"
      >
        전체 삭제
      </button>
      <span className="text-lg">총 가격: {total.toLocaleString()}원</span>
    </div>
  );
};

export default PriceBox;