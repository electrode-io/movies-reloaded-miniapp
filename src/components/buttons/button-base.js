/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import { oneOption, selectOption, interpolateStyles } from '../../util'
import chevronRight from '../../icons/chevron-right.png'

const ANIMATION_DURATION = 100
export default class ButtonBase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pressed: false,
      pressAnimator: new Animated.Value(0)
    }
    this.handlePress = this.handlePress.bind(this)
    this.handlePressIn = this.handlePressIn.bind(this)
    this.handlePressOut = this.handlePressOut.bind(this)
  }

  handlePress (...params) {
    const { onPress } = this.props
    if (onPress) {
      onPress(params)
    }
  }
  handlePressIn (...params) {
    const { onPressIn } = this.props
    if (onPressIn) {
      onPressIn(params)
    }
    this.setState({
      pressed: true,
      pressAnimator: this.state.pressAnimator
    }, () => {
      Animated.timing(
        this.state.pressAnimator,
        {
          duration: ANIMATION_DURATION,
          toValue: 1
        }
      ).start()
    })
  }
  handlePressOut (...params) {
    const { onPressOut } = this.props
    if (onPressOut) {
      onPressOut(params)
    }
    this.setState({
      pressed: false,
      pressAnimator: this.state.pressAnimator
    }, () => {
      Animated.timing(
        this.state.pressAnimator,
        {
          duration: ANIMATION_DURATION,
          toValue: 0
        }
      ).start()
    })
  }

  render () {
    const { children, copy, primary, secondary, primaryMini, secondaryMini, style, icon, iconRight, ...rest } = this.props
    let variant = 'copy'
    if (!oneOption([primary, secondary, primaryMini, secondaryMini])) {
      console.warn('ButtonBase can only accept one of: [primary, secondary, primaryMini, secondaryMini]')
    } else {
      variant = selectOption([
        {
          selected: secondary,
          value: 'secondary'
        },
        {
          selected: primaryMini,
          value: 'primaryMini'
        },
        {
          selected: secondaryMini,
          value: 'secondaryMini'
        }
      ]) || 'primary'
    }
    const viewStyle = interpolateStyles(
      this.state.pressAnimator,
      styles[variant].default.view,
      styles[variant].pressed.view
    )
    const textStyle = interpolateStyles(
      this.state.pressAnimator,
      styles[variant].default.text,
      styles[variant].pressed.text
    )
    const imageStyle = interpolateStyles(
      this.state.pressAnimator,
      styles[variant].default.image,
      styles[variant].pressed.image
    )
    let iconSource = chevronRight
    if (icon) {
      switch (icon) {
        case 'chevronRight':
          iconSource = chevronRight
          break

        default:
          break
      }
    }
    const iconComponent = icon && <Animated.Image source={iconSource} style={[imageStyle.cleaned, imageStyle.interpolated]} />

    return (
      <TouchableWithoutFeedback
        {...rest}
        onPress={this.handlePress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View style={[viewStyle.cleaned, viewStyle.interpolated]}>
          {!iconRight && iconComponent}
          <Animated.Text style={[textStyle.cleaned, textStyle.interpolated]}>
            {children}
          </Animated.Text>
          {iconRight && iconComponent}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
