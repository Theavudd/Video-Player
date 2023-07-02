import {Animated, Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import styles from './styles';
import {useRoute} from '@react-navigation/native';
import localImages from '../../utils/localImages';
import {debounceFunc} from '../../utils/commonFunctions';

export default function PlayVideos({navigation}: any) {
  const {videoPath}: any = useRoute().params;
  const videoRef: any = useRef();
  const [isPaused, setPause] = useState(false);
  const [volume, setVolume] = useState(100);
  const [controlsVisible, setControlsVisible] = useState(false);
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    controlsFadeIn();
  }, []);

  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);

  const onSeekBack = () => {};
  const onPlayPausePress = React.useCallback(() => {
    setPause(!isPaused);
  }, [isPaused]);

  const onSeekForward = () => {};

  const controlsFadeIn = debounceFunc(() => {
    setControlsVisible(true);
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished)
        setTimeout(() => {
          if (!isPaused) controlsFadeOut();
        }, 3000);
    });
  }, 1000);

  const controlsFadeOut = debounceFunc(() => {
    console.log('calledFade');
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) setControlsVisible(false);
    });
  }, 1000);

  const onContainerPress = () => {
    if (controlsVisible) controlsFadeOut();
    else controlsFadeIn();
  };

  const onVideoEnd = () => {
    setPause(true);
    controlsFadeIn();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onContainerPress}
      style={styles.container}>
      <Video
        source={{uri: `file://${videoPath}`}}
        style={styles.videoPlayer}
        resizeMode="contain"
        paused={isPaused}
        fullscreen={true}
        pictureInPicture={true}
        onEnd={onVideoEnd}
      />
      {controlsVisible && (
        <Animated.View style={[styles.controls, {opacity: fadeAnimation}]}>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.backArrowCont}
              onPress={onBackPress}>
              <Image
                source={localImages.backArrow}
                style={styles.innerIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomControls}>
            <View style={styles.playBackControls}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.controlsIconCont}
                hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
                onPress={onSeekBack}>
                <Image
                  source={localImages.seek}
                  style={styles.seekBackImg}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.controlsIconCont}
                hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
                onPress={onPlayPausePress}>
                <Image
                  source={isPaused ? localImages.play : localImages.pause}
                  style={styles.controlsIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.controlsIconCont}
                hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
                onPress={onSeekForward}>
                <Image
                  source={localImages.seek}
                  style={styles.controlsIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
}
