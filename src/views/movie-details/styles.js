import {Platform, StyleSheet} from 'react-native';
import colors from '../../util/colors.json';

const BASE_FONT_SIZE = Platform.OS === 'android' ? 12 : 16;
const textShadow = {
  textShadowColor: 'rgba(0, 0, 0, 1)',
  textShadowOffset: {
    width: 2,
    height: 2,
  },
  textShadowRadius: 10,
};
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    resizeMode: 'cover',
  },
  movieRatingText: {
    alignSelf: 'center',
    fontSize: BASE_FONT_SIZE * (5 / 6),
    color: '#FFF',
  },
  movieTitle: {
    ...textShadow,
    color: '#FFF',
    fontSize: BASE_FONT_SIZE * 1.5,
  },
  movieTagline: {
    color: '#FFF',
    fontStyle: 'italic',
    fontSize: BASE_FONT_SIZE,
    marginBottom: 8,
  },
  tabBarContainer: {
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  tabBar: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomWidth: 5,
    borderBottomColor: 'transparent',
  },
  selectedTab: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomWidth: 5,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: BASE_FONT_SIZE,
    textAlign: 'center',
    color: colors.white,
  },
  selectedTabText: {
    fontSize: BASE_FONT_SIZE,
    textAlign: 'center',
    color: colors.white,
  },
  tabBarHighlight: {
    position: 'absolute',
    backgroundColor: colors.darkBlue,
    top: -5,
    height: 5,
  },
  tabContent: {
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  tabBarPage: {
    position: 'absolute',
    top: 0,
    height: '100%',
    flex: 1,
  },
  tabBarPageContent: {
    padding: 16,
  },
  overview: {
    color: colors.white,
    fontSize: BASE_FONT_SIZE,
    lineHeight: BASE_FONT_SIZE * 1.5,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 'auto',
  },
});
