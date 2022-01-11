import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useRootState } from "../modules";
import { articlesActions } from "../modules/articles";

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
