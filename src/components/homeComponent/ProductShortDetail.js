import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CText from '../common/CText';
import images from '../../assets/images';
import {LikeWithBg, UnLikeWithBg} from '../../assets/svgs';
import {deviceWidth, moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import strings from '../../i18n/strings';
import { getJwtToken, getUserDetail } from '../../utils/asyncstorage';
import { API_BASE_URL } from '../../api/ApiClient';

export default function ProductShortDetail(props) {
  const colors = useSelector(state => state.theme.theme);
  const [loading,setLoading] = useState(false)
  const [isLiked, setIsLiked] = useState(false);
  const {item, index, onPress,addFavourite, removeFavourite} = props;

  const onPressLike = () => {
    if(item.is_favorite == '1'){
    removeFavourite(item)
    setIsLiked(!isLiked)
    }else{
    addFavourite(item)
    setIsLiked(!isLiked)
    }
  };
  console.log('....',item)

//   const addFavourite = async ()=>{
    
//     const Token = await getJwtToken()
//     const userinfo = await getUserDetail()
//     setLoading(true)
//     const myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${Token}`);

//    const formdata = new FormData();
//   formdata.append("branch_id", `${userinfo && userinfo.branch_id}`);
//   formdata.append("user_id", `${userinfo && userinfo.id}`);
//   formdata.append("type", `${'products'}`);
//   formdata.append("type_id", `${item.id}`);

// const requestOptions = {
// method: "POST",
// headers: myHeaders,
// body: formdata,
// redirect: "follow"
// };
// fetch(`${API_BASE_URL}/add_to_favorites`, requestOptions)
// .then((response) => response.text())
// .then((result) => {
//   const res = JSON.parse(result)
//   console.log(res)
//   if( res && res.error == false){
//     alert(res.message)
//   }else{
//     alert(res.message)
//   }
//   setLoading(false)
// })
// .catch((error) => {
//   console.error(error)
//   setLoading(false)
// });
//   }

//   const removeFavourite = async ()=>{
    
//     const Token = await getJwtToken()
//     const userinfo = await getUserDetail()
//     setLoading(true)
//     const myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${Token}`);

//    const formdata = new FormData();
//   formdata.append("branch_id", `${userinfo && userinfo.branch_id}`);
//   formdata.append("user_id", `${userinfo && userinfo.id}`);
//   formdata.append("type", `${'products'}`);
//   formdata.append("type_id", `${item.id}`);

// const requestOptions = {
// method: "POST",
// headers: myHeaders,
// body: formdata,
// redirect: "follow"
// };
// fetch(`${API_BASE_URL}/remove_from_favorites`, requestOptions)
// .then((response) => response.text())
// .then((result) => {
//   const res = JSON.parse(result)
//   console.log(res)
//   if( res && res.error == false){
//     alert(res.message)
//   }else{
//     alert(res.message)
//   }
//   setLoading(false)
// })
// .catch((error) => {
//   console.error(error)
//   setLoading(false)
// });
//   }

  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        localStyles.productContainer,
        index % 2 === 0 ? styles.mr5 : styles.ml5,
      ]}>
      <TouchableOpacity style={localStyles.likeContainer} onPress={onPressLike}>
        {item.is_favorite == '1'  ? <LikeWithBg /> : <UnLikeWithBg />}
      </TouchableOpacity>
      <Image
        source={{uri:item?.image || item.order_items[0] && item.order_items[0].image}}
        style={[
          localStyles.productImageStyle,
          {backgroundColor: colors.dark ? colors.imageBg : colors.grayScale1},
        ]}
      />
      <CText style={[styles.flex, styles.mt10]} numberOfLines={1} type={'b16'}>
        {item?.name}
      </CText>
      <View style={localStyles.subItemStyle}>
        <Image
          source={images.starFill}
          style={[localStyles.starStyle, {tintColor: colors.textColor}]}
        />
        <CText
          type={'s14'}
          style={styles.mr5}
          color={colors.dark ? colors.grayScale3 : colors.grayScale7}>
          {item?.rating || item?.product_details[0] && item?.product_details[0].rating }
          {/* {'  | '} */}
        </CText>
        {/* <View
          style={[localStyles.paidContainer, {backgroundColor: colors.dark3}]}>
          <CText type={'s12'}>{item?.sold  + ' ' + strings.sold}</CText>
        </View> */}
      </View>
      <CText type={'b16'}> ₹ {item.min_max_price && item.min_max_price.special_price || item.price || item?.total}</CText>
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  productContainer: {
    width: (deviceWidth - moderateScale(50)) / 2,
    ...styles.mt15,
  },
  subItemStyle: {
    ...styles.mt5,
    ...styles.mb5,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  starStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    ...styles.mr5,
  },
  paidContainer: {
    ...styles.ph10,
    ...styles.pv5,
    borderRadius: moderateScale(6),
  },
  productImageStyle: {
    width: (deviceWidth - moderateScale(50)) / 2,
    height: (deviceWidth - moderateScale(50)) / 2,
    borderRadius: moderateScale(15),
    resizeMode: 'contain',
    ...styles.selfCenter,
  },
  likeContainer: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    zIndex: 1,
  },
});
