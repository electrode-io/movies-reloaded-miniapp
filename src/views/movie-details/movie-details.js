import React from 'react';
import {Component} from 'ern-navigation';
import {Animated, Image, Platform, Text, View} from 'react-native';
import Percentage from '../../components/percentage';

import api from '../../api';
import styles from './styles';
import aboutIcon from '../../icons/about.png';
import refreshIcon from '../../icons/refresh.png';
import {
  findGenres,
  getBackgroundImageSize,
  getCastImageSize,
  getPosterImageSize,
} from '../../util';
import TabBar from './tab-bar';
import CastMember from '../shared/cast-member';
import AnimatedBackgroundImage from '../shared/animated-background-image';
import {PrimaryButton} from '../../components/buttons';
import Badge from '../../components/badge';
import TabContent from './tab-content';
import LoadingOverlay from '../../components/loading-overlay';

const ANIMATION_DURATION = 500;

const icons = {
  about: Image.resolveAssetSource(aboutIcon).uri,
  refresh: Image.resolveAssetSource(refreshIcon).uri,
};

export default class MovieDetails extends Component {
  static displayName = 'Movie Details';
  static navigationOptions = {
    title: 'Movie Details',
    buttons: [
      {
        icon: icons.refresh,
        id: 'refresh',
        location: 'right',
        accessibilityLabel: 'Refresh these details',
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      details: {},
      error: false,
      loading: true,
      errorMessage: undefined,
      posterSize: undefined,
      animating: false,
      animation: new Animated.Value(1),
      previousIndex: 0,
      selectedIndex: 0,
      tabAnimating: false,
      tabAnimation: new Animated.Value(0),
      viewport: undefined,
    };
    this.loadMovieDetails = this.loadMovieDetails.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.startTabAnimation = this.startTabAnimation.bind(this);
  }

  static getDynamicTitle(jsonProps) {
    return jsonProps && jsonProps.movie && jsonProps.movie.title;
  }

  onNavButtonPress(buttonId) {
    switch (buttonId) {
      case 'refresh':
        this.loadMovieDetails();
        break;
      default:
        console.warn(
          `Screen '${MovieDetails.getRegisteredRoute()}' received unmapped button id '${buttonId}'`,
        );
        break;
    }
  }

  componentDidMount() {
    this.loadMovieDetails();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  componentWillUpdate(newProps, newState) {
    super.componentWillUpdate(newProps, newState);
    if (!newState.posterSize) {
      const uri = this.getPosterUri(newState, this.jsonProps);
      if (uri) {
        Image.getSize(
          uri,
          (width, height) => {
            this.setState({posterSize: {width, height}});
          },
          () => {},
        );
      }
    }
  }

  loadMovieDetails() {
    const {movie, genres} = this.jsonProps;
    this.setState({loading: true, error: false, errorMessage: null}, () => {
      if (movie) {
        api
          .movieDetails({uri: movie.id})
          .then(res => {
            if (res.status_code) {
              this.setState({
                loading: false,
                error: true,
                errorMessage: res.status_message,
              });
            } else {
              this.setState(
                {
                  details: res,
                  genres: findGenres(genres, movie.genre_ids),
                  loading: false,
                },
                () => this.startAnimation(),
              );
            }
          })
          .catch(e => {
            this.setState({
              loading: false,
              error: true,
            });
          });
      }
    });
  }

  startAnimation() {
    this.setState(
      {
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

  startTabAnimation(selectedIndex) {
    this.setState(
      {
        selectedIndex,
        previousIndex: this.state.selectedIndex,
        tabAnimating: true,
      },
      () => {
        Animated.spring(this.state.tabAnimation, {
          toValue: selectedIndex,
          bounciness: 6,
          speed: 5,
        }).start(() => {
          this.setState({tabAnimating: false});
        });
      },
    );
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

  getPosterUri = (state, props) => {
    const {movie, configuration} = props;
    const {viewport} = state;
    if (!movie || !configuration || !viewport) {
      return null;
    }
    return `${configuration.images.base_url}${getPosterImageSize(
      configuration,
      viewport.width * 0.5,
    )}${movie.poster_path}`;
  };

  getPosterDisplaySize = (posterSize, viewportSize) => {
    const ratio = Math.min(
      viewportSize.height / posterSize.height,
      viewportSize.width / posterSize.width,
    );
    return {
      height: posterSize.height * ratio,
      width: posterSize.width * ratio,
    };
  };

  render() {
    const {
      details,
      loading,
      genres,
      viewport,
      animation,
      tabAnimation,
      posterSize,
      previousIndex,
      selectedIndex,
      tabViewport,
    } = this.state;

    const {movie, configuration} = this.jsonProps;

    let backgroundUri = null;
    let posterUri = this.getPosterUri(this.state, this.jsonProps);
    if (configuration && !loading && viewport && movie) {
      const backgroundBase = `${
        configuration.images.base_url
      }${getBackgroundImageSize(configuration, viewport.width)}`;
      backgroundUri = `${backgroundBase}${movie.backdrop_path}`;
    }

    const renderedBackground =
      Platform.OS === 'android' ? (
        <React.Fragment>
          <AnimatedBackgroundImage
            uri={backgroundUri}
            opacity={animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
            })}
          />
        </React.Fragment>
      ) : (
        <AnimatedBackgroundImage uri={backgroundUri} opacity={0.5} />
      );

    let renderedPoster = null;
    if (posterUri && posterSize) {
      const posterDisplaySize = this.getPosterDisplaySize(posterSize, {
        height: viewport.height * 0.5,
        width: viewport.width * 0.33,
      });
      renderedPoster = (
        <View style={{width: posterDisplaySize.width}}>
          <Image
            resizeMode="contain"
            resizeMethod="resize"
            style={posterDisplaySize}
            source={{uri: posterUri}}
          />
        </View>
      );
    }

    const tabs = [
      {
        title: 'Overview',
        content: details ? (
          <Text style={styles.overview}>{details.overview}</Text>
        ) : (
          <React.Fragment />
        ),
      },
      {
        title: `${viewport && viewport.width > 300 ? 'Top Billed ' : ''}Cast`,
        content:
          configuration && details && details.credits ? (
            details.credits.cast
              .filter((t, i) => i < 5)
              .map((cast, i) => (
                <CastMember
                  key={`${i}_${cast.id}`}
                  cast={cast}
                  imageBase={`${
                    configuration.images.base_url
                  }${getCastImageSize(configuration, 50)}`}
                  style={!i && {marginTop: 0}}
                />
              ))
          ) : (
            <React.Fragment />
          ),
        fixedContent: (
          <View style={styles.overlay}>
            <PrimaryButton
              icon={'chevronRight'}
              iconRight
              onPress={() =>
                this.navigateInternal('Cast', {
                  details,
                  configuration,
                  backgroundUri,
                })
              }>
              Full Cast
            </PrimaryButton>
          </View>
        ),
      },
    ];

    const pageContent =
      !loading && posterSize ? (
        <React.Fragment>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{alignSelf: 'flex-end', padding: 16, flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                {renderedPoster}
                <View
                  style={{
                    flex: 1,
                    flexBasis: 0,
                    flexGrow: 1,
                    paddingLeft: 16,
                    alignSelf: 'flex-end',
                  }}>
                  <Percentage size={45} value={movie.vote_average * 10}>
                    <Text style={styles.movieRatingText}>
                      {movie.vote_average}
                    </Text>
                  </Percentage>
                  <Text style={styles.movieTitle}>{movie.title}</Text>
                  {details.tagline ? (
                    <Text style={styles.movieTagline}>{details.tagline}</Text>
                  ) : (
                    <React.Fragment />
                  )}
                  <View style={[styles.row, {flexWrap: 'wrap'}]}>
                    {genres &&
                      genres.map(genre => <Badge key={genre}>{genre}</Badge>)}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{flex: 1, position: 'relative'}}
            onLayout={this.setLayout('tabViewport', ['width', 'height'])}>
            <TabBar
              tabs={tabs.map(tab => tab.title)}
              onTabChange={index => this.startTabAnimation(index)}
            />
            <TabContent
              viewport={viewport}
              tabViewport={tabViewport}
              tabAnimation={tabAnimation}
              tabs={tabs}
              selectedIndex={selectedIndex}
              previousIndex={previousIndex}
            />
          </View>
        </React.Fragment>
      ) : (
        <LoadingOverlay />
      );

    return (
      <View
        style={styles.container}
        onLayout={this.setLayout('viewport', ['width', 'height'])}>
        {renderedBackground}
        {pageContent}
      </View>
    );
  }
}
