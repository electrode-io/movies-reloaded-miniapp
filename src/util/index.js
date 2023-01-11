import {PixelRatio, Platform} from 'react-native';

const WIDTH_MULTIPLIER = PixelRatio.get() || 1;

const getImageSize = fieldName => (configuration, minWidth) => {
  if (!configuration || !minWidth) {
    return 'original';
  }

  const sizes = configuration.images[fieldName].filter(
    size =>
      size &&
      size.startsWith('w') &&
      Number.parseInt(size.substring(1), 10) >= minWidth * WIDTH_MULTIPLIER,
  );
  return sizes.length > 0 ? sizes[0] : 'original';
};

export const getPosterImageSize = getImageSize('poster_sizes');
export const getBackgroundImageSize = getImageSize('backdrop_sizes');
export const getCastImageSize = getImageSize('profile_sizes');
export const findGenres = (genres, ids) => {
  if (!genres || !ids) {
    return '';
  }

  return ids.reduce((list, id) => {
    const genre = genres.find(g => g.id === id);
    return genre ? [...list, genre.name] : list;
  }, []);
};

export const oneOption = options => {
  return Array.isArray(options) && options.filter(e => e === true).length <= 1;
};
export const selectOption = options => {
  if (Array.isArray(options)) {
    const foundItem = options.find(e => e.selected === true);
    return foundItem && foundItem.value;
  }
  return false;
};

export const platformSelect = (android, iOS) => {
  return Platform.OS === 'android' ? android : iOS;
};

const interpolatable = [
  'color',
  'backgroundColor',
  'fontSize',
  'left',
  'right',
  'top',
  'bottom',
  'padding',
  'paddingVertical',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'margin',
  'marginVertical',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth',
  'opacity',
  'tintColor',
];

if (Platform.OS === 'android') {
  interpolatable.push('elevation');
}

export const interpolateStyles = (interpolater, from, to) => {
  const interpolated = {};
  const cleaned = {...from};

  interpolatable.forEach(prop => {
    if (
      (from.hasOwnProperty(prop) || to.hasOwnProperty(prop)) &&
      from[prop] !== to[prop]
    ) {
      const fromHasProp = from.hasOwnProperty(prop);
      const toHasProp = to.hasOwnProperty(prop);
      if (!fromHasProp || !toHasProp) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            `Cannot interpolate property "${prop}" from ${from[prop]} to ${to[prop]}.\n\nMissing property in style object`,
            fromHasProp ? to : from,
          );
        }
      } else if (
        (from.hasOwnProperty(prop) || to.hasOwnProperty(prop)) &&
        from[prop] !== to[prop]
      ) {
        interpolated[prop] = interpolater.interpolate({
          inputRange: [0, 1],
          outputRange: [from[prop], to[prop]],
        });
        delete cleaned[prop];
      }
    }
  });

  return {
    interpolated,
    cleaned,
  };
};
