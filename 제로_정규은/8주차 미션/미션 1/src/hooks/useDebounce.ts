import { useEffect, useState } from "react";

function useDebounce<T>(value:T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // value, delay 가 변경될 때마다 실행
  useEffect(() => {
    // delay (ms) 후에 실행합니다.
    const handler = setTimeout(() => 
      setDebouncedValue(value),
      delay
    );

    
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;