import { StyleSheet } from 'react-native'
import colors from '../../util/colors.json'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.5
  },
  content: {
    padding: 16
  }
})
