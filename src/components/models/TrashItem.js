// Library import
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';

// Local import
import {moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import CText from '../common/CText';
import strings from '../../i18n/strings';
import CButton from '../common/CButton';
import CDivider from '../common/CDivider';
import CartProductComponent from '../cartComponent/CartProductComponent';
import { API_BASE_URL } from '../../api/ApiClient';
import { getJwtToken, getUserDetail } from '../../utils/asyncstorage';

export default function TrashItem(props) {
  const {SheetRef, item, getCartData} = props;
  const colors = useSelector(state => state.theme.theme);

  const onPressCancel = () => SheetRef?.current?.hide();

  const onPressYes = () => SheetRef?.current?.hide()
  

  const removeFromCart = async (id)=>{
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()

    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

  const formdata = new FormData();
formdata.append("user_id", `${userinfo.id}`);
formdata.append("branch_id", `${userinfo.branch_id}`);
formdata.append("product_variant_id", `${id}`);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};
fetch(`${API_BASE_URL}/remove_from_cart`, requestOptions)
.then((response) => response.text())
.then((result) => {
   const res = JSON.parse(result)
console.log(res)
if( res && res.error == false){
  getCartData()
  SheetRef?.current?.hide()
}else{
  alert(res.message)
}

})
.catch((error) => {
console.error(error)

});
  }

  return (
    <ActionSheet
      ref={SheetRef}
      gestureEnabled={true}
      indicatorStyle={{
        backgroundColor: colors.dark ? colors.dark3 : colors.grayScale3,
        width: moderateScale(60),
        ...styles.mv10,
      }}
      containerStyle={[
        localStyles.actionSheetContainer,
        {backgroundColor: colors.backgroundColor},
      ]}>
      <CText type={'B22'} style={localStyles.headerText} align={'center'}>
        {strings.removeFromCart}
      </CText>
      <CDivider style={styles.mv5} />
      <View style={styles.mb15}>
        <CartProductComponent item={item} trashIcon={false} isButton={false} />
      </View>
      <CDivider style={styles.mv5} />
      <View style={localStyles.btnContainer}>
        <CButton
          title={strings.cancel}
          type={'S16'}
          color={colors.dark ? colors.white : colors.primary}
          containerStyle={localStyles.skipBtnContainer}
          bgColor={colors.dark3}
          onPress={onPressCancel}
        />
        <CButton
          title={strings.yesRemove}
          type={'S16'}
          containerStyle={localStyles.skipBtnContainer}
          onPress={()=>{
            removeFromCart(item.product_variant_id)
          }}
        />
      </View>
    </ActionSheet>
  );
}

const localStyles = StyleSheet.create({
  actionSheetContainer: {
    ...styles.ph20,
    ...styles.pb30,
  },
  headerText: {
    ...styles.mt5,
    ...styles.mb10,
  },
  btnContainer: {
    ...styles.pt10,
    ...styles.pb30,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
});
