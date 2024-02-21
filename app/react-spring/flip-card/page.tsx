"use client";
import { a } from "@react-spring/web";
import { useState } from "react";

export default function Home() {
  const [flip, setFlip] = useState(false);

  return (
    <div>
      <a.img src="./react-spring/flip-card/DALL·E 2024-02-21 14.41.27 - Create an image of a vibrant city street scene at night. The focus should be on a large, illuminated billboard attached to a building. The billboard d.webp" />
    </div>
  );
}
