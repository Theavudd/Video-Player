import {Platform, StatusBar, StyleSheet} from 'react-native';
import Colors from '../../utils/colors';
import {vh, vw} from '../../utils/dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 30,
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
  fileStyleText: {
    // color: 'red',
    fontSize: vw(14),
  },
  directoryName: {
    fontSize: vw(14),
    color: 'white',
  },
  itemStyle: {
    height: vh(60),
    justifyContent: 'center',
  },
  logo: {
    height: vh(40),
    width: vh(40),
    padding: 5,
  },
  smallIcons: {
    height: vh(18),
    width: vh(18),
    // tintColor: '#ffffff',
  },
  logoName: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: vw(90),
  },
  iconParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    paddingHorizontal: vw(10),
    width: '95%',
  },
  fileModified: {
    color: Colors.white,
    // backgroundColor: 'red',
    fontSize: vw(9.5),
  },
  nameContainer: {
    // backgroundColor: 'red',
    paddingLeft: vw(10),
  },
});

export default styles;
