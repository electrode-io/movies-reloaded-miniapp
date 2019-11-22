import React, {Component} from 'react';
import {Animated} from 'react-native';
import styles from './styles';

export default class AnimatedBackgroundImage extends Component {
  render() {
    const {opacity, uri} = this.props;
    return uri ? (
      <Animated.Image style={[styles.background, {opacity}]} source={{uri}} />
    ) : (
      <React.Fragment />
    );
  }
}
