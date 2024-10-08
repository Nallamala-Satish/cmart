// Library Imports
import {StyleSheet, TouchableOpacity, View,Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import CText from '../../../components/common/CText';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {styles} from '../../../themes';
import {
  AppLogoDark,
  AppLogoLight,
  RightDark,
  RightLight,
  Search_Dark,
  Search_Light,
} from '../../../assets/svgs';
import {onGoingData} from '../../../api/constant';
import RenderNullComponent from '../../../components/RenderNullComponent';
import CartProductComponent from '../../../components/cartComponent/CartProductComponent';
import CButton from '../../../components/common/CButton';
import {deviceWidth, getHeight, moderateScale} from '../../../common/constants';
import {StackNav} from '../../../navigation/NavigationKeys';
import TrashItem from '../../../components/models/TrashItem';
import Loader from '../../../components/Loader';
import { API_BASE_URL } from '../../../api/ApiClient';
import { getJwtToken, getUserDetail } from '../../../utils/asyncstorage';
import { useIsFocused } from '@react-navigation/native';

export default function CartTab({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const trashSheetRef = useRef(null);
  const isFocused = useIsFocused()
  const [trashData, setTrashData] = useState({});
  const [cartData, setCartData] = useState([]);
  const [overallAmount,setOverallAmount] = useState('')
  const [loading,setLoading]= useState(false)

  const onPressSearch = () => navigation.navigate(StackNav.Search,{productData:cartData});
  const onPressTrash = item => {
    setTrashData(item);
    trashSheetRef?.current?.show();
  };

  const onPressCheckout = () =>
    navigation.navigate(StackNav.CheckOut, {
      cartData: cartData,
    });

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.ph10} onPress={onPressSearch}>
        {colors.dark ? <Search_Dark /> : <Search_Light />}
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

  const renderItem = ({item}) => {
    return (
      <CartProductComponent
        item={item}
        onPressTrash={() => onPressTrash(item)}
      />
    );
  };

  const getCartData = async ()=>{
    const Token = await getJwtToken()
    console.log(Token)
    const userinfo = await getUserDetail()
    setLoading(true)
    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

  const formdata = new FormData();
formdata.append("user_id", `${userinfo.id}`);
formdata.append("branch_id", `${userinfo.branch_id}`);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};
fetch(`${API_BASE_URL}/get_user_cart`, requestOptions)
.then((response) => response.text())
.then((result) => {
   const res = JSON.parse(result)
console.log('cart data',res.data)
if( res && res.error == false){
  setCartData(res.data)
  setOverallAmount(res.overall_amount)
}else{
  // alert(res.message)
  setCartData([])
}
setLoading(false)
})
.catch((error) => {
console.error(error)
setLoading(false)
});
  }

  useEffect(()=>{
    getCartData()
  },[isFocused])

  return (
    <CSafeAreaView>
        <Loader loading={loading}></Loader>
      <CHeader
        isHideBack={true}
        title={strings.cart}
        isLeftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />
      {!!cartData && cartData.length ? (
        <View style={localStyles.root}>
          <FlashList
            data={cartData || []}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={localStyles.contentContainerStyle}
            estimatedItemSize={20}
          />
          <View style={localStyles.bottomContainer}>
            <View style={localStyles.priceContainer}>
              <CText
                type={'m14'}
                color={colors.dark ? colors.grayScale3 : colors.grayScale6}>
                {strings.totalPrice}
              </CText>
              <CText type={'b20'}> ₹ {overallAmount}</CText>
            </View>
            <CButton
              type={'b16'}
              title={strings.checkOut}
              style={styles.mr10}
              containerStyle={localStyles.addToCartContainer}
              icon={colors.dark ? <RightDark /> : <RightLight />}
              onPress={onPressCheckout}
            />
          </View>
        </View>
      ) : (
        <RenderNullComponent
          title1={strings.onGoingNullTitle}
          title2={strings.onGoingNullDesc}
        />
      )}
      <TrashItem SheetRef={trashSheetRef} item={trashData} getCartData={getCartData}/>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  contentContainerStyle: {
    ...styles.pb20,
  },
  bottomContainer: {
    ...styles.pv10,
    ...styles.ph20,
    ...styles.rowSpaceBetween,
  },
  addToCartContainer: {
    width: deviceWidth / 2 + moderateScale(30),
    ...styles.shadowStyle,
  },
  priceContainer: {
    height: getHeight(50),
    ...styles.justifyEvenly,
  },
});
