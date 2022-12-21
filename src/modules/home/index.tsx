import {View, Text, Platform, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import I18n from '../../utils/I18n';
import styles from './styles';
import {check, PERMISSIONS, request} from 'react-native-permissions';
var RNFS = require('react-native-fs');
import {ExternalDirectoryPath} from 'react-native-fs';
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'rn-fetch-blob';

export default function Home() {
  const [data, setData] = useState([]);

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
        }
      }
    }
  };

  const fileSystem = async () => {
    try {
      let file = await RNFS.readDir('/storage/emulated/0/');
      sortData(file);
      setData(file);
      console.log('files', file);
    } catch (error) {
      console.log(error);
    }
  };

  // const getVideos = async () => {
  //   try {
  //     const videoPaths = await RNFetchBlob.fs.ls(
  //       RNFetchBlob.fs.dirs.PictureDir,
  //     );
  //     // let file = await RNFS.readDir(`${videoPaths}/.thumbnails`);
  //     console.log('video', videoPaths);
  //     // console.log('files', file);
  //     // const videos = await Promise.all(
  //     //   videoPaths.map(async path => {
  //     //     // const metadata = await RNFetchBlob.fs.stat(path);
  //     //     return {
  //     //       path,
  //     //       filename: metadata.filename,
  //     //       size: metadata.size,
  //     //     };
  //     //   }),
  //     // );
  //     // return videos;
  //   } catch (error) {
  //     console.log('ero', error);
  //   }
  // };

  useEffect(() => {
    // getVideos().then((videos: any) => setData(videos));
    fileSystem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkPermissions();
    }
  }, []);

  const renderItem = React.useCallback(({item}: any) => {
    console.log('item', item.isFile());
    if (item.isDirectory()) {
      return item.name[0] !== '.' ? (
        <View>
          <Text style={styles.directory}>{item.name}</Text>
        </View>
      ) : null;
    } else if (item.isFile()) {
      return (
        <View>
          <Text style={styles.fileStyle}>{item.name}</Text>
        </View>
      );
    } else {
      return null;
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
      <View style={styles.header}>
        <Text style={styles.headerText}>{I18n.t('internalStorage')}</Text>
      </View>
      <FlatList data={data} renderItem={renderItem} />
      {/* )} */}
    </View>
  );
}
