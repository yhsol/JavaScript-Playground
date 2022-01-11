import { selector } from "recoil";
import { FilterEnum } from "../../constants/filter.enum";
import { stateTodoList, stateTodoListFilter } from "../atom/todoList.atom";

export const selFilteredTodoList = selector({
  key: "selFilteredTodoList",
  get: ({ get }) => {
    // selFilteredTodoList 는 내부적으로 2개의 의존성(`stateTodoListFilter`, `stateTodoList`)을 추적함. 그래서 둘 중 하나라도 변하면 selFilteredTodoList는 재 실행됨.
    const filter = get(stateTodoListFilter);
    const list = get(stateTodoList);

    switch (filter) {
      case FilterEnum.SHOW_COMPLETE:
        return list.filter((item) => item.isComplete);
      case FilterEnum.SHOW_UNCOMPLETE:
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const selTodoListStats = selector({
  key: "selTodoListStats",
  get: ({ get }) => {
    const todoList = get(stateTodoList);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
