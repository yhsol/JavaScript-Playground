import { fireEvent, render, screen } from "@testing-library/react";
import prepareMockReduxWrapper from "../../lib/prepareMockReduxWrapper";
import { todosActions } from "../../modules/todos";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
  const setup = () => {
    const [Wrapper, store] = prepareMockReduxWrapper();
    render(
      <Wrapper>
        <TodoForm />
      </Wrapper>
    );
    return { store };
  };

  it("renders properly", () => {
    setup();
  });
  it("submit new todo", async () => {
    const { store } = setup();
    const input = await screen.findByPlaceholderText("할 일을 입력하세요.");
    fireEvent.change(input, {
      value: "컴포넌트 만들기",
    });
    fireEvent.submit(input);
    expect(input).toHaveValue("");
    expect(
      store
        .getActions()
        .filter((action) => action.type === todosActions.add.type)
    ).toHaveLength(1);
  });
});
