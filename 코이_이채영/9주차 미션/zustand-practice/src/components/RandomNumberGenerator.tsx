import { useCounterStore } from "../stores/counterStore";

export default function RandomNumberGenerator() {
    const randomNumber = useCounterStore((state) => state.randomNumber);
    const random = useCounterStore((state) => state.actions.random);


    return (
        <div>
            <h1 className="mb-4">{randomNumber}</h1>
            <button onClick={random}>랜덤 번호 생성기</button>
        </div>
    );
}