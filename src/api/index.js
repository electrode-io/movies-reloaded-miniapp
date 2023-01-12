/* global fetch */
import Config from '../../config.json';

const actions = {
  discover: {
    method: 'get',
    uri: 'discover/movie',
    parameters: {
      sort_by: 'popularity.desc',
      include_adult: 'false',
      include_video: 'false',
      year: '2019',
    },
  },
  genres: {
    method: 'get',
    uri: 'genre/movie/list',
  },
  configure: {
    method: 'get',
    uri: 'configuration',
  },
  movieDetails: {
    method: 'get',
    uri: 'movie/',
    parameters: {
      append_to_response: 'credits',
    },
  },
};

const includeParameter = param => param !== undefined && param !== null;
const objectToParams = paramObject => {
  return Object.keys(paramObject)
    .filter(i => includeParameter(paramObject[i]))
    .map(i => {
      return `${encodeURIComponent(i)}=${encodeURIComponent(paramObject[i])}`;
    });
};

const buildAPIUri = (uri, parameters) => {
  const {uri: parameterUri, ...params} = parameters;
  const paramArray = objectToParams(params);
  const fullUri = `${Config.TheMovieDB.Uri}${uri}${
    parameterUri || ''
  }?api_key=${Config.TheMovieDB.APIKey}`;
  return paramArray ? `${fullUri}&${paramArray.join('&')}` : fullUri;
};

const api = {};
Object.keys(actions).forEach(action => {
  const {method, uri, parameters} = actions[action];
  api[action] = (params, data) => {
    return fetch(buildAPIUri(uri, {...(parameters || {}), ...params}), {
      method: method || 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data && JSON.stringify(data),
    }).then(res => res && res.json());
  };
});

const mockedConfiguration = require('./mocks/configuration.json');
const mockedDiscover = require('./mocks/discover.json');
const mockedGenres = require('./mocks/genres.json');
const mockedMovie = require('./mocks/movie.json');

const mockedApi = {
  configure: () => Promise.resolve(mockedConfiguration),
  genres: () => Promise.resolve(mockedGenres),
  discover: () => Promise.resolve(mockedDiscover),
  movieDetails: params => {
    if (!params) {
      return Promise.reject(
        new Error({
          status_code: 422,
          status_message:
            'Invalid parameters: Your request parameters are incorrect.',
        }),
      );
    } else if (!params.uri || !mockedMovie[params.uri]) {
      return Promise.reject(
        new Error({
          status_code: 401,
          status_message: 'The resource you requested could not be found.',
        }),
      );
    } else {
      return Promise.resolve(mockedMovie[params.uri]);
    }
  },
};

export default Config.TheMovieDB.APIKey ? api : mockedApi;
