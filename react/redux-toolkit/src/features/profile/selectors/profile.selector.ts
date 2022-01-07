import { RootState } from "../../../app/rootReducer";
import { WithRequired } from "../../../utils/types";
import { ProfileTemplateFields } from "../helpers/profile.template";
import { Profile } from "../profile.slice";

export const profileListSelector = (state: RootState): Profile[] => {
  return state.profile.profileList;
};

export const profileTypesSelector = (state: RootState): string[] => {
  return state.profile.profileTypes as string[];
};

export const getIsActiveSelector =
  (profile: WithRequired<Profile, ProfileTemplateFields>) =>
  (state: RootState): boolean => {
    return state.profile.activeProfileId === profile.profileId;
  };
