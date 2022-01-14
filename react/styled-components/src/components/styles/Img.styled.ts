import styled from "styled-components";

export type ImagePropsType = {
  width?: string;
  height?: string;
};

export const Img = styled.img<ImagePropsType>`
  border-radius: 5px 5px 0 0;
  width: ${(props) => (props.width ? props.width : "inherit")};
  height: ${(props) => (props.height ? props.height : "inherit")};
`;
