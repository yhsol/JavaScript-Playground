import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../../app/component/CustomSelect/CustomSelect";
import CustomTextInput from "../../../../app/component/CustomTextInput/CustomTextInput";
import { emptyProfile } from "../../helpers/profile.template";
import { Profile } from "../../profile.slice";
import {
  getIsActiveSelector,
  profileTypesSelector,
} from "../../selectors/profile.selector";
import {
  getDeleteOnClick,
  getItemOnClick,
  getNameOnChange,
  getTypeOnChange,
} from "./profileItem.funcs";
import styles from "./ProfileItem.module.css";

interface ProfileProps {
  profile: Profile;
}

const ProfileItem: React.FC<ProfileProps> = ({ profile = emptyProfile }) => {
  const profileTypes = useSelector(profileTypesSelector);
  const isActive = useSelector(getIsActiveSelector(profile));
  return (
    <li
      className={classNames("list-group-item", styles.profileItem, {
        active: isActive,
      })}
      onClick={getItemOnClick(profile.profileId)}
    >
      <CustomTextInput
        idPrefix={`name-${profile.profileId}`}
        label="Name"
        value={profile.name}
        onChange={getNameOnChange(profile.profileId)}
        autoFocus={isActive}
      />
      <CustomSelect
        idPrefix={`type-${profile.profileId}`}
        label="Type"
        value={profile.profileType}
        options={profileTypes}
        onChange={getTypeOnChange(profile.profileId)}
      />
      <div className={styles.buttonWrapper}>
        <button
          className="btn btn-danger"
          onClick={getDeleteOnClick(profile.profileId)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ProfileItem;
