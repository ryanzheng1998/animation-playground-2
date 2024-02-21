"use client";

import { useState } from "react";
import { useSpring } from "./useSpring";

export default function Home() {
  const [flip, setFlip] = useState(false);

  const ref = useSpring<HTMLParagraphElement>({
    springPosition: flip ? 1 : 0,
    transform: (position, element) => {
      element.textContent = position.toFixed(2);
    },
  });

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="grid place-items-center gap-7">
        <h1 ref={ref} className="text-9xl">
          0.00
        </h1>
        <button
          className="rounded bg-slate-400 px-10 py-3 text-6xl text-white shadow"
          onClick={() => {
            setFlip((x) => !x);
          }}
        >
          Flip
        </button>
      </div>
    </div>
  );
}
