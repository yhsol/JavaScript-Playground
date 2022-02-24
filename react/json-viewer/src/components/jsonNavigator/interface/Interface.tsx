import styled from "styled-components";
import { ViewType } from "../../../types/jsonNavigator.types";

export type InterfaceProps = {
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

  const handleChangeViewType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeType(e.target.value as ViewType);
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeKeyword(e.target.value);
  };

  return (
    <InterfaceWrap>
      <InterfaceItem>
        <label htmlFor="viewtype-select">보기 설정:</label>
        <Select
          name="viewtype"
          id="viewtype-select"
          onChange={handleChangeViewType}
          defaultValue="horizontal"
        >
          <option value="horizontal">가로</option>
          <option value="vertical">세로</option>
        </Select>
      </InterfaceItem>

      <InterfaceItem>
        <label htmlFor="property-search-input">검색:</label>
        <Input
          type="text"
          id="property-search-input"
          value={keyword}
          onChange={handleChangeKeyword}
        />
      </InterfaceItem>

      <InterfaceItem>
        <label htmlFor="file-input">파일 등록:</label>
        <FileInput
          type="file"
          id="file-input"
          accept=".json"
          onChange={handleChangeFile}
        />
      </InterfaceItem>
    </InterfaceWrap>
  );
}

export default Interface;

const InterfaceWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  * {
    font-weight: bold;
  }
`;

const InterfaceItem = styled.div`
  display: grid;
  grid-template-columns: 100px 200px;
`;

const Select = styled.select`
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

const Input = styled.input`
  border: 3px solid;
  border-radius: 4px;
  padding: 4px;
  font-weight: bold;
`;

const FileInput = styled.input`
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
