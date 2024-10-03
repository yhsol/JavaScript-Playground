import { useContext } from "react";
import { SelectContext } from "./Dropdown";

export const SomeDifferentComp = () => {
  const { selected } = useContext(SelectContext);
  return (
    <div>
      <div>Some different component</div>
      {selected.map((s) => (
        <div key={s}>{s}</div>
      ))}
    </div>
  );
};
