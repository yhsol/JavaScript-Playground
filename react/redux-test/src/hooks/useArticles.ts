import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRootState } from "../modules";
import { articlesActions } from "../modules/articles";
import { selAllTodo } from "../redux/stores/todo.selector";
import { useFilter } from "./useFilter";
import { useTodoActions } from "./useTodoActions";

function useArticleActions() {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(articlesActions, dispatch),
    [dispatch]
  );
}

function useArticles() {
  const articles = useRootState((state) => state.articles);
  const actions = useArticleActions();
  return [articles, actions] as const;
}

export default useArticles;
