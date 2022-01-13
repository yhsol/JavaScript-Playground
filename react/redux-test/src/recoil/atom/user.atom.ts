import { atom } from "recoil";

export const currentUserIDState = atom<string | null>({
  key: "currentUserIDState",
  default: null,
});
