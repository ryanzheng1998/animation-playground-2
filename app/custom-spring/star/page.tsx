"use client";

import { useEffect, useState } from "react";
import { useSpring } from "./useSpring";

export default function Home() {
  const [flip, setFlip] = useState(false);

  const ref = useSpring<SVGSVGElement>({
    springPosition: flip ? 0 : 1,
    stiffness: 120,
    damping: 40,
    precision: 0.001,
    timeSlowdown: 2,
    transform: (position, element) => {
      element.style.strokeDashoffset = `${position * 100}`;
    },
  });

  useEffect(() => {
    setFlip((x) => !x);

    const interval = setInterval(() => {
      setFlip((x) => !x);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [setFlip]);

  return (
    <div className="fixed inset-0 grid place-items-center">
      <svg
        className="aspect-square w-80"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        strokeDasharray={100}
        strokeDashoffset={0}
        ref={ref}
      >
        <title>Star</title>
        <path
          d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="1"
          pathLength={100}
        />
      </svg>
    </div>
  );
}
