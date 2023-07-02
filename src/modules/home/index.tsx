import {View, Text, Platform, FlatList, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {checkFile, RootDirectory} from '../../utils/commonFunctions';
import {useRoute} from '@react-navigation/native';
import ScreenNames from '../../utils/screenNames';
import localImages from '../../utils/localImages';
import CustomHeader from '../../components/header';
import moment from 'moment';

export default function Home({navigation}: any) {
  const [data, setData]: any = useState([]);

  const params: any = useRoute()?.params;

  let directory: string | null = params?.directory;

  const checkPermissions = async () => {
    const writePermissions = await check(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );
    if (writePermissions !== 'granted') {
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    }
  };

  const sortData = (file: any) => {
    for (let i = 0; i < file.length; i++) {
      for (let j = 0; j < file.length - 1; j++) {
        if (file[i].isDirectory() && file[j].isDirectory()) {
          if (file[i].name.toLowerCase() < file[j].name.toLowerCase()) {
            let temp = file[i];
            file[i] = file[j];
            file[j] = temp;
          }
        } else {
          if (file[i].name.toLowerCase() < file[j].name.toLowerCase()) {
            let temp = file[i];
            file[i] = file[j];
            file[j] = temp;
          }
        }
      }
    }

    let tempArr = [];

    for (let i = 0; i < file.length; i++) {
      if (file[i].isDirectory()) {
        tempArr.push(file[i]);
      }
    }

    for (let i = 0; i < file.length; i++) {
      if (file[i].isFile()) {
        tempArr.push(file[i]);
      }
    }
    return tempArr;
  };

  const fileSystem = async () => {
    try {
      let file = await RNFS.readDir(directory ?? RootDirectory);
      sortData(file);
      setData(sortData(file));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fileSystem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkPermissions();
    }
  }, []);

  const onItemPress = (item: any) => {
    if (item.isDirectory()) {
      navigation.push(ScreenNames.home, {
        directory: `${directory ? directory : RootDirectory}/${item.name}`,
      });
    } else if (item.isFile()) {
      const fileExt = checkFile(item);
      if (fileExt === 'mkv' || 'mp4' || 'avi') {
        navigation.navigate(ScreenNames.videoPlayer, {
          videoPath: `${directory ? directory : RootDirectory}/${item.name}`,
        });
      }
    }
  };

  const renderItem = React.useCallback(({item}: any) => {
    let date = new Date(item?.mtime);
    if (item.name[0] !== '.') {
      return (
        <View style={styles.itemContainer}>
          <Pressable style={styles.itemStyle} onPress={() => onItemPress(item)}>
            {item.isDirectory() ? (
              <View style={styles.innerItemContainer}>
                <Image
                  source={localImages.folder}
                  style={[
                    styles.logo,
                    // eslint-disable-next-line react-native/no-inline-styles
                    item.isDirectory && {tintColor: '#ffffff'},
                  ]}
                />
                <View style={styles.nameContainer}>
                  <Text style={styles.directoryName}>{item.name}</Text>
                  <Text style={styles.fileModified}>
                    {moment(date).format('ll')}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.innerItemContainer}>
                <Image
                  source={{
                    uri: `file://${directory ? directory : RootDirectory}/${
                      item.name
                    }`,
                  }}
                  style={styles.logo}
                />
                <View style={styles.nameContainer}>
                  <Text style={styles.fileStyleText}>{item.name}</Text>
                  <Text style={styles.fileModified}>
                    {`${moment(date).fromNow()}`}
                  </Text>
                </View>
              </View>
            )}
          </Pressable>
        </View>
      );
    } else {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('data', data);

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
      <CustomHeader navigation={navigation} />
      <FlatList data={data} renderItem={renderItem} />
      {/* )} */}
    </View>
  );
}
