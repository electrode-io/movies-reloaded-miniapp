import React, { Component } from 'react'
import { View, Animated, ScrollView } from 'react-native'
import styles from './styles'

export default class TabContent extends Component {
  render () {
    const {
      viewport,
      tabViewport,
      tabAnimation,
      tabs,
      selectedIndex,
      previousIndex
    } = this.props

    const overlayAnimator = (index) => {
      if (selectedIndex === index) {
        if (selectedIndex === previousIndex) {
          return 0
        }
        return previousIndex > selectedIndex
          ? Animated.multiply(-1, Animated.subtract(selectedIndex, tabAnimation))
          : Animated.multiply(-1, Animated.subtract(tabAnimation, selectedIndex))
      }
      if (previousIndex === index) {
        return previousIndex > selectedIndex
          ? Animated.subtract(previousIndex, tabAnimation)
          : Animated.subtract(tabAnimation, previousIndex)
      }
      return 1
    }

    const overlay = (index) => tabs[index].fixedContent ? (
      <Animated.View
        style={{
          flex: 1,
          position: 'absolute',
          left: Animated.multiply(tabAnimation, viewport.width),
          width: viewport.width,
          top: Animated.multiply(tabViewport.height, overlayAnimator(index)),
          height: '100%'
        }}
      >
        {tabs[index].fixedContent}
      </Animated.View>

    ) : <React.Fragment />

    return viewport && tabViewport ? (
      <View style={[styles.tabContent, { flex: 1, position: 'relative' }]}>
        <Animated.View
          style={[
            styles.tabBarHighlight,
            {
              left: Animated.multiply(tabAnimation, viewport.width / tabs.length),
              width: `${(100 / tabs.length)}%`
            }
          ]}
        />
        <Animated.View
          style={{
            top: 0,
            position: 'relative',
            left: Animated.multiply(tabAnimation, -(viewport.width)),
            height: '100%'
          }}
        >
          {tabs.map((tab, i) => (
            <React.Fragment key={`Tab_${i}`}>
              <View
                width={viewport.width}
                style={[styles.tabBarPage, { left: i * viewport.width }]}
              >
                <ScrollView style={{ flex: 1 }}>
                  <View style={[styles.tabBarPageContent, tab.fixedContent ? { paddingBottom: 70 } : {}]}>
                    {tab.content}
                  </View>
                </ScrollView>
              </View>
              {overlay(i)}
            </React.Fragment>
          ))}
        </Animated.View>
      </View>
    ) : <React.Fragment />
  }
}
