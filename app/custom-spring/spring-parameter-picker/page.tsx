"use client";

import { LineChart } from "@mui/x-charts";
import { Inputs } from "./Inputs";
import { generateCruve } from "./generateCruve";
import { useStore } from "./useStore";

export default function Home() {
  const state = useStore();
  const cruve = generateCruve(state);

  return (
    <div className="grid place-items-center p-10">
      <h1 className="text-4xl font-bold">Spring Parameter Picker</h1>
      <Inputs />
      <LineChart
        series={[
          {
            data: cruve,
            connectNulls: true,
            showMark: false,
          },
        ]}
        width={1000}
        height={600}
      />
    </div>
  );
}
