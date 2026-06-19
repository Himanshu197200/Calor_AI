import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import FrostedCard from '../components/FrostedCard';
import GradientBlobs from '../components/GradientBlobs';
import NavigationBar from '../components/NavigationBar';
import { Colors, Spacing, Typography, Radius } from '../theme/appTheme';
import { RootStackParamList } from '../types/index';
import { globalResults } from '../data/foodParser';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'FAQ'>;

export default function FAQScreen() {
  const navigation = useNavigation<NavProp>();

  const handleTabPress = (tab: 'Start' | 'FAQ' | 'TasteProfile' | 'Search') => {
    if (tab === 'Start') navigation.navigate('Intro');
    if (tab === 'FAQ') navigation.navigate('FAQ');
    if (tab === 'TasteProfile') navigation.navigate('Results', { results: globalResults });
    if (tab === 'Search') navigation.navigate('Search');
  };

  return (
    <LinearGradient
      colors={[Colors.gradientTop, Colors.gradientBottom]}
      style={uiStyles.root}
    >
      <GradientBlobs />
      <SafeAreaView style={uiStyles.safe}>
        <View style={uiStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.75}>
            <LinearGradient
              colors={[
                "rgba(255,255,255,0.5)",
                "transparent",
                "transparent",
                "rgba(255,255,255,0.5)",
              ]}
              locations={[0, 0.35, 0.65, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={uiStyles.backBtnGradient}
            >
              <LinearGradient
                colors={['#18181A', '#0A0A0A']}
                start={{ x: 0.2, y: 1 }}
                end={{ x: 0.8, y: 0 }}
                style={uiStyles.backBtnInner}
              >
                <Text style={uiStyles.backIcon}>‹</Text>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={uiStyles.heading} numberOfLines={1} adjustsFontSizeToFit>
            Frequently Asked
          </Text>
        </View>

        <View style={uiStyles.cardWrapper}>
          <FrostedCard style={uiStyles.card}>
            <View style={uiStyles.cardInner}>
              <Text style={uiStyles.mainEmoji}>🤔</Text>
              <Text style={uiStyles.cardTitle}>Got Questions?</Text>
              <Text style={uiStyles.cardBody}>
                We're here to help you understand how your Taste Profile is built.
              </Text>
              <Text style={uiStyles.cardSubBody}>
                This is a dummy FAQ screen to demonstrate the bottom navigation.
              </Text>
            </View>
          </FrostedCard>
        </View>

        <NavigationBar activeTab="FAQ" onTabPress={handleTabPress} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const uiStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xs,
    gap: Spacing.md,
  },
  backBtnGradient: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  backBtnInner: {
    flex: 1,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backIcon: {
    fontFamily: Typography.fontFamily,
    fontSize: 36,
    color: Colors.textPrimary,
    lineHeight: 28,
    marginTop: Platform.OS === 'ios' ? 8 : -5,
    marginLeft: -2,
  },
  heading: {
    fontFamily: Typography.fontFamily,
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  cardWrapper: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  cardInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  mainEmoji: {
    fontSize: 72,
    lineHeight: 80,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: Typography.fontFamily,
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  cardBody: {
    fontFamily: Typography.fontFamily,
    fontSize: 16,
    color: 'rgba(217, 217, 217, 1)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
    marginBottom: 20,
  },
  cardSubBody: {
    fontFamily: Typography.fontFamily,
    fontSize: 14,
    color: 'rgba(217, 217, 217, 1)',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
    marginBottom: 32,
  },
});
