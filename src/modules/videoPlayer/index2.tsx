import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {RefObject, useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import styles from './styles';
import {useRoute} from '@react-navigation/native';
import localImages from '../../utils/localImages';
import {debounceFunc} from '../../utils/commonFunctions';
import Row from '../../components/row';
import Column from '../../components/column';
import {hitslop10} from '../../utils/dimension';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import ImmersiveMode from 'react-native-immersive-mode';

export default function PlayVideos({navigation}: any) {
  const {videoPath, name}: any = useRoute().params;
  const playerRef: RefObject<Video> = useRef(null);
  const [isPaused, setPause] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [videoData, setVideoData] = useState<any>({});
  const [controlsVisible, setControlsVisible] = useState(false);
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    ImmersiveMode.fullLayout(true);
    controlsFadeIn();

    return () => {
      console.log('unmounting');
      Orientation.getAutoRotateState(state => {
        if (state) Orientation.unlockAllOrientations();
        else Orientation.lockToPortrait();
      });
    };
  }, []);

  useEffect(() => {
    ImmersiveMode.setBarTranslucent(true);
    ImmersiveMode.setBarMode('Full');
  }, [controlsVisible]);

  const controlsFadeIn = debounceFunc(() => {
    setControlsVisible(true);
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        setTimeout(() => {
          if (
            !isPaused &&
            Math.floor(currentTime) !== Math.floor(videoData?.duration)
          )
            controlsFadeOut();
        }, 2000);
      }
    });
  }, 500);

  const controlsFadeOut = debounceFunc(() => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) setControlsVisible(false);
    });
  }, 1000);

  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);

  const onSeekBack = () => {};
  const onPlayPausePress = () => {
    setPause(!isPaused);
    onContainerPress();
  };

  const onSeekForward = () => {};

  const onContainerPress = () => {
    if (controlsVisible) controlsFadeOut();
    else controlsFadeIn();
  };

  const onVideoEnd = () => {
    setPause(true);
    setCurrentTime(0);
    controlsFadeIn();
  };

  const onLoad = (event: any) => {
    setVideoData(event);
    const {naturalSize, duration} = event;
    if (naturalSize.orientation === 'landscape') {
      Orientation.lockToLandscape();
    }
    setCurrentTime(event.currentTime);
    setTotalDuration(duration);
  };

  const onProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  const onSliderValueChange = (time: any) => {
    setCurrentTime(time);
    playerRef.current?.seek(time);
    !isPaused && controlsFadeOut();
  };

  return (
    <Column style={styles.outerContainer}>
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={hitslop10}
        onPress={onContainerPress}
        style={[styles.container]}>
        <Video
          ref={playerRef}
          source={{uri: `file://${videoPath}`}}
          style={styles.videoPlayer}
          resizeMode="contain"
          paused={isPaused}
          currentTime={currentTime}
          fullscreen={true}
          pictureInPicture={true}
          onProgress={onProgress}
          onEnd={onVideoEnd}
          onLoad={onLoad}
        />
        {controlsVisible && (
          <Animated.View style={[styles.controls, {opacity: fadeAnimation}]}>
            <Row style={styles.topControls}>
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
              <Text>{name}</Text>
            </Row>
            <View style={styles.bottomControls}>
              <Slider
                value={currentTime}
                minimumValue={0}
                maximumValue={totalDuration}
                minimumTrackTintColor="#FFFFFF"
                tapToSeek={true}
                maximumTrackTintColor="#000000"
                style={styles.slider}
                onValueChange={onSliderValueChange}
              />
              <View style={styles.playBackControls}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.controlsIconCont}
                  hitSlop={hitslop10}
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
                  hitSlop={hitslop10}
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
                  hitSlop={hitslop10}
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
    </Column>
  );
}
