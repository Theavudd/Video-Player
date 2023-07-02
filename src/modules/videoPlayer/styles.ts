import {StyleSheet} from 'react-native';
import {normalize, vh, vw} from '../../utils/dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
});

export default styles;
