import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Food, SwipeDirection } from '../types/index';
import { Swipe, Typography } from '../theme/appTheme';
import { foodEmojiMap, getCardText } from '../data/foodParser';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 40, 430);
const CARD_HEIGHT = Math.min(SCREEN_HEIGHT * 0.58, 540);

export interface SwipeableItemRef {
  triggerSwipe: (direction: SwipeDirection) => void;
}

interface SwipeableItemProps {
  food: Food;
  onSwipe: (direction: SwipeDirection) => void;
  isTop: boolean;
}

const SwipeableItem = forwardRef<SwipeableItemRef, SwipeableItemProps>(({ food, onSwipe, isTop }, ref) => {
  const cardCoordinates = useRef(new Animated.ValueXY()).current;

  const rotationAngle = cardCoordinates.x.interpolate({
    inputRange: [-200, 200],
    outputRange: ['-25deg', '25deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = cardCoordinates.x.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const dislikeOpacity = cardCoordinates.x.interpolate({
    inputRange: [-80, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const superlikeOpacity = cardCoordinates.y.interpolate({
    inputRange: [-80, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const unsureOpacity = cardCoordinates.y.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const executeFlyaway = (direction: SwipeDirection) => {
    const targetX =
      direction === 'like' ? 500 :
      direction === 'dislike' ? -500 : 0;
    const targetY =
      direction === 'superlike' ? -500 :
      direction === 'unsure' ? 500 : 0;

    Animated.timing(cardCoordinates, {
      toValue: { x: targetX, y: targetY },
      duration: 300,
      useNativeDriver: false,
    }).start(() => onSwipe(direction));
  };

  useImperativeHandle(ref, () => ({ triggerSwipe: executeFlyaway }));

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onMoveShouldSetPanResponder: () => isTop,
      onPanResponderMove: (_, g) => {
        cardCoordinates.setValue({ x: g.dx, y: g.dy });
      },
      onPanResponderRelease: (_, g) => {
        const THRESHOLD = 120;
        const VELOCITY = 0.5;

        const exceedsXThreshold = Math.abs(g.dx) > THRESHOLD || Math.abs(g.vx) > VELOCITY;
        const exceedsYThreshold = Math.abs(g.dy) > THRESHOLD || Math.abs(g.vy) > VELOCITY;

        if (exceedsXThreshold && Math.abs(g.dx) >= Math.abs(g.dy)) {
          executeFlyaway(g.dx > 0 ? 'like' : 'dislike');
        } else if (exceedsYThreshold && Math.abs(g.dy) > Math.abs(g.dx)) {
          executeFlyaway(g.dy < 0 ? 'superlike' : 'unsure');
        } else {
          Animated.spring(cardCoordinates, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            stiffness: 290,
          }).start();
        }
      },
    })
  ).current;

  const cardContent = (
    <View style={uiStyles.contentContainer}>
      <Animated.View style={[uiStyles.badgeContainer, uiStyles.likeBadge, { opacity: likeOpacity }]}>
        <View style={[uiStyles.badge, { backgroundColor: '#4BD883' }]}>
          <Text style={uiStyles.badgeText}>Yes</Text>
        </View>
      </Animated.View>

      <Animated.View style={[uiStyles.badgeContainer, uiStyles.dislikeBadge, { opacity: dislikeOpacity }]}>
        <View style={[uiStyles.badge, { backgroundColor: '#F95341' }]}>
          <Text style={uiStyles.badgeText}>No</Text>
        </View>
      </Animated.View>

      <Animated.View style={[uiStyles.badgeContainer, uiStyles.superlikeBadge, { opacity: superlikeOpacity }]}>
        <LinearGradient colors={['#7843FF', '#4CC6FF']} style={uiStyles.badge}>
          <Text style={uiStyles.badgeText}>Superlike 🌟</Text>
        </LinearGradient>
      </Animated.View>

      <Animated.View style={[uiStyles.badgeContainer, uiStyles.unsureBadge, { opacity: unsureOpacity }]}>
        <View style={[uiStyles.badge, { backgroundColor: '#BFBFBF' }]}>
          <Text style={uiStyles.badgeText}>Unsure</Text>
        </View>
      </Animated.View>

      <View style={uiStyles.foodContent}>
        <Text style={uiStyles.emoji}>{foodEmojiMap[food.id] ?? '🍽️'}</Text>
        <Text style={uiStyles.label}>{getCardText(food.name)}</Text>
      </View>
    </View>
  );

  return (
    <Animated.View
      style={[
        uiStyles.card,
        { transform: [...cardCoordinates.getTranslateTransform(), { rotate: rotationAngle }] },
      ]}
      {...panResponder.panHandlers}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.5)', 'transparent', 'transparent', 'rgba(255,255,255,0.5)']}
        locations={[0, 0.35, 0.65, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={uiStyles.borderGradient}
      >
        <View style={uiStyles.cardInnerContainer}>
          <LinearGradient
            colors={['#18181A', '#0A0A0A']}
            start={{ x: 0.2, y: 1 }}
            end={{ x: 0.8, y: 0 }}
            style={uiStyles.blurCard}
          >
            {cardContent}
          </LinearGradient>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

export default SwipeableItem;

const uiStyles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: 'absolute',
    alignSelf: 'center',
  },
  borderGradient: {
    padding: 1, // 1px shiny glass border
    borderRadius: 28,
    width: '100%',
    height: '100%',
  },
  cardInnerContainer: {
    flex: 1,
    borderRadius: 27, // 1px smaller to fit exactly inside border
    overflow: 'hidden',
  },
  blurCard: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  foodContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  emoji: {
    fontSize: 80,
    lineHeight: 85,
  },
  label: {
    fontFamily: Typography.fontFamily,
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.56,
    paddingHorizontal: 24,
  },
  badgeContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  badge: {
    paddingVertical: 8.57,
    paddingHorizontal: 21.43,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeBadge: { 
    top: 76, 
    right: 20, 
    transform: [{ rotate: '16deg' }] 
  },
  dislikeBadge: { 
    top: 67, 
    left: 20, 
    transform: [{ rotate: '-16deg' }] 
  },
  superlikeBadge: { 
    top: 24, 
    alignSelf: 'center', 
    left: '50%',
    marginLeft: -80, // Approximate centering
  },
  unsureBadge: { 
    bottom: 20, 
    alignSelf: 'center', 
    left: '50%',
    marginLeft: -50,
  },
  badgeText: {
    fontFamily: Typography.fontFamily,
    color: '#000000',
    fontWeight: '700',
    fontSize: 16,
  },
});
