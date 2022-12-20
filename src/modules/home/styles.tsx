import {StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  allowBtn: {
    height: vh(100),
    width: vw(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'aqua',
  },
});

export default styles;
