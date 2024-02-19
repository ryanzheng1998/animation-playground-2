import { useEffect, useRef } from "react";

export const useRequestAnimation = (callback: FrameRequestCallback) => {
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const step = (time: number) => {
      callback(time);
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [callback]);
};
