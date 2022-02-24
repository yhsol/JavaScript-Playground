import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { JSONType } from "../../../types/jsonNavigator.types";

type HorizontalViewProps = {
  data: JSONType;
  keyword: string;
  initializeKeyword: () => void;
  getMatched: () => string[];
};

type HorizontalChildViewProps = {
  data: string | JSONType;
  keyword: string;
  initializeKeyword: () => void;
  getMatched: () => string[];
};

function HorizontalChildView({
  data,
  keyword,
  initializeKeyword,
  getMatched,
}: HorizontalChildViewProps) {
  if (typeof data === "string") {
    return (
      <NodeWrap>
        <ValueNode>{`"${data}"`}</ValueNode>
      </NodeWrap>
    );
  }

  return (
    <HorizontalView
      data={data}
      keyword={keyword}
      initializeKeyword={initializeKeyword}
      getMatched={getMatched}
    />
  );
}

let selected = "";
function HorizontalView({
  data,
  keyword,
  initializeKeyword,
  getMatched,
}: HorizontalViewProps) {
  const [matched, setMatched] = useState<string[]>([]);

  const handleSelectTitle = (title: string) => {
    setMatched([]);
    initializeKeyword();
    selected = title;
  };

  useEffect(() => {
    if (keyword) selected = "";
  }, [keyword]);

  useEffect(() => {
    if (!keyword) return;
    const splitedPath = getMatched();
    setMatched(splitedPath || []);
  }, [keyword, getMatched]);

  if (!data) return null;
  return (
    <HorizontalViewWrap>
      <PropertyWrap>
        {Object.keys(data).map((title) => (
          <PropertyItem
            key={title}
            onClick={() => handleSelectTitle(title)}
            isMatched={selected === title || matched?.includes(title)}
          >
            {title} {typeof data[title] === "string" ? "" : "▶"}
          </PropertyItem>
        ))}
      </PropertyWrap>

      {selected && !matched.length ? (
        <HorizontalChildView
          key={selected}
          data={data[selected]}
          keyword={keyword}
          initializeKeyword={initializeKeyword}
          getMatched={getMatched}
        />
      ) : null}

      {matched.length > 0
        ? matched.map((title) => {
            return (
              <HorizontalChildView
                key={title}
                data={data[title]}
                keyword={keyword}
                initializeKeyword={initializeKeyword}
                getMatched={getMatched}
              />
            );
          })
        : null}
    </HorizontalViewWrap>
  );
}

export default HorizontalView;

const HorizontalViewWrap = styled.div`
  display: flex;
  gap: 8px;
  min-height: 300px;
  font-weight: bold;
  font-size: 18px;
`;

const PropertyWrap = styled.div`
  border: 3px solid black;
  width: 170px;
`;

const PropertyItem = styled.div<{ isMatched: boolean }>`
  background-color: ${({ isMatched }) => (isMatched ? "orange" : "")};
  cursor: pointer;
  padding: 10px;
`;

const NodeWrap = styled.div`
  border: 3px solid black;
  width: 500px;
  padding: 12px;
`;

const ValueNode = styled.div`
  border: 3px solid black;
  padding: 12px;
  background-color: lightgray;
  border-radius: 8px;
  min-height: 100px;
`;
