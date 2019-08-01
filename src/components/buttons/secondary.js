/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import ButtonBase from './button-base'

export default class SecondaryButton extends Component {
  render () {
    const { children, mini, ...rest } = this.props
    const variant = !mini ? { secondary: true } : { secondaryMini: true }
    return (
      <ButtonBase {...rest} {...variant}>
        {children}
      </ButtonBase>
    )
  }
}
