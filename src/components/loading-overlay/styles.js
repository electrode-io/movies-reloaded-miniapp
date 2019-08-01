import { StyleSheet } from 'react-native'
import colors from '../../util/colors.json'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  content: {
    flexDirection: 'column',
    alignSelf: 'center',
    flex: 1
  },
  children: {
    textAlign: 'center'
  },
  spinner: {
    marginVertical: 16
  }
})

export default styles
