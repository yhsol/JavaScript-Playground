import todos, { todosActions } from "./todos";

describe("todos reducer", () => {
  it("has initial state", () => {
    expect(todos(undefined, { type: "@@INIT" })).toEqual([]);
  });

  it("handles add", () => {
    const state = todos([], todosActions.add("컴포넌트 만들기"));
    expect(state[0].text).toEqual("컴포넌트 만들기");
  });

  const sampleState = [
    { id: "1", done: false, text: "컴포넌트 만들기" },
    { id: "2", done: false, text: "테스트 코드 작성하기" },
  ];

  it("handles toggle", () => {
    let state = todos(sampleState, todosActions.toggle("1"));

    expect(state).toEqual([
      { id: "1", done: true, text: "컴포넌트 만들기" },
      { id: "2", done: false, text: "테스트 코드 작성하기" },
    ]);

    state = todos(state, todosActions.toggle("1"));
    expect(state).toEqual([
      { id: "1", done: false, text: "컴포넌트 만들기" },
      { id: "2", done: false, text: "테스트 코드 작성하기" },
    ]);
  });

  it("handles remove", () => {
    let state = [
      { id: "1", done: false, text: "컴포넌트 만들기" },
      { id: "2", done: false, text: "테스트 코드 작성하기" },
    ];
    state = todos(state, todosActions.remove("2"));
    expect(state).toEqual([{ id: "1", done: false, text: "컴포넌트 만들기" }]);
    state = todos(state, todosActions.remove("1"));
    expect(state).toEqual([]);
  });
});
