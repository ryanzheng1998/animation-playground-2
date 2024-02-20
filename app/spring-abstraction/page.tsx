"use client";

import { useState } from "react";
import { useSpring } from "./useSpring";

export default function Home() {
  const [x, setX] = useState(0);

  const { ref } = useSpring({
    position: x,
    stiffness: 0.1,
    damping: 0.8,
  });

  return (
    <div>
      <div className="h-[300px] w-[300px] bg-green-500" ref={ref} />
      <button
        onClick={() => {
          setX(x === 100 ? 200 : 100);
        }}
      >
        Reverse Spring
      </button>
    </div>
  );
}
