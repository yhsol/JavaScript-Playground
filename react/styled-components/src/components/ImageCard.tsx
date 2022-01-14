import React, { ReactNode } from "react";
import styled from "styled-components";
import { Card } from "./styles/Card.styled";
import { Img } from "./styles/Img.styled";

const Container = styled.div`
  padding: 2px 16px;
`;

type ImageCardPropsType = {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  imgWidth?: string;
  imgHeight?: string;
  children: ReactNode;
};

function ImageCard({
  src,
  alt = "",
  width,
  height,
  imgWidth = "inherit",
  imgHeight = "inherit",
  children,
}: ImageCardPropsType) {
  return (
    <Card width={width} height={height}>
      <Img src={src} alt={alt} width={imgWidth} height={imgHeight} />
      <Container>{children}</Container>
    </Card>
  );
}

export default ImageCard;
