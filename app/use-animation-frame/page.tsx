"use client";

import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLParagraphElement>(null);

  useRequestAnimation(() => {
    if (ref.current) {
      ref.current.textContent = new Date().toISOString();
    }
  });

  return <p ref={ref} />;
}
