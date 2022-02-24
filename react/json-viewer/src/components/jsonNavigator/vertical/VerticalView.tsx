import { useEffect, useState } from "react";
import styled from "styled-components";
import { JSONType } from "../../../types/jsonNavigator.types";

type VerticalViewProps = {
  data: JSONType;
  keyword: string;
  initializeKeyword: () => void;
  getMatched: () => string[];
};

type VerticalChildViewProps = {
  data: string | JSONType;
  keyItem: string;
  keyword: string;
  initializeKeyword: () => void;
  getMatched: () => string[];
};

function VerticalChildView({
  keyItem,
  data,
  keyword,
  initializeKeyword,
  getMatched,
}: VerticalChildViewProps) {
  const [matched, setMatched] = useState<string[]>([]);

  useEffect(() => {
    if (!keyword) return;
    const splitedPath = getMatched();
    setMatched(splitedPath || []);
  }, [keyword, getMatched]);

  return (
    <details open={matched.includes(keyItem)} onClick={initializeKeyword}>
      <Summary isMatched={Boolean(keyword) && matched.includes(keyItem)}>
        {keyItem}
      </Summary>
      <VerticalBodyWrap>
        {typeof data === "string" ? (
          <VerticalContentWrap>{data}</VerticalContentWrap>
        ) : (
          Object.keys(data).map((keyItem) => {
            return (
              <div key={keyItem}>
                <VerticalChildView
                  data={data[keyItem]}
                  keyItem={keyItem}
                  keyword={keyword}
                  initializeKeyword={initializeKeyword}
                  getMatched={getMatched}
                />
              </div>
            );
          })
        )}
      </VerticalBodyWrap>
    </details>
  );
}

function VerticalView({
  data,
  keyword,
  initializeKeyword,
  getMatched,
}: VerticalViewProps) {
  const keys = data && Object.keys(data);
  return (
    <div>
      {keys.map((keyItem) => (
        <VerticalChildView
          key={keyItem}
          keyItem={keyItem}
          data={data[keyItem]}
          keyword={keyword}
          initializeKeyword={initializeKeyword}
          getMatched={getMatched}
        />
      ))}
    </div>
  );
}

export default VerticalView;

const Summary = styled.summary<{ isMatched: boolean }>`
  background-color: ${({ isMatched }) => (isMatched ? "orange" : "lightgray")};
  padding: 4px;
  border: 3px solid black;
  border-radius: 8px;
  margin: 4px 0;
  cursor: pointer;
`;

const VerticalBodyWrap = styled.div`
  margin-left: 28px;
`;

const VerticalContentWrap = styled.div`
  padding: 4px;
  border: 3px solid black;
  border-radius: 8px;
  margin: 4px 0;
  background-color: white;
`;
