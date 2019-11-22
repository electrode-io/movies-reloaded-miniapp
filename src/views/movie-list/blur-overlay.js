import React from 'react';
import {Animated, Image} from 'react-native';

export default class BlurOverlay extends React.Component {
  render() {
    const {
      opacity,
      padding,
      blur,
      imageOpacity,
      movieTextViewport,
      viewport,
      backgroundUri,
    } = this.props;
    const position = {
      top: movieTextViewport.y - padding,
      left: movieTextViewport.x - padding,
      width: movieTextViewport.width + padding * 2,
      height: movieTextViewport.height + padding * 2,
    };

    return (
      <Animated.View
        style={{
          position: 'absolute',
          ...position,
          overflow: 'hidden',
          borderRadius: padding,
          backgroundColor: '#000000',
          opacity,
        }}>
        <Image
          resizeMode="cover"
          source={{uri: backgroundUri}}
          style={{
            position: 'absolute',
            top: -position.top,
            left: -position.left,
            ...viewport,
            opacity: imageOpacity,
          }}
          blurRadius={blur}
        />
      </Animated.View>
    );
  }
}
