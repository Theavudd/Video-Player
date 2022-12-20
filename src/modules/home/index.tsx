import {View, Text, Button} from 'react-native';
import React from 'react';
import I18n from '../../utils/I18n';
import RNRestart from 'react-native-restart';
import {setLanguage} from '../../redux/homeReducer/action';
import {useSelector} from 'react-redux';

export default function Home() {
  const language = useSelector((store: any) => store.HomeReducer);
  console.log('language', language);
  return (
    <View>
      <Text>{I18n.t('hi')}</Text>
      <Button
        title={'but'}
        onPress={() => {
          setLanguage('hi');
          //   RNRestart.Restart();
        }}
      />
    </View>
  );
}
