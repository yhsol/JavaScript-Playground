import React from "react";
import styled from "styled-components";

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

const StyledSelect = styled.select`
  margin: 0;

  padding: 4px;
  font-size: inherit;
  line-height: inherit;
  border: 3px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  cursor: pointer;

  &:focus-visible {
    border-color: orange;
    outline: none;
  }

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const StyledInput = styled.input`
  border: 3px solid;
  border-radius: 4px;
  padding: 4px;
  font-weight: bold;
`;

const StyledFileInput = styled.input`
  cursor: pointer;
  border: none;
  padding: 0;
  font-weight: bold;

  &::file-selector-button {
    cursor: pointer;
    background-color: white;
    border: 3px solid black;
    padding: 4px;
    border-radius: 4px;
    font-weight: bold;

    :hover {
      background-color: orange;
      color: white;
    }
  }
`;

type JsonType = Record<string, string | {}>;

const j: JsonType = {
  nameq: "Leanne Grahamq",
  usernameq: "Bretq",
  emailq: "Sincere@april.bizq",
  "address.street": "Kulas Light",
  "address.suite": "Apt. 556",
  "address.city": "Gwenborough",
  "address.zipcode": "92998-3874",
  "address.geo.lat": "-37.3159",
  "address.geo.lng": "81.1496",
};

type SetValueType = {
  object: JsonType;
  key: string;
  value: string | {};
};
const setValues = ({ object, key, value }: SetValueType) => {
  const keys = key.split(".");
  const last = keys.pop();
  if (last) {
    keys.reduce((o, k) => (o[k] = o[k] || {}), object)[last] = value;
  }
  return object;
};
const formattedJson = (json: JsonType) => {
  return Object.entries(json).reduce(
    (object, [key, value]) => setValues({ object, key, value }),
    {} as JsonType
  );
};

type ViewType = "vertical" | "horizontal";

const InterfaceWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  * {
    font-weight: bold;
  }
`;

const InterfaceItemWrap = styled.div`
  display: grid;
  grid-template-columns: 100px 200px;
`;

type InterfaceProps = {
  onChangeType: (type: ViewType) => void;
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
  onChangeFile: (file: string) => void;
};

function Interface({
  onChangeType,
  keyword,
  onChangeKeyword,
  onChangeFile,
}: InterfaceProps) {
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files) return;
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      let result = e?.target?.result;
      if (!result) return;
      if (typeof result !== "string") result = JSON.stringify(result);
      onChangeFile(result);
    };
  };

  return (
    <InterfaceWrap>
      <InterfaceItemWrap>
        <label htmlFor="viewtype-select">보기 설정:</label>
        <StyledSelect
          name="viewtype"
          id="viewtype-select"
          onChange={(e) => onChangeType(e.target.value as ViewType)}
          defaultValue="horizontal"
        >
          <option value="horizontal">가로</option>
          <option value="vertical">세로</option>
        </StyledSelect>
      </InterfaceItemWrap>

      <InterfaceItemWrap>
        <label htmlFor="property-search-input">검색:</label>
        <StyledInput
          type="text"
          id="property-search-input"
          value={keyword}
          onChange={(e) => {
            console.log(e.target.value, "keyword: ", keyword);
            onChangeKeyword(e.target.value);
          }}
        />
      </InterfaceItemWrap>

      <InterfaceItemWrap>
        <label htmlFor="file-input">파일 등록:</label>
        <StyledFileInput
          type="file"
          id="file-input"
          accept=".json"
          onChange={handleChangeFile}
        />
      </InterfaceItemWrap>
    </InterfaceWrap>
  );
}

const ViewWrap = styled.div`
  margin-top: 1rem;
  min-height: 300px;
`;

type JsonViewProps = {
  data: JsonType | null;
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
  const [matched, setMatched] = React.useState<string[]>([]);

  const initializeMatched = () => {
    setMatched([]);
    initializeKeyword();
  };

  React.useEffect(() => {
    if (!keyword) return;
    const splitedPath = getMatched();
    setMatched(splitedPath || []);
  }, [keyword, getMatched]);

  return (
    <ViewWrap>
      {keys && keys?.length > 0 && (
        <>
          {type === "horizontal" ? (
            <HorizontalView
              data={data}
              matched={matched}
              keyword={keyword}
              initializeMatched={initializeMatched}
            />
          ) : (
            <VerticalView
              data={data}
              keyword={keyword}
              matched={matched}
              initializeKeyword={initializeKeyword}
            />
          )}
        </>
      )}
    </ViewWrap>
  );
}

function VerticalView({
  data,
  keyword,
  matched,
  initializeKeyword,
}: {
  data: JsonType;
  keyword: string;
  matched: string[];
  initializeKeyword: () => void;
}) {
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
          matched={matched}
        />
      ))}
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

function JsonNavigator() {
  const [type, setType] = React.useState<ViewType>("horizontal");
  const [keyword, setKeyword] = React.useState("");

  const sampleData = j;
  const [file, setFile] = React.useState<JsonType>(sampleData);
  const data = React.useMemo(() => file && formattedJson(file), [file]);

  const handleChangeType = (value: ViewType) => setType(value);
  const handleChangeKeyword = (value: string) => setKeyword(value);
  const initializeKeyword = () => setKeyword("");
  const handleChangeFile = (value: string) => setFile(JSON.parse(value));
  const getMatched = React.useCallback(() => {
    const paths = Object.keys(file);
    return paths.find((k) => k.split(".").includes(keyword))?.split(".") || [];
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
            onChangeType={handleChangeType}
          />

          <JsonView
            data={data}
            type={type}
            keyword={keyword}
            initializeKeyword={initializeKeyword}
            getMatched={getMatched}
          />
        </ContentWrap>
      </Main>
    </div>
  );
}

export default function App() {
  return <JsonNavigator />;
}

type VerticalChildViewProps = {
  data: string | {};
  keyItem: string;
  keyword: string;
  matched: string[];
  initializeKeyword: () => void;
};

const VerticalChildView = ({
  keyItem,
  data,
  keyword,
  matched,
  initializeKeyword,
}: VerticalChildViewProps) => {
  // const [matched, setMatched] = React.useState<string[]>([]);

  // React.useEffect(() => {
  //   if (!keyword) return;
  //   const splitedPath = getMatched();
  //   setMatched(splitedPath || []);
  // }, [keyword, getMatched]);

  return (
    <details open={matched.includes(keyItem)} onClick={initializeKeyword}>
      <summary
        style={{
          backgroundColor: `${
            keyword && matched.includes(keyItem) ? "orange" : "lightgray"
          }`,
          padding: "4px",
          border: "3px solid black",
          borderRadius: "8px",
          margin: "4px 0",
          cursor: "pointer",
        }}
      >
        {keyItem}
      </summary>
      <div style={{ marginLeft: "28px" }}>
        {typeof data === "string" ? (
          <div
            style={{
              padding: "4px",
              border: "3px solid black",
              borderRadius: "8px",
              margin: "4px 0",
              backgroundColor: "white",
            }}
          >
            {data}
          </div>
        ) : (
          Object.keys(data).map((keyItem) => {
            let value = (data as JsonType)[keyItem];
            return (
              <div key={keyItem}>
                <VerticalChildView
                  data={value}
                  keyItem={keyItem}
                  keyword={keyword}
                  matched={matched}
                  initializeKeyword={initializeKeyword}
                />
              </div>
            );
          })
        )}
      </div>
    </details>
  );
};

type HorizontalViewProps = {
  data: JsonType;
  matched: string[];
  keyword: string;
  initializeMatched: () => void;
};

const HorizontalView = ({
  data,
  matched,
  keyword,
  initializeMatched,
}: HorizontalViewProps) => {
  const [selectedTitle, setSelectedTitle] = React.useState("");

  // 클릭 할 경우 검색어 및 검색어 매치 요소 reset
  const handleSelectTitle = (title: string) => {
    // initializeMatched();
    setSelectedTitle((prev) => (prev === title ? "" : title));
  };
  console.log("selectedTitle: ", selectedTitle);

  // 검색 할 경우 클릭으로 선택한 요소 reset
  React.useEffect(() => {
    if (keyword) setSelectedTitle("");
  }, [keyword]);

  if (!data) return null;
  return (
    <HorizontalViewWrap>
      <PropertyWrap>
        {Object.keys(data).map((title) => (
          <PropertyItem
            key={title}
            onClick={() => handleSelectTitle(title)}
            isMatched={selectedTitle === title || matched?.includes(title)}
          >
            {title} {typeof data[title] === "string" ? "" : "▶"}
          </PropertyItem>
        ))}
      </PropertyWrap>

      {selectedTitle && !matched?.length ? (
        <HorizontalChildView
          data={data[selectedTitle]}
          matched={matched}
          keyword={keyword}
          initializeMatched={initializeMatched}
        />
      ) : null}

      {matched?.length
        ? matched.map((title) => {
            return (
              <HorizontalChildView
                key={title}
                data={data[title]}
                matched={matched}
                keyword={keyword}
                initializeMatched={initializeMatched}
              />
            );
          })
        : null}
    </HorizontalViewWrap>
  );
};

type HorizontalChildViewProps = {
  data: string | JsonType;
  matched: string[];
  keyword: string;
  initializeMatched: () => void;
};

const HorizontalChildView = ({
  data,
  matched,
  keyword,
  initializeMatched,
}: HorizontalChildViewProps) => {
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
      matched={matched}
      keyword={keyword}
      initializeMatched={initializeMatched}
    />
  );
};
