import React from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { currentUserIDState } from "../recoil/atom/user.atom";
import {
  currentUserInfoQuery,
  friendsInfoQuery,
} from "../recoil/selector/user.selector";

function CurrentUserInfo() {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  const setCurrentUserID = useSetRecoilState(currentUserIDState);
  const userNameLoadable = useRecoilValueLoadable(currentUserInfoQuery);

  if (userNameLoadable.state === "loading") return <div>Loading...</div>;
  if (userNameLoadable.state === "hasError") return <div>Error...</div>;
  return (
    <div>
      <h1>{currentUser?.value?.name}</h1>
      <ul>
        {friends.map((friend, index) => (
          <li
            key={index}
            onClick={() => setCurrentUserID(friend?.value?.id as string)}
          >
            {friend?.value?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrentUserInfo;
