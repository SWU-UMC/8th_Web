
import { useCartInfo } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const PriceBox = () => {
    const { total } = useCartInfo();
    const { openModal } = useModalStore();
    // const {total} = useSelector((state) => state.cart);
    // const dispatch = useDispatch();
    // const handleClick = () => {
    // dispatch(openModal());
    // };

    return (
        <div className="p-12 flex justify-between">
            <button onClick={openModal} className="border p-2 rounded-md cursor-pointer">
                장바구니 초기화
            </button>
            <div className="font-bold">총 가격 : {total}원</div>
        </div>
    )
}

export default PriceBox;