import React from 'react';
import {Animated, Image, Text, View} from 'react-native';

import styles from './styles';
import Percentage from '../../components/percentage';
import {SecondaryButton} from '../../components/buttons';
import Badge from '../../components/badge';

export default class MovieInfo extends React.Component {
  render() {
    const {
      movie,
      genres,
      viewport,
      posterBaseUri,
      onLayout,
      animation,
      onDetailPress,
    } = this.props;
    const imageUri = `${posterBaseUri}${movie.poster_path}`;
    const imageSize = {
      width: viewport.width * 0.25,
      height: viewport.height * 0.9,
    };

    return (
      <View style={styles.movieDetails} key={movie.id}>
        <Image
          resizeMode="contain"
          source={{uri: imageUri}}
          style={{...imageSize, marginRight: 16}}
        />
        <Animated.View
          style={{
            flex: 1,
            flexDirection: 'column',
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1],
            }),
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          }}
          onLayout={onLayout}>
          <View style={styles.movieRatingContainer}>
            <Percentage size={45} value={movie.vote_average * 10}>
              <Text style={styles.movieRatingText}>{movie.vote_average}</Text>
            </Percentage>
            <View style={styles.movieDetailsHeader}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <View style={styles.row}>
                {genres && genres.length > 0 && <Badge>{genres[0]}</Badge>}
              </View>
            </View>
          </View>
          <Text
            style={styles.movieOverview}
            numberOfLines={4}
            ellipsizeMode="tail">
            {movie.overview}
          </Text>
          <View style={[styles.row, {alignSelf: 'flex-end'}]}>
            <SecondaryButton
              mini
              onPress={onDetailPress}
              icon={'chevronRight'}
              iconRight>
              View Details
            </SecondaryButton>
          </View>
        </Animated.View>
      </View>
    );
  }
}
