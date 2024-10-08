import { CHANGE_LANGUAGE, USER_DATA } from "../types";

export const changeLanguageAction = (type) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: type,
    });
  };
};

export const setuser = (data) => ({
  type: USER_DATA,
  payload: data,
});
