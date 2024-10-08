import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {FlashList} from '@shopify/flash-list';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import {Search_Dark, Search_Light} from '../../../assets/svgs';
import ProductShortDetail from '../../../components/homeComponent/ProductShortDetail';
import {styles} from '../../../themes';
import {StackNav} from '../../../navigation/NavigationKeys';
import { API_BASE_URL } from '../../../api/ApiClient';
import { getJwtToken, getUserDetail } from '../../../utils/asyncstorage';
import Loader from '../../../components/Loader';

export default function ProductCategory({navigation, route}) {
  const item = route?.params?.item;
  const colors = useSelector(state => state.theme.theme);
  const [categoryProducts,setCategoryProducts] = useState([])
 

  const [loading,setLoading]= useState(false)
  const onPressSearch = () => navigation.navigate(StackNav.Search,{productData:categoryProducts});

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressSearch}>
        {colors.dark ? <Search_Dark /> : <Search_Light />}
      </TouchableOpacity>
    );
  };

  useEffect(()=>{
    if(item != undefined){
      getCategoryProducts()
    }
  },[])


  const getCategoryProducts = async ()=>{
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()
    setLoading(true)
    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

   const formdata = new FormData();
  formdata.append("branch_id", `${userinfo && userinfo.branch_id}`);
  formdata.append("category_id", item);

const requestOptions = {
method: "POST",
headers: myHeaders,
body: formdata,
redirect: "follow"
};
fetch(`${API_BASE_URL}/get_products`, requestOptions)
.then((response) => response.text())
.then((result) => {
  const res = JSON.parse(result)
  console.log('//',res)
  if( res && res.error == false){
    // navigation.navigate(StackNav.ProductCategory, {item: res.data});
    setCategoryProducts(res.data)
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

  const addFavourite = async (item)=>{
    
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
fetch(`${API_BASE_URL}/add_to_favorites`, requestOptions)
.then((response) => response.text())
.then((result) => {
  const res = JSON.parse(result)
  console.log(res)
  if( res && res.error == false){
    alert(res.message)
    getCategoryProducts()
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
    getCategoryProducts()
    // getFavourites()
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

  const onPressDetail = itm =>
    navigation.navigate(StackNav.ProductDetail, {item: itm});

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

  return (
    <CSafeAreaView>
      <Loader loading={loading}></Loader>
      <CHeader title={item?.title} rightIcon={<RightIcon />} />
      <View style={localStyles.root}>
        <FlashList
          data={categoryProducts || []}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={10}
          showsVerticalScrollIndicator={false}
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
