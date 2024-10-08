// Library import
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View,Image} from 'react-native';
import {useSelector} from 'react-redux';

// Custom imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CText from '../../../components/common/CText';
import {
  AppLogoDark,
  AppLogoLight,
  Menu_Dark,
  Menu_Light,
  Search_Dark,
  Search_Light,
} from '../../../assets/svgs';
import {styles} from '../../../themes';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {SceneMap, TabView} from 'react-native-tab-view';
import {moderateScale} from '../../../common/constants';
import OnGoing from './OnGoing';
import Completed from './Completed';
import {StackNav} from '../../../navigation/NavigationKeys';
import { API_BASE_URL } from '../../../api/ApiClient';
import { getJwtToken, getUserDetail } from '../../../utils/asyncstorage';

export default function OrderTab({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [loading,setLoading] = useState(false)
  const [OrderList,setOrderList] = useState([])
  const [isSelect, setIsSelect] = useState({
    index: 0,
    routes: [
      {key: 'first', title: strings.ongoing},
      {key: 'second', title: strings.completed},
    ],
  });

  const _handleIndexChange = index => {
    setIsSelect({...isSelect, index: index});
  };

  const HeaderCetegoryItem = ({title, index}) => {
    return (
      <TouchableOpacity
        onPress={() => _handleIndexChange(index)}
        style={[
          localStyles.root,
          {
            borderBottomColor:
              isSelect.index === index ? colors.textColor : colors.dark3,
          },
        ]}>
        <CText
          type={'s18'}
          align={'center'}
          style={styles.pb20}
          color={
            isSelect.index === index ? colors.textColor : colors.grayScale7
          }>
          {title}
        </CText>
      </TouchableOpacity>
    );
  };

  const _renderTabBar = props => {
    return (
      <View style={localStyles.mainContainer}>
        {props.navigationState.routes.map((item, index) => {
          return <HeaderCetegoryItem title={item.title} index={index} />;
        })}
      </View>
    );
  };

  // const _renderScene = SceneMap({
  //   first: OnGoing,
  //   second: Completed,
  // });

  const _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <OnGoing orders={OrderList} />;
      case 'second':
        return <Completed orders={OrderList} />;
      default:
        return null;
    }
  };

  const onPressSearch = () => navigation.navigate(StackNav.Search,{productData:OrderList});

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

  const GetOngoingOrderList = async ()=>{
    const Token = await getJwtToken()
    const userinfo = await getUserDetail()
    setLoading(true)
    const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Token}`);

   const formdata = new FormData();
  formdata.append("user_id", `${userinfo && userinfo.id}`);
  // formdata.append("active_status", `${"pending"}`);
  formdata.append("order", "DESC");

const requestOptions = {
method: "POST",
headers: myHeaders,
body: formdata,
redirect: "follow"
};
fetch(`${API_BASE_URL}/get_orders`, requestOptions)
.then((response) => response.text())
.then((result) => {
  const res = JSON.parse(result)
  // console.log(res)
  if( res && res.error == false){
    setOrderList(res.data)
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
    GetOngoingOrderList()
  },[])

  return (
    <CSafeAreaView>
      <CHeader
        isHideBack={true}
        title={strings.order}
        isLeftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />
      <TabView
        navigationState={isSelect}
        renderScene={_renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={_handleIndexChange}
        activeColor={{color: colors.primary}}
        navigation={navigation}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    borderBottomWidth: moderateScale(2),
    width: '50%',
  },
  mainContainer: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.mt10,
    width: '100%',
  },
});
