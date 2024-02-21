import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

export const useSpring = <T extends HTMLElement>(config: {
  springPosition: number;
  stiffness: number;
  damping: number;
  transform: (position: number, ref: T) => void;
}) => {
  const ref = useRef<T>(null);
  const animationState = useRef({
    time: 0,
    position: 0,
    velocity: 0,
  });

  useRequestAnimation((time) => {
    const element = ref.current;

    if (element === null) return;

    const { position, velocity } = animationState.current;
    const { springPosition, stiffness, damping } = config;
    const timeDelta = time - animationState.current.time;

    //  Save battery by not updating when animation stop
    console.log(velocity, position);
    if (velocity < 0.01 && Math.abs(position - springPosition) < 0.01) {
      console.log("animation frame canceled");
      return false;
    }

    // Prevent animation jump when tab is inactive
    if (timeDelta > 100) {
      animationState.current.time = time;
      return true;
    }

    // Apply spring force
    const springForce = (springPosition - position) * stiffness;
    const nextVelocity = velocity + springForce * timeDelta;

    // move to next position
    const nextPosition = position + velocity * timeDelta;
    const nextVelocity2 = nextVelocity * damping * timeDelta;

    config.transform(nextPosition, element);

    animationState.current = {
      ...animationState.current,
      time,
      position: nextPosition,
      velocity: nextVelocity2,
    };
  }, []);

  return ref;
};
