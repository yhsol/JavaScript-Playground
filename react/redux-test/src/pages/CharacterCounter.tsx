import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { stateText } from "../recoil/atom/text.atom";
import { selCharCount } from "../recoil/selector/charCount.selector";

function TextInput() {
  const [text, setText] = useRecoilState(stateText); // atom 사용. atom 을 사용하면 구독하게 됨. => atom 수정 시 구독하고 있는 컴포넌트 재 렌더링
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <br />
      Echo: {text}
    </div>
  );
}

function CharacterCount() {
  const count = useRecoilValue(selCharCount); // 파생 상태를 selector 를 통해 가져와서 값을 사용
  return <div>Character Count: {count}</div>;
}

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

export default CharacterCounter;
