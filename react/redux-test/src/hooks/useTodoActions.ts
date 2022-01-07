import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { todosActions } from "../modules/todos";

export function useTodoActions() {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(todosActions, dispatch), [dispatch]);
}
