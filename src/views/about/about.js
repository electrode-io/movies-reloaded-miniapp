import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {name as appName} from '../../../app.json';
import {contributors, version} from '../../../package.json';
import {Component} from 'ern-navigation';
import styles from './styles';
import exitIcon from '../../icons/exit.png';
import ElectrodeLogo from '../../images/electrode-logo.png';
import TMDBLogo from '../../images/tmdb.png';

const icons = {
  exit: Image.resolveAssetSource(exitIcon).uri,
};

const Section = ({title, header, children}) => (
  <View style={styles.section}>
    <Text style={header ? styles.header : styles.subHeader}>{title}</Text>
    {children}
  </View>
);

const SubSection = ({children}) => (
  <View style={styles.subsection}>{children}</View>
);

const Question = ({children}) => (
  <Text style={styles.question}>{children}</Text>
);

const Paragraph = ({children}) => <Text style={styles.text}>{children}</Text>;

export default class About extends Component {
  static displayName = 'About';
  static navigationOptions = {
    title: `About ${appName}`,
    buttons: [
      {
        icon: icons.exit,
        id: 'exit',
        location: 'right',
        accessibilityLabel: `Exit ${appName}`,
      },
    ],
  };

  onNavButtonPress(buttonId) {
    switch (buttonId) {
      case 'exit':
        this.finish();
        break;
      default:
        console.warn(
          `Screen '${About.getRegisteredRoute()}' received unmapped button id '${buttonId}'`,
        );
        break;
    }
  }

  render() {
    const Highlight = ({children}) => (
      <Text style={styles.highlight}>{children}</Text>
    );
    const Code = ({children}) => <Text style={styles.code}>{children}</Text>;

    return (
      <View style={styles.container}>
        <Image
          source={ElectrodeLogo}
          style={styles.background}
          resizeMode="contain"
        />
        <ScrollView style={styles.contentContainer}>
          <View style={styles.content}>
            <Section header title={`${appName} v${version}`} />
            <Section title="Who...">
              <SubSection>
                <Question>Contributed to this project?</Question>
                <Paragraph>{contributors.join(', ')}</Paragraph>
              </SubSection>
              <SubSection>
                <Question>Should look at this project?</Question>
                <Paragraph>
                  Anyone who is interested in using{' '}
                  <Highlight>Electrode Native</Highlight>.
                </Paragraph>
              </SubSection>
            </Section>
            <Section title="Where...">
              <SubSection>
                <Question>Was this made?</Question>
                <Paragraph>This was made with 💙 at WalmartLabs.</Paragraph>
              </SubSection>
            </Section>
            <Section title="Why...">
              <SubSection>
                <Question>Was this project created?</Question>
                <Paragraph>
                  Integration with native is notoriously difficult, especially
                  if you don't have experience with Java, Objective-C, and/or
                  Swift. We wanted to make navigation as painless as possible
                  while using the native stack and still allowing native
                  developers full control... and to have a little fun while
                  doing it.
                </Paragraph>
              </SubSection>
            </Section>
            <Section title="What...">
              <SubSection>
                <Question>Does Electrode Native Navigation do for me?</Question>
                <Paragraph>
                  <Highlight>Electrode Native Navigation</Highlight> allows an{' '}
                  <Highlight>Electrode Native</Highlight> miniapp to quickly and
                  easily set up inter- and intra-miniapp navigation for any
                  number of miniapps. After setting up a miniapp's components
                  with the <Code>AppNavigator.RegisterAll()</Code> method, all
                  of your screens will automatically inherit appropriate
                  navigation bar behavior, including navigation bar button event
                  listening and dispatching.
                </Paragraph>
              </SubSection>
              <SubSection>
                <Question>Does this app demonstrate?</Question>
                <Paragraph>
                  This miniapp outlines the different mechanisms that are
                  provided to you by our{' '}
                  <Highlight>Electrode Native Navigation</Highlight>.
                </Paragraph>
              </SubSection>
              <SubSection>
                <Question>
                  Is provided by <Code>Component</Code>?
                </Question>
                <Paragraph>
                  <Code>&lt;Component&gt;.back()</Code> allows you to go back
                  one screen. If on the first screen of your miniapp, it will
                  exit the miniapp.
                </Paragraph>
                <Paragraph>
                  <Code>&lt;Component&gt;.backTo()</Code> allows you to go back
                  to any screen in your backstack.
                </Paragraph>
                <Paragraph>
                  <Code>&lt;Component&gt;.finish()</Code> allows you to finish
                  your current flow.
                </Paragraph>
                <Paragraph>
                  <Code>&lt;Component&gt;.navigate()</Code> allows you to
                  navigate anywhere in the application.
                </Paragraph>
                <Paragraph>
                  <Code>&lt;Component&gt;.navigateInternal()</Code> allows you
                  to navigate anywhere in the current miniapp.
                </Paragraph>
              </SubSection>
              <SubSection>
                <Question>
                  Is provided by <Code>AppNavigator</Code>?
                </Question>
                <Paragraph>
                  <Code>&lt;AppNavigator&gt;.registerAll()</Code> registers all
                  screens which were defined when constructing the AppNavigator
                  object.
                </Paragraph>
              </SubSection>
            </Section>
            <Section title="Acknowledgements">
              <SubSection>
                <Paragraph>
                  This product uses the TMDb API but is not endorsed or
                  certified by TMDb.
                </Paragraph>
                <Image
                  source={TMDBLogo}
                  style={styles.tmdb}
                  resizeMode="contain"
                />
              </SubSection>
            </Section>
          </View>
        </ScrollView>
      </View>
    );
  }
}
