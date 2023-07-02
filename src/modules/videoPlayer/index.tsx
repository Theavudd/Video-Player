import {BackHandler, Pressable, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
//@tsignore
import Video from 'react-native-video';
import styles from './styles';
import {useRoute} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import Colors from '../../utils/colors';
import {VolumeManager} from 'react-native-volume-manager';

export default function PlayVideos({navigation}: any) {
  const {videoPath}: any = useRoute().params;
  const videoRef:any = useRef();
  const [isPaused, setPause] = useState(false);
  const [volume, setVolume] = useState(100);

  //   console.log('params', videoPath);

  const onProgress = () => {};

  useEffect(() => {
    const subscribe = BackHandler.addEventListener('hardwareBackPress', () => {
      onBackPress();
      return true;
    });

    return () => subscribe.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log(
  //     'responder',
  //     videoRef.current?.player?.volumePanResponder?.panHandlers?.onResponderRelease(),
  //   );
  // }, [videoRef]);

  const onBackPress = () => {
    Orientation.unlockAllOrientations();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* <Pressable
        style={styles.innerContainer}
        onPress={async () => {
          // await VolumeManager.setVolume(videoRef?.current?.state?.volume, {
          //   // defaults to "music" (Android only)
          //   type: 'system',

          //   // defaults to false, can surpress the native UI Volume Toast (iOS & Android)
          //   showUI: false,

          //   // defaults to false (Android only)
          //   playSound: false,
          // });
          console.log('lkogged',videoRef?.current?.state?.volume)
          await VolumeManager.setVolume(videoRef?.current?.state?.volume);
          console.log('current volume',videoRef.current);
        }}
      /> */}
      <Video
      source={{uri: `file://${videoPath}`}}
      style={styles.videoPlayer}
      resizeMode='contain'
      paused={isPaused}
      />
      {/* <Video
        source={{uri: `file://${videoPath}`}}
        ref={videoRef}
        pictureInPicture={true}
        onLoad={() => {}}
        paused={isPaused}
        onEnd={() => {
          setPause(true);
        }}
        fullscreen={true}
        onVideoFullscreenPlayerWillPresent={() => {
          Orientation.lockToLandscape();
        }}
        onVideoFullscreenPlayerWillDismiss={() => {
          Orientation.lockToPortrait();
        }}
        onProgress={onProgress}
        volume={volume}
      /> */}
    </View>
  );
}
