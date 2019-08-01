import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import styles from './styles'

export default class CastMember extends Component {
  render () {
    const { cast, imageBase, style } = this.props
    const imageUri = `${imageBase}${cast.profile_path}`
    return (
      <View key={cast.cast_id} style={[styles.castMember, style]}>
        <Image
          resizeMode='cover'
          source={{ uri: imageUri }}
          style={styles.castMemberImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.castMemberName}>
            {cast.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode='tail' style={styles.castMemberCharacter}>
            as {cast.character}
          </Text>
        </View>
      </View>
    )
  }
}
