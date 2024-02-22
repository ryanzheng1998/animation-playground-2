import { create } from "zustand";

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

export const useStore = create<State>((set) => ({
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
