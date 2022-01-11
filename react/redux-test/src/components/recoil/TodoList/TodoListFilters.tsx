import React from "react";
import { useRecoilState } from "recoil";
import { FilterEnum } from "../../../constants/filter.enum";
import { stateTodoListFilter } from "../../../recoil/atom/todoList.atom";

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(stateTodoListFilter);

  const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterEnum);
  };
  return (
    <>
      Filter:
      <select name="todoListfilters" value={filter} onChange={updateFilter}>
        <option value={FilterEnum.SHOW_ALL}>{FilterEnum.SHOW_ALL}</option>
        <option value={FilterEnum.SHOW_COMPLETE}>
          {FilterEnum.SHOW_COMPLETE}
        </option>
        <option value={FilterEnum.SHOW_UNCOMPLETE}>
          {FilterEnum.SHOW_UNCOMPLETE}
        </option>
      </select>
    </>
  );
}

export default TodoListFilters;
