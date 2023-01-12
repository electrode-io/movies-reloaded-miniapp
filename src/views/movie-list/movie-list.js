import React from 'react';
import {Component} from 'ern-navigation';
import {Animated, Image, Platform, View} from 'react-native';

import api from '../../api';
import styles from './styles';
import {
  findGenres,
  getBackgroundImageSize,
  getPosterImageSize,
} from '../../util';
import MovieCarousel from './movie-carousel';
import MovieInfo from './movie-info';
import BlurOverlay from './blur-overlay';
import aboutIcon from '../../icons/about.png';
import refreshIcon from '../../icons/refresh.png';
import LoadingOverlay from '../../components/loading-overlay';

const ANIMATION_DURATION = 500;

const BackgroundImage = ({opacity, uri}) =>
  uri && (
    <Animated.Image style={[styles.background, {opacity}]} source={{uri}} />
  );

const icons = {
  about: Image.resolveAssetSource(aboutIcon).uri,
  refresh: Image.resolveAssetSource(refreshIcon).uri,
};

export default class MovieList extends Component {
  static displayName = 'Movie List';
  static navigationOptions = {
    title: 'Popular Movies',
    buttons: [
      {
        icon: icons.about,
        id: 'about',
        location: 'right',
        accessibilityLabel: 'About the Movie List app',
      },
      {
        icon: icons.refresh,
        id: 'refresh',
        location: 'right',
        accessibilityLabel: 'Refresh the list',
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      configuration: undefined,
      error: false,
      loading: true,
      movies: undefined,
      errorMessage: undefined,
      oldMovieIndex: 0,
      activeMovieIndex: 0,
      animating: false,
      animation: new Animated.Value(1),
      viewport: undefined,
      detailViewport: undefined,
      carouselViewport: undefined,
      movieTextViewport: undefined,
    };
    this.loadMovies = this.loadMovies.bind(this);
    this.setActiveMovieIndex = this.setActiveMovieIndex.bind(this);
    this.resetNavigationBar();
  }

  onNavButtonPress(buttonId) {
    switch (buttonId) {
      case 'about':
        this.navigateInternal('About');
        break;
      case 'refresh':
        this.loadMovies();
        break;
      default:
        console.warn(
          `Screen '${MovieList.getRegisteredRoute()}' received unmapped button id '${buttonId}'`,
        );
        break;
    }
  }

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies() {
    this.setState(
      {
        loading: true,
        error: false,
        errorMessage: null,
        oldMovieIndex: 0,
        activeMovieIndex: 0,
      },
      () => {
        Promise.all([api.configure(), api.genres(), api.discover()])
          .then(([configuration, genres, discover]) => {
            if (configuration && configuration.status_code) {
              this.setState({
                loading: false,
                error: true,
                errorMessage: configuration.status_message,
              });
            } else {
              this.setState({
                configuration,
                genres: genres && genres.genres ? genres.genres : [],
                movies: discover && discover.results ? discover.results : [],
                loading: false,
              });
            }
          })
          .catch(e => {
            this.setState({
              loading: false,
              error: true,
              errorMessage: null,
            });
          });
      },
    );
  }

  startAnimation(activeMovieIndex) {
    const {activeMovieIndex: oldMovieIndex} = this.state;

    this.setState(
      {
        oldMovieIndex,
        activeMovieIndex,
        animating: true,
        animation: new Animated.Value(0),
      },
      () => {
        Animated.timing(this.state.animation, {
          duration: ANIMATION_DURATION,
          fromValue: 0,
          toValue: 1,
        }).start(() => {
          this.setState({animating: false});
        });
      },
    );
  }

  setActiveMovieIndex(activeMovieIndex) {
    const {animating, animation} = this.state;

    if (animating) {
      animation.stopAnimation(value => this.startAnimation);
    } else {
      this.startAnimation(activeMovieIndex);
    }
  }

  setLayout =
    (name, props) =>
    ({nativeEvent: {layout}}) => {
      this.setState({
        [name]: Object.keys(layout)
          .filter(prop => props.includes(prop))
          .reduce((obj, prop) => ({...obj, [prop]: layout[prop]}), {}),
      });
    };

  render() {
    const {
      movies,
      loading,
      oldMovieIndex,
      activeMovieIndex,
      configuration,
      genres,
      viewport,
      carouselViewport,
      animation,
      detailViewport,
      movieTextViewport,
    } = this.state;

    let oldBackgroundUri = null;
    let backgroundUri = null;
    if (configuration && !loading && viewport) {
      const backgroundBase = `${
        configuration.images.base_url
      }${getBackgroundImageSize(
        configuration,
        Math.max(viewport.width, viewport.height),
      )}`;
      oldBackgroundUri =
        configuration &&
        movies[oldMovieIndex] &&
        `${backgroundBase}${movies[oldMovieIndex].backdrop_path}`;
      backgroundUri =
        configuration &&
        movies[activeMovieIndex] &&
        `${backgroundBase}${movies[activeMovieIndex].backdrop_path}`;
    }

    const posterBaseUri =
      configuration &&
      carouselViewport &&
      `${configuration.images.base_url}${getPosterImageSize(
        configuration,
        carouselViewport.height * 0.5,
      )}`;
    const renderedMovieInfo = !loading &&
      detailViewport &&
      carouselViewport && (
        <MovieInfo
          movie={movies[activeMovieIndex]}
          genres={findGenres(genres, movies[activeMovieIndex].genre_ids)}
          configuration={configuration}
          posterBaseUri={posterBaseUri}
          viewport={detailViewport}
          animation={animation}
          onLayout={this.setLayout('movieTextViewport', [
            'height',
            'width',
            'x',
            'y',
          ])}
          onDetailPress={() =>
            this.navigateInternal('Detail', {
              movie: movies[activeMovieIndex],
              configuration,
              genres,
            })
          }
        />
      );

    const renderedMovieCarousel = !loading && carouselViewport && (
      <MovieCarousel
        movies={movies}
        configuration={configuration}
        posterBaseUri={posterBaseUri}
        viewport={carouselViewport}
        onSnapToItem={this.setActiveMovieIndex}
      />
    );

    const renderedBlurOverlay = movieTextViewport && (
      <BlurOverlay
        opacity={animation}
        padding={8}
        blur={5}
        imageOpacity={0.3}
        movieTextViewport={movieTextViewport}
        viewport={viewport}
        backgroundUri={backgroundUri}
      />
    );

    const renderedBackground =
      Platform.OS === 'android' ? (
        <React.Fragment>
          <BackgroundImage
            uri={oldBackgroundUri}
            opacity={animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 0],
            })}
          />
          <BackgroundImage
            uri={backgroundUri}
            opacity={animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
            })}
          />
        </React.Fragment>
      ) : (
        <BackgroundImage uri={backgroundUri} opacity={0.5} />
      );

    return !loading ? (
      <View
        style={styles.container}
        onLayout={this.setLayout('viewport', ['width', 'height'])}>
        {renderedBackground}
        {renderedBlurOverlay}
        <Animated.View
          style={{flex: 1, opacity: animation}}
          onLayout={this.setLayout('detailViewport', ['width', 'height'])}>
          {renderedMovieInfo}
        </Animated.View>
        <View
          style={{flex: 1}}
          onLayout={this.setLayout('carouselViewport', ['width', 'height'])}>
          {renderedMovieCarousel}
        </View>
      </View>
    ) : (
      <LoadingOverlay />
    );
  }
}
