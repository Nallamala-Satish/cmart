// Library import
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {useSelector} from 'react-redux';

// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {AddressData} from '../../../api/constant';
import AddressComponent from '../../../components/cartComponent/AddressComponent';
import CButton from '../../../components/common/CButton';
import {styles} from '../../../themes';
import {StackNav} from '../../../navigation/NavigationKeys';
import Loader from '../../../components/Loader';
import { getJwtToken, getUserDetail, setSelectAddress } from '../../../utils/asyncstorage';
import { API_BASE_URL } from '../../../api/ApiClient';
import { useIsFocused } from '@react-navigation/native';

export default function Address({route, navigation}) {
  const itm = route.params?.item;
  // const addressList = route.params?.addressList
  // const GetAddressList = route.params?.GetAddressList
  // const setAddressList = route.params?.setAddressList
  const colors = useSelector(state => state.theme.theme);
  const isFocused = useIsFocused()
  const [selectedType, setSelectedType] = useState('');
  const [extraData, setExtraData] = useState(false);
  const [loading,setLoading]= useState(false)
  const [addressList,setAddressList]= useState([])
// console.log('item./..',itm)
  useEffect(() => {
    setExtraData(!extraData);
  }, [selectedType]);

  const onPressAddAddress = () => navigation.navigate(StackNav.AddAddress,{GetAddressList:GetAddressList});

  const onPressAdd = () => {
    if (!!itm) {
      navigation.goBack();
    } else {
      navigation.navigate(StackNav.AddAddress,{GetAddressList:GetAddressList});
    }
  };
  const onPressAddress = item => {
    if (!!itm) {
      console.log(item?.id)
      setSelectedType(item?.id);
    } else {
      navigation.navigate(StackNav.AddAddress,{GetAddressList:GetAddressList});
    }
  };

  const renderAddressList = ({item}) => {
  
    return (
      <AddressComponent
        item={item}
        onPressAddress={async () =>{
           await setSelectAddress(item)
           onPressAddress(item)
          }}
        selectedType={selectedType}
        isSelect={!!itm}
      />
    );
  };

  const FlashListFooter = () => {
    return (
      <View style={styles.ph20}>
        {!!itm && (
          <CButton
            title={strings.addNewAddress}
            type={'S16'}
            color={!!colors.dark ? colors.white : colors.primary}
            bgColor={colors.dark3}
            containerStyle={styles.mb20}
            onPress={onPressAddAddress}
          />
        )}
      </View>
    );
  };

   const GetAddressList = async ()=>{
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()
    setLoading(true)
    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

   const formdata = new FormData();
  formdata.append("user_id", `${userinfo && userinfo.id}`);

const requestOptions = {
method: "POST",
headers: myHeaders,
body: formdata,
redirect: "follow"
};
fetch(`${API_BASE_URL}/get_address`, requestOptions)
.then((response) => response.text())
.then((result) => {
  const res = JSON.parse(result)
  console.log(res.data);
  if( res && res.error == false){
    setAddressList(res.data)
  }else{
    setAddressList([])
  }
  setLoading(false)
})
.catch((error) => {
  console.error(error)
  setLoading(false)
});
   }

useEffect(()=>{
  GetAddressList();
},[isFocused])

  return (
    <CSafeAreaView>
      <Loader loading={loading}></Loader>
      <CHeader title={!!itm ? itm : strings.address} />
      <FlashList
        data={addressList || []}
        extraData={extraData}
        renderItem={renderAddressList}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ListFooterComponent={FlashListFooter}
        estimatedItemSize={20}
      />
      <View style={styles.ph20}>
        <CButton
          title={!!itm ? strings.apply : strings.addNewAddress}
          type={'S16'}
          containerStyle={styles.mv10}
          onPress={onPressAdd}
        />
      </View>
    </CSafeAreaView>
  );
}
