import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { DependencyList, useRef } from "react";

export const useSpring = (
  config: {
    position: number;
    stiffness: number;
    damping: number;
  },
  dep?: DependencyList,
) => {
  const ref = useRef<HTMLDivElement>(null);
  const animationState = useRef({
    time: 0,
    position: 0,
    velocity: 0,
    damping: config.damping,
  });

  useRequestAnimation((time) => {
    const element = ref.current;

    if (element) {
      const { position, velocity } = animationState.current;

      // Apply spring force
      // Euler's method
      const springForce = (config.position - position) * config.stiffness;
      const nextVelocity = velocity + springForce;

      const nextPosition = position + velocity;
      const nextVelocity2 = nextVelocity * animationState.current.damping;

      element.style.transform = `translateX(${nextPosition}px)`;

      animationState.current = {
        ...animationState.current,
        time,
        position: nextPosition,
        velocity: nextVelocity2,
      };
    }
  });

  return {
    ref,
  };
};
