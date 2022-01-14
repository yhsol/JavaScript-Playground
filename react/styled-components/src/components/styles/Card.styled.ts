import styled from "styled-components";

export type CardPropsType = {
  width?: string;
  height?: string;
};

export const Card = styled.div<CardPropsType>`
  border-radius: 5px;
  width: ${(props) => (props.width ? props.width : "300px")};
  height: ${(props) => (props.height ? props.height : "inherit")};

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;
