import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDeouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => setDeouncedValue(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;