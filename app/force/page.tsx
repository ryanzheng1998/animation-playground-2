"use client";

import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  let animationState = {
    time: 0,
    position: 0,
    velocity: 0,
    damping: 0.9,
  };

  useRequestAnimation((time) => {
    const element = ref.current;

    if (element) {
      const { position, velocity } = animationState;

      const nextPosition = position + velocity;
      const nextVelocity = velocity * animationState.damping;

      element.style.transform = `translateX(${nextPosition}px)`;

      animationState = {
        ...animationState,
        time,
        position: nextPosition,
        velocity: nextVelocity,
      };
    }
  }, []);

  return (
    <div>
      <div className="h-[300px] w-[300px] bg-green-500" ref={ref} />
      <button
        onClick={() => {
          animationState = {
            ...animationState,
            velocity: 10,
          };
        }}
      >
        Apply Force
      </button>
    </div>
  );
}
