import React, { useCallback, useMemo, useState } from "react";
import { JSONType, ViewType } from "../../types/jsonNavigator.types";
import { formattedJson } from "../../utils/formattedJson";
import styled from "styled-components";
import Interface from "./interface/Interface";
import JsonView from "./jsonView/JsonView";
import { sampleJSON } from "../../_data/sampleJson";

export default function JsonNavigator() {
  const [viewType, setViewType] = useState<ViewType>("horizontal");
  const [keyword, setKeyword] = useState("");

  const [file, setFile] = useState<JSONType>(sampleJSON);
  const data = useMemo(() => file && formattedJson(file), [file]);

  const handleChangeViewType = (value: ViewType) => setViewType(value);
  const handleChangeKeyword = (value: string) => setKeyword(value);
  const initializeKeyword = () => setKeyword("");
  const handleChangeFile = (value: string) => setFile(JSON.parse(value));

  const getMatched = useCallback(() => {
    const paths = Object.keys(file);
    const matchedPath =
      paths.find((k) => k.split(".").includes(keyword))?.split(".") || [];
    const index = matchedPath.findIndex((path) => path === keyword);
    return matchedPath.splice(0, index + 1);
  }, [keyword, file]);

  return (
    <div>
      <header>
        <h1>JSON Navigator</h1>
      </header>
      <Main>
        <ContentWrap>
          <Interface
            keyword={keyword}
            onChangeKeyword={handleChangeKeyword}
            onChangeFile={handleChangeFile}
            onChangeType={handleChangeViewType}
          />

          <JsonView
            data={data}
            type={viewType}
            keyword={keyword}
            initializeKeyword={initializeKeyword}
            getMatched={getMatched}
          />
        </ContentWrap>
      </Main>
    </div>
  );
}

const Main = styled.main`
  background-color: white;
`;

const ContentWrap = styled.div`
  padding: 2rem;
  margin: 0 auto;
  border: 3px solid black;
  border-radius: 4px;
  overflow: auto;
`;
