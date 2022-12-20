import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import i18n from '../../utils/I18n';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../utils/screenNames';

export default function Splash() {
  const navigation: any = useNavigation();
  const {language} = useSelector((store: any) => store.homeReducer);
  i18n.locale = language;
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: ScreenNames.home}],
      });
    }, 300);
  }, [navigation]);
  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
}
