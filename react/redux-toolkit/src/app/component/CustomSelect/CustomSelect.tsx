import React from "react";

interface CustomSelectProps {
  onChange: (value: string) => void;
  options: string[];
  value: string;
  label: string;
  idPrefix: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  idPrefix,
}) => {
  const selectId = `${idPrefix}-select`;
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void =>
    onChange(event?.target.value);
  return (
    <div>
      <label htmlFor={selectId}>{label}</label>
      <select
        id={selectId}
        value={value}
        className="form-control"
        onChange={handleSelect}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
