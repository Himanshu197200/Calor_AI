import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DeckManager from "../components/DeckManager";
import ProgressBar from "../components/ProgressBar";
import CircularButton from "../components/CircularButton";
import GradientBlobs from "../components/GradientBlobs";
import { SwipeableItemRef } from "../components/SwipeableItem";
import CrossIcon from "../../assets/icons/cross.svg";
import StarIcon from "../../assets/icons/star.svg";
import QuestionIcon from "../../assets/icons/question.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import { Colors, Spacing, Typography } from "../theme/appTheme";
import { RootStackParamList, SwipeDirection, SwipeResult } from '../types/index';
import { foods, globalResults } from '../data/foodParser';

type NavProp = NativeStackNavigationProp<RootStackParamList, "Swipe">;

const SwipeScreen = () => {
  const navigation = useNavigation<NavProp>();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [results, setResults] = useState<SwipeResult[]>([]);
  const topCardRef = useRef<SwipeableItemRef | null>(null);
  const isStackEmpty = activeItemIndex >= foods.length;

  const processAction = (direction: SwipeDirection) => {
    const food = foods[activeItemIndex];
    const newResults = [...results, { food, direction }];
    const nextIndex = activeItemIndex + 1;

    setResults(newResults);
    setActiveItemIndex(nextIndex);

    Haptics.impactAsync(
      direction === "like" || direction === "superlike"
        ? Haptics.ImpactFeedbackStyle.Medium
        : Haptics.ImpactFeedbackStyle.Light,
    );

    if (nextIndex >= foods.length) {
      setTimeout(() => {
        // Clear globalResults and push new ones so we mutate it correctly
        globalResults.length = 0;
        globalResults.push(...newResults);
        navigation.navigate("Results", { results: newResults });
      }, 500);
    }
  };

  const invokeSwipeAction = (direction: SwipeDirection) => {
    if (!isStackEmpty) topCardRef.current?.triggerSwipe(direction);
  };

  return (
    <LinearGradient
      colors={[Colors.gradientTop, Colors.gradientBottom]}
      style={uiStyles.root}
    >
      <GradientBlobs />
      <SafeAreaView style={uiStyles.safe}>
        <View style={uiStyles.progressContainer}>
          <ProgressBar current={activeItemIndex} total={foods.length} />
        </View>

        <View style={uiStyles.cardArea}>
          {isStackEmpty ? (
            <View style={uiStyles.doneState}>
              <ActivityIndicator color={Colors.accent} size="large" />
              <Text style={uiStyles.doneText}>Building your profile...</Text>
            </View>
          ) : (
            <DeckManager
              foods={foods}
              currentIndex={activeItemIndex}
              onSwipe={processAction}
              topCardRef={topCardRef}
            />
          )}
        </View>

        <View style={uiStyles.actions}>
          <View style={uiStyles.actionItem}>
            <CircularButton
              Icon={CrossIcon}
              iconColor="#FFFFFF"
              bgColor="#fa0202"
              shadowColor="#fa0202"
              size="lg"
              onPress={() => invokeSwipeAction("dislike")}
            />
            <Text style={[uiStyles.actionLabel]}>Swipe Left</Text>
          </View>

          <View style={uiStyles.actionItem}>
            <CircularButton
              Icon={QuestionIcon}
              iconColor="#FFFFFF"
              bgColor="#94A3B8"
              shadowColor="rgba(255,255,255,0.4)"
              size="sm"
              onPress={() => invokeSwipeAction("unsure")}
            />
            <Text style={[uiStyles.actionLabel]}>Not Sure</Text>
          </View>

          <View style={uiStyles.actionItem}>
            <CircularButton
              Icon={StarIcon}
              iconColor="#00E5FF"
              bgColor={["#7C66FF", "#4FA5FF"]}
              shadowColor="#4FA5FF"
              size="sm"
              onPress={() => invokeSwipeAction("superlike")}
            />
            <Text style={[uiStyles.actionLabel]}>Super Like</Text>
          </View>

          <View style={uiStyles.actionItem}>
            <CircularButton
              Icon={HeartIcon}
              iconColor="#FFFFFF"
              bgColor="#0bd400"
              shadowColor="#0bd400"
              size="lg"
              onPress={() => invokeSwipeAction("like")}
            />
            <Text style={[uiStyles.actionLabel]}>Swipe Right</Text>
          </View>
        </View>
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
  progressContainer: {
    marginBottom: Spacing.lg,
  },
  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  doneState: {
    alignItems: "center",
    gap: Spacing.md,
  },
  doneText: {
    color: Colors.textSecondary,
    fontSize: Typography.base,
    fontWeight: Typography.medium,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  actionItem: {
    alignItems: "center",
    gap: Spacing.md,
  },
  actionLabel: {
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    fontSize: 11.61,
    lineHeight: 13.93,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
  },
});

export default SwipeScreen;
