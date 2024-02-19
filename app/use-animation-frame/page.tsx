"use client";

import { useRef } from "react";
import { useRequestAnimation } from "./useRequestAnimation";

export default function Home() {
  const ref = useRef<HTMLParagraphElement>(null);

  useRequestAnimation(() => {
    if (ref.current) {
      ref.current.textContent = new Date().toISOString();
    }
  });

  return (
    <div className="">
      <p id="temp" ref={ref}></p>
    </div>
  );
}
