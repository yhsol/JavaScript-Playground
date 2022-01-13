import { selector, selectorFamily, waitForAll } from "recoil";
import { currentUserIDState } from "../atom/user.atom";

type ResponseType = {
  ok: boolean;
  error?: Error;
  value: {
    id: string;
    name: string;
  } | null;
  friends: string[];
};

function myDBQuery<T>({ userID }: { userID: string }): Promise<ResponseType> {
  let user = null;
  setTimeout(() => {
    user = { id: userID, name: "name" };
  }, 5000);
  return Promise.resolve({
    ok: true,
    error: Error(""),
    value: user,
    friends: ["test1", "test2"],
  });
}

export const userInfoQuery = selectorFamily({
  key: "userInfoQuery",
  get: (userID) => async () => {
    // const response = await myDBQuery({ userID: userID as string });
    // if (response.error) throw response.error;
    return {
      ok: true,
      error: Error(""),
      value: { id: userID, name: userID },
      friends: [
        { id: "f1", name: "f1" },
        { id: "f2", name: "f2" },
      ],
    };
  },
});

export const currentUserInfoQuery = selector({
  key: "currentUserInfoQuery",
  get: ({ get }) => get(userInfoQuery(get(currentUserIDState))), // get 에 selector 랑 atom 둘 다 가능한건가?
});

export const friendsInfoQuery = selector({
  key: "friendsInfoQuery",
  get: ({ get }) => {
    const { friends } = get(currentUserInfoQuery);
    // return friends?.map((friendID) => get(userInfoQuery(friendID)));
    const friendList = get(
      waitForAll(friends.map((friendID) => userInfoQuery(friendID)))
    );
    return friendList;
  },
});
