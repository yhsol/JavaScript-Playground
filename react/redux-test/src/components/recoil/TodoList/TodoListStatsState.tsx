import React from "react";
import { useRecoilValue } from "recoil";
import { selTodoListStats } from "../../../recoil/selector/todoList.selector";

function TodoListStatsState() {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(selTodoListStats);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);
  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

export default TodoListStatsState;
