import { useStore } from "./useStore";

export const Inputs = () => {
  const state = useStore();
  return (
    <div className="grid grid-cols-[auto_auto_auto] gap-3">
      <label className="justify-self-end">From</label>
      <input
        type="range"
        min={0}
        max={500}
        value={state.from}
        onChange={(e) => {
          state.setState({ from: Number(e.target.value) });
        }}
      />
      <label>{state.from}</label>

      <label className="justify-self-end">Spring Position</label>
      <input
        type="range"
        min={0}
        max={500}
        value={state.springPosition}
        onChange={(e) => {
          state.setState({ springPosition: Number(e.target.value) });
        }}
      />
      <label>{state.springPosition}</label>

      <label className="justify-self-end">Stiffness</label>
      <input
        type="range"
        min={0}
        max={500}
        value={state.stiffness}
        onChange={(e) => {
          state.setState({ stiffness: Number(e.target.value) });
        }}
      />
      <label>{state.stiffness}</label>

      <label className="justify-self-end">Damping</label>
      <input
        type="range"
        min={0}
        max={100}
        value={state.damping}
        onChange={(e) => {
          state.setState({ damping: Number(e.target.value) });
        }}
      />
      <label>{state.damping}</label>

      <label className="justify-self-end">Precision</label>
      <input
        type="range"
        min={0.001}
        max={1}
        value={state.precision}
        onChange={(e) => {
          state.setState({ precision: Number(e.target.value) });
        }}
      />
      <label>{state.precision}</label>
    </div>
  );
};
