import { useCounterActions } from "../stores/counterStore"

export default function CounterButton() {
    // const increment = useCounterStore((state) => state.actions.increment);
    // const decrement = useCounterStore((state) => state.actions.decrement);

    const { increment, decrement } = useCounterActions();

    return (
        <>
            <div className="flex space-x-4">
                <button onClick={increment}>증가</button>
                <button onClick={decrement}>감소</button>
            </div>
        </>

    )
}