"use client";

import { a, useSpring } from "@react-spring/web";
import { useState } from "react";

export default function Home() {
  const [flip, setFlip] = useState(false);

  const { number } = useSpring({
    number: flip ? 1 : 0,
  });

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="grid place-items-center gap-7">
        <a.h1 className="text-9xl">{number.to((x) => x.toFixed(2))}</a.h1>
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
