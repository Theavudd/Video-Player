import {View, Text, Platform, FlatList, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import I18n from '../../utils/I18n';
import styles from './styles';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {checkFile, RootDirectory} from '../../utils/commonFunctions';
import FastImage from 'react-native-fast-image';
import {useRoute} from '@react-navigation/native';
import ScreenNames from '../../utils/screenNames';
import localimage from '../../utils/localimage';

export default function Home({navigation}: any) {
  const [data, setData]: any = useState([]);

  const params = useRoute()?.params;

  let directory: string | null = params?.directory;

  // const navigation = useNavigation();

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
      let file = await RNFS.readDir(directory ? directory : RootDirectory);
      sortData(file);
      setData(sortData(file));
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

  const onItemPress = (item: any) => {
    if (item.isDirectory()) {
      navigation.push(ScreenNames.home, {
        directory: `${directory ? directory : RootDirectory}/${item.name}`,
      });
    } else if (item.isFile()) {
      const fileExt = checkFile(item);
      if (fileExt == 'mkv') {
        navigation.navigate(ScreenNames.videoPlayer, {
          videoPath: `${directory ? directory : RootDirectory}/${item.name}`,
        });
      }
    }
  };

  const renderItem = React.useCallback(({item}: any) => {
    if (item.name[0] !== '.') {
      return (
        <View style={{paddingLeft: 20}}>
          <Pressable style={styles.itemStyle} onPress={() => onItemPress(item)}>
            {item.isDirectory() ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={localimage.folder} style={styles.logo} />
                <Text style={styles.directory}>{item.name}</Text>
              </View>
            ) : (
              <Text style={styles.fileStyle}>{item.name}</Text>
            )}
          </Pressable>
        </View>
      );
    } else {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <View style={styles.logoName}>
          <Image source={localimage.logo} style={styles.logo} />
          <Text style={styles.headerText}>{I18n.t('files')}</Text>
        </View>
        {/* <View style={styles.iconParent}>
          {/* <Pressable>
            <Image style={styles.smallIcons} source={localimage.reload} />
          </Pressable> */}
        <Pressable style={styles.iconParent}>
          <Image style={styles.smallIcons} source={localimage.dots} />
        </Pressable>
        {/* </View> */}
      </View>
      <FlatList data={data} renderItem={renderItem} />
      {/* )} */}
    </View>
  );
}
