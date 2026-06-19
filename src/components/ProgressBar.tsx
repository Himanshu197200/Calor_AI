import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Colors, Radius } from '../theme/appTheme';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: total > 0 ? current / total : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [current, total]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={uiStyles.track}>
      <Animated.View style={[uiStyles.fill, { width }]} />
    </View>
  );
}

const uiStyles = StyleSheet.create({
  track: {
    height: 4,
    backgroundColor: Colors.progressBg,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.progressFill,
    borderRadius: Radius.full,
  },
});
