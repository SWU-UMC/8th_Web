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
    <div className="p-12 flex justify-between">
      <button
        onClick={openModal}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
      <div>총가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
