import { useEffect, useState } from "react";

function useDebounce<T>(value:T, delay:number) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    // value, delay가 변경될 때마다 실행
    useEffect(()=>{
        // delay(ms) 후에 value를 debouncedValue로 업데이트하는 타이머 시작
        const handler = setTimeout(()=>setDebouncedValue(value), delay) 
        
        // value가 변경되면 기존 타이머를 지워서 업데이트 취소
        return () => clearTimeout(handler);
    }, [value, delay])

    return debouncedValue;
}

export default useDebounce;

