"use client";

import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  const animationState = useRef({
    time: 0,
    position: 0,
    velocity: 0,
    damping: 0.999 / 16,
    springPosition: 0,
    springStiffness: 0.4 / 16 / 16 / 16,
  });

  useRequestAnimation((time) => {
    const element = ref.current;

    if (element === null) return;

    const { position, velocity } = animationState.current;
    const timeDelta = time - animationState.current.time;
    const springPosition = animationState.current.springPosition;
    const springStiffness = animationState.current.springStiffness;

    const springForce = (springPosition - position) * springStiffness;
    const dampingForce = -velocity * animationState.current.damping;
    const totalForce = springForce + dampingForce;
    const nextVelocity = velocity + totalForce * timeDelta;
    const nextPosition = position + nextVelocity * timeDelta;

    element.style.transform = `translateX(${nextPosition}px)`;

    animationState.current = {
      ...animationState.current,
      time,
      position: nextPosition,
      velocity: nextVelocity,
    };
  }, []);

  return (
    <div>
      <div className="h-[300px] w-[300px] bg-green-500" ref={ref} />
      <button
        onClick={() => {
          const currentSpringPosition = animationState.current.springPosition;
          animationState.current.springPosition =
            currentSpringPosition === 0 ? 500 : 0;
        }}
      >
        Reverse Spring
      </button>
    </div>
  );
}
