import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "../types/Filter.types";

const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL" as Filter,
  reducers: {
    applyFilter(state, action: PayloadAction<Filter>) {
      return action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
