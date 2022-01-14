import React from "react";
import styled from "styled-components";

type StyledSelectType = { width?: string };

const StyledSelect = styled.select<StyledSelectType>`
  margin: 0;
  display: block;
  width: ${(props) => (props.width ? props.width : undefined)};
  padding: 8px 8px;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;

  &:focus-visible {
    border-color: coral;
    outline: none;
  }

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

type OptionType = {
  name: string;
  value: React.OptionHTMLAttributes<HTMLOptionElement>["value"];
};

type SelectType = {
  options: OptionType[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
};

function Select({ options, onChange, width }: SelectType) {
  return (
    <StyledSelect onChange={onChange} width={width}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
