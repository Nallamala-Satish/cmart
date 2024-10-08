// Library Imports
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import {styles} from '../../../themes';
import strings from '../../../i18n/strings';
import ProductOrderComponent from '../../../components/ProductOrderComponent';
import {onGoingData} from '../../../api/constant';
import RenderNullComponent from '../../../components/RenderNullComponent';

export default function OnGoing({orders}) {
 
   const OnGoingOrderList = orders.filter(item => item.active_status.trim() === 'pending');
  // console.log('orders',OnGoingOrderList)

  const renderItem = ({item}) => {
    return <ProductOrderComponent item={item} />;
  };

  return (
    <View style={localStyles.root}>
      {!!OnGoingOrderList && OnGoingOrderList.length ? (
        <FlashList
          data={OnGoingOrderList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={localStyles.contentContainerStyle}
          estimatedItemSize={20}
        />
      ) : (
        <RenderNullComponent
          title1={strings.onGoingNullTitle}
          title2={strings.onGoingNullDesc}
        />
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  contentContainerStyle: {
    ...styles.pb20,
  },
});
