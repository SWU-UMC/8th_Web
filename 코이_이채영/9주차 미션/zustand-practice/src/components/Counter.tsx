import { useShallow } from "zustand/shallow";
import { useCounterStore } from "../stores/counterStore";
import CounterButton from "./CounterButton";

export default function Counter() {
    const { count } = useCounterStore(
        useShallow((state) => ({
            count: state.count,
        }))
    );

    return (
        <div>
            <h1 className="mb-4">{count}</h1>
            <CounterButton />
        </div>
    );
}