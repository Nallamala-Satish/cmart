// Library import
import {Image, StyleSheet, TouchableOpacity, View, Alert,PermissionsAndroid, Platform,Text,} from 'react-native';
import React, {useState,useEffect,useCallback,useRef} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import images from '../../../assets/images';
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import CInput from '../../../components/common/CInput';
import CButton from '../../../components/common/CButton';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import CDivider from '../../../components/common/CDivider';
import { getJwtToken, getUserDetail } from '../../../utils/asyncstorage';
import Loader from '../../../components/Loader';
import { API_BASE_URL } from '../../../api/ApiClient';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function AddAddress({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const route = useRoute()
  const { GetAddressList} = route.params;

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    borderColor: colors.textColor,
  };

  const [addressType, setAddressType] = useState('');
  const [area, setArea] = useState('');
  const [phone,setPhone] = useState('')
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [addNameStyle, setAddNameStyle] = useState(BlurredStyle);
  const [addressDetail, setAddressDetail] = useState('');
  const [addDetailStyle, setAddDetailStyle] = useState(BlurredStyle);
  const [loading,setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false);
  const [location, setLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);

  const onFocusAddName = () => onFocusInput(setAddNameStyle);
  const onBlurAddName = () => onBlurInput(setAddNameStyle);
  const onFocusAddDetail = () => onFocusInput(setAddDetailStyle);
  const onBlurAddNDetail = () => onBlurInput(setAddDetailStyle);

  const onChangeAddName = text => setAddressName(text);
  const onChangeAddDetail = text => setAddressDetail(text);
  const onChangePhone = text => setPhone(text);
  const onPressAdd = () => navigation.goBack();

  const AddAddress = async ()=>{
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()
    // console.log(userinfo)
    setLoading(true)
    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

   const formdata = new FormData();
  formdata.append("user_id", `${userinfo && userinfo.id}`);
formdata.append("mobile", `${userinfo && userinfo.mobile}`);
formdata.append("address", `${addressDetail}`);
formdata.append("city", "Hyderabad");
formdata.append("latitude", location?.latitude);
formdata.append("longitude", location?.longitude);
formdata.append("area", `${area}`);
formdata.append("type", `${addressType}`);
formdata.append("name", `${userinfo && userinfo.username}`);
formdata.append("country_code", `${userinfo && userinfo.country_code}`);
formdata.append("alternate_mobile", `${phone}`);
formdata.append("landmark",`${landmark}`);
formdata.append("pincode", `${pincode}`);
formdata.append("state", "Telangana");
formdata.append("country", "India");
formdata.append("branch_id", `${userinfo && userinfo.branch_id}`);
formdata.append("is_default", "1");

const requestOptions = {
method: "POST",
headers: myHeaders,
body: formdata,
redirect: "follow"
};
// console.log(formdata)
fetch(`${API_BASE_URL}/add_address`, requestOptions)
.then((response) => response.text())
.then((result) => {
  const res = JSON.parse(result)
  // console.log(res)
  if( res && res.error == false){
    Alert.alert("Address", `${res.message}`, [
      { text: "No", onPress: () => {} },
      {
        text: "YES",
        onPress: async () => {
          GetAddressList()
          navigation.goBack()
        },
      },
    ]);
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

   useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show your position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          Alert.alert('Location permission denied');
        }
      } else {
        getLocation();
      }
    };

    const getLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        (error) => {
          Alert.alert('Error', error.message);
        },
        // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    requestLocationPermission();

  }, []);

  const onMapLayout = useCallback(() => {
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (mapReady && location) {
      mapRef.current.animateToRegion(location, 1000);
    }
  }, [mapReady, location]);

  // console.log(location)
  return (
    <CSafeAreaView>
      <Loader loading={loading}></Loader>
      <CHeader title={strings.addNewAddress} />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={{height:'25%'}}>
          {/* <Image
            resizeMode="cover"
            source={images.mapImage}
            style={localStyles.mapImage}
          /> */}
           {location ? (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{width:'100%',height:'100%'}}
          initialRegion={location}
          showsUserLocation={true}
          onLayout={onMapLayout}
        >
           {mapReady && (
           <Marker
           identifier="marker"
            coordinate={{ latitude: location?.latitude, longitude: location?.longitude }}
            title={"Your Location"}
            description={"You are here"}
    
          /> 
           )}
        </MapView>
      ) : (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      )}
        </View>
        <ScrollView>
        <View
          style={[
            localStyles.bottomContainer,
            {backgroundColor: colors.backgroundColor,marginBottom:300},
          ]}>
            <ScrollView>
          <CText
            type={'B20'}
            style={localStyles.titleContainer}
            align={'center'}>
            {strings.addressDetail}
          </CText>
          <CDivider style={styles.mv5} />
          <CInput
            label={strings.addressType}
            placeHolder={strings.addressType}
            _value={addressType}
            autoCapitalize={'none'}
            toGetTextFieldValue={text => setAddressType(text)}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              addNameStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusAddName}
            onBlur={onBlurAddName}
          />
          <CInput
            label={strings.addressDetail}
            placeHolder={strings.addressDetail}
            _value={addressDetail}
            autoCapitalize={'none'}
            toGetTextFieldValue={onChangeAddDetail}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              addDetailStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusAddDetail}
            onBlur={onBlurAddNDetail}
          />
           <CInput
            label={strings.phone}
            placeHolder={strings.phone}
            _value={phone}
            autoCapitalize={'none'}
            toGetTextFieldValue={onChangePhone}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              addDetailStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusAddDetail}
            onBlur={onBlurAddNDetail}
          />
          <CInput
            label={strings.area}
            placeHolder={strings.area}
            _value={area}
            autoCapitalize={'none'}
            toGetTextFieldValue={text => setArea(text)}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              addNameStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusAddName}
            onBlur={onBlurAddName}
          />
          <CInput
            label={strings.landmark}
            placeHolder={strings.landmark}
            _value={landmark}
            autoCapitalize={'none'}
            toGetTextFieldValue={text => setLandmark(text)}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              addDetailStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusAddDetail}
            onBlur={onBlurAddNDetail}
          />
             <CInput
            label={strings.pincode}
            placeHolder={strings.pincode}
            _value={pincode}
            autoCapitalize={'none'}
            toGetTextFieldValue={text => setPincode(text)}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              addDetailStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusAddDetail}
            onBlur={onBlurAddNDetail}
          />
          <TouchableOpacity
            onPress={() => setIsCheck(!isCheck)}
            style={localStyles.checkboxContainer}>
            <Ionicons
              name={isCheck ? 'square-outline' : 'checkbox'}
              size={moderateScale(26)}
              color={colors.textColor}
            />
            <CText type={'r18'} style={styles.mh10}>
              {strings.makeDefault}
            </CText>
          </TouchableOpacity>
          <CButton
            title={strings.add}
            type={'S16'}
            containerStyle={styles.mv10}
            onPress={()=>{AddAddress()}}
          />
          </ScrollView>
        </View>
        </ScrollView>
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  mapImage: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    ...styles.ph20,
  },
  titleContainer: {
    ...styles.p20,
  },
  checkboxContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mt20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
