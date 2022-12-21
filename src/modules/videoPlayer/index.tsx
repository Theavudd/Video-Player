import {View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import VideoPlayer from 'react-native-video-controls';
import styles from './styles';
import {useRoute} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

export default function PlayVideos() {
  // const {videoPath}: any = useRoute().params;
  const videoRef = useRef();
  const [isPaused, setPause] = useState(false);

  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);
  //   console.log('params', videoPath);
  return (
    <View style={styles.container}>
      <VideoPlayer
        source={require('../../assets/video.mp4')}
        ref={videoRef}
        pictureInPicture={true}
        onLoad={() => {}}
        paused={isPaused}
        onEnd={() => {
          setPause(true);
        }}
        disableFullscreen={false}
      />
      <VideoPlayer
        disableBack
        onProgress={onProgress}
        onEnd={() => {
          setenableCustomLoader(false);
        }}
        seekColor={COLORS.PRIMARY}
        disableVolume={true}
        paused={isPaused}
        tapAnywhereToPause={true}
        onEnterFullscreen={() => {
          Orientation.lockToLandscape();
        }}
        onExitFullscreen={() => {
          Orientation.lockToPortrait();
        }}
        onLoadStart={() => {}}
      />
    </View>
  );
}
