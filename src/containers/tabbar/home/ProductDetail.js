import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,FlatList,Text
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadioButton ,DataTable} from 'react-native-paper';


// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import {
  deviceHeight,
  deviceWidth,
  getHeight,
  moderateScale,
} from '../../../common/constants';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {
  Cart_Dark,
  Cart_Light,
  LikeWithBg,
  UnLikeWithBg,
} from '../../../assets/svgs';
import images from '../../../assets/images';
import strings from '../../../i18n/strings';
import CDivider from '../../../components/common/CDivider';
import CButton from '../../../components/common/CButton';
import SizeComponent from '../../../components/homeComponent/SizeComponent';
import ColorComponent from '../../../components/homeComponent/ColorComponent';
import {StackNav, TabNav} from '../../../navigation/NavigationKeys';
import Loader from '../../../components/Loader';
import { getJwtToken, getUserDetail } from '../../../utils/asyncstorage';
import { API_BASE_URL } from '../../../api/ApiClient';
import { Table, Row, Rows } from 'react-native-table-component';

export default function ProductDetail({navigation, route}) {
  const item = route?.params?.item;
  const colors = useSelector(state => state.theme.theme);
  const [loading,setLoading]= useState(false)
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  console.log('selectedRow.',selectedPrice , quantity,selectedPrice * quantity)
  const TotalAmount = selectedPrice * quantity
  // console.log('item',item?.variants)

  const onPressLike = () => setIsLiked(!isLiked);

  const onPressRemove = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const onPressAdd = () => setQuantity(prev => prev + 1);

  const onPressReview = () => navigation.navigate(StackNav.Reviews);

  const AddtoCart = async ()=>{
  const Id=  item?.variants && item?.variants.length > 1 ? (selectedVariant?.id):(item?.variants && item?.variants[0].id)
  console.log(Id)
    const Token = await getJwtToken()
      const userinfo = await getUserDetail()
      setLoading(true)
      const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

const formdata = new FormData();
formdata.append("user_id", `${userinfo.id}`);
formdata.append("product_variant_id", `${Id}`);
// formdata.append("clear_cart", "1");
// formdata.append("is_saved_for_later", "1");
formdata.append("qty", `${quantity}`);
// formdata.append("add_on_id", "0");
// formdata.append("add_on_qty", "");
formdata.append("branch_id", `${userinfo.branch_id}`);
console.log(formdata)
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

fetch(`${API_BASE_URL}/manage_cart`, requestOptions)
  .then((response) => response.text())
  .then((result) => {
     const res = JSON.parse(result)
  console.log(res)
  if( res && res.error == false){
    navigation.navigate(TabNav.CartTab)
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

  React.useEffect(() => {
    // Select the first item by default
    if (item?.variants && item?.variants.length > 0) {
      setSelectedVariant(item?.variants[0]);
    }
  }, [item?.variants]);

  

  const renderVariantItem = ({ item }) => (
    <TouchableOpacity style={{borderWidth:0.5,borderColor:'black',padding:10,margin:10,borderRadius:10,
      backgroundColor:selectedVariant && selectedVariant.id === item.id ? 'skyblue' : 'white'}} 
    onPress={() => {
      setSelectedVariant(item)
      // setSelectedRow(null);
      // setSelectedPrice('')
      }}>
      {/* <RadioButton
        value={item.id}
        status={selectedVariant && selectedVariant.id === item.id ? 'checked' : 'unchecked'}
        onPress={() =>{
           setSelectedVariant(item)
          //  setSelectedRow(null);
          //  setSelectedPrice('')
          }}
      /> */}
      <Text style={{color:'black',}}>{item.variant_values}</Text>
    </TouchableOpacity>
  );

  const determineRangeIndex = (quantity) => {
    if (quantity >  `${item.maxqty - 1}`) return 0;
    if (quantity > `${item.avgqty - 1}`) return 1;
    if (quantity > `${item.minqty - 1}`) return 2;
    return 3;
  };

  React.useEffect(() => {
    const initialIndex = determineRangeIndex(quantity);
    setSelectedRow(initialIndex);
    setSelectedPrice(tableData[initialIndex].price);
  }, [quantity,selectedVariant]);

  const tableData = [
    {range : `${item.maxqty} +`,                    price : "Request for Bulk"},
    {range : `${item.avgqty} - ${item.maxqty - 1}`, price : selectedVariant && selectedVariant.tire3p,discount: "Save "+item.maxqtydisc +"%"},
    {range : `${item.minqty} - ${item.avgqty - 1}`, price : selectedVariant && selectedVariant.tire2p,discount: "Save "+item.avgqtydisc +"%"},
    {range : `1 - ${item.minqty - 1}`,              price : selectedVariant && selectedVariant.tire1p,discount: "Save "+item.minqtydisc +"%" },
  ];


  const getQuantityFromRange = (range) => {
    if (range === `${item.maxqty} +`) return `${item.maxqty}`;
    const [min, max] = range.split(" - ").map(Number);
    return min; // Return the minimum value of the range
  };

  const renderRow = (rowData, index) => {
    console.log('.',rowData)
    return(
    <View style={{borderWidth:1,borderColor:'black',flexDirection:'row',}} key={index}>
       <View style={{flexDirection:'row',width:'30%'}}>
      <RadioButton
        value={rowData.price}
        status={selectedRow === index ? 'checked' : 'unchecked'}
        onPress={() => {
          setSelectedRow(index);
          setSelectedPrice(rowData.price);
          setQuantity(getQuantityFromRange(rowData.range));
        }}
      />
      <Text style={{alignSelf:'center',padding:10,color:'black'}}>{rowData.range }</Text>
      </View>
      <View style={{width:'70%'}}>
      <Text style={{alignSelf:'center',padding:10,color:'black',}}> {index !=0 ? "₹" : ''} {rowData.price}   {rowData.discount}</Text>
      </View>
    </View>
  )};



  return (
    <CSafeAreaView>
      <Loader loading={loading}></Loader>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{uri:item?.image || item.order_items[0] && item.order_items[0].image}}
          style={[
            localStyles.root,
            {backgroundColor: colors.dark ? colors.imageBg : colors.grayScale1},
          ]}>
          <CHeader title={false} />
        </ImageBackground>
        <View style={styles.mh20}>
          <View style={localStyles.productText}>
            <CText style={styles.flex} numberOfLines={1} type={'b26'}>
              {item?.name}
            </CText>
            {/* <TouchableOpacity onPress={onPressLike}>
              {isLiked ? (
                <LikeWithBg
                  width={moderateScale(28)}
                  height={moderateScale(28)}
                />
              ) : (
                <UnLikeWithBg
                  width={moderateScale(28)}
                  height={moderateScale(28)}
                />
              )}
            </TouchableOpacity> */}
          </View>
          {/* <View style={localStyles.subItemStyle}>
            <View
              style={[
                localStyles.paidContainer,
                {backgroundColor: colors.dark3},
              ]}>
              <CText type={'s12'}>{item?.sold + ' ' + strings.sold}</CText>
            </View>
            <Image
              source={images.starFill}
              style={[localStyles.starStyle, {tintColor: colors.textColor}]}
            />
            <TouchableOpacity onPress={onPressReview}>
              <CText
                type={'s14'}
                color={colors.dark ? colors.grayScale3 : colors.grayScale7}>
                {item?.rating}
                {' (' + item?.sold + ' ' + strings.reviews + ')'}
              </CText>
            </TouchableOpacity>
          </View> */}
          <CDivider />
          <CText numberOfLines={1} type={'b18'}>
            {strings.description}
          </CText>
          <CText style={styles.mt5} type={'r14'}>
            {item?.short_description}
          </CText>
          {/* <View style={localStyles.sizeColorContainer}>
            {!!item?.size?.length && <SizeComponent data={item?.size} />}
            <ColorComponent isSize={!item?.size?.length} />
          </View> */}
          <View style={localStyles.quantityContainer}>
            <CText type={'b18'}>{strings.quantity}</CText>
            <View
              style={[
                localStyles.quantityButton,
                {backgroundColor: colors.dark3},
              ]}>
              <TouchableOpacity onPress={onPressRemove}>
                <Ionicons
                  name={'remove'}
                  size={moderateScale(24)}
                  color={colors.dark ? colors.white : colors.black}
                  style={styles.mr5}
                />
              </TouchableOpacity>
              <CText
                type={'b18'}
                align={'center'}
                style={localStyles.quantityText}>
                {quantity}
              </CText>
              <TouchableOpacity onPress={onPressAdd}>
                <Ionicons
                  name={'add'}
                  size={moderateScale(24)}
                  color={colors.dark ? colors.white : colors.black}
                  style={styles.ml5}
                />
              </TouchableOpacity>
            </View>
          </View>
          {item?.variants && item?.variants.length > 1 ?(
            <View style={{marginTop:20,marginBottom:50}}>

            <ScrollView horizontal>
        <FlatList
          data={item?.variants || []}
          numColumns={4}
          renderItem={renderVariantItem}
          keyExtractor={(item) => item.id}
          // horizontal
          extraData={selectedVariant}
        />
      </ScrollView>
      <View style={{marginTop:20,}}>
        <Table style={{ borderWidth: 1, borderColor: 'black', }}>
          <Row data={['Qunatity', 'Price']} style={{borderWidth:1,flexDirection:'row',justifyContent:'space-between'}} textStyle={{alignSelf:'center',padding:10,color:'black',fontWeight:'bold'}} />
          {tableData.map((rowData, index) => renderRow(rowData, index))}
        </Table>
      </View>
            </View>
          ):(null)}
           
        </View>
      </ScrollView>
      <View style={styles.ph20}>
        <View style={localStyles.bottomContainer}>
          <View style={localStyles.priceContainer}>
            <CText
              type={'m14'}
              color={colors.dark ? colors.grayScale3 : colors.grayScale6}>
              {strings.totalPrice}
            </CText>
            {item?.variants && item?.variants.length > 1 ?(
            <CText type={'b20'}> ₹ {selectedPrice != null ? TotalAmount.toFixed(2) :0 }</CText>
            ):(
              <CText type={'b20'}> ₹ {item?.variants[0].special_price}</CText>
            )}
          </View>
          <CButton
            type={'b16'}
            title={strings.addToCart}
            onPress={AddtoCart}
            style={styles.ml10}
            containerStyle={localStyles.addToCartContainer}
            frontIcon={colors.dark ? <Cart_Light /> : <Cart_Dark />}
          />
        </View>
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    height: deviceHeight / 2 - moderateScale(50),
    width: '100%',
    resizeMode: 'contain',
  },
  productText: {
    ...styles.rowSpaceBetween,
    ...styles.mt20,
  },
  subItemStyle: {
    ...styles.mv5,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  starStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    ...styles.mh10,
  },
  paidContainer: {
    ...styles.ph10,
    ...styles.pv5,
    borderRadius: moderateScale(6),
  },
  sizeColorContainer: {
    ...styles.mt15,
    ...styles.rowSpaceBetween,
  },
  quantityContainer: {
    ...styles.mt15,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  quantityButton: {
    height: getHeight(40),
    ...styles.ph10,
    ...styles.ml10,
    ...styles.rowCenter,
    borderRadius: moderateScale(45) / 2,
  },
  quantityText: {
    width: moderateScale(30),
  },
  bottomContainer: {
    ...styles.pv10,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
},
cell: {
    flex: 1,
    textAlign: 'center',
    color:'black'
},
selected: {
    color: 'blue',
    fontWeight: 'bold',
},
notSelected: {
    color: 'black',
},
selectedVariantContainer: {
    marginTop: 16,
},
selectedVariantText: {
    fontSize: 16,
    fontWeight: 'bold',
},
box: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 5,
  margin: 5,
  width: 100,
},
boxText: {
  marginLeft: 10,
},
tableContainer: {
  marginTop: 20,
},
head: {
  height: 40,
  backgroundColor: '#f1f8ff',
  alignSelf:'center'
},
text: {
  margin: 6,
  color:'black'
},
});
