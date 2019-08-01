import React from 'react'
import Carousel from 'react-native-snap-carousel'

import styles from './styles'
import MovieCard from './movie-card'

export default class MovieCarousel extends React.Component {
  render () {
    const { posterBaseUri, viewport, movies, onSnapToItem } = this.props
    const options = {
      itemWidth: viewport.height / 2,
      containerCustomStyle: {
        ...styles.carousel,
        height: viewport.height
      }
    }
    return (
      <Carousel
        onSnapToItem={onSnapToItem}
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} imageUri={`${posterBaseUri}/${item.poster_path}`} />}
        sliderWidth={viewport.width}
        enableMomentum
        decelerationRate={0.9}
        loop
        inactiveSlideOpacity={0.5}
        {...options}
      />
    )
  }
}
