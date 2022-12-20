import {View, Text, Platform} from 'react-native';
import React, {useEffect} from 'react';
import I18n from '../../utils/I18n';
import styles from './styles';
import {check, PERMISSIONS, request} from 'react-native-permissions';

export default function Home() {
  const checkPermissions = async () => {
    const writePermissions = await check(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );
    if (writePermissions !== 'granted') {
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkPermissions();
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* {!permissionStatus ? (
        <View style={styles.permissionContainer}>
          <Text>{I18n.t('storagePermission')}</Text>
          <Pressable onPress={checkPermissions} style={styles.allowBtn}>
            <Text>{I18n.t('Allow')}</Text>
          </Pressable>
        </View>
      ) : ( */}
      <Text>{I18n.t('hi')}</Text>
      {/* )} */}
    </View>
  );
}
