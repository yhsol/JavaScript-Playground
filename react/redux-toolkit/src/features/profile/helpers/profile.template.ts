import { WithOptional, WithRequired } from "../../../utils/types";
import { Profile } from "../profile.slice";

export type ProfileTemplateFields = "showTodoList" | "profileType";

export type EmptyProfile = WithRequired<Profile, ProfileTemplateFields>;

export const emptyProfile: EmptyProfile = {
  profileType: "guest",
  showTodoList: false,
};

export type PartialProfile = WithOptional<
  Omit<Profile, "profileId">,
  ProfileTemplateFields
>;
