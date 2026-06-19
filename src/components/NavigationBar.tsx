import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { SvgProps } from "react-native-svg";
import HomeIcon from "../../assets/icons/home.svg";
import QuestionIcon from "../../assets/icons/question.svg";
import CarrotIcon from "../../assets/icons/carrot.svg";
import SearchIcon from "../../assets/icons/search.svg";
import { Colors, Radius, Typography, Spacing } from "../theme/appTheme";

type TabName = "Start" | "FAQ" | "TasteProfile" | "Search";

interface NavigationBarProps {
  activeTab: TabName;
  onTabPress?: (tab: TabName) => void;
}

interface TabConfig {
  name: TabName;
  Icon: React.FC<SvgProps>;
  label: string;
}

const TABS: TabConfig[] = [
  { name: "Start", Icon: HomeIcon, label: "Start" },
  { name: "FAQ", Icon: QuestionIcon, label: "FAQ" },
  { name: "TasteProfile", Icon: CarrotIcon, label: "Taste Profile" },
];

function PillTabs({ activeTab, onTabPress }: NavigationBarProps) {
  return (
    <View style={uiStyles.pillTabs}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.name;
        const iconColor = isActive ? Colors.navActive : Colors.navInactive;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => onTabPress?.(tab.name)}
            style={[uiStyles.tab, isActive && uiStyles.tabActive]}
            activeOpacity={0.75}
          >
            <tab.Icon width={24} height={24} color={iconColor} />
            <Text style={[uiStyles.tabLabel, { color: iconColor }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function NavigationBar({ activeTab, onTabPress }: NavigationBarProps) {
  return (
    <View style={uiStyles.outerContainer}>
      <LinearGradient
        colors={[
          "rgba(255,255,255,0.5)",
          "transparent",
          "transparent",
          "rgba(255,255,255,0.5)",
        ]}
        locations={[0, 0.35, 0.65, 1]}
        start={{ x: 0.5, y: -0.4 }}
        end={{ x: 0.7, y: 1.5 }}
        style={[uiStyles.borderGradient, { flex: 1, height: 70 }]}
      >
        <View style={uiStyles.mainPillWrapper}>
          <LinearGradient
            colors={['#18181A', '#0A0A0A']}
            start={{ x: 0.2, y: 1 }}
            end={{ x: 0.8, y: 0 }}
            style={uiStyles.blurCard}
          >
            <View style={uiStyles.blurOverlay}>
              <PillTabs activeTab={activeTab} onTabPress={onTabPress} />
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>

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
        style={[uiStyles.borderGradient, { width: 70, height: 70 }]}
      >
        <TouchableOpacity
          onPress={() => onTabPress?.("Search")}
          style={uiStyles.searchButtonInner}
          activeOpacity={0.75}
        >
          <LinearGradient
            colors={['#18181A', '#0A0A0A']}
            start={{ x: 0.2, y: 1 }}
            end={{ x: 0.8, y: 0 }}
            style={uiStyles.blurCard}
          >
            <View style={[uiStyles.searchOverlay, activeTab === "Search" && uiStyles.tabActive]}>
              <SearchIcon 
                width={25} 
                height={25} 
                color={activeTab === "Search" ? Colors.navActive : Colors.navInactive} 
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const uiStyles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 32,
    elevation: 12,
  },
  borderGradient: {
    padding: 1,
    borderRadius: Radius.full,
  },
  mainPillWrapper: {
    flex: 1,
    height: '100%',
    borderRadius: Radius.full,
    overflow: "hidden",
  },
  searchButtonInner: {
    flex: 1,
    height: '100%',
    borderRadius: Radius.full,
    overflow: "hidden",
  },
  blurCard: {
    flex: 1,
  },
  blurOverlay: {
    flex: 1,
  },
  searchOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  androidContainer: {
    backgroundColor: "#181A1B",
  },
  pillTabs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.full,
    gap: 2,
  },
  tabActive: {
    backgroundColor: "rgba(255, 255, 255, 0.12)", // gray selection
  },
  tabLabel: {
    fontFamily: Typography.fontFamily,
    fontSize: 10,
    fontWeight: Typography.semibold,
  },
});
