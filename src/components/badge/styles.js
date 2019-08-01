import { StyleSheet } from 'react-native'
import colors from '../../util/colors.json'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.white,
    borderRadius: 2,
    marginTop: 4,
    marginRight: 4
  },
  text: {
    color: colors.black,
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default styles
