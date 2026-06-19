import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

interface CircularButtonProps {
  Icon: React.FC<SvgProps>;
  iconColor?: string;
  iconSize?: number;
  bgColor: string | string[]; // Can be an array for gradient backgrounds (Superlike)
  size?: 'sm' | 'lg';
  shadowColor?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function CircularButton({
  Icon,
  iconColor = '#FFFFFF',
  iconSize,
  bgColor,
  size = 'sm',
  shadowColor = '#000',
  onPress,
  style,
}: CircularButtonProps) {
  const dimension = size === 'lg' ? 72 : 48;
  const resolvedIconSize = iconSize ?? (size === 'lg' ? 28 : 24);
  const isGradientBg = Array.isArray(bgColor);

  const InnerContent = () => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        uiStyles.innerBtn,
        !isGradientBg && { backgroundColor: bgColor as string },
      ]}
    >
      <Icon width={resolvedIconSize} height={resolvedIconSize} color={iconColor} />
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        uiStyles.shadowContainer,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          shadowColor: shadowColor,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={['rgba(255,255,255,1)', 'transparent', 'transparent', 'rgba(255,255,255,1)']}
        locations={[0, 0.35, 0.65, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[uiStyles.borderGradient, { borderRadius: dimension / 2 }]}
      >
        {isGradientBg ? (
          <LinearGradient
            colors={bgColor as unknown as readonly [string, string, ...string[]]}
            style={[uiStyles.innerGradient, { borderRadius: dimension / 2 }]}
          >
            <InnerContent />
          </LinearGradient>
        ) : (
          <InnerContent />
        )}
      </LinearGradient>
    </View>
  );
}

const uiStyles = StyleSheet.create({
  shadowContainer: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 24,
    elevation: 12,
  },
  borderGradient: {
    flex: 1,
    padding: 1, // 1px border thickness
  },
  innerGradient: {
    flex: 1,
  },
  innerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
});
