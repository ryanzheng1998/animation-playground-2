import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

export const useSpring = (config: {
  destination: number;
  stiffness: number;
  damping: number;
  transform: (position: number, ref: HTMLDivElement) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const animationState = useRef({
    time: 0,
    currentPosition: 0,
    velocity: 0,
    damping: config.damping,
  });

  useRequestAnimation((time) => {
    const element = ref.current;

    if (element === null) return;

    const { currentPosition, velocity } = animationState.current;

    // Apply spring force
    // Euler's method
    const springForce =
      (config.destination - currentPosition) * config.stiffness;
    const nextVelocity = velocity + springForce;

    const nextPosition = currentPosition + velocity;
    const nextVelocity2 = nextVelocity * animationState.current.damping;

    config.transform(nextPosition, element);

    animationState.current = {
      ...animationState.current,
      time,
      currentPosition: nextPosition,
      velocity: nextVelocity2,
    };
  });

  return {
    ref,
  };
};
