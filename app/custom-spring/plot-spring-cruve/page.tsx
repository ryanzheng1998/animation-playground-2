"use client";

import { LineChart } from "@mui/x-charts";
import { create } from "zustand";
import { generateCruve } from "./generateCruve";

interface State {
  from: number;
  springPosition: number;
  stiffness: number;
  damping: number;
  precision: number;
  setState: (config: {
    from?: number;
    springPosition?: number;
    stiffness?: number;
    damping?: number;
    precision?: number;
  }) => void;
}

const store = create<State>((set) => ({
  from: 1,
  springPosition: 0,
  stiffness: 180,
  damping: 12,
  precision: 0.01,
  setState: (config: {
    from?: number;
    springPosition?: number;
    stiffness?: number;
    damping?: number;
    precision?: number;
  }) => {
    set((state) => ({
      ...state,
      ...config,
    }));
  },
}));

export default function Home() {
  const state = store();
  const cruve = generateCruve(state);

  return (
    <div>
      <div>
        <label>From</label>
        <input
          type="range"
          min={0}
          max={500}
          value={state.from}
          onChange={(e) => {
            state.setState({ from: Number(e.target.value) });
          }}
        />
      </div>
      <div>
        <label>Spring Position</label>
        <input
          type="range"
          min={0}
          max={500}
          value={state.springPosition}
          onChange={(e) => {
            state.setState({ springPosition: Number(e.target.value) });
          }}
        />
      </div>
      <div>
        <label>Stiffness</label>
        <input
          type="range"
          min={0}
          max={500}
          value={state.stiffness}
          onChange={(e) => {
            state.setState({ stiffness: Number(e.target.value) });
          }}
        />
      </div>
      <div>
        <label>Damping</label>
        <input
          type="range"
          min={0}
          max={100}
          value={state.damping}
          onChange={(e) => {
            state.setState({ damping: Number(e.target.value) });
          }}
        />
      </div>
      <div>
        <label>Precision</label>
        <input
          type="range"
          min={0.001}
          max={1}
          value={state.precision}
          onChange={(e) => {
            state.setState({ precision: Number(e.target.value) });
          }}
        />
      </div>

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
