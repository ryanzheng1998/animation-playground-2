"use client";

import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

const spring = {
  position: 100,
  stiffness: 0.1,
};

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  let animationState = {
    time: 0,
    position: 0,
    velocity: 0,
    damping: 0.8,
  };

  useRequestAnimation((time) => {
    const element = ref.current;

    if (element) {
      const { position, velocity } = animationState;

      // Apply spring force
      const springForce = (spring.position - position) * spring.stiffness;
      const nextVelocity = velocity + springForce;

      const nextPosition = position + velocity;
      const nextVelocity2 = nextVelocity * animationState.damping;

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
          spring.position = spring.position === 100 ? 0 : 100;
        }}
      >
        Reverse Spring
      </button>
    </div>
  );
}
