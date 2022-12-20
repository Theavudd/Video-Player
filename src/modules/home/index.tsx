import {View, Text} from 'react-native';
import React from 'react';
import I18n from '../../utils/I18n';
import styles from './styles';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>{I18n.t('hi')}</Text>
    </View>
  );
}
