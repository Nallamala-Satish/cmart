import {Image, StyleSheet, View} from 'react-native';
import React, {memo,useEffect,useState} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useSelector} from 'react-redux';

// Custom Imports
import {styles} from '../../themes';
import {deviceWidth, getHeight, moderateScale} from '../../common/constants';
import { getJwtToken, getUserDetail } from '../../utils/asyncstorage';
import { API_BASE_URL } from '../../api/ApiClient';

const HomeBanner = ({image}) => {
  const colors = useSelector(state => state.theme.theme);
  const [offerImages,setOfferImages]= useState([])
 
  const getOfferImages = async ()=>{
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

const formdata = new FormData();
formdata.append("branch_id", `${userinfo && userinfo.branch_id}`);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

fetch(`${API_BASE_URL}/get_offer_images`, requestOptions)
  .then((response) => response.text())
  .then((result) => {
     const res = JSON.parse(result)
  // console.log(res)
  if( res && res.error == false){
    setOfferImages(res.data)
  }else{
    // alert(res.message)
  }
})
.catch((error) => {
  console.error(error)
});
  }

  useEffect(()=>{
    getOfferImages()
  },[])

  const renderSwiperItem = ({item}) => {
    // console.log('/',item)
    return (
      <View style={localStyles.swiperItemContainer}>
        <Image
          resizeMode="cover"
          source={{uri: item.image}}
          style={[
            localStyles.swiperImageStyle,
            {
              backgroundColor: colors.dark
                ? colors.dark3
                : colors.transparentSilver,
            },
          ]}
        />
      </View>
    );
  };



  return (
    <SwiperFlatList
      data={offerImages || []}
      autoplay
      autoplayDelay={2}
      autoplayLoop
      // index={2}
      showPagination
      renderItem={renderSwiperItem}
      paginationStyleItemActive={{
        ...localStyles.paginationStyleItemActive,
        backgroundColor: colors.dark ? colors.grayScale4 : colors.dark2,
      }}
      paginationStyleItemInactive={{
        ...localStyles.paginationStyleItemInactive,
        backgroundColor: colors.dark ? colors.dark2 : colors.grayScale4,
      }}
      paginationStyleItem={localStyles.paginationStyleItem}
      style={localStyles.swiperStyle}
    />
  );
};

const localStyles = StyleSheet.create({
  paginationStyleItem: {
    ...styles.mh5,
  },
  paginationStyleItemActive: {
    height: getHeight(6),
    width: moderateScale(16),
    borderRadius: moderateScale(3),
  },
  paginationStyleItemInactive: {
    height: moderateScale(6),
    width: moderateScale(6),
    borderRadius: moderateScale(3),
  },
  swiperItemContainer: {
    ...styles.mb10,
    width: deviceWidth - moderateScale(40),
    height: getHeight(160),
  },
  swiperStyle: {
    borderRadius: moderateScale(20),
    overflow: 'hidden',
  },
  swiperImageStyle: {
    width: deviceWidth - moderateScale(40),
    height: getHeight(160),
    borderRadius: moderateScale(20),
  },
});

export default memo(HomeBanner);
