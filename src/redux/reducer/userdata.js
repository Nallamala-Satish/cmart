import { USER_DATA } from "../types";

const UserData = (initialState = {}, action) => {
  switch (action.type) {
    case USER_DATA:
      return action.payload;
    default:
      return initialState;
  }
};

export default UserData;
