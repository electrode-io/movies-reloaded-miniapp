// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default class Badge extends Component {
  render () {
    const {
      children,
      style,
      ...props
    } = this.props

    return (
      <View style={[styles.container, style]} {...props}>
        <Text style={styles.text}>{children}</Text>
      </View>
    )
  }
}
