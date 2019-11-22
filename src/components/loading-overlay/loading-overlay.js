/**
 * Loading Overlay
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';

export default class LoadingOverlay extends Component {
  render() {
    const {style, children, ...props} = this.props;
    return (
      <View style={[styles.container, style]} {...props}>
        <View style={styles.content}>
          {children}
          <ActivityIndicator style={styles.spinner} />
        </View>
      </View>
    );
  }
}
