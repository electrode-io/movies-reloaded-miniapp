import React from 'react'
import { Component } from 'ern-navigation'
import { View, Image, ScrollView } from 'react-native'
import firstpage from '../../icons/firstpage.png'
import CastMember from '../shared/cast-member'
import AnimatedBackgroundImage from '../shared/animated-background-image'

import styles from './styles'
import { getCastImageSize } from '../../util'

const icons = {
  firstPage: Image.resolveAssetSource(firstpage).uri
}

export default class MovieDetails extends Component {
  static displayName = 'Movie Cast'
  static navigationOptions = {
    title: 'Movie Cast',
    buttons: [{
      icon: icons.firstPage,
      id: 'refresh',
      location: 'right',
      accessibilityLabel: 'Back to the Movie List'
    }]
  }

  static getDynamicTitle (jsonProps) {
    return jsonProps && jsonProps.details && `Cast of ${jsonProps.details.title}`
  }

  onNavButtonPress (buttonId) {
    switch (buttonId) {
      case 'refresh':
        this.backTo('Main')
        break
      default:
        console.warn(`Screen '${MovieDetails.getRegisteredRoute()}' received unmapped button id '${buttonId}'`)
        break
    }
  }

  render () {
    const { details, configuration, backgroundUri } = this.jsonProps
    const castList = configuration && details && details.credits ? (
      details.credits.cast.map((cast, i) =>
        <CastMember
          key={`${i}_${cast.id}`}
          cast={cast}
          imageBase={`${configuration.images.base_url}${getCastImageSize(configuration, 50)}`}
          style={!i && { marginTop: 0 }}
        />
      )
    ) : <React.Fragment />

    return (
      <View style={styles.container}>
        <AnimatedBackgroundImage uri={backgroundUri} opacity={0.5} />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            {castList}
          </View>
        </ScrollView>
      </View>
    )
  }
}
