import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import I18n from '../utils/I18n';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {vh, vw} from '../utils/dimension';
import localImages from '../utils/localImages';

export default function CustomHeader({navigation}: any) {
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoName}>
        {navigation.canGoBack() && (
          <Pressable onPress={onBackPress} style={styles.backArrowContainer}>
            <Image source={localImages.backArrow} style={styles.backArrow} />
          </Pressable>
        )}
        <Image source={localImages.logo} style={styles.logo} />
        <Text style={styles.headerText}>{I18n.t('files')}</Text>
      </View>
      {/* <View style={styles.iconParent}>
          {/* <Pressable>
            <Image style={styles.smallIcons} source={localimage.reload} />
          </Pressable> */}
      <Pressable style={styles.iconParent}>
        <Image style={styles.smallIcons} source={localImages.dots} />
      </Pressable>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyish,
    height: vh(60),
    borderBottomColor: 'white',
    borderBottomWidth: vh(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(15),
  },
  headerText: {
    color: 'white',
    fontWeight: '500',
    fontSize: vw(15),
    lineHeight: vh(24),
    marginHorizontal: vw(8),
  },
  logo: {
    height: vh(35),
    width: vh(35),
    padding: 5,
    tintColor: '#ffffff',
  },
  smallIcons: {
    height: vh(18),
    width: vh(18),
    tintColor: '#ffffff',
  },
  logoName: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: vw(90),
  },
  iconParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrowContainer: {
    height: vh(18),
    width: vh(18),
    marginRight: 10,
  },
  backArrow: {
    height: '100%',
    width: '100%',
    tintColor: Colors.white,
  },
});
