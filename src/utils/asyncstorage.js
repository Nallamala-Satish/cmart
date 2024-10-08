import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN, ON_BOARDING, THEME} from '../common/constants';

const USER_DETAIL = "user_detail"
const JWT_TOKEN = 'jwtToken';
const ADDRESS = 'Address'

 export const setUserDetail = async value => {
  const stringifyData = JSON.stringify(value);
  await AsyncStorage.setItem(USER_DETAIL, stringifyData);
  return true;
};
 export const getUserDetail = async () => {
  const getUserData = await AsyncStorage.getItem(USER_DETAIL);
  if (!!getUserData) {
    return JSON.parse(getUserData);
  } else {
    return false;
  }
};
export const getJwtToken = async () => {
  return await AsyncStorage.getItem(JWT_TOKEN);
};

export const setJwtToken = async jwtToken => {
  await AsyncStorage.setItem(JWT_TOKEN, jwtToken);
};

export const getSelectAddress = async () => {
  return await AsyncStorage.getItem(ADDRESS);
};

export const setSelectAddress = async address => {
  // await AsyncStorage.setItem(ADDRESS, address);
  const stringifyData = JSON.stringify(address);
  await AsyncStorage.setItem(ADDRESS, stringifyData);
  return true;
};

const removeUserDetail = async key => {
  await AsyncStorage.removeItem(key);
};

const initialStorageValueGet = async () => {
  let asyncData = await AsyncStorage.multiGet([
    THEME,
    ON_BOARDING,
    ACCESS_TOKEN,
  ]);
  console.log('asyncData ', asyncData);
  const themeColor = JSON.parse(asyncData[0][1]);
  const onBoardingValue = JSON.parse(asyncData[1][1]);
  const acessTokenValue = JSON.parse(asyncData[2][1]);
  return {themeColor, onBoardingValue, acessTokenValue};
};

// setOnBoarding;

const setOnBoarding = async value => {
  const stringifyData = JSON.stringify(value);
  await AsyncStorage.setItem(ON_BOARDING, stringifyData);
  return;
};

export {
  // setUserDetail, getUserDetail,
  initialStorageValueGet,
  setOnBoarding,
  removeUserDetail,
};
