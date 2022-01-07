import { PayloadAction } from "@reduxjs/toolkit";
import { WithRequired } from "../../../utils/types";
import { emptyProfile } from "../helpers/profile.template";
import { initialState, Profile, ProfileState } from "../profile.slice";

export const createProfileReducer = (state: ProfileState): void => {
  const profileId = ++state.maxProfileId;
  state.profileList.push({
    ...emptyProfile,
    profileId,
  });
  state.activeProfileId = profileId;
};

export const deleteProfileReducer = (
  state: ProfileState,
  action: PayloadAction<number>
): void => {
  const index = state.profileList.findIndex(
    (profile) => profile.profileId === action.payload
  );
  state.profileList.splice(index, 1);
  if (state.activeProfileId === action.payload) {
    state.activeProfileId = undefined;
  }
};

export const updateProfileReducer = (
  state: ProfileState,
  action: PayloadAction<WithRequired<Profile, "profileId">>
): void => {
  const profile = state.profileList.find(
    (existingProfile) => existingProfile.profileId === action.payload.profileId
  );

  if (!profile) return;

  Object.assign(profile, action.payload);
};

export const setActiveProfileReducer = (
  state: ProfileState,
  action: PayloadAction<number | undefined>
): void => {
  state.activeProfileId = action.payload;
};

export const resetReducer = (
  _state: ProfileState,
  _action: PayloadAction
): ProfileState => initialState;
