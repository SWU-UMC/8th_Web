//useThrottle: 주어진 값(상태)가 자주 변경될 때
//최소 interval(밀리초)간격으로만 업데이트 해서 성능을 개선한다.

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 500): T {
  //1. 상태변수: throtteldValue: 최종적으로 쓰로틀링 적용된 값 찾아
  //초기값을 전달받은 value
  const [throtteldValue, setThrotteldValue] = useState<T>(value);

  //2. Ref lastExcecuted: 마지막으로 실행된 시간을 기록하는 변수
  //useRef 사용하면 컴포넌트가 리렌더링 되어도 값이 유지되고, 변경되어도 리렌더링을 트리거하지 않아요.
  const lastExcecuted = useRef<number>(Date.now());

  //3. useEffect: value, delay가 변경될 때 아래 로직 실행
  useEffect(() => {
    //현재 시각과 lastExcecuted.current 에 저장된 마지막 시각 + delay을 비교합니다.
    //충분한 시간이 지나면 바로 업데이트
    if (Date.now() >= lastExcecuted.current + delay) {
      //현재 시간이 지난 경우,
      //현재 시각으로 lastExcecuted 업데이트
      lastExcecuted.current = Date.now();
      //최신 value를 throtteldValue에 저장해서 컴포넌트 리렌더링
      setThrotteldValue(value);
    } else {
      //충분한 시간이 지나지 않은 경우, delay 시간 후에 업데이트(최신 value로)
      const timerId = setTimeout(() => {
        //타이머가 만료되면, 마지막 업데이트 시간을 현재 시각으로 갱신합니다.
        lastExcecuted.current = Date.now();
        //최신 value를 throttledValue에 저장해서 컴포넌트 리렌더링
        setThrotteldValue(value);
      }, delay);

      //cleanUp function 이펙트가 재실행되기 전에 타이머가 실행되지 않았다면
      //기존 타이머를 clearTimeout을 통해 취소하여 중복 업데이트를 방지합니다.
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throtteldValue;
}

export default useThrottle;
