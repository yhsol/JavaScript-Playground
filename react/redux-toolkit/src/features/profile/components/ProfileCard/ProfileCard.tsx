import React from "react";
import { useSelector } from "react-redux";
import CardFooterWrapper from "../../../../app/component/CardFooterWrapper/CardFooterWrapper";
import { profileListSelector } from "../../selectors/profile.selector";
import ProfileItem from "../ProfileItem/ProfileItem";
import { getCreateOnClick } from "../ProfileItem/profileItem.funcs";

const ProfileCard = () => {
  const profileList = useSelector(profileListSelector);
  return (
    <div className="card" role="main" aria-label="Profile Card">
      <div className="card-header">
        <h5 className="card-title">Profiles</h5>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {profileList.map((profile) => (
            <ProfileItem
              key={profile.profileId}
              profile={profile}
            ></ProfileItem>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        <CardFooterWrapper>
          <button className="btn btn-primary" onClick={getCreateOnClick()}>
            Create New Profile
          </button>
        </CardFooterWrapper>
      </div>
    </div>
  );
};

export default ProfileCard;
