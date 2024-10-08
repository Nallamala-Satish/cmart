// Library Imports
import { StyleSheet, View, TouchableOpacity, Alert, Text } from "react-native";
import React, { memo, useEffect, useState } from "react";
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
import { useRoute } from "@react-navigation/native";
import Popover from "react-native-popover-view";

const OtpScreen = ({ navigation }) => {
  const route = useRoute();

  const { phoneNo, confirm, callingCodeLib } = route.params;
  const colors = useSelector((state) => state.theme.theme);

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
  const [otp, setOtp] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [emailIcon, setEmailIcon] = React.useState(BlurredIconStyle);
  const [passwordIcon, setPasswordIcon] = React.useState(BlurredIconStyle);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
  const [emailInputStyle, setEmailInputStyle] = React.useState(BlurredStyle);
  const [phoneNoInputStyle, setPhoneNoInputStyle] =
    React.useState(BlurredStyle);
  // const [callingCodeLib, setCallingCodeLib] = React.useState(+91);
  const [countryCodeLib, setCountryCodeLib] = React.useState("IN");
  const [visiblePiker, setVisiblePiker] = React.useState(false);
  const [fullName, setFullName] = useState("");
  const [chevronDown, setChevronDown] = React.useState(BlurredIconStyle);
  const [fullNameInputStyle, setFullNameInputStyle] = useState(BlurredStyle);
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
    if (otp.length > 0) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [otp]);

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
  const onChangedPhoneNo = (text) => setPhoneNo(text);
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

  async function confirmCode() {
    try {
      const res = await confirm.confirm(otp);
      console.log(res);
      Login();
    } catch (error) {
      console.log("Invalid code.");
      alert("Invalid code.");
    }
  }

  const Login = async () => {
    setLoading(true);
    const myHeaders = new Headers();

    const formdata = new FormData();
    formdata.append("mobile", `${phoneNo}`);
    formdata.append("password", `${otp}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${API_BASE_URL}/login`, requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
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
          setShowPopover(false);
        } else {
          setShowPopover(true);
          // alert(res.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const Register = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    // myHeaders.append("Cookie", "ci_session=5fd099dnbfj3ng6tmecrinu5saeivlhb");

    const formdata = new FormData();
    formdata.append("name", `${fullName}`);
    formdata.append("email", `${email}`);
    formdata.append("mobile", `${phoneNo}`);
    formdata.append("country_code", `${callingCodeLib}`);
    formdata.append("referral_code", `${otp}`);
    formdata.append("fcm_id", "");
    formdata.append("friends_code", "");
    formdata.append("latitude", "");
    formdata.append("longitude", "");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    console.log(formdata);
    fetch(`${API_BASE_URL}/register_user`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        console.log(result);
        if (res && res.error == false) {
          Alert.alert("Registration", `${res.message}`, [
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
          setShowPopover(false);
        } else {
          alert(res.message);
          setShowPopover(false);
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
  const onFocusFullName = () => onFocusInput(setFullNameInputStyle);
  const onBlurFullName = () => onBlurInput(setFullNameInputStyle);
  const onChangedFullName = (text) => setFullName(text);
  const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);
  const onPressSignUp = () =>
    navigation.navigate(StackNav.SetUpProfile, { userRes: null });
  const onPressForgotPassword = () =>
    navigation.navigate(StackNav.ForgotPassword);

  return (
    <CSafeAreaView style={localStyles.root}>
      <Loader loading={loading}></Loader>
      <CHeader />
      <KeyBoardAvoidWrapper>
        <View style={localStyles.mainContainer}>
          <CText type={"b46"} align={"left"} style={{ marginTop: 50 }}>
            {"Enter OTP"}
          </CText>

          <CInput
            placeHolder={"Enter your otp"}
            keyBoardType={"default"}
            _value={otp}
            _errorText={passwordError}
            autoCapitalize={"none"}
            insideLeftIcon={() => <PasswordIcon />}
            toGetTextFieldValue={(text) => setOtp(text)}
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
          />

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
            title={strings.signIn}
            type={"S16"}
            color={isSubmitDisabled && colors.white}
            containerStyle={localStyles.signBtnContainer}
            onPress={() => {
              // Login();
              confirmCode();
            }}
            bgColor={isSubmitDisabled && colors.disabledColor}
            disabled={isSubmitDisabled}
          />
        </View>
      </KeyBoardAvoidWrapper>
      {showPopover ? (
        <Popover
          popoverStyle={{
            width: 300,
            height: 350,
            borderRadius: 10,
            //  alignItems: 'center',
            justifyContent: "center",
            // flex:1
          }}
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <CText type={"s20"} style={styles.mh10}>
              {"Update Profile"}
            </CText>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                backgroundColor: "red",
                padding: 5,
                borderRadius: 5,
              }}
              onPress={() => setShowPopover(false)}
            >
              <Text
                style={{ alignSelf: "center", color: "white", fontSize: 10 }}
              >
                close
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ margin: 20 }}>
            <CInput
              placeHolder={strings.fullName}
              _value={fullName}
              autoCapitalize={"none"}
              toGetTextFieldValue={onChangedFullName}
              inputContainerStyle={[
                { backgroundColor: colors.inputBg },
                localStyles.inputContainerStyle,
                fullNameInputStyle,
              ]}
              _onFocus={onFocusFullName}
              onBlur={onBlurFullName}
            />
            <CInput
              placeHolder={strings.email}
              keyBoardType={"email-address"}
              _value={email}
              _errorText={emailError}
              autoCapitalize={"none"}
              toGetTextFieldValue={onChangedEmail}
              rightAccessory={() => <EmailIcon />}
              inputContainerStyle={[
                { backgroundColor: colors.inputBg },
                localStyles.inputContainerStyle,
                emailInputStyle,
              ]}
              _onFocus={onFocusEmail}
              onBlur={onBlurEmail}
              // _editable={false}
            />
            <CButton
              type={"S16"}
              title={strings.signUp}
              onPress={Register}
              containerStyle={localStyles.btnContainerStyle}
            />
          </View>
        </Popover>
      ) : null}
    </CSafeAreaView>
  );
};

export default OtpScreen;

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
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mb10,
    marginTop: 30,
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
    // marginTop:50
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  checkboxContainer: {
    ...styles.rowCenter,
    ...styles.mb20,
    marginTop: 20,
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
