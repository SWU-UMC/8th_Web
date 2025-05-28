// import { useDispatch, useSelector } from "../hooks/CustomRedux";
// import { openModal } from "../slices/modalSlice";

// const PriceBox = () => {
//   const { total } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const handleOpenModal = () => {
//     dispatch(openModal());
//   };
//   return (
//     <div className="p-12 flex justify-between">
//       <button
//         onClick={handleOpenModal}
//         className="border p-4 rounded-md cursor-pointer"
//       >
//         장바구니 초기화
//       </button>

//       <div>총가격: {total}원</div>
//     </div>
//   );
// };
// export default PriceBox;

import { useCartInfo } from "../hooks/useCartStore";
import useModalStore from "../hooks/useModalStore";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalStore();

  return (
    <div className="p-8 flex items-center justify-between bg-white rounded-lg shadow-md border border-gray-200">
      <button
        onClick={openModal}
        className="px-6 py-3 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition duration-200 font-semibold cursor-pointer"
      >
        장바구니 초기화
      </button>

      <div className="text-xl font-bold text-gray-800">
        총가격: <span className="text-red-600">{total.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default PriceBox;
