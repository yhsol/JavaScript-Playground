import React from "react";

interface CustomTextInputProps {
  onChange: (value: string) => void;
  value?: string;
  label: string;
  idPrefix: string;
  autoFocus?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChange,
  label,
  idPrefix,
  autoFocus,
}) => {
  const inputId = `${idPrefix}-input`;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };
  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="text"
        className="form-control"
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default CustomTextInput;
