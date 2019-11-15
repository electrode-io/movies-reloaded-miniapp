import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    alignItems: 'center',
  },
  childrenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  children: {
    alignSelf: 'center',
    flexDirection: 'column',
    flex: 1,
  },
});

export default styles;
