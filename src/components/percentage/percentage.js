/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import colors from '../../util/colors.json';

const ANIMATION_DURATION = 1000;
export default class InfoMessage extends Component {
  render() {
    const {size, style, value, children, ...rest} = this.props;
    return (
      <View style={[{height: size, width: size}, styles.view, style]}>
        <AnimatedProgressWheel
          size={size}
          width={4}
          color={colors.darkBlue}
          progress={value}
          backgroundColor={colors.lightBlue}
          animateFromValue={0}
          duration={ANIMATION_DURATION * (value / 100)}
          {...rest}
        />
        <View style={[{height: size, width: size}, styles.childrenContainer]}>
          <View style={styles.children}>{children}</View>
        </View>
      </View>
    );
  }
}
