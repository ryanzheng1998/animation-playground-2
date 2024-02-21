"use client";
import { a, useSpring } from "@react-spring/web";
import { useState } from "react";

export default function Home() {
  const [flip, setFlip] = useState(false);

  const { transform } = useSpring({
    transform: `perspective(1000px) rotateX(${flip ? 0 : 180}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div
        onClick={() => {
          setFlip((x) => !x);
        }}
        className="relative w-[800px] cursor-pointer"
      >
        <a.img
          className="absolute h-full w-full rounded bg-slate-400 p-2"
          style={{
            backfaceVisibility: "hidden",
            transform: transform.to((t) => `${t} rotateX(180deg)`),
          }}
          src="/react-spring/flip-card/DALL·E 2024-02-21 14.41.27 - Create an image of a vibrant city street scene at night. The focus should be on a large, illuminated billboard attached to a building. The billboard d.webp"
        />
        <a.img
          className="h-full w-full rounded bg-slate-400 p-2"
          style={{
            backfaceVisibility: "hidden",
            transform: transform.to((t) => `${t} rotateX(0deg)`),
          }}
          src="/react-spring/flip-card/DALL·E 2024-02-21 14.42.11 - Illustrate a bustling night scene on an urban street. In the center, a bright neon sign hangs from the side of a building, prominently featuring a fic.webp"
        />
      </div>
    </div>
  );
}
