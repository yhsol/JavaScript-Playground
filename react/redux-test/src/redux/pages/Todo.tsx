import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import useFilteredTodos from "../../hooks/useFilteredTodos";
// import { effSettingCardsFetchList } from "../stores/todo.effect";
import { selAllTodo } from "../stores/todo.selector";

function ReduxTodo() {
  // const [todos, { remove, toggle }] = useFilteredTodos();
  const dispatch = useDispatch();

  const allTodo = useSelector(selAllTodo);

  useEffect(() => {
    // dispatch(effSettingCardsFetchList);
  }, [dispatch]);

  return <div>{allTodo.map((todo) => todo.text)}</div>;
}

export default ReduxTodo;
