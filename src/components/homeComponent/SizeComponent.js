import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

// custom imports
import CText from '../common/CText';
import {deviceWidth, moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import {styles} from '../../themes';

const SizeComponent = ({data}) => {
  const colors = useSelector(state => state.theme.theme);
  const [selectedChips, setSelectedChips] = useState('');
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    setExtraData(!extraData);
  }, [selectedChips]);

  const renderSizeItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedChips(item)}
        style={[
          localStyles.chipsContainer,
          {borderColor: colors.dark ? colors.dark3 : colors.grayScale5},
          {
            backgroundColor:
              item === selectedChips
                ? colors.dark
                  ? colors.dark3
                  : colors.black
                : colors.tranparent,
          },
        ]}>
        <CText
          type={'S16'}
          color={
            item === selectedChips
              ? colors.dark
                ? colors.white
                : colors.white
              : colors.dark
              ? colors.white
              : colors.black
          }>
          {item}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: deviceWidth / 2 - moderateScale(30),
      }}>
      <CText type={'b18'} style={styles.mb10}>
        {strings.size}
      </CText>
      <FlashList
        data={data}
        extraData={extraData}
        renderItem={renderSizeItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={10}
      />
    </View>
  );
};

export default memo(SizeComponent);

const localStyles = StyleSheet.create({
  chipsContainer: {
    height: moderateScale(45),
    width: moderateScale(45),
    ...styles.center,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(45) / 2,
    ...styles.mr10,
  },
});
