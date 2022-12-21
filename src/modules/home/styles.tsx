import {StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141A',
  },
  header: {
    backgroundColor: '#121B24',
    height: vh(60),
    justifyContent: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: vh(1),
  },
  headerText: {
    color: 'white',
    fontWeight: '500',
    fontSize: vw(16),
    lineHeight: vh(24),
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
  fileStyle: {
    color: 'white',
  },
  directory: {
    color: 'white',
  },
});

export default styles;
