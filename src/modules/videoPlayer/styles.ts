import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default styles;
