import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import FrostedCard from "../components/FrostedCard";
import NavigationBar from "../components/NavigationBar";
import { Colors, Spacing, Typography, Radius } from "../theme/appTheme";
import { RootStackParamList } from "../types/index";
import { foods, foodEmojiMap, globalResults } from "../data/foodParser";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Search">;

export default function SearchScreen() {
  const navigation = useNavigation<NavProp>();
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabPress = (tab: "Start" | "FAQ" | "TasteProfile" | "Search") => {
    if (tab === "Start") navigation.navigate("Intro");
    if (tab === "FAQ") navigation.navigate("FAQ");
    if (tab === "TasteProfile") navigation.navigate("Results", { results: globalResults });
    if (tab === "Search") navigation.navigate("Search");
  };

  const filteredFoods = useMemo(() => {
    if (!searchQuery.trim()) return foods;
    const lowerQuery = searchQuery.toLowerCase();
    return foods.filter(
      (f) =>
        f.name.toLowerCase().includes(lowerQuery) ||
        f.tags.some((t) => t.toLowerCase().includes(lowerQuery))
    );
  }, [searchQuery]);

  const renderItem = ({ item }: { item: (typeof foods)[0] }) => {
    const emoji = foodEmojiMap[item.id] || "🍽️";
    return (
      <View style={uiStyles.foodItem}>
        <Text style={uiStyles.foodEmoji}>{emoji}</Text>
        <View style={uiStyles.foodDetails}>
          <Text style={uiStyles.foodName}>{item.name}</Text>
          <Text style={uiStyles.foodTags} numberOfLines={1}>
            {item.tags.join(" • ")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.gradientTop, Colors.gradientBottom]}
      style={uiStyles.root}
    >
      <SafeAreaView style={uiStyles.safe}>
        <KeyboardAvoidingView
          style={uiStyles.keyboardAvoid}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={uiStyles.header}>
            <Text style={uiStyles.heading}>Discover</Text>
            <Text style={uiStyles.subHeading}>Search our entire food database</Text>
          </View>

          <View style={uiStyles.searchContainer}>
            <LinearGradient
              colors={['rgba(255,255,255,0.5)', 'transparent', 'transparent', 'rgba(255,255,255,0.5)']}
              locations={[0, 0.35, 0.65, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={uiStyles.searchBorderGradient}
            >
              <LinearGradient
                colors={['#18181A', '#0A0A0A']}
                start={{ x: 0.2, y: 1 }}
                end={{ x: 0.8, y: 0 }}
                style={uiStyles.searchInputWrapper}
              >
                <Text style={uiStyles.searchIcon}>🔍</Text>
                <TextInput
                  style={uiStyles.searchInput}
                  placeholder="Search foods, tags..."
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCorrect={false}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Text style={uiStyles.clearIcon}>✖</Text>
                  </TouchableOpacity>
                )}
              </LinearGradient>
            </LinearGradient>
          </View>

          <View style={uiStyles.listContainer}>
            <FlatList
              data={filteredFoods}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={uiStyles.listContent}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={uiStyles.divider} />}
              ListEmptyComponent={
                <View style={uiStyles.emptyContainer}>
                  <Text style={uiStyles.emptyEmoji}>👀</Text>
                  <Text style={uiStyles.emptyText}>No matching foods found</Text>
                </View>
              }
            />
          </View>

          <NavigationBar activeTab="Search" onTabPress={handleTabPress} />
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  subHeading: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  searchBorderGradient: {
    padding: 1,
    borderRadius: Radius.full,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    overflow: "hidden",
  },
  searchIcon: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  clearIcon: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginLeft: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.base,
    color: Colors.textPrimary,
    fontWeight: "500",
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  foodEmoji: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  foodTags: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textTransform: "capitalize",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
  },
});
