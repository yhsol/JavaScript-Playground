import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../types/Articles.types";

const initialArticle: Article = {
  id: 0,
  text: "add article!",
  read: false,
};

const articlesSlice = createSlice({
  name: "todos",
  initialState: [initialArticle],
  reducers: {
    add: {
      prepare: (text: string) => ({
        payload: {
          id: parseInt(nanoid()),
          text,
          read: false,
        },
      }),
      reducer(state, action: PayloadAction<Article>) {
        state.push(action.payload);
      },
    },
    read(state, action: PayloadAction<number>) {
      const article = state.find((article) => article.id === action.payload);
      if (!article) return;
      article.read = !article.read;
    },
    remove(state, action: PayloadAction<number>) {
      return state.filter((article) => article.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(
    //   effSettingCardsFetchList.fulfilled,
    //   (state, { payload }) => {
    //     //
    //   }
    // );
  },
});

export const articlesActions = articlesSlice.actions;
export default articlesSlice.reducer;
