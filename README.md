# CalorAI — Taste Profile Assignment

A **React Native / Expo** mobile application that allows users to build a highly personalised food preference profile by swiping through interactive food cards. Users can swipe right to like, left to dislike, up to superlike, or down if unsure. After completing the deck, the app dynamically generates a comprehensive Taste Profile, complete with detected personas, lifestyle traits, and a favourite cuisines breakdown.

---

## 📱 Running the App

> **Requires [Expo Go](https://expo.dev/client) installed on your physical device (iOS or Android), or a simulator/emulator.**

```bash
# 1. Clone the repository
git clone https://github.com/Himanshu197200/Calor_AI.git
cd Calor_AI

# 2. Install dependencies
npm install

# 3. Start the Metro bundler
npx expo start --clear
```

Then:
- **iOS** — Press `i` to open in the iOS Simulator, or scan the QR code with the **Camera app** on a physical device.
- **Android** — Press `a` to open in an Android Emulator, or scan the QR code with the **Expo Go** app on a physical device.

---

## 🚀 Key Features & Screens

| Screen | Description |
|---|---|
| **Intro** | Engaging landing screen featuring a premium glassmorphism card and bottom navigation. |
| **Swipe** | Tinder-style card stack with 4-directional pan gestures and haptic feedback. |
| **Results** | Dynamic Taste Profile breakdown. **Bonus Features:** Includes an interactive horizontal carousel for Personas, dynamic Lifestyle detection (e.g., Early Bird, Eco-Friendly), and a dynamically calculated "Favorite Cuisines" slider (extracting real tags from swiped foods). |
| **Search** | **Bonus Feature:** A fully functional, real-time database search screen accessible via the bottom nav. Filters through all 30 foods and their invisible tags. |
| **FAQ** | A polished FAQ screen demonstrating the global navigation bar. |

---

## 📦 Libraries Used & Why

| Library | Version | Why |
|---|---|---|
| `expo` | ~54.0.35 | Base SDK — provides the managed workflow, ensuring rapid development and compatibility with Expo Go. |
| `@react-navigation/native-stack` | ^7.x | Provides native stack-based navigation for zero-overhead, buttery-smooth transitions between screens. |
| `expo-linear-gradient` | ~15.0.8 | Crucial for the premium glassmorphism aesthetic. Used extensively to create shimmering 1px glass borders and deep frosted fills. |
| `expo-haptics` | ~15.0.8 | Adds premium tactile feedback to the swiping experience. |
| `react-native-svg` | 15.12.1 | Renders custom vector icons (heart, star, search, home, etc.) without pixelation. |
| `react-native-svg-transformer` | ^1.5.3 | Allows importing `.svg` files directly as React components inside Metro. |
| `react-native-gesture-handler` | ~2.28.0 | Core peer dependency providing gesture contexts and handlers. |
| `react-native-reanimated` | ~4.1.1 | Powers the complex, physics-based card fly-off animations and interactive swipe tracking. |
| `react-native-safe-area-context` | ~5.6.0 | Ensures the UI respects device notches, dynamic islands, and home indicators on both platforms. |
| `TypeScript` | ~5.9.2 | Strict typing for components, props, swipe results, and navigation parameters. |

---

## 🎨 Glassmorphism Implementation

React Native does not natively support `backdrop-filter` (CSS blur-behind). While `expo-blur` exists, its behaviour in Expo Go on Android is notoriously inconsistent (often rendering as a flat, opaque grey box).

**The Solution:** A pure `LinearGradient` workaround that guarantees 100% visual consistency across both iOS and Android.
1. **Outer Border:** A `LinearGradient` (`rgba(255,255,255,0.5) → transparent → transparent → rgba(255,255,255,0.5)`) applied with `padding: 1` creates a shimmering glass edge.
2. **Inner Fill:** A subtle dark `#18181A → #0A0A0A` gradient mimics the deep surface of frosted glass.
3. **Depth:** Heavy drop shadows (`elevation: 12`) lift the cards off the background.

---

## ⚖️ Assumptions & Trade-offs

| Decision | Reasoning |
|---|---|
| **No `BlurView` on cards** | `expo-blur` works on iOS but renders as a solid dark box on Android in Expo Go. Using `LinearGradient` instead achieves a near-identical visual with 100% cross-platform reliability |
| **`globalResults` mutable array** | Rather than threading swipe results through navigation params at every step, a module-level array stores the completed profile so ResultsScreen can access it without re-navigation |
| **`PanResponder` instead of Gesture Handler** | `react-native-gesture-handler` requires a `GestureHandlerRootView` wrapper and had conflict issues on certain Expo Go versions. `PanResponder` (built into React Native) solved the gesture detection reliably |
| **Expo SDK 54 (pinned)** | Expo SDK 55+ requires a newer Expo Go version not widely available. Pinned to 54 to ensure the QR-scan workflow works immediately without any build steps |
| **Static food data via JSON** | No backend is needed for a taste profile prototype. `rawFoodData.json` loads at bundle time with zero network latency |
| **`forwardRef` on SwipeableItem** | The action buttons (Cross, Heart, Star, Question) need to programmatically trigger a swipe on the top card. `forwardRef` + `useImperativeHandle` exposes a `triggerSwipe()` method cleanly without lifting state |
| **Dynamic card height in ResultsScreen** | The swipeable food category carousel uses `onLayout` to measure each slide's true height, then `scrollX.interpolate()` to animate the container height as you swipe — avoids both a fixed min-height and jarring layout jumps |

---

## 📱 Platform Differences — iOS vs Android

| Area | iOS | Android |
|---|---|---|
| **Typography** | `fontFamily: 'System'` (SF Pro) | `fontFamily: 'Roboto'` |
| **BlurView** | Works natively with hardware blur | Replaced by `LinearGradient` (BlurView falls back to a solid overlay in Expo Go) |
| **Shadows** | `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` | `elevation` (Android uses a single elevation value) |
| **Safe Area** | Notch + dynamic island insets handled via `react-native-safe-area-context` | Notch + status bar insets handled the same way |
| **Haptics** | Full `ImpactFeedbackStyle` support | Works on most modern Android devices; gracefully no-ops on unsupported hardware |
| **Font sizes** | `adjustsFontSizeToFit` used on heading labels to prevent overflow | Same prop respected; Android clips differently so `numberOfLines={1}` added as guard |

The `Platform.select()` call in `constants.ts` centralises all platform branching for typography, so no per-screen `Platform.OS` checks are needed for fonts.

---

## ⏱️ Time Breakdown

| Phase | Time | Notes |
|---|---|---|
| Project setup, Expo config, TypeScript, SVG pipeline | ~30 min | Created project, set up metro.config.js for SVG, installed all deps |
| Food data + type definitions | ~20 min | Designed `rawFoodData.json` schema, wrote TypeScript interfaces, emoji map |
| Swipe card — PanResponder, animations, badges | ~50 min | Gesture detection, 4-direction flyOff, Animated interpolations for badges |
| Glassmorphism design system | ~35 min | Designed `FrostedCard`, gradient border pattern, `appTheme.ts` tokens |
| Bottom Nav + SVG icons | ~25 min | Pill nav, search button, icon imports, active state, platform font fallback |
| Action buttons + progress bar | ~25 min | Gradient button variants, SVG icon colouring, animated progress fill |
| Background blobs | ~15 min | SVG radial gradient ambient blobs |
| Intro screen | ~20 min | Glassmorphism CTA card, back button pattern |
| Results screen | ~60 min | Personas algorithm, lifestyle traits, swipeable carousel with dynamic height |
| FAQ screen | ~15 min | Consistent layout with Intro, bottom nav |
| Debugging & polish | ~40 min | Card z-index stacking, last card edge case, font size overflow, Android elevation |
| **Bonus: Search Screen** | ~35 min | Designing the Search UI, hooking up the bottom navigation, real-time filtering |
| **Total** | **6 hours 10 mins** | |

---

## 🤖 AI Tool Usage

| Tool | How it helped |
|---|---|
| **Antigravity (Google DeepMind IDE assistant)** | Primary development tool throughout. Used for: scaffolding component structure, writing `react-native-reanimated` swipe physics, executing codebase-wide strict TypeScript validation, and perfectly crafting the `SearchScreen` layout. |
| **Claude AI** | Used for high-level architectural brainstorming, specifically regarding the algorithm to calculate the "Taste Diversity Score" and how to map food tags into dynamic lifestyle traits like "PCOS & GI Diet". |
| **Gemini** | Provided rapid, pinpoint solutions when debugging React Navigation's strict type-checking requirements (e.g. `initialParams` errors) and assisted in writing the logic to extract "Favorite Cuisines" based on swipe frequency. |

AI assistance was particularly valuable for:
- **Cross-platform blur workaround** — quickly exploring why `BlurView` breaks on Android in Expo Go and identifying the `LinearGradient` border pattern as a reliable substitute
- **Dynamic height interpolation** — the `onLayout` + `scrollX.interpolate` approach for the carousel height was an AI suggestion that saved significant debugging time
- **Gesture debugging** — diagnosing React Navigation strict-mode errors and correctly typing the parameters across the stack

All AI-generated logic was thoroughly reviewed, tested natively, and modified to fit the bespoke UI components of the project.
