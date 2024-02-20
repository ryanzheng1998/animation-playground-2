"use client";

import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

const spring = {
  position: 0,
  stiffness: 0.4 / 16 / 16 / 16,
};

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  let animationState = {
    time: 0,
    position: 0,
    velocity: 0,
    damping: 0.8 / 16,
  };

  useRequestAnimation((time) => {
    const element = ref.current;

    if (element) {
      const { position, velocity } = animationState;
      const timeDelta = time - animationState.time;

      // Apply spring force
      const springForce = (spring.position - position) * spring.stiffness;
      const nextVelocity = velocity + springForce * timeDelta;

      const nextPosition = position + velocity * timeDelta;
      const nextVelocity2 = nextVelocity * animationState.damping * timeDelta;

      element.style.transform = `translateX(${nextPosition}px)`;

      animationState = {
        ...animationState,
        time,
        position: nextPosition,
        velocity: nextVelocity2,
      };
    }
  }, []);

  return (
    <div>
      <div className="h-[300px] w-[300px] bg-green-500" ref={ref} />
      <button
        onClick={() => {
          spring.position = spring.position === 500 ? 0 : 500;
        }}
      >
        Reverse Spring
      </button>
    </div>
  );
}
