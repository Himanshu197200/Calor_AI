import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import FrostedCard from "../components/FrostedCard";
import NavigationBar from "../components/NavigationBar";
import GradientBlobs from "../components/GradientBlobs";
import { Colors, Radius, Spacing, Typography } from "../theme/appTheme";
import { Food, RootStackParamList, SwipeResult, TastePersona, Cuisine } from "../types";
import { globalResults, foodEmojiMap, cuisines } from "../data/foodParser";

import HeartIcon from "../../assets/icons/heart.svg";
import StarIcon from "../../assets/icons/star.svg";
import QuestionIcon from "../../assets/icons/question.svg";
import CrossIcon from "../../assets/icons/cross.svg";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH - Spacing.lg * 2;

type ResultsRoute = RouteProp<RootStackParamList, "Results">;

function calculateDiversity(results: SwipeResult[]) {
  const favorable = results.filter(
    (r) => r.direction === "like" || r.direction === "superlike",
  );
  const frequencyMap: Record<string, number> = {};
  favorable.forEach(({ food }) => {
    food.tags.forEach((tag) => {
      frequencyMap[tag] = (frequencyMap[tag] || 0) + 1;
    });
  });

  const uniqueTags = Object.keys(frequencyMap).length;
  if (uniqueTags >= 8) {
    return { label: "Flavor Explorer", subtext: "You love trying a wide variety of cuisines!", emoji: "🧭" };
  } else if (uniqueTags >= 4) {
    return { label: "Balanced Eater", subtext: "You have a solid mix of favorites.", emoji: "⚖️" };
  } else {
    return { label: "Consistent Craver", subtext: "You know exactly what you like!", emoji: "🎯" };
  }
}

function generateUserTags(results: SwipeResult[]): TastePersona[] {
  const favorable = results.filter(
    (r) => r.direction === "like" || r.direction === "superlike",
  );
  const frequencyMap: Record<string, number> = {};
  favorable.forEach(({ food }) => {
    food.tags.forEach((tag) => {
      frequencyMap[tag] = (frequencyMap[tag] || 0) + 1;
    });
  });

  const personas: TastePersona[] = [];
  if ((frequencyMap["protein"] || 0) + (frequencyMap["red-meat"] || 0) >= 2)
    personas.push({ emoji: "🥩", label: "Carnivore" });
  if ((frequencyMap["italian"] || 0) >= 1)
    personas.push({ emoji: "🇮🇹", label: "Italian Food" });
  if ((frequencyMap["fruit"] || 0) + (frequencyMap["healthy"] || 0) >= 3)
    personas.push({ emoji: "🍇", label: "Fruit-Lover" });
  if ((frequencyMap["japanese"] || 0) >= 1)
    personas.push({ emoji: "🇯🇵", label: "Japanese Food" });
  if ((frequencyMap["vegan"] || 0) + (frequencyMap["plant-based"] || 0) >= 1)
    personas.push({ emoji: "🌱", label: "Plant-Based" });
  if ((frequencyMap["comfort"] || 0) >= 2)
    personas.push({ emoji: "🍔", label: "Comfort Eater" });
  if ((frequencyMap["mexican"] || 0) >= 1)
    personas.push({ emoji: "🌮", label: "Mexican Food" });
  if ((frequencyMap["american"] || 0) >= 1)
    personas.push({ emoji: "🇺🇸", label: "American" });
  if ((frequencyMap["mediterranean"] || 0) >= 1)
    personas.push({ emoji: "🫒", label: "Mediterranean" });

  if (personas.length === 0) personas.push({ emoji: "🍽️", label: "Foodie" });

  return personas.slice(0, 3);
}

function extractLifestyleHabits(results: SwipeResult[]): string[] {
  const favorable = results.filter(
    (r) => r.direction === "like" || r.direction === "superlike",
  );
  const frequencyMap: Record<string, number> = {};
  favorable.forEach(({ food }) => {
    food.tags.forEach((tag) => {
      frequencyMap[tag] = (frequencyMap[tag] || 0) + 1;
    });
  });

  const traits: string[] = [];
  if ((frequencyMap["healthy"] || 0) >= 2) traits.push("Active");
  if ((frequencyMap["protein"] || 0) >= 2) traits.push("Gym-Goer");
  if ((frequencyMap["vegetable"] || 0) + (frequencyMap["green"] || 0) >= 2)
    traits.push("Walks a lot");
  if ((frequencyMap["omega-3"] || 0) + (frequencyMap["fiber"] || 0) >= 1)
    traits.push("PCOS & GI Diet");
  if ((frequencyMap["breakfast"] || 0) >= 2)
    traits.push("Early Bird");
  if ((frequencyMap["indulgent"] || 0) + (frequencyMap["sweet"] || 0) >= 2)
    traits.push("Treats Themselves");
  if ((frequencyMap["vegan"] || 0) + (frequencyMap["plant-based"] || 0) >= 1)
    traits.push("Eco-Friendly Choices");
  if ((frequencyMap["seafood"] || 0) + (frequencyMap["fish"] || 0) >= 2)
    traits.push("Pescatarian Leaning");
  
  if (traits.length === 0) traits.push("Adventurous Eater");
  
  return traits.slice(0, 4);
}

const ResultsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<ResultsRoute>();
  const { results = globalResults } = route.params || {};

  const handleTabPress = (tab: "Start" | "FAQ" | "TasteProfile" | "Search") => {
    if (tab === "Start") navigation.navigate("Intro");
    if (tab === "FAQ") navigation.navigate("FAQ");
    if (tab === "TasteProfile") navigation.navigate("Results", { results: globalResults });
    if (tab === "Search") navigation.navigate("Search");
  };

  const liked = results.filter((r) => r.direction === "like").map((r) => r.food);
  const superliked = results.filter((r) => r.direction === "superlike").map((r) => r.food);
  const disliked = results.filter((r) => r.direction === "dislike").map((r) => r.food);
  const unsure = results.filter((r) => r.direction === "unsure").map((r) => r.food);
  const personas = generateUserTags(results);
  const lifestyleTraits = extractLifestyleHabits(results);
  const diversity = calculateDiversity(results);

  const favoriteCuisines = React.useMemo(() => {
    const favorable = results.filter(r => r.direction === "like" || r.direction === "superlike");
    const frequencyMap: Record<string, number> = {};
    favorable.forEach(({ food }) => {
      food.tags.forEach((tag) => {
        frequencyMap[tag] = (frequencyMap[tag] || 0) + 1;
      });
    });

    return cuisines.filter(c => {
      const tagName = c.name.toLowerCase();
      return (frequencyMap[tagName] || 0) >= 1; 
    });
  }, [results]);

  const categories = [
    {
      id: "liked",
      emoji: "❤️",
      title: "Foods You Love",
      subtitle: "We'll Recommend These",
      data: liked,
      isCuisine: false,
    },
    {
      id: "disliked",
      emoji: "🤷‍♂️",
      title: "Foods You Hate",
      subtitle: "These will never be on the menu",
      data: disliked,
      isCuisine: false,
    },
    {
      id: "superliked",
      emoji: "⭐",
      title: "Your Superlikes",
      subtitle: "Foods You Absolutely Love",
      data: superliked,
      isCuisine: false,
    },
    {
      id: "unsure",
      emoji: "🤔",
      title: "Unsure about",
      subtitle: "Foods you skipped",
      data: unsure,
      isCuisine: false,
    },
    {
      id: "cuisines",
      emoji: "👨‍🍳",
      title: "Your Favorite Cuisines",
      subtitle: "Flavors you love, all in one place",
      data: favoriteCuisines,
      isCuisine: true,
    },
  ].filter((c) => c.data.length > 0);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [heights, setHeights] = useState<number[]>([]);

  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);
  const highlightScrollX = React.useRef(new Animated.Value(0)).current;

  const handleHighlightScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveHighlightIndex(Math.round(index));
  };

  const handleLayout = (index: number, event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeights(prev => {
      const newHeights = [...prev];
      if (Math.abs((newHeights[index] || 0) - height) > 1) {
        newHeights[index] = height;
        return newHeights;
      }
      return prev;
    });
  };

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveCategoryIndex(Math.round(index));
  };

  let currentHeight: any = undefined;
  if (heights.length === categories.length && heights.every(h => h > 0)) {
    if (categories.length > 1) {
      currentHeight = scrollX.interpolate({
        inputRange: categories.map((_, i) => i * CARD_WIDTH),
        outputRange: heights,
        extrapolate: 'clamp',
      });
    } else {
      currentHeight = heights[0];
    }
  }

  return (
    <LinearGradient
      colors={[Colors.gradientTop, Colors.gradientBottom]}
      style={uiStyles.root}
    >
      <GradientBlobs />
      <SafeAreaView style={uiStyles.safe}>
        <ScrollView
          style={uiStyles.scroll}
          contentContainerStyle={uiStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={uiStyles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.75}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.5)", "transparent", "transparent", "rgba(255,255,255,0.5)"]}
                locations={[0, 0.35, 0.65, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={uiStyles.backBtnGradient}
              >
                <LinearGradient
                  colors={["#18181A", "#0A0A0A"]}
                  start={{ x: 0.2, y: 1 }}
                  end={{ x: 0.8, y: 0 }}
                  style={uiStyles.backBtnInner}
                >
                  <Text style={uiStyles.backIcon}>‹</Text>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={uiStyles.heading}>Your Taste Profile</Text>
            <Text style={uiStyles.subheading}>
              Tailored to your unique needs. We'll use this for recommendations
              and meal plans.
            </Text>
          </View>

          <Text style={uiStyles.sectionLabel}>Key Highlights:</Text>

          <FrostedCard style={uiStyles.card}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: highlightScrollX } } }],
                { useNativeDriver: false, listener: handleHighlightScroll }
              )}
              scrollEventThrottle={16}
            >
              <View style={{ width: CARD_WIDTH }}>
                <View style={uiStyles.personaRow}>
                  {personas.map((p, i) => (
                    <React.Fragment key={p.label}>
                      <View style={uiStyles.personaItem}>
                        <Text style={uiStyles.personaEmoji}>{p.emoji}</Text>
                        <Text style={uiStyles.personaLabel} numberOfLines={1}>
                          {p.label}
                        </Text>
                      </View>
                      {i < personas.length - 1 && (
                        <View style={uiStyles.personaDivider} />
                      )}
                    </React.Fragment>
                  ))}
                </View>
              </View>

              <View style={{ width: CARD_WIDTH }}>
                <View style={uiStyles.diversityContainer}>
                  <Text style={uiStyles.diversityEmoji}>{diversity.emoji}</Text>
                  <View style={uiStyles.diversityTextContainer}>
                    <Text style={uiStyles.diversityTitle}>{diversity.label}</Text>
                    <Text style={uiStyles.diversitySubtext}>{diversity.subtext}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={uiStyles.personaDots}>
              <View style={[uiStyles.personaDot, activeHighlightIndex === 0 && uiStyles.personaDotActive]} />
              <View style={[uiStyles.personaDot, activeHighlightIndex === 1 && uiStyles.personaDotActive]} />
            </View>
          </FrostedCard>

          {lifestyleTraits.length > 0 && (
            <FrostedCard style={uiStyles.card}>
              <View style={uiStyles.cardSection}>
                <View style={uiStyles.cardHeader}>
                  <Text style={uiStyles.cardHeaderEmoji}>💪</Text>
                  <View>
                    <Text style={uiStyles.cardTitle}>Lifestyle & Goals</Text>
                    <Text style={uiStyles.cardSubtitle}>
                      We'll use this to tailor our advice & meal plan
                    </Text>
                  </View>
                </View>
                <View style={uiStyles.divider} />
                {lifestyleTraits.map((trait, i) => (
                  <React.Fragment key={trait}>
                    <View style={uiStyles.listRow}>
                      <View
                        style={[
                          uiStyles.checkIcon,
                          { backgroundColor: Colors.accentDark },
                        ]}
                      >
                        <Text style={uiStyles.checkText}>✓</Text>
                      </View>
                      <Text style={uiStyles.listItemText}>{trait}</Text>
                    </View>
                    {i < lifestyleTraits.length - 1 && (
                      <View style={uiStyles.divider} />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </FrostedCard>
          )}

          {categories.length > 0 && (
            <FrostedCard style={uiStyles.card}>
              <Animated.View style={{ height: currentHeight, overflow: 'hidden' }}>
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false, listener: handleScroll }
                  )}
                  scrollEventThrottle={16}
                >
                  {categories.map((cat, i) => {
                    return (
                      <View key={cat.title} style={{ width: CARD_WIDTH }}>
                        <View style={uiStyles.cardSection} onLayout={(e) => handleLayout(i, e)}>
                        <View style={uiStyles.cardHeader}>
                          <Text style={uiStyles.cardHeaderEmoji}>
                            {cat.emoji}
                          </Text>
                          <View>
                            <Text style={uiStyles.cardTitle}>{cat.title}</Text>
                            <Text style={uiStyles.cardSubtitle}>
                              {cat.subtitle}
                            </Text>
                          </View>
                        </View>
                        <View style={uiStyles.divider} />
                        {cat.data.map((item: any, index: number) => {
                          const isCuisine = cat.isCuisine;
                          const iconEmoji = isCuisine ? item.emoji : (foodEmojiMap[item.id] ?? "🍽️");
                          return (
                            <React.Fragment key={item.id}>
                              <View style={uiStyles.listRow}>
                                <View
                                  style={[
                                    uiStyles.iconCircle,
                                    { backgroundColor: "rgba(255,255,255,0.05)" },
                                  ]}
                                >
                                  <Text style={{ fontSize: 16 }}>
                                    {iconEmoji}
                                  </Text>
                                </View>
                                <Text style={uiStyles.listItemText}>
                                  {item.name}
                                </Text>
                              </View>
                              {index < cat.data.length - 1 && (
                                <View style={uiStyles.divider} />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
              </Animated.View>

              <View style={uiStyles.categoryDots}>
                {categories.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      uiStyles.personaDot,
                      activeCategoryIndex === i && uiStyles.personaDotActive,
                    ]}
                  />
                ))}
              </View>
            </FrostedCard>
          )}

          <View style={{ height: Spacing.xl }} />
        </ScrollView>

        <NavigationBar activeTab="TasteProfile" onTabPress={handleTabPress} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const uiStyles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: Spacing.lg },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  backBtnGradient: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    padding: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  backBtnInner: {
    flex: 1,
    borderRadius: Radius.full,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    fontSize: Typography["2xl"],
    fontWeight: Typography.extrabold,
    color: Colors.textPrimary,
  },
  subheading: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  card: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  cardSection: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  cardHeaderEmoji: { fontSize: 20 },
  cardTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginVertical: Spacing.xs,
  },
  personaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  personaItem: {
    alignItems: "center",
    gap: Spacing.sm,
    flex: 1,
  },
  personaEmoji: { fontSize: 32 },
  personaLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  personaDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  personaDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingBottom: Spacing.lg,
  },
  personaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  personaDotActive: {
    backgroundColor: "#FFFFFF",
  },
  diversityContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  diversityEmoji: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  diversityTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  diversityTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  diversitySubtext: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemText: {
    flex: 1,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  categoryDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingBottom: Spacing.lg,
  },
  checkIcon: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: Typography.bold,
  },
});

export default ResultsScreen;
