import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useRootState } from "../modules";
import { filterActions } from "../modules/filter";

export function useFilter() {
  const filter = useRootState((state) => state.filter);
  const dispatch = useDispatch();
  const actions = useMemo(
    () => bindActionCreators(filterActions, dispatch),
    [dispatch]
  );
  return [filter, actions.applyFilter] as const;
}
