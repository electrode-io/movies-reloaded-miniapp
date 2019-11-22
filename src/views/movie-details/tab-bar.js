import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';

const Tab = ({caption, index, selected, handleTabPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => handleTabPress(index)}
      style={selected ? styles.selectedTab : styles.tab}>
      <Text style={selected ? styles.selectedTabText : styles.tabText}>
        {caption}
      </Text>
    </TouchableOpacity>
  );
};

export default class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex || 0,
    };
    this.handleTabPress = this.handleTabPress.bind(this);
  }

  componentWillUpdate(newProps) {
    if (
      'selectedIndex' in newProps &&
      newProps.selectedIndex !== this.props.selectedIndex
    ) {
      this.setState({selectedIndex: newProps.selectedIndex});
    }
  }

  handleTabPress = selectedIndex => {
    const {tabs, onTabChange} = this.props;
    if (tabs && this.state.selectedIndex !== selectedIndex) {
      this.setState({selectedIndex}, () => {
        onTabChange(selectedIndex);
      });
    }
  };

  render() {
    const {selectedIndex} = this.state;

    const {tabs} = this.props;

    const renderedTabs = tabs.map((tabCaption, i) => (
      <Tab
        key={`Tab_${i}`}
        caption={tabCaption}
        index={i}
        selected={i === selectedIndex}
        handleTabPress={index => this.handleTabPress(index)}
      />
    ));

    return (
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>{renderedTabs}</View>
      </View>
    );
  }
}
