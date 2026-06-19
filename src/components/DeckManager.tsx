import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Food, SwipeDirection } from '../types/index';
import SwipeableItem, { SwipeableItemRef } from './SwipeableItem';
import { Spacing, Swipe } from '../theme/appTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - Spacing.lg * 2;
const CARD_HEIGHT = CARD_WIDTH * 1.35;

interface DeckManagerProps {
  foods: Food[];
  currentIndex: number;
  onSwipe: (direction: SwipeDirection) => void;
  topCardRef: React.RefObject<SwipeableItemRef | null>;
}

export default function DeckManager({ foods, currentIndex, onSwipe, topCardRef }: DeckManagerProps) {
  const visibleCards = foods
    .slice(currentIndex, currentIndex + Swipe.stackSize)
    .reverse();

  return (
    <View style={uiStyles.stack}>
      {visibleCards.map((food, reversedIndex) => {
        const stackIndex = visibleCards.length - 1 - reversedIndex;
        const isTop = stackIndex === 0;
        const offsetY = stackIndex * 10;
        const scale = 1 - stackIndex * 0.04;
        const opacity = 1 - stackIndex * 0.15;

        return (
          <View
            key={`${food.id}-${currentIndex}`}
            style={[
              uiStyles.cardWrapper,
              {
                transform: [{ translateY: offsetY }, { scale }],
                opacity: opacity,
                zIndex: Swipe.stackSize - stackIndex,
                pointerEvents: isTop ? 'auto' : 'none',
              },
            ]}
          >
            <SwipeableItem
              ref={isTop ? topCardRef : undefined}
              food={food}
              onSwipe={onSwipe}
              isTop={isTop}
            />
          </View>
        );
      })}
    </View>
  );
}

const uiStyles = StyleSheet.create({
  stack: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
