import {platformSelect} from './index';

export const fontFamily = 'System';
export const fontFamilyMedium = 'sans-serif-medium';
export const fontWeights = platformSelect(
  {
    bold: '700',
    light: '200',
    medium: '500',
    regular: '400',
    semibold: '600',
  },
  {
    bold: '800',
    light: '200',
    medium: '600',
    regular: '400',
    semibold: '700',
  },
);
