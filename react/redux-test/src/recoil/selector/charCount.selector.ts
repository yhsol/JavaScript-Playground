import { selector } from "recoil";
import { stateText } from "../atom/text.atom";

export const selCharCount = selector({
  key: "selCharCount",
  get: ({ get }) => {
    const text = get(stateText);
    return text.length;
  },
});
