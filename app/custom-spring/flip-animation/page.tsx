"use client";

import { preset } from "@/config/preset";
import { useState } from "react";

export default function Home() {
  const [flip, setFlip] = useState(false);

  return (
    <button
      onClick={(e) => {
        setFlip((x) => !x);
        const element = e.currentTarget;
        const first = element.getBoundingClientRect();
        element.style.transform = "";
        element.style.right = flip ? "" : "0";
        element.style.left = flip ? "0" : "";
        const last = element.getBoundingClientRect();

        // invert
        element.style.transform = `translateX(${first.left - last.left}px)`;

        // play
        let position = first.left - last.left;
        let velocity = 0;
        let time = performance.now();

        const springPosition = 0;
        const stiffness = preset.noWobble.stiffness;
        const damping = preset.noWobble.damping;
        const precision = 0.01;
        const timeSlowdown = 1;

        const step = (t: number) => {
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
            return;
          }

          const springForce = (springPosition - position) * stiffness;
          const dampingForce = -velocity * damping;
          const totalForce = springForce + dampingForce;
          const nextVelocity = velocity + totalForce * timeDelta;
          const nextPosition = position + nextVelocity * timeDelta;

          element.style.transform = `translateX(${position}px)`;

          time = t;
          velocity = nextVelocity;
          position = nextPosition;
          requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      }}
      className="fixed text-9xl"
    >
      FLIP
    </button>
  );
}
