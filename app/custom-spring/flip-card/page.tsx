"use client";
import Image from "next/image";
import { useState } from "react";
import { useSpring } from "./useSpring";

export default function Home() {
  const [flip, setFlip] = useState(false);

  const ref = useSpring<HTMLImageElement>({
    springPosition: flip ? 180 : 0,
    stiffness: 0.4 / 16 / 16 / 16,
    damping: 0.8 / 16,
    transform: (position, element) => {
      element.style.transform = `perspective(1000px) rotateX(${position}deg)`;
    },
  });

  const ref2 = useSpring<HTMLImageElement>({
    springPosition: flip ? 180 : 0,
    stiffness: 0.4 / 16 / 16 / 16,
    damping: 0.8 / 16,
    transform: (position, element) => {
      element.style.transform = `perspective(1000px) rotateX(${position}deg) rotateX(180deg)`;
    },
  });

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div
        onClick={() => {
          setFlip((x) => !x);
        }}
        className="relative h-[450px] w-[800px] cursor-pointer"
      >
        <Image
          alt="DALL·E 2024-02-21 14.41.27 - Create an image of a vibrant city street scene at night. The focus should be on a large, illuminated billboard attached to a building. The billboard d"
          ref={ref}
          width={800}
          height={450}
          className="absolute h-full w-full rounded bg-slate-400 p-2"
          style={{
            backfaceVisibility: "hidden",
          }}
          src="/react-spring/flip-card/DALL·E 2024-02-21 14.41.27 - Create an image of a vibrant city street scene at night. The focus should be on a large, illuminated billboard attached to a building. The billboard d.webp"
        />
        <Image
          alt="DALL·E 2024-02-21 14.42.11 - Illustrate a bustling night scene on an urban street. In the center, a bright neon sign hangs from the side of a building, prominently featuring a fic"
          ref={ref2}
          width={800}
          height={450}
          className="absolute h-full w-full rounded bg-slate-400 p-2"
          style={{
            backfaceVisibility: "hidden",
          }}
          src="/react-spring/flip-card/DALL·E 2024-02-21 14.42.11 - Illustrate a bustling night scene on an urban street. In the center, a bright neon sign hangs from the side of a building, prominently featuring a fic.webp"
        />
      </div>
    </div>
  );
}
