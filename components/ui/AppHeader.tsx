import React from 'react';
import { View, Text, Image, StyleSheet, Platform, StatusBar } from 'react-native';
import LanguageSelector from './LanguageSelector';

interface AppHeaderProps {
  title: string;
}

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;
const HEADER_CONTENT_HEIGHT = 56;
const SIDE_MIN_WIDTH = 64; // Increased for language selector

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  return (
    <View style={[styles.container, { paddingTop: STATUSBAR_HEIGHT, minHeight: STATUSBAR_HEIGHT + HEADER_CONTENT_HEIGHT }]}>
      <View style={styles.side}>
        <Image source={require('@/assets/mask.png')} style={styles.mask} resizeMode="contain" />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
      </View>
      <View style={styles.side}>
        <LanguageSelector containerStyle={styles.languageSelector} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F4EA',
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#DED9E2',
  },
  side: {
    minWidth: SIDE_MIN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  mask: {
    width: 36,
    height: 36,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
    height: HEADER_CONTENT_HEIGHT,
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 12,
    lineHeight: 28,
  },
  languageSelector: {
    minWidth: 48,
    alignSelf: 'center',
  },
});

export default AppHeader; 