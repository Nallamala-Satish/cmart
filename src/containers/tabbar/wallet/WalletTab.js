// Library Imports
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CText from '../../../components/common/CText';
import images from '../../../assets/images';
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import {
  AppLogoDark,
  AppLogoLight,
  Menu_Dark,
  Menu_Light,
  OrderIcon,
  Search_Dark,
  Search_Light,
  TopUpIcon,
  TopUpWalletDark,
  TopUpWalletLight,
} from '../../../assets/svgs';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import SubHeader from '../../../components/SubHeader';
import {walletData} from '../../../api/constant';
import {StackNav} from '../../../navigation/NavigationKeys';
import { getJwtToken, getUserDetail } from '../../../utils/asyncstorage';
import { API_BASE_URL } from '../../../api/ApiClient';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../../components/Loader';

export default function WalletTab({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [loading,setLoading]= useState(false)
  const [balance,setBalance] = useState('')
  const [WalletData,setWalletData] = useState([])
  const isFocused = useIsFocused()

  const onPressSeeAll = () => navigation.navigate(StackNav.TransactionHistory,{WalletData:WalletData});

  const onPressWallet = () => navigation.navigate(StackNav.TopUpEWallet);

  const onPressItem = itm =>
    navigation.navigate(StackNav.EReceipt, {item: itm});

  const onPressSearch = () => navigation.navigate(StackNav.Search,{productData:[]});

  const RightIcon = () => {
    return (
      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={onPressSearch}>
          {colors.dark ? <Search_Dark /> : <Search_Light />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.ph10}>
          {colors.dark ? <Menu_Dark /> : <Menu_Light />}
        </TouchableOpacity>
      </View>
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

  const renderHistoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPressItem(item)}
        style={localStyles.renderItemContainer}>
        <View style={[styles.rowCenter, styles.flex]}>
          {/* {item?.status === strings.topUp ? (
            colors.dark ? (
              <TopUpWalletDark />
            ) : (
              <TopUpWalletLight />
            )
          ) : (
            <Image
              source={item.productImage}
              style={[
                localStyles.productImage,
                {backgroundColor: colors.imageBg},
              ]}
            />
          )} */}
          <View style={[styles.mh10, styles.flex]}>
            <CText numberOfLines={1} type={'b16'}>
              {item.product}
            </CText>
            <CText numberOfLines={1} style={styles.mt5} type={'s14'}>
              {item.transaction_date}
            </CText>
          </View>
        </View>
        <View style={styles.itemsEnd}>
          <CText type={'b16'}>₹{item?.amount}</CText>
          <View style={[styles.rowCenter, styles.mt5]}>
            <CText type={'s14'} style={[styles.mr5]}>
              {item?.status}
            </CText>
            {/* {item?.status === strings.topUp ? <TopUpIcon /> : <OrderIcon />} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeaderItem = () => {
    return (
      <View>
        <TouchableOpacity onPress={onPressWallet}>
          <Image
            source={images.walletCard}
            style={localStyles.creditCardImage}
          />
        </TouchableOpacity>
        <SubHeader
          title1={strings.transactionHistory}
          title2={strings.seeAll}
          onPressSeeAll={onPressSeeAll}
          style={styles.ph20}
        />
      </View>
    );
  };

  const getProducts = async ()=>{
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()
    setLoading(true)
    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

   const formdata = new FormData();
   formdata.append("limit", "10");
  formdata.append("transaction_type", `wallet`);
  formdata.append("user_id", `${userinfo && userinfo.id}`);

const requestOptions = {
method: "POST",
headers: myHeaders,
body: formdata,
redirect: "follow"
};
fetch(`${API_BASE_URL}/transactions`, requestOptions)
.then((response) => response.text())
.then((result) => {
  const res = JSON.parse(result)
  console.log(res)
  if( res && res.error == false){
    setWalletData(res.data)
    setBalance(res.balance)
   
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

   useEffect(()=>{
    getProducts();
   },[isFocused])

  return (
    <CSafeAreaView>
       <Loader loading={loading}></Loader>
      <CHeader
        isHideBack={true}
        title={strings.wallet}
        isLeftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />

      <FlatList
        data={WalletData || []}
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeaderItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  creditCardImage: {
    width: moderateScale(380),
    height: moderateScale(220),
    resizeMode: 'cover',
    ...styles.selfCenter,
  },
  productImage: {
    width: moderateScale(55),
    height: moderateScale(55),
    borderRadius: moderateScale(28),
    resizeMode: 'contain',
  },
  renderItemContainer: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.mb15,
    marginTop:10
  },
});
