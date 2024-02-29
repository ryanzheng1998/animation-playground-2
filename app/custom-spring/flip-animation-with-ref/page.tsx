"use client";

import { preset } from "@/config/preset";
import { useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const [flip, setFlip] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  const animationRef = useRef<number | null>(null);

  const velocityRef = useRef(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (element === null) return;
    const first = element.getBoundingClientRect();
    element.style.transform = "";
    element.style.right = flip ? "" : "0";
    element.style.left = flip ? "0" : "";
    const last = element.getBoundingClientRect();

    // invert
    element.style.transform = `translateX(${first.left - last.left}px)`;

    // play
    let position = first.left - last.left;
    let time = performance.now();

    const springPosition = 0;
    const stiffness = preset.noWobble.stiffness;
    const damping = preset.noWobble.damping;
    const precision = 0.01;
    const timeSlowdown = 1;

    const step = (t: number) => {
      const velocity = velocityRef.current;
      const timeDelta = (t - time) / 1000 / timeSlowdown;

      if (timeDelta > 0.1) {
        time = t;
        requestAnimationFrame(step);
        return;
      }

      if (
        velocity < precision &&
        Math.abs(position - springPosition) < precision
      ) {
        element.style.transform = "";
        velocityRef.current = 0;
        return;
      }

      const springForce = (springPosition - position) * stiffness;
      const dampingForce = -velocity * damping;
      const totalForce = springForce + dampingForce;
      const nextVelocity = velocity + totalForce * timeDelta;
      const nextPosition = position + nextVelocity * timeDelta;

      element.style.transform = `translateX(${position}px)`;

      time = t;
      velocityRef.current = nextVelocity;
      position = nextPosition;
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [flip]);

  return (
    <>
      <p ref={ref} className="fixed text-9xl">
        FLIP
      </p>
      <button
        className="fixed top-80 text-9xl"
        onClick={() => {
          setFlip((x) => !x);
        }}
      >
        Action!
      </button>
    </>
  );
}
