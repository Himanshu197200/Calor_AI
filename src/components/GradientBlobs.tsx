import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function GradientBlobs() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg height="100%" width="100%">
        <Defs>
          <RadialGradient id="blueGrad" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%">
            <Stop offset="0%" stopColor="rgba(15, 30, 50, 0.4)" stopOpacity="1" />
            <Stop offset="50%" stopColor="rgba(10, 25, 45, 0.2)" stopOpacity="1" />
            <Stop offset="100%" stopColor="rgba(10, 25, 45, 0)" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="greenGrad" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%">
            <Stop offset="0%" stopColor="rgba(10, 45, 20, 0.4)" stopOpacity="1" />
            <Stop offset="50%" stopColor="rgba(5, 30, 15, 0.2)" stopOpacity="1" />
            <Stop offset="100%" stopColor="rgba(5, 30, 15, 0)" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Blue Blob - Top Leftish */}
        <Circle 
          cx={SCREEN_WIDTH * 0.05} 
          cy={SCREEN_WIDTH * 0.4} 
          r={SCREEN_WIDTH * 0.3} 
          fill="url(#blueGrad)" 
        />

        {/* Green Blob - Bottom Rightish */}
        <Circle 
          cx={SCREEN_WIDTH * 0.95} 
          cy={SCREEN_HEIGHT - (SCREEN_WIDTH * 0.75)} 
          r={SCREEN_WIDTH * 0.7} 
          fill="url(#greenGrad)" 
        />
      </Svg>
    </View>
  );
}
