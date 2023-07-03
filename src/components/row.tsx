import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React, {ReactElement} from 'react';

interface Props {
  style?: ViewStyle;
  children?: ReactElement[] | ReactElement;
}

export default function Row({style, children}: Props) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
