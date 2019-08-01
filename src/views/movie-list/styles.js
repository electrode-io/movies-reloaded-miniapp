import { StyleSheet, Platform } from 'react-native'
import colors from '../../util/colors.json'

const BORDER_RADIUS = 10
const BASE_FONT_SIZE = Platform.OS === 'android' ? 12 : 16
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    resizeMode: 'cover'
  },
  carousel: {
    paddingVertical: 16
  },
  card: {
    flex: 1,
    borderRadius: BORDER_RADIUS,
    backgroundColor: colors.darkestGrey
  },
  posterContainer: {
    flex: 1,
    borderRadius: BORDER_RADIUS,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'flex-start'
  },
  cardCaption: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  cardTitle: {
    color: colors.white,
    fontSize: BASE_FONT_SIZE
  },

  movieDetails: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  movieDetailsHeader: {
    marginLeft: 8,
    flex: 1,
    flexDirection: 'column'
  },
  movieTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: BASE_FONT_SIZE * 1.2
  },
  movieRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  movieRatingText: {
    alignSelf: 'center',
    fontSize: BASE_FONT_SIZE * (5 / 6),
    color: '#FFF'
  },
  movieOverview: {
    color: '#FFF',
    fontSize: BASE_FONT_SIZE * (5 / 6),
    marginVertical: 8
  }
})
