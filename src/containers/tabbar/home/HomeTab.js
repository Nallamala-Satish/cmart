// Library Imports
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import {commonColor, styles} from '../../../themes';
import {getHeight, moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import {homeCategoryData} from '../../../api/constant';
import SearchComponent from '../../../components/homeComponent/SearchComponent';
import HomeHeader from '../../../components/homeComponent/HomeHeader';
import HomeBanner from '../../../components/homeComponent/HomeBanner';
import SubHeader from '../../../components/SubHeader';
import MostPopularCategory from '../../../components/homeComponent/MostPopularCategory';
import HomeProductComponent from '../../../components/homeComponent/HomeProductComponent';
import {StackNav} from '../../../navigation/NavigationKeys';
import images from '../../../assets/images';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '../../../components/Loader';
import { getJwtToken, getUserDetail } from '../../../utils/asyncstorage';
import { API_BASE_URL } from '../../../api/ApiClient';

const RenderHeaderItem = React.memo(() => {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const onPressSpecialOffer = useCallback(
    () => navigation.navigate(StackNav.SpecialOffers),
    [],
  );

  const onSearchInput = useCallback(text => setSearch(text), []);

  const bannerImage = useMemo(() => {
    return colors.dark ? images.swiperImageDark1 : images.swiperImageLight1;
  }, [colors]);

  return (
    <View>
      {/* <HomeHeader />
      <SearchComponent search={search} onSearchInput={onSearchInput} /> */}
      <SubHeader
        title1={strings.specialOffers}
        title2={strings.seeAll}
        onPressSeeAll={onPressSpecialOffer}
        style={styles.mt5}
      />
      <HomeBanner image={bannerImage} />
    </View>
  );
});


export default function HomeTab({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [extraData, setExtraData] = useState(true);
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused()
  const [loading,setLoading]= useState(false)
  const [categories,setCategories] = useState([])
  // const [whishlist,setWhishlist] = useState([])
  const[products,setProducts] = useState('')
  const [productCategories,setProductCategories] = useState([])
  const [productData,setProductData] = useState([])

  const onSearchInput = useCallback(text => setSearch(text), []);

  const RenderFooterItem = React.memo(() => {
    const navigation = useNavigation();
  
    const onPressMostPopular = () => navigation.navigate(StackNav.MostPopular,{productData:productData});
   
    return (
      <View style={styles.mv30}>
        <SubHeader
          title1={strings.mostPopular}
          title2={strings.seeAll}
          onPressSeeAll={onPressMostPopular}
        />
        <MostPopularCategory productCategories={productCategories} productData={productData} addFavourite={addFavourite} removeFavourite={removeFavourite}/>
        {/* <HomeProductComponent productData={productData}/> */}
      </View>
    );
  });

  useEffect(() => {
    setExtraData(!extraData);
  }, [colors]);

     const getCategories = async ()=>{
      const Token = await getJwtToken()
      const userinfo = await getUserDetail()
      setLoading(true)
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
fetch(`${API_BASE_URL}/get_categories`, requestOptions)
  .then((response) => response.text())
  .then((result) => {
    const res = JSON.parse(result)
    // console.log(res)
    if( res && res.error == false){
      setCategories(res.data)
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
     
     const getProducts = async ()=>{
      const Token = await getJwtToken()
      const userinfo = await getUserDetail()
      setLoading(true)
      const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

     const formdata = new FormData();
    formdata.append("branch_id", `${userinfo && userinfo.branch_id}`);
    formdata.append("user_id", `${userinfo && userinfo.id}`);

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
    let categories = res.product_tags;
    categories &&  categories.unshift("All");
    // console.log(res)
    if( res && res.error == false){
      setProducts(res)
      setProductCategories(categories)
      setProductData(res.data)
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
      getProducts()
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
      getProducts()
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

     useEffect(()=>{
      getCategories();
      getProducts()
      // getFavourites()
     },[isFocused])

     const getCategoryProducts = async (id)=>{
      const Token = await getJwtToken()
      const userinfo = await getUserDetail()
      setLoading(true)
      const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

     const formdata = new FormData();
    formdata.append("branch_id", `${userinfo && userinfo.branch_id}`);
    formdata.append("category_id", `${id}`);

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
    // console.log(res)
    if( res && res.error == false){
      navigation.navigate(StackNav.ProductCategory, {item: res.data});
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
      alert(res.message)
    }
    setLoading(false)
  })
  .catch((error) => {
    console.error(error)
    setLoading(false)
  });
     }


  const onPressItem = item =>
    navigation.navigate(StackNav.ProductCategory, {item: [item]});

  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>{
          //  getCategoryProducts(item.id)
           navigation.navigate(StackNav.ProductCategory, {item:item.id});
          }}
        style={localStyles.categoryRoot}>
        <View
          style={[
            localStyles.iconContainer,
            {
              backgroundColor: colors.dark
                ? colors.dark3
                : colors.transparentSilver,
            },
          ]}>
          <Image
            source={{uri:item?.image}}
            style={[
              localStyles.iconStyle,
              // {tintColor: colors.dark ? colors.white : colors.textColor},
            ]}
          />
        </View>
        <CText
          type="b16"
          numberOfLines={1}
          align={'center'}
          color={colors.primaryTextColor}
          style={styles.mt10}>
          {item.name}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[localStyles.root, {backgroundColor: colors.backgroundColor}]}>
      <Loader loading={loading}></Loader>
      <View style={{flex:1}}>
      <HomeHeader addFavourite={addFavourite} removeFavourite={removeFavourite} />
      <SearchComponent search={search} onSearchInput={onSearchInput} />
  
      <FlashList
        data={categories || []}
        extraData={extraData}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        estimatedItemSize={10}
        ListHeaderComponent={<RenderHeaderItem />}
        ListFooterComponent={<RenderFooterItem />}
        showsVerticalScrollIndicator={false}
      />
       </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.flex,
  },
  iconStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius:moderateScale(20)
  },
  iconContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: commonColor.grayScale3,
    ...styles.center,
  },
  categoryRoot: {
    width: '100%',
    height: getHeight(100),
    ...styles.itemsCenter,
    ...styles.mt40,
  },
});
