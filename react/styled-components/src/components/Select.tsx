import React from "react";
import styled from "styled-components";

const StyledSelect = styled.div`
  // Both native and custom selects must have the same width/height.
  .selectNative,
  .selectCustom {
    position: relative;
    width: 22rem;
    height: 4rem;
  }

  // Make sure the custom select does not mess with the layout
  .selectCustom {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }

  // This media query detects devices where the primary
  // input mechanism can hover over elements. (e.g. computers with a mouse)
  @media (hover: hover) {
    // Since we are using a mouse, it's safe to show the custom select.
    .selectCustom {
      display: block;
    }

    // In a computer using keyboard? Then let's hide back the custom select
    // while the native one is focused:
    .selectNative:focus + .selectCustom {
      display: none;
    }
  }

  /* Add the focus states too, They matter, always! */
  .selectNative:focus,
  .selectCustom.isActive .selectCustom-trigger {
    outline: none;
    box-shadow: white 0 0 0 0.2rem, #ff821f 0 0 0 0.4rem;
  }

  //
  // Rest of the styles to create the custom select.
  // Just make sure the native and the custom have a similar "box" (the trigger).
  //

  .select {
    position: relative;
  }

  .selectLabel {
    display: block;
    font-weight: bold;
    margin-bottom: 0.4rem;
  }

  .selectWrapper {
    position: relative;
  }

  .selectNative,
  .selectCustom-trigger {
    font-size: 1.6rem;
    background-color: #fff;
    border: 1px solid #6f6f6f;
    border-radius: 0.4rem;
  }

  .selectNative {
    -webkit-appearance: none;
    -moz-appearance: none;
    /* background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>"); */
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 0.8rem;
    padding: 0rem 0.8rem;
  }

  .selectCustom-trigger {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 0.8rem 0.8rem;
    cursor: pointer;
  }

  .selectCustom-trigger::after {
    content: "▾";
    position: absolute;
    top: 0;
    line-height: 3.8rem;
    right: 0.8rem;
  }

  .selectCustom-trigger:hover {
    border-color: #8c00ff;
  }

  .selectCustom-options {
    position: absolute;
    top: calc(3.8rem + 0.8rem);
    left: 0;
    width: 100%;
    border: 1px solid #6f6f6f;
    border-radius: 0.4rem;
    background-color: #fff;
    box-shadow: 0 0 4px #e9e1f8;
    z-index: 1;
    padding: 0.8rem 0;
    display: none;
  }

  .selectCustom.isActive .selectCustom-options {
    display: block;
  }

  .selectCustom-option {
    position: relative;
    padding: 0.8rem;
    padding-left: 2.5rem;
  }

  .selectCustom-option.isHover,
  .selectCustom-option:hover {
    background-color: #865bd7; // contrast AA
    color: white;
    cursor: default;
  }

  .selectCustom-option:not(:last-of-type)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #d3d3d3;
  }

  .selectCustom-option.isActive::before {
    content: "✓";
    position: absolute;
    left: 0.8rem;
  }

  // ----- Theme styles -----

  html {
    font-size: 62.5%;
  }
  body {
    background: #f8f3ef;
    font-family: Arial, Helvetica, sans-serif;
    box-sizing: border-box;
    color: #343434;
    line-height: 1.5;
    font-size: 1.6rem;
    min-height: 120vh; /* using arrow keys in the select, does not scroll the page */
  }

  body * {
    box-sizing: inherit;
  }
`;

const StyledSelectWrapper = styled.div`
  position: relative;
`;

const optionItems = [1, 2, 3, 4, 5];

function Select({ label }: { label: string }) {
  return (
    <>
      <StyledSelect>
        <StyledSelectWrapper>
          <select
            className="selectNative js-selectNative"
            aria-labelledby={label}
          >
            <option value="sel" disabled selected>
              Select role...
            </option>
            {optionItems.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>

          <div className="selectCustom js-selectCustom" aria-hidden="true">
            <div className="selectCustom-trigger">Select role...</div>
            <div className="selectCustom-options">
              {optionItems.map((item) => (
                <div className="selectCustom-option" data-value={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </StyledSelectWrapper>
      </StyledSelect>
    </>
  );
}

export default Select;
