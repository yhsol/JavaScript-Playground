import { createContext, ReactNode, useContext, useState } from "react";

type Option = {
  name: string;
  value: string;
};

export const SelectContext = createContext<{
  selected: string[];
  options: Option[];
  select: (option: string) => void;
  filter: (name: string) => void;
}>({
  selected: [],
  options: [],
  select: () => null,
  filter: () => null,
});

const INITIAL_OPTIONS = [
  {
    name: "first",
    value: "first",
  },
  {
    name: "second",
    value: "second",
  },
  {
    name: "third",
    value: "third",
  },
];

export function useSelect(initialOptions: Option[]) {
  const [selected, setSelected] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const select = (option: string) => {
    if (selected.includes(option)) {
      setSelected((prev) => prev.filter((prevSelect) => prevSelect !== option));
    } else {
      setSelected((prev) => [...prev, option]);
    }
  };

  const filter = (name: string) => {
    const filtered = name
      ? options.filter((option) =>
          option.name.toLowerCase().includes(name.toLowerCase())
        )
      : options;

    setFilteredOptions(filtered);
  };

  return {
    selected,
    options: filteredOptions,
    select,
    filter,
  };
}

export const SelectProvider = ({ children }: { children: ReactNode }) => {
  const { selected, options, select, filter } = useSelect(INITIAL_OPTIONS);
  return (
    <SelectContext.Provider value={{ selected, options, select, filter }}>
      {children}
    </SelectContext.Provider>
  );
};

export const useSelectContext = () => useContext(SelectContext);

export const Dropdown = () => {
  const { select, options, selected, filter } = useSelectContext();
  const [filterName, setFilterName] = useState("");

  return (
    <>
      <div>
        {selected.length
          ? selected.map((s) => (
              <span
                key={s}
                style={{
                  border: "1px solid black",
                  margin: "5px",
                  padding: "2px",
                }}
                onClick={() => select(s)}
              >
                {s} &times;
              </span>
            ))
          : "Nothing!"}
      </div>
      <div>
        <input
          type="text"
          value={filterName}
          onChange={(e) => {
            setFilterName(e.target.value);
            filter(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setFilterName("");
            filter("");
          }}
        >
          Clear
        </button>
        <select
          multiple
          onChange={(e) => select(e.target.value)}
          aria-labelledby="dropdown-label"
          aria-expanded="true"
          role="listbox"
        >
          {options.map((option) => (
            <option key={option.name} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
