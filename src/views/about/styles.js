import { StyleSheet, Platform } from 'react-native'
import colors from '../../util/colors.json'

// const BORDER_RADIUS = 10
const BASE_FONT_SIZE = Platform.OS === 'android' ? 12 : 16
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    opacity: 0.1,
    tintColor: colors.lightBlue
  },
  contentContainer: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 16
  },
  section: {
    marginBottom: 16
  },
  subsection: {
    marginTop: 4
  },
  header: {
    color: colors.yellow,
    fontSize: BASE_FONT_SIZE * 1.5
  },
  subHeader: {
    color: colors.lightBlue,
    fontWeight: 'bold',
    fontSize: BASE_FONT_SIZE * 1.2
  },
  question: {
    color: colors.lightBlue,
    fontSize: BASE_FONT_SIZE,
    fontWeight: 'bold'
  },
  text: {
    color: colors.white,
    fontSize: BASE_FONT_SIZE
  },
  highlight: {
    color: colors.yellow
  },
  code: {
    fontSize: BASE_FONT_SIZE * 0.8,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontWeight: 'bold',
    color: colors.lightBlue,
    borderWidth: 1,
    padding: 4
  },
  variable: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontStyle: 'italic'
  },
  tmdb: {
    maxWidth: '50%',
    marginHorizontal: 10,
    alignSelf: 'center',
    tintColor: colors.white
  }
})
