import React from "react";
import { Provider } from "react-redux";
import { RootState } from "../modules";
import configureMockStore from "redux-mock-store";

function prepareMockReduxWrapper(initialState?: Partial<RootState>) {
  const store = configureMockStore()(initialState);
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store as any}>{children}</Provider>;
  };
  return [wrapper, store] as const;
}

export default prepareMockReduxWrapper;
