// Library Imports
import { StyleSheet, View, TouchableOpacity, Alert,Platform } from "react-native";
import React, { memo, useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

// Local Imports
import strings from "../../i18n/strings";
import { styles } from "../../themes";
import CText from "../../components/common/CText";
import { ACCESS_TOKEN, getHeight, moderateScale } from "../../common/constants";
import CHeader from "../../components/common/CHeader";
import CSafeAreaView from "../../components/common/CSafeAreaView";
import {
  Google_Icon,
  Facebook_Icon,
  Apple_Light,
  Apple_Dark,
} from "../../assets/svgs";
import { StackNav } from "../../navigation/NavigationKeys";
import CInput from "../../components/common/CInput";
import { validateEmail, validatePassword } from "../../utils/validators";
import KeyBoardAvoidWrapper from "../../components/common/KeyBoardAvoidWrapper";
import { setAsyncStorageData } from "../../utils/helpers";
import CButton from "../../components/common/CButton";
import { API_BASE_URL } from "../../api/ApiClient";
import Loader from "../../components/Loader";
import { setJwtToken, setUserDetail } from "../../utils/asyncstorage";
import { setuser } from "../../redux/action/profileAction";
import { FlagButton } from "react-native-country-picker-modal";
import auth from '@react-native-firebase/auth';




const Login = ({ navigation }) => {
  const colors = useSelector((state) => state.theme.theme);
  const recaptchaVerifier = useRef(null);
  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    borderColor: colors.textColor,
  };

  const BlurredIconStyle = colors.grayScale5;
  const FocusedIconStyle = colors.textColor;

  const socialIcon = [
    {
      icon: <Facebook_Icon />,
      onPress: () => console.log("Facebook"),
    },
    {
      icon: <Google_Icon />,
      onPress: () => console.log("Google"),
    },
    {
      icon: colors.dark === "dark" ? <Apple_Light /> : <Apple_Dark />,
      onPress: () => console.log("Apple"),
    },
  ];
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [confirm, setConfirm] = useState(null);
  const [password, setPassword] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState('');
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [emailIcon, setEmailIcon] = React.useState(BlurredIconStyle);
  const [passwordIcon, setPasswordIcon] = React.useState(BlurredIconStyle);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
  const [emailInputStyle, setEmailInputStyle] = React.useState(BlurredStyle);
  const [phoneNoInputStyle, setPhoneNoInputStyle] = React.useState(BlurredStyle);
  const [callingCodeLib, setCallingCodeLib] = React.useState(+91);
  const [countryCodeLib, setCountryCodeLib] = React.useState('IN');
  const [visiblePiker, setVisiblePiker] = React.useState(false);
  const [chevronDown, setChevronDown] = React.useState(BlurredIconStyle);
  const [passwordInputStyle, setPasswordInputStyle] =
    React.useState(BlurredStyle);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const [isCheck, setIsCheck] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const onFocusInput = (onHighlight) => onHighlight(FocusedStyle);
  const onFocusIcon = (onHighlight) => onHighlight(FocusedIconStyle);
  const onBlurInput = (onUnHighlight) => onUnHighlight(BlurredStyle);
  const onBlurIcon = (onUnHighlight) => onUnHighlight(BlurredIconStyle);

  useEffect(() => {
    if (
      phoneNo.length > 0
      //  &&
      // password.length > 0 &&
      // // !emailError &&
      // !passwordError
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  // }, [phoneNo, password,  passwordError]);
}, [phoneNo ]);

function onAuthStateChanged(user) {
  if (user) {
    // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
    // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
    // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
    // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
  }
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);

// Handle the button press
async function signInWithPhoneNumber() {
  setLoading(true)
  const number = `+${callingCodeLib} ${phoneNo}`

  const confirmation = await auth().signInWithPhoneNumber(number);
  setConfirm(confirmation);
  console.log(confirmation)
 if(confirmation != null){
  navigation.navigate('OtpScreen',{phoneNo:phoneNo,confirm:confirmation,callingCodeLib:callingCodeLib})
  setLoading(false)
 }
 setLoading(false)
}

// async function confirmCode() {
//   try {
//     const res = await confirm.confirm('123456');
//     console.log(res)
//   } catch (error) {
//     console.log('Invalid code.');
//   }
// }

  const onChangedEmail = (val) => {
    // const {msg} = validateEmail(val.trim());
    setEmail(val.trim());
    // setEmailError(msg);
  };
  const onChangedPassword = (val) => {
    // const {msg} = validatePassword(val.trim());
    setPassword(val.trim());
    // setPasswordError(msg);
  };
  const onChangedPhoneNo = text => setPhoneNo(text);
  const openCountryPicker = () => setVisiblePiker(true);
  const closeCountryPicker = () => setVisiblePiker(false);

  const onBlurPhoneNo = () => {
    onBlurInput(setPhoneNoInputStyle);
    onBlurIcon(setChevronDown);
  };
  const onFocusPhoneNo = () => {
    onFocusInput(setPhoneNoInputStyle);
    onFocusIcon(setChevronDown);
  };
  const countryIcon = () => {
    return (
      <View style={styles.rowSpaceBetween}>
        <FlagButton
          value={callingCodeLib}
          onOpen={openCountryPicker}
          withEmoji={true}
          countryCode={countryCodeLib}
          // withCallingCodeButton={true}
          withCountryNameButton
          containerButtonStyle={localStyles.countryPickerButton}
        />
        <Ionicons
          name="chevron-down-outline"
          size={moderateScale(20)}
          color={chevronDown}
        />
      </View>
    );
  };

  const Login = async () => {
    setLoading(true);
    const myHeaders = new Headers();

    const formdata = new FormData();
    formdata.append("mobile", `${phoneNo}`);
    formdata.append("password", `${password}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${API_BASE_URL}/login`, requestOptions)
      .then((response) => response.text())
      .then(async(result) => {
        const res = JSON.parse(result);

        if (res && res.error == false) {
          Alert.alert("Login", `${res.message}`, [
            { text: "No", onPress: () => {} },
            {
              text: "YES",
              onPress: async () => {
                const userInfo = res.data;
                const token = res.token;
                console.log(userInfo);
                await setAsyncStorageData(ACCESS_TOKEN, "access_token");
                await setUserDetail(userInfo);
                await setJwtToken(token);
                dispatch(setuser(userInfo));
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: StackNav.TabBar,
                    },
                  ],
                });
               
              },
            },
          ]);
        } else {
          alert(res.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const RenderSocialBtn = memo(({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={item.onPress}
        style={[
          localStyles.socialBtn,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.bColor,
          },
        ]}
      >
        {item.icon}
      </TouchableOpacity>
    );
  });

  const EmailIcon = () => {
    return <Ionicons name="mail" size={moderateScale(20)} color={emailIcon} />;
  };

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
    onFocusIcon(setEmailIcon);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
    onBlurIcon(setEmailIcon);
  };

  const PasswordIcon = () => (
    <Ionicons
      name="lock-closed"
      size={moderateScale(20)}
      color={passwordIcon}
    />
  );

  const onFocusPassword = () => {
    onFocusInput(setPasswordInputStyle);
    onFocusIcon(setPasswordIcon);
  };
  const onBlurPassword = () => {
    onBlurInput(setPasswordInputStyle);
    onBlurIcon(setPasswordIcon);
  };
  const RightPasswordEyeIcon = () => (
    <TouchableOpacity
      onPress={onPressPasswordEyeIcon}
      style={localStyles.eyeIconContainer}
    >
      <Ionicons
        name={isPasswordVisible ? "eye-off" : "eye"}
        size={moderateScale(20)}
        color={passwordIcon}
      />
    </TouchableOpacity>
  );

  const onPressSignWithPassword = async () => {
    await setAsyncStorageData(ACCESS_TOKEN, "access_token");
    navigation.reset({
      index: 0,
      routes: [
        {
          name: StackNav.TabBar,
        },
      ],
    });
  };
  const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);
  const onPressSignUp = () => navigation.navigate(StackNav.SetUpProfile,{userRes:null});
  const onPressForgotPassword = () =>
    navigation.navigate(StackNav.ForgotPassword);

  return (
    <CSafeAreaView style={localStyles.root}>
      <Loader loading={loading}></Loader>
      {/* <CHeader /> */}
      <KeyBoardAvoidWrapper>
        <View style={localStyles.mainContainer}>
          <CText type={"b46"} align={"left"} style={styles.mv40}>
            {strings.loginYourAccount}
          </CText>
            
          {/* <CInput
            placeHolder={"Email or MobileNumber"}
            keyBoardType={"email-address"}
            _value={email}
            _errorText={emailError}
            autoCapitalize={"none"}
            insideLeftIcon={() => <EmailIcon />}
            toGetTextFieldValue={onChangedEmail}
            inputContainerStyle={[
              { backgroundColor: colors.inputBg },
              localStyles.inputContainerStyle,
              emailInputStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusEmail}
            onBlur={onBlurEmail}
          /> */}
          <CInput
          placeHolder={strings.phoneNumber}
          keyBoardType={'number-pad'}
          _value={phoneNo}
          _maxLength={10}
          toGetTextFieldValue={onChangedPhoneNo}
          insideLeftIcon={countryIcon}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            phoneNoInputStyle,
          ]}
          _onFocus={onFocusPhoneNo}
          onBlur={onBlurPhoneNo}
        />  
          {/* <CInput
            placeHolder={strings.password}
            keyBoardType={"default"}
            _value={password}
            _errorText={passwordError}
            autoCapitalize={"none"}
            insideLeftIcon={() => <PasswordIcon />}
            toGetTextFieldValue={onChangedPassword}
            inputContainerStyle={[
              { backgroundColor: colors.inputBg },
              localStyles.inputContainerStyle,
              passwordInputStyle,
            ]}
            _isSecure={isPasswordVisible}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusPassword}
            onBlur={onBlurPassword}
            rightAccessory={() => <RightPasswordEyeIcon />}
          /> */}

          <TouchableOpacity
            onPress={() => setIsCheck(!isCheck)}
            style={localStyles.checkboxContainer}
          >
            <Ionicons
              name={isCheck ? "square-outline" : "checkbox"}
              size={moderateScale(26)}
              color={colors.textColor}
            />
            <CText type={"s14"} style={styles.mh10}>
              {strings.rememberMe}
            </CText>
          </TouchableOpacity>

          <CButton
            title={strings.continue}
            type={"S16"}
            color={isSubmitDisabled && colors.white}
            containerStyle={localStyles.signBtnContainer}
            onPress={() => {
              // Login();
              signInWithPhoneNumber()
            }}
            bgColor={isSubmitDisabled && colors.disabledColor}
            disabled={isSubmitDisabled}
          />
          <TouchableOpacity
            onPress={onPressForgotPassword}
            style={localStyles.forgotPasswordContainer}
          >
            <CText
              type={"s16"}
              align={"center"}
              // color={colors.primary}
              style={styles.mh10}
            >
              {strings.forgotPassword}
            </CText>
          </TouchableOpacity>
          <View style={localStyles.divider}>
            <View
              style={[
                localStyles.orContainer,
                { backgroundColor: colors.bColor },
              ]}
            />
            {/* <CText type={'s18'} style={styles.mh10}>
              {strings.orContinueWith}
            </CText> */}
            {/* <View
              style={[
                localStyles.orContainer,
                {backgroundColor: colors.bColor},
              ]}
            /> */}
          </View>

          {/* <View style={localStyles.socialBtnContainer}>
            {socialIcon.map((item, index) => (
              <RenderSocialBtn item={item} key={index.toString()} />
            ))}
          </View> */}

          <TouchableOpacity
            onPress={onPressSignUp}
            style={localStyles.signUpContainer}>
            <CText
              type={'b16'}
              color={colors.dark ? colors.grayScale7 : colors.grayScale5}>
              {strings.dontHaveAccount}
            </CText>
            <CText type={'b16'}> {strings.signUp}</CText>
          </TouchableOpacity>
        </View>
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

export default Login;

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.ph20,
  },
  divider: {
    ...styles.rowCenter,
    ...styles.mv30,
  },
  orContainer: {
    height: getHeight(1),
    width: "30%",
  },
  signBtnContainer: {
    ...styles.center,
    width: "100%",
    ...styles.mv20,
  },
  signUpContainer: {
    ...styles.rowCenter,
    ...styles.mv10,
  },
  inputContainerStyle: {
    height: getHeight(80),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  checkboxContainer: {
    marginTop:30,
    ...styles.rowCenter,
    ...styles.mb20,
  },
  socialBtnContainer: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  socialBtn: {
    ...styles.center,
    height: getHeight(60),
    width: moderateScale(90),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    ...styles.mh10,
  },
});
