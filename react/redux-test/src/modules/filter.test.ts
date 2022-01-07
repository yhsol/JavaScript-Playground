import filter, { filterActions } from "./filter";

describe("filter reducer", () => {
  it("has initial state", () => {
    expect(filter(undefined, { type: "@@INIT" })).toBe("ALL");
  });

  it("handles applyFilter", () => {
    expect(filter("ALL", filterActions.applyFilter("DONE"))).toBe("DONE");
  });
});
