import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import prepareMockReduxWrapper from "../lib/prepareMockReduxWrapper";
import { filterActions } from "../modules/filter";
import { useFilter } from "./useFilter";

describe("useFilter", () => {
  const setup = () => {
    const [wrapper, store] = prepareMockReduxWrapper({
      filter: "ALL",
      todos: [],
    });
    const { result } = renderHook(() => useFilter(), { wrapper });
    return { wrapper, store, result };
  };

  it("returns filter ALL", () => {
    const { result } = setup();
    expect(result.current[0]).toEqual("ALL");
  });
  it("returns filter DONE", () => {
    const { store, result } = setup();
    act(() => {
      result.current[1]("DONE");
    });
    expect(store.getActions()).toEqual([filterActions.applyFilter("DONE")]);
  });
});
