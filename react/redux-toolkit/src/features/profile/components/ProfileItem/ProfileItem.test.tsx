import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import { Profile } from "../../profile.slice";
import ProfileItem from "./ProfileItem";

const renderItem = (profile: Profile): RenderResult =>
  render(
    <Provider store={store}>
      <ProfileItem profile={profile} />
    </Provider>
  );

test("renders ProfileItem", () => {
  const profile = store.getState().profile.profileList[0];
  const { asFragment } = renderItem(profile);
  expect(asFragment()).toMatchSnapshot();
});

test("ProfileItem name field", () => {
  let profile = store.getState().profile.profileList[0];
  const { asFragment, rerender } = renderItem(profile);
  let textInput = screen.getByLabelText("Name");
  expect(textInput).toHaveValue("Ben");
  fireEvent.change(textInput, { target: { value: "George" } });

  textInput = screen.getByLabelText("Name");
  profile = store.getState().profile.profileList[0];
  expect(profile).toMatchInlineSnapshot(`
        Object {
            "name": "George",
            "profileId": 1,
            "profileType": "admin",
            "showTodoList": true
        }
    `);
  rerender(
    <Provider store={store}>
      <ProfileItem profile={profile}></ProfileItem>
    </Provider>
  );
  expect(textInput).toHaveValue("George");
  expect(asFragment()).toMatchSnapshot();
});

test("ProfileItem type field", () => {
  let profile = store.getState().profile.profileList[0];
  const { asFragment, rerender } = renderItem(profile);
  let typeSelect = screen.getByLabelText("Type");
  expect(typeSelect).toHaveValue("admin");
  fireEvent.change(typeSelect, { target: { value: "user" } });

  typeSelect = screen.getByLabelText("Type");
  profile = store.getState().profile.profileList[0];
  expect(profile).toMatchInlineSnapshot(``);
});
