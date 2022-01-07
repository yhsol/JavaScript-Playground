import React from "react";
import styles from "./CustomCheckbox.module.css";

interface CustomCheckboxProps {
  onChange: (value: boolean) => void;
  checked?: boolean;
  label: string;
  idPrefix: string;
  autoFocus?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  idPrefix,
  autoFocus,
}) => {
  const inputId = `${idPrefix}-input`;
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void =>
    onChange(event.target.checked);
  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="checkbox"
        className={`form-control ${styles.checkbox}`}
        checked={checked}
        onChange={handleCheck}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default CustomCheckbox;
