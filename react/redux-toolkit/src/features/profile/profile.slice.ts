import { createSlice } from "@reduxjs/toolkit";
import {
  createProfileReducer,
  deleteProfileReducer,
  resetReducer,
  setActiveProfileReducer,
  updateProfileReducer,
} from "./reducers/profile.reducer";

const profileTypes = ["guest", "user", "admin"] as const;
export type ProfileType = typeof profileTypes[number];

export interface Profile {
  profileId: number;
  name?: string;
  profileType: ProfileType;
  showTodoList: boolean;
}

export interface ProfileState {
  profileList: Profile[];
  maxProfileId: number;
  profileTypes: ReadonlyArray<ProfileType>;
  activeProfileId?: number;
}

export const initialState: ProfileState = {
  profileList: [
    { profileId: 1, name: "Ben", profileType: "admin", showTodoList: true },
    { profileId: 2, name: "Sue", profileType: "user", showTodoList: false },
  ],
  maxProfileId: 2,
  profileTypes: profileTypes as ReadonlyArray<ProfileType>,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    createProfile: createProfileReducer,
    deleteProfile: deleteProfileReducer,
    updateProfile: updateProfileReducer,
    setActiveProfile: setActiveProfileReducer,
    reset: resetReducer,
  },
});

export const {
  createProfile,
  deleteProfile,
  updateProfile,
  setActiveProfile,
  reset,
} = profileSlice.actions;

const profileReducer = profileSlice.reducer;
export default profileReducer;
