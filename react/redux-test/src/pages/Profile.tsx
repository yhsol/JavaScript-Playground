import { useParams } from "react-router-dom";
import { ProfileModel } from "../types/Profile.types";

type ProfileParams = {
  username: string;
};

const data: Record<string, ProfileModel> = {
  user1: {
    name: "user1-name",
    desc: "user1-desc",
  },
  user2: {
    name: "user2-name",
    desc: "user2-desc",
  },
};

function Profile() {
  const params = useParams<ProfileParams>();
  const profile = params.username ? data[params.username] : null;

  return (
    <div>
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.desc}</p>
        </div>
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}

export default Profile;
