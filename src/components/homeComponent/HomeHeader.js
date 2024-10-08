import {Image, StyleSheet, TouchableOpacity, View,PermissionsAndroid, Platform,Text,Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';

// custom imports
import {styles} from '../../themes';
import {
  HeartDark,
  HeartLight,
  NotificationDark,
  NotificationLight,
} from '../../assets/svgs';
import CText from '../common/CText';
import {moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import { getUserDetail } from '../../utils/asyncstorage';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Loader from '../Loader';

function HomeHeader(props) {
  const {addFavourite, removeFavourite,} = props;
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const colors = useSelector(state => state.theme.theme);
  const [loading,setLoading] = useState(false)
   const [userdata,setUserData] = useState('')
   const [address,setAddress] = useState(null)

  const onPressNotification = () => navigation.navigate(StackNav.Notification);
  const onPressLike = () => navigation.navigate(StackNav.MyWishlist,{addFavourite:addFavourite, removeFavourite:removeFavourite,});

  //  const userdata = useSelector(state => state.UserData)

   const getUserData = async ()=>{
    const res = await getUserDetail()
     setUserData(res)
   }
   useEffect(()=>{
    getUserData()
   },[isFocused])

   console.log('userdata.',userdata)

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
      setLoading(true)
      Geolocation.getCurrentPosition(
        (position) => {
           const   latitude= position.coords.latitude;
          const   longitude= position.coords.longitude;
          Geocoder.init('AIzaSyBekijxwNLHXIw4yMgsepwJMM2-7K1k-Rs');
          Geocoder.from({
            latitude: latitude,
            longitude: longitude,
          })
            .then(json => { 
              const locationName = json.results[0].formatted_address;
              console.log(locationName);
              setAddress(locationName);
              setLoading(false);
            })
            .catch(error => {
              console.warn(error);
              setLoading(false);
            });
          setLoading(false);
        },
        (error) => {
          Alert.alert('Error', error.message);
          setLoading(false)
        },
        // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    requestLocationPermission();

  }, []);


  return (
    <View style={localStyles.headerContainer}>
      <Loader loading={loading}></Loader>
      <Image
        source={{
          // uri: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
          uri:userdata?.image
        }}
        style={localStyles.userImageStyle}
      />
      <View style={localStyles.textContainer}>
        <CText type="m16" numberOfLines={3} color={colors.primaryTextColor} style={{fontSize:10}}>
          {address != null ? address : '...Loading'}
        </CText>
        {/* <CText type="B20" numberOfLines={1} color={colors.primaryTextColor}>
          {userdata?.username}
        </CText> */}
      </View>
      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={onPressNotification} style={styles.mh10}>
          {colors.dark ? <NotificationDark /> : <NotificationLight />}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLike}>
          {colors.dark ? (
            <HeartDark height={moderateScale(23)} width={moderateScale(23)} />
          ) : (
            <HeartLight height={moderateScale(23)} width={moderateScale(23)} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(HomeHeader);

const localStyles = StyleSheet.create({
  headerContainer: {
    ...styles.rowSpaceBetween,
    // ...styles.flex,
    // ...styles.mt15,
  },
  userImageStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  textContainer: {
    ...styles.mh10,
    ...styles.flex,
  },
});
