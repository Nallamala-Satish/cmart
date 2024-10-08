// Library Imports
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import {
  AppLogoDark,
  AppLogoLight,
  EditDark,
  EditLight,
  Menu_Dark,
  Menu_Light,
} from '../../../assets/svgs';
import {ACCESS_TOKEN, moderateScale, THEME} from '../../../common/constants';
import {colors, styles} from '../../../themes';
import {ProfileSetting} from '../../../api/constant';
import strings from '../../../i18n/strings';
import CText from '../../../components/common/CText';
import {changeThemeAction} from '../../../redux/action/themeAction';
import {setAsyncStorageData} from '../../../utils/helpers';
import images from '../../../assets/images';
import {StackNav} from '../../../navigation/NavigationKeys';
import LogOut from '../../../components/models/LogOut';
import {getJwtToken, getUserDetail, removeUserDetail} from '../../../utils/asyncstorage';
import Loader from '../../../components/Loader';
import { API_BASE_URL } from '../../../api/ApiClient';
import { useIsFocused } from '@react-navigation/native';

export default function ProfileTab({navigation}) {
  const color = useSelector(state => state.theme.theme);
  const isFocused = useIsFocused()
  const language = useSelector(state => state?.profile?.language);
  const [isEnabled, setIsEnabled] = useState(!!color.dark);
  const [addressList,setAddressList]= useState([])
  const [loading,setLoading]= useState(false)
  const [userdata,setUserData] = useState('')
  const[profileData,setProfileData] = useState('')
  const dispatch = useDispatch();
  const LogOutSheetRef = createRef();

  // const userdata = useSelector(state => state.UserData)

  const getUserData = async ()=>{
    const res = await getUserDetail()
     setUserData(res)
   }
   useEffect(()=>{
    getUserData()
   },[isFocused])

  //  console.log('userdata.',userdata)

  const onPressMenu = () => {};

  const onPressLightTheme = () => {
    setAsyncStorageData(THEME, 'light');
    dispatch(changeThemeAction(colors.light));
  };

  const onPressDarkTheme = () => {
    setAsyncStorageData(THEME, 'dark');
    dispatch(changeThemeAction(colors.dark));
  };

  const toggleSwitch = val => {
    if (val) {
      onPressDarkTheme();
    } else {
      onPressLightTheme();
    }
    setIsEnabled(previousState => !previousState);
  };

  const onPressEditProfile = () =>
    navigation.navigate(StackNav.SetUpProfile, {title: strings.editProfile});

  const onPressItem = item => {
    if (item.route === StackNav.SetUpProfile) {
      navigation.navigate(item.route, {title: item.header,userRes:userdata});
    }else if (item.route === StackNav.Address) {
      navigation.navigate(item.route,
         {title: strings.shippingAddress,
          addressList:addressList,
        GetAddressList:GetAddressList
      });
    }
     else {
      navigation.navigate(item.route);
    }
  };

  const onPressLogOutBtn = () => LogOutSheetRef?.current?.show();

  const onPressYesLogOut = async () => {
    try {
      await removeUserDetail(ACCESS_TOKEN);
      LogOutSheetRef?.current?.hide();
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.Auth}],
        });
      }, 500);
      return true;
    } catch (exception) {
      return false;
    }
  };

  const onPressCancel = () => LogOutSheetRef?.current?.hide();

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressMenu} style={styles.pr10}>
        {color.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  const LeftIcon = () => {
    return (
      <View style={styles.pr10}>
        {colors.dark ? (
          // <AppLogoDark />
          <Image
           source={require('../../../assets/images/applogo.png')}
           style={{width:40,height:30}}
          />
          ) : (
          // <AppLogoLight />
          <Image
           source={require('../../../assets/images/applogo.png')}
           style={{width:40,height:30}}
          />
          )}
      </View>
    );
  };

  const profile = async ()=>{
    setLoading(true)
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()
    setLoading(true)
    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

   const formdata = new FormData();
  formdata.append("user_id", `${userinfo && userinfo.id}`);

const requestOptions = {
method: "POST",
headers: myHeaders,
body: formdata,
redirect: "follow"
};
fetch(`${API_BASE_URL}/get_settings`, requestOptions)
.then((response) => response.text())
.then((result) => {
  const res = JSON.parse(result)
  // console.log(res)
  if( res && res.error == false){
    setProfileData(res.data)
  }else{
    alert(res.message)
  }
  setLoading(false)
})
.catch((error) => {
  console.error(error)
  setLoading(false)
});
  }

  const GetAddressList = async ()=>{
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()
    setLoading(true)
    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

   const formdata = new FormData();
  formdata.append("user_id", `${userinfo && userinfo.id}`);

const requestOptions = {
method: "POST",
headers: myHeaders,
body: formdata,
redirect: "follow"
};
fetch(`${API_BASE_URL}/get_address`, requestOptions)
.then((response) => response.text())
.then((result) => {
  const res = JSON.parse(result)
  // console.log(res.data);
  if( res && res.error == false){
    setAddressList(res.data)
  }else{
    setAddressList([])
  }
  setLoading(false)
})
.catch((error) => {
  console.error(error)
  setLoading(false)
});
   }

useEffect(()=>{
  profile()
  GetAddressList()
},[isFocused])


  return (
    <CSafeAreaView>
      <Loader loading={loading}></Loader>
      <CHeader
        isHideBack={true}
        title={strings.profile}
        isLeftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyles.root}>
        <TouchableOpacity
          onPress={onPressEditProfile}
          style={[styles.selfCenter, styles.mb20]}>
          <Image
            // source={color.dark ? images.userDark : images.userLight}
            source={{uri:userdata?.image}}
            style={localStyles.userImage}
          />
          <View style={localStyles.editIcon}>
            {color.dark ? <EditDark /> : <EditLight />}
          </View>
        </TouchableOpacity>
        <View style={styles.mb20}>
          <CText type="b24" align={'center'}>
          {userdata?.username}
          </CText>
          <CText type="m14" align={'center'} style={styles.mt10}>
          {userdata?.email}
          </CText>
        </View>
        {ProfileSetting.map((item, index) => {
          return (
            <TouchableOpacity
              disabled={item.title === strings.darkMode}
              onPress={() => onPressItem(item)}
              key={index}
              activeOpacity={item.rightIcon ? 1 : 0.5}
              style={localStyles.settingsContainer}>
              <Ionicons
                name={item.icon}
                size={moderateScale(28)}
                color={color.dark ? color.white : color.darkColor}
              />
              <CText type="s18" style={styles.ml15}>
                {item.title}
              </CText>
              <View style={localStyles.rightContainer}>
                {!!item.value && (
                  <CText type="s18" style={styles.mr10}>
                    {language}
                  </CText>
                )}
                {!!item.rightIcon ? (
                  <Switch
                    trackColor={{
                      false: color.grayScale3,
                      true: color.grayScale5,
                    }}
                    thumbColor={color.white}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                ) : (
                  <Ionicons
                    name="chevron-forward-outline"
                    size={moderateScale(20)}
                    color={color.dark ? color.white : color.darkColor}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          onPress={onPressLogOutBtn}
          style={localStyles.settingsContainer}>
          <Ionicons
            name={'log-out-outline'}
            size={moderateScale(28)}
            color={color.redColor}
          />
          <CText
            type="s18"
            color={color.redColor}
            style={localStyles.logOutStyle}>
            {strings.logout}
          </CText>
        </TouchableOpacity>
      </ScrollView>
      <LogOut
        SheetRef={LogOutSheetRef}
        onPressLogOut={onPressYesLogOut}
        onPressCancel={onPressCancel}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.pb20,
  },
  settingsContainer: {
    ...styles.mt15,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  rightContainer: {
    ...styles.flex,
    ...styles.rowEnd,
  },
  userImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  logOutStyle: {
    ...styles.ml15,
  },
});
