// Library Imports
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

// Custom Imports
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {Search_Dark, Search_Light} from '../../../assets/svgs';
import {styles} from '../../../themes';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import MostPopularCategory from '../../../components/homeComponent/MostPopularCategory';
import {homeProductData} from '../../../api/constant';
import ProductShortDetail from '../../../components/homeComponent/ProductShortDetail';
import {StackNav} from '../../../navigation/NavigationKeys';
import { API_BASE_URL } from '../../../api/ApiClient';
import { getJwtToken, getUserDetail } from '../../../utils/asyncstorage';
import Loader from '../../../components/Loader';

export default function MyWishlist() {
  const route= useRoute()
  const isFocuced = useIsFocused()
  const {addFavourite, }= route.params;
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  const [loading,setLoading] = useState(false)
  const [whishlist,setWhishlist] = useState([])

  const onPressDetail = itm =>
    navigation.navigate(StackNav.ProductDetail, {item: itm});

  const onPressSearch = () => navigation.navigate(StackNav.Search,{productData:whishlist});

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressSearch}>
        {colors.dark ? <Search_Dark /> : <Search_Light />}
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <ProductShortDetail
        item={item}
        index={index}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
        onPress={() => onPressDetail(item)}
      />
    );
  };

  const removeFavourite = async (item)=>{
      
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()
    setLoading(true)
    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

   const formdata = new FormData();
  formdata.append("branch_id", `${userinfo && userinfo.branch_id}`);
  formdata.append("user_id", `${userinfo && userinfo.id}`);
  formdata.append("type", `${'products'}`);
  formdata.append("type_id", `${item.id}`);

const requestOptions = {
method: "POST",
headers: myHeaders,
body: formdata,
redirect: "follow"
};
fetch(`${API_BASE_URL}/remove_from_favorites`, requestOptions)
.then((response) => response.text())
.then((result) => {
  const res = JSON.parse(result)
  console.log(res)
  if( res && res.error == false){
    alert(res.message)
    getFavourites()
    setLoading(false)
  }else{
    alert(res.message)
    setLoading(false)
  }
  setLoading(false)
})
.catch((error) => {
  console.error(error)
  setLoading(false)
});
  }

  const getFavourites = async ()=>{
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()
    setLoading(true)
    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

   const formdata = new FormData();
  formdata.append("branch_id", `${userinfo && userinfo.branch_id}`);
  formdata.append("user_id", `${userinfo && userinfo.id}`);
  formdata.append("type", `${'products'}`);

const requestOptions = {
method: "POST",
headers: myHeaders,
body: formdata,
redirect: "follow"
};
fetch(`${API_BASE_URL}/get_favorites`, requestOptions)
.then((response) => response.text())
.then((result) => {
  const res = JSON.parse(result)
  console.log(res.data)
  if( res && res.error == false){
    setWhishlist(res.data)
  }else{
    setWhishlist([])
    alert(res.message)
  }
  setLoading(false)
})
.catch((error) => {
  console.error(error)
  setLoading(false)
});
   }

   useEffect(()=>{
    getFavourites()
   },[isFocuced])

  return (
    <CSafeAreaView>
      <Loader loading={loading}></Loader>
      <CHeader title={strings.myWishlist} rightIcon={<RightIcon />} />
      <View style={localStyles.root}>
        <FlashList
          data={whishlist||[]}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={10}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<MostPopularCategory />}
        />
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.mh20,
    ...styles.flex,
  },
});
