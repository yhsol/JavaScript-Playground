import { atom } from "recoil";
import { TodoType } from "../../../../redux-toolkit/src/utils/types";
import { FilterEnum } from "../../constants/filter.enum";

export const stateTodoList = atom<TodoType[]>({
  key: "stateTodoList",
  default: [],
});

export const stateTodoListFilter = atom<FilterEnum>({
  key: "statteTodoListFilter",
  default: FilterEnum.SHOW_ALL,
});
