import { StyleSheet, Platform } from 'react-native'
import colors from '../../util/colors.json'

const BASE_FONT_SIZE = Platform.OS === 'android' ? 12 : 16
export default StyleSheet.create({
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
  }
})
