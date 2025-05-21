//useThrottle: 주어진 값(상태)가 자주 변경될 때
//최소 interval 간격으로만 업데이트 해서 성능을 개선한다.

import { useEffect, useRef, useState } from "react";


function useThrottle<T>(value:T, delay=500){

    // 1. 상태 변수: throttledValue: 최종적으로 throttling이 적용된 값 상태
    // 초기값을 전달받은 value
    const [throttledValue, setThrottledValue]=useState<T>(value)

    // 2. Ref lastExcecuted: 
    // 초기값은 0 리렌더링 되어도 값이 유지되고 변경되어도 리렌더링을 발생시키지 않음
    const lastExcecuted=useRef<number>(Date.now());

    useEffect(()=> {
        // 3. 현재 시각과 lastExcuted.current에 저장된 마지막 시각 + delay을 비교함
        // 충분한 시간이 지나면 바로 업데이트
        if (Date.now() >= lastExcecuted.current+ delay){
            lastExcecuted.current=Date.now()
            //최신 value를 저장해서 
            setThrottledValue(value);
        } else{
            //충분한 시간이 지나지 않은 경우, delay 시간 후에 업데이트(최신 value로)
            const timerId=setTimeout(()=>{
                lastExcecuted.current=Date.now();
                setThrottledValue(value);

            },delay)
            //cleanup function: 기존 타이머를 취소하여 중복 업데이트 방지
            return()=> clearTimeout(timerId);
        }
    },[value,delay])
    return throttledValue
}

export default useThrottle;