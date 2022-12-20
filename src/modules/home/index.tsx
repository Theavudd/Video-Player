import {View, Text, Button} from 'react-native';
import React from 'react';
import I18n from '../../utils/I18n';
import RNRestart from 'react-native-restart';

export default function Home() {
  return (
    <View>
      <Text>{I18n.t('hi')}</Text>
      <Button
        title={'but'}
        onPress={() => {
          I18n.locale = 'hi';
          //   RNRestart.Restart();
        }}
      />
    </View>
  );
}
