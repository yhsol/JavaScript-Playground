import { Provider } from "react-redux";
import { RootState } from "../modules";
import configureStore from "./configureStore";

function prepareReduxWrapper(initialState?: RootState) {
  const store = configureStore(initialState);
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return [wrapper, store] as const;
}

export default prepareReduxWrapper;
