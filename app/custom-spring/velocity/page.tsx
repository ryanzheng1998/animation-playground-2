"use client";

import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  let animationState = {
    time: 0,
    position: 0,
    velocity: 0.5,
  };

  useRequestAnimation((time) => {
    const element = ref.current;

    if (element) {
      const { position, velocity } = animationState;

      const timeDelta = time - animationState.time;

      const nextPosition = position + velocity * timeDelta;

      element.style.transform = `translateX(${nextPosition}px)`;

      animationState = {
        time,
        position: nextPosition,
        velocity,
      };
    }
  }, []);

  return (
    <div>
      <div className="h-[300px] w-[300px] bg-green-500" ref={ref} />
    </div>
  );
}