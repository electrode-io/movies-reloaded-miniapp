/**
 * @format
 */

import { AppNavigator } from 'ern-navigation'
import { name as appName } from './app.json'
import MovieList from './src/views/movie-list'
import MovieDetails from './src/views/movie-details'
import About from './src/views/about'
import CastList from './src/views/cast-list'

const appNavigator = new AppNavigator({
  'Main': MovieList,
  'Detail': MovieDetails,
  'About': About,
  'Cast': CastList
}, {
  initialScreen: 'Main'
})

appNavigator.registerAll(appName)
