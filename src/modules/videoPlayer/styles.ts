import {Platform, StatusBar, StyleSheet} from 'react-native';
import {normalize, vh, vw} from '../../utils/dimension';
import Colors from '../../utils/colors';

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  innerContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
    position: 'absolute',
    top: 100,
    left: 100,
    zIndex: 100,
    elevation: 100,
  },
  videoPlayer: {
    flex: 1,
  },
  controls: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'space-between',
  },
  backArrowCont: {
    height: 25,
    width: 25,
    marginVertical: vh(10),
    marginHorizontal: vw(10),
  },
  innerIcon: {
    height: '100%',
    width: '100%',
    tintColor: 'white',
  },
  bottomControls: {
    marginVertical: vh(10),
  },
  playBackControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  controlsIconCont: {
    padding: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vh(10),
    marginHorizontal: vw(10),
  },
  controlsIcon: {
    height: 30,
    width: 30,
    tintColor: 'white',
  },
  seekBackImg: {
    height: 30,
    width: 30,
    tintColor: 'white',
    transform: [
      {
        scaleX: -1,
      },
    ],
  },
  topControls: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 30,
    backgroundColor: Colors.greyish,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    height: vh(100),
    width: '90%',
  },
});

export default styles;
