// useThrottle : 주어진 값(상태)가 자주 변경될 때
// 최소 interval(밀리초) 간격으로만 업데이트해서 성능 개선

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value:T, delay=500):T{
    // 1. 상태 변수 : throttledValue
    // 초기값을 전달받은 value
    const [throttledValue, setThrottledValue] = useState<T>(value);
    // 2. Ref lastExcecuted : 마지막으로 실행된 시간을 기록하는 변수
    // useRef 사용하면 컴포넌트가 리렌더링 되어도 값이 유지되고, 변경되어도 리렌더링을 트리거하지 않음
    const lastExcecuted = useRef<number>(Date.now());
    
    // 3. useEffect : value, delay가 변경될 때 아래 로직 실행
    useEffect(()=>{
        if(Date.now() >= lastExcecuted.current + delay) {
            lastExcecuted.current = Date.now();
            setThrottledValue(value);
        } else {
            const timeId = setTimeout(() => {
                lastExcecuted.current = Date.now();
                setThrottledValue(value);
            }, delay)

            return () => clearTimeout(timeId);
        }
    }, [value, delay]);

    return throttledValue
}

export default useThrottle;