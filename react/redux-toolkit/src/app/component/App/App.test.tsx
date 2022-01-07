import {
  fireEvent,
  render,
  RenderResult,
  screen,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import App from "./App";

const renderApp = (): RenderResult =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

test("renders the app", () => {
  const { asFragment } = renderApp();
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByLabelText(/profile card/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/todo card/i)).toBeInTheDocument();
});

test("handles profile click", () => {
  const { asFragment } = renderApp();
  const profileCard = screen.getByLabelText(/profile card/i);
  const profileList = within(profileCard).getByRole("list");
  const profileListItems = within(profileList).getAllByRole("listitem");

  const todoCard = screen.getByLabelText(/todo card/i);
  const todoList = within(todoCard).getByRole("list");
  let todoListItems = within(todoList).queryAllByRole("lsititem");

  fireEvent.click(profileListItems[0]);
  todoListItems = within(todoList).queryAllByRole("listitem");
  expect(todoListItems).toHaveLength(3);
  expect(asFragment()).toMatchSnapshot();
});

test("handles profile delete click", () => {
  const { asFragment } = renderApp();
  const profileCard = screen.getByLabelText(/profile card/i);
  const profileList = within(profileCard).getByRole("list");
  const profileListItems = within(profileList).getAllByRole("listitem");
  fireEvent.click(profileListItems[0]);

  const profileDeleteButton = within(profileListItems[0]).getByText(/delete/i);

  fireEvent.click(profileDeleteButton);
  const todoCard = screen.getByLabelText(/todo card/i);
  const todoList = within(todoCard).getByRole("list");
  const todoListItems = within(todoList).queryAllByRole("listitem");
  expect(todoListItems).toHaveLength(0);
  expect(asFragment()).toMatchSnapshot();
});

test("handles create new todo click", () => {
  const { rerender } = renderApp();
  let alert = screen.queryByRole("alert");
  expect(alert).not.toBeInTheDocument();
  const createNewTodoButton = screen.getByText(/create new todo/i);
  fireEvent.click(createNewTodoButton);
  rerender(
    <Provider store={store}>
      <App />
    </Provider>
  );
  alert = screen.getByRole("alert");
  expect(alert).toBeInTheDocument();
  const alertCloseButton = within(alert).getByRole("button");
  fireEvent.click(alertCloseButton);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(alert).not.toBeInTheDocument();
});
