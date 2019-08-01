import { StyleSheet, Platform } from 'react-native'
import colors from '../../util/colors.json'

const BASE_FONT_SIZE = Platform.OS === 'android' ? 12 : 16
export default StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    resizeMode: 'cover'
  },
  castMember: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center'
  },
  castMemberImage: {
    height: 50,
    width: 50,
    borderColor: colors.white,
    borderWidth: 3,
    borderRadius: 25,
    marginRight: 16
  },
  castMemberName: {
    fontSize: BASE_FONT_SIZE * 1.2,
    color: colors.white
  },
  castMemberCharacter: {
    fontSize: BASE_FONT_SIZE * 3 / 4,
    fontStyle: 'italic',
    color: colors.white
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 'auto'
  }
})
