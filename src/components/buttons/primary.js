import React, {Component} from 'react';
import ButtonBase from './button-base';

export default class PrimaryButton extends Component {
  render() {
    const {children, mini, ...rest} = this.props;
    const variant = !mini ? {primary: true} : {primaryMini: true};
    return (
      <ButtonBase {...rest} {...variant}>
        {children}
      </ButtonBase>
    );
  }
}
