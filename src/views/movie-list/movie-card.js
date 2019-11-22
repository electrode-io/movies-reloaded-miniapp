import React from 'react';
import {Image, Text, View} from 'react-native';

import styles from './styles';

export default class MovieCard extends React.Component {
  render() {
    const {movie, imageUri} = this.props;
    return (
      <View style={styles.card}>
        <View style={styles.posterContainer}>
          <Image
            resizeMode="cover"
            resizeMethod="resize"
            source={{uri: imageUri}}
            style={styles.poster}
          />
        </View>
        <View style={styles.cardCaption}>
          <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
            {movie.title}
          </Text>
        </View>
      </View>
    );
  }
}
