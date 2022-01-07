import { RootState } from "../../../app/rootReducer";
import { Profile } from "../../profile/profile.slice";

export const activeProfileSelector = (state: RootState): Profile | undefined =>
  state.profile.profileList.find(
    (profile) => profile.profileId === state.profile.activeProfileId
  );
