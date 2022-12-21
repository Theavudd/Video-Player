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
    borderBottomColor: 'white',
    borderBottomWidth: vh(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    paddingLeft: 10,
  },
  itemStyle: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    height: vh(50),
    justifyContent: 'center',
  },
  logo: {
    height: vh(35),
    width: vh(35),
    padding: 5,
  },
  smallIcons: {
    height: vh(18),
    width: vh(18),
    tintColor: '#ffffff',
  },
  logoName: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: 90,
  },
  iconParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
