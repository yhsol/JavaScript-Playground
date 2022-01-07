import React from "react";
import { store } from "../../../../app/store";
import {
  createProfile,
  deleteProfile,
  ProfileType,
  setActiveProfile,
  updateProfile,
} from "../../profile.slice";

export const getItemOnClick = (profileId?: number) => (): void => {
  store.dispatch(setActiveProfile(profileId));
};

export const getNameOnChange =
  (profileId?: number) =>
  (name: string): void => {
    if (!profileId) return;
    store.dispatch(updateProfile({ profileId, name }));
  };

export const getTypeOnChange =
  (profileId?: number) =>
  (value: string): void => {
    if (!profileId) return;
    store.dispatch(
      updateProfile({ profileId, profileType: value as ProfileType })
    );
  };

export const getDeleteOnClick =
  (profileId?: number) =>
  (event: React.MouseEvent): void => {
    if (!profileId) return;
    store.dispatch(deleteProfile(profileId));
    event.stopPropagation();
  };

export const getCreateOnClick = () => (): void => {
  store.dispatch(createProfile());
};
