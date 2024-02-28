"use client";

import { useState } from "react";

const buttons = ["red", "green", "blue"];

export default function Home() {
  const [float, setFloat] = useState(true);

  return (
    <div className="grid h-screen w-screen justify-center pb-[300px]">
      <div className="flex flex-col-reverse gap-7">
        <div
          className="z-30 aspect-square w-[100px] cursor-pointer rounded-full bg-black"
          onClick={() => {
            setFloat((x) => !x);
          }}
        />
        {buttons.map((color) => {
          return (
            <div
              key={color}
              className="aspect-square w-[100px] rounded-full"
              style={{
                backgroundColor: color,
                position: float ? "relative" : "absolute",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
