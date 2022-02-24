import styled from "styled-components";
import HorizontalView from "../horizontal/HorizontalView";
import { JSONType, ViewType } from "../../../types/jsonNavigator.types";
import VerticalView from "../vertical/VerticalView";

type JsonViewProps = {
  data: JSONType | null;
  type: ViewType;
  keyword: string;
  initializeKeyword: () => void;
  getMatched: () => string[];
};

function JsonView({
  data,
  type,
  keyword,
  initializeKeyword,
  getMatched,
}: JsonViewProps) {
  const keys = data && Object.keys(data);

  return (
    <ViewWrap>
      {keys && keys?.length > 0 && (
        <>
          {type === "horizontal" ? (
            <HorizontalView
              data={data}
              keyword={keyword}
              initializeKeyword={initializeKeyword}
              getMatched={getMatched}
            />
          ) : (
            <VerticalView
              data={data}
              keyword={keyword}
              initializeKeyword={initializeKeyword}
              getMatched={getMatched}
            />
          )}
        </>
      )}
    </ViewWrap>
  );
}

export default JsonView;

const ViewWrap = styled.div`
  margin-top: 1rem;
  min-height: 300px;
`;
