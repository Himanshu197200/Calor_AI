# React Native iOS / Android Developer - Software Engineering Intern

# Developer Test Task: React Native iOS/Android Developer
* * *
## Overview
**Role:** Junior/Intern React Native Developer (Frontend Focus)
**Company:** CalorAI
**Time Budget:** 6-8 hours maximum
**Deadline:** Complete at your own pace (suggested: within 1 day of starting)

[

www.figma.com

https://www.figma.com/design/nvjb77Pfwk9Sr87odJsKPZ/CalorAI---Test-Task---React-Native-IOS?node-id=0-1&t=gmb8LDoZNtdAeJpf-1

](https://www.figma.com/design/nvjb77Pfwk9Sr87odJsKPZ/CalorAI---Test-Task---React-Native-IOS?node-id=0-1&t=gmb8LDoZNtdAeJpf-1)

* * *
## Why We Use Test Tasks
We believe in "working together before working together." This test task lets you showcase your UI implementation skills while giving us a fair, objective way to evaluate all candidates equally. Everyone receives the same project—no tricks, no gotchas.
**Important:** We heavily encourage and expect AI tool usage (GitHub Copilot, ChatGPT, Claude, etc.). We value implementation speed and code quality over writing everything manually. Treat AI as your coding partner.
* * *
## Project Brief
### What You're Building
**CalorAI Taste Profile:** A beautiful, swipeable food preference interface.
You'll build a 3-screen React Native app that recreates our Figma designs with pixel-perfect accuracy, focusing on a modern frosted-glass / card-based aesthetic and smooth swipe interactions. **The app must look and feel equally polished on either iOS or Android** — neither platform is an afterthought, and we pay close attention to how your build holds up on real Android devices.
### User Story
> As a new CalorAI user, I want to swipe through foods I love and dislike, so that the app can recommend meals tailored to my taste.
* * *
## Detailed Requirements
### Core Features (Must Have)
1. **Intro Screen** — A welcome/onboarding screen that introduces the taste profile flow and a clear call-to-action to begin.
2. **Swipe Screen** — A stack of food cards the user can:
    *   Swipe **right** to like, swipe **left** to dislike.
    *   Tap on-screen **like / dislike buttons** as an alternative to swiping.
    *   See a **progress bar** that updates as they work through the deck.
3. **Results Screen** — A summary of the user's choices (liked vs. disliked foods, simple counts/breakdown).
4. **Bottom navigation** — Glass/blur-style bottom bar that renders correctly on either platforms.
5. **Consistent theming** — Dark theme with gradient backgrounds and the green accent color, matching the Figma.
### Nice-to-Have (Bonus Points)
*   Background animations (animated gradients, particles, subtle motion)
*   Profile generation logic (analyze swipes and generate actual personality/taste traits)
*   Advanced animations (card rotation during swipe, spring physics, haptic feedback)
*   Undo last swipe functionality
*   Onboarding animation (fade-in, slide-up effects)
> **Note:** Focus on core features first. Only tackle bonuses if you have time remaining.
* * *
## Technical Specifications
### Required Tech Stack
*   **React Native** (managed Expo workflow)
*   **Expo Go** as the run target
*   JavaScript or TypeScript (TypeScript preferred but not required)
*   Suggested libraries (use whatever helps you build faster): `react-navigation`, `react-native-gesture-handler`, `react-native-reanimated`, `expo-blur`, `expo-linear-gradient`
### Technical Constraints
*   Must run on **Expo Go on either iOS or Android**
*   Must use the provided food data (see resources below)
*   Must match the Figma designs (pixel-perfect is the goal)
*   No authentication required (skip login/signup)
*   No backend/API calls (all data is hardcoded)
*   Animations must be smooth (aim for 60fps **on either platforms**)
* * *
## Resources Provided
### 1\. Figma Design File
**CalorAI Test Task – React Native**
Key Screens:
*   **Intro Screen**
*   **Swipe Screen**
*   **Results Screen**
> The Figma frames are drawn at a phone-sized viewport. Treat them as the visual source of truth for **either** iOS or Android — your job is to reproduce the same look on each.
**Design Notes:**
*   Pay close attention to the frosted glass cards (blur + transparency)
*   Note the dark theme with gradient backgrounds
*   Bottom navigation uses a glass-blur style
*   Progress bar has a green accent color
*   Buttons use circular icons with subtle shadows
### 2\. Food Data
See the Food.json` file provided with this task.
### 3\. Glass Morphism Specifications
For the frosted-glass effect, use these parameters as a starting point:

```perl
// Example using expo-blur<BlurView  intensity={20}        // Blur strength  tint="dark"           // or "light"  style={{    backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Semi-transparent    borderRadius: 16,    overflow: 'hidden',  }}>  {/* Your content */}</BlurView>
```

Key characteristics:
*   Background blur with 20–30% opacity overlay
*   Rounded corners (12–16px border radius)
*   Subtle border (1px, `rgba(255, 255, 255, 0.2)`)
*   Shadow for depth
> **Cross-platform note:** Native blur behaves differently across iOS and Android. We expect you to make the glass effect look good on **either platform** — using a sensible fallback on Android where needed (e.g. a semi-transparent solid layer) so the UI never looks broken or empty. How you handle this gracefully on Android is something we specifically look at.
* * *
## Definition of Done
Your submission is complete when:
*   App runs on Expo Go **without errors on either iOS or Android**
*   All 3 core screens are implemented
*   Swipe gestures work smoothly
*   Glass effects render correctly on **either platforms** (with a graceful fallback where native blur isn't available)
*   Bottom navigation works
*   Progress bar updates as the user swipes
*   README includes setup instructions
*   Walkthrough video is recorded (5–10 minutes)
* * *

## Submission Requirements
### What to Submit
**1\. GitHub Repository**
*   Clean commit history (show your work progression)
*   Descriptive commit messages
*   No single "final commit" with all code
*   [`README.md`](http://README.md) must include:
    *   Project overview
    *   Setup/installation instructions (how to run with Expo Go)
    *   Libraries used and why
    *   Any assumptions or trade-offs you made
    *   **How you handled platform differences between iOS and Android**
    *   Time breakdown (how you spent your hours)
    *   Notes on AI tool usage (which tools, how they helped)
**2\. Walkthrough Video (5–10 minutes)**
*   Demo the working application on a real device (or simulator/emulator)
*   **Show it running on either iOS or Android (Expo Go)**
*   Explain your architectural decisions
*   Highlight the glass morphism implementation and how it behaves on each platform
*   Discuss any challenges and how you solved them
*   Show any bonus features you implemented
**3\. \[Optional\] Expo Build Link**
*   If you want to share an Expo build link for easy testing, include it in the README


## Evaluation Criteria
We'll evaluate your submission on:

| Area | What we look for |
| ---| --- |
| Visual fidelity | How closely the UI matches the Figma, on either platforms |
| Cross-platform quality | Looks and performs well on iOS and Android, with sensible fallbacks |
| Interaction & animation | Smooth, natural swipe gestures and transitions (60fps) |
| Code quality | Clean component structure, good separation of concerns |
| Process | Iterative commit history, clear README, honest time management |
| Communication | Clear video walkthrough and documented decisions |

### Green Flags ✅
*   Clean component structure with good separation of concerns
*   Smooth animations and gestures (60fps)
*   Glass effects that match the Figma designs
*   **Works perfectly on either iOS or Android, with thoughtful handling of platform differences**
*   Clean commit history showing iterative development
*   Thoughtful README with setup instructions
*   Clear video walkthrough
*   Smart use of AI tools (documented in README)
### Red Flags ❌
*   Code doesn't run on Expo Go
*   Missing core features
*   Glass effects don't work or look wrong on either platform
*   **Builds only for one platform / clearly never tested on Android**
*   No documentation
*   One giant commit with all code
*   Jerky animations or poor performance
*   Crashes on Android or iOS
##   

* * *

* * *
## FAQs

**Q: What if I can't finish in 8 hours?**
A: Submit what you have. Document what's incomplete and what you'd do next. We value honest time management over heroic overtime.

**Q: Can I use AI tools (Copilot, ChatGPT, Claude, etc.)?**
A: **YES!** We heavily encourage it. This is about building fast and well, not proving you can code without help. Just document which tools you used in your README.

**Q: Can I use libraries/packages?**
A: Yes, use whatever helps you build faster. Popular choices: react-navigation, react-native-gesture-handler, react-native-reanimated, expo-blur. Just document major dependencies in your README.

**Q: Do I need to make it work exactly like Tinder?**
A: The swipe gesture should feel natural, but you don't need to replicate every Tinder interaction. Focus on: swipe left (dislike), swipe right (like), and tap buttons as alternatives.

**Q: What if glass effects don't work on Android?**
A: That's expected! Android doesn't support native blur the same way. Provide a graceful fallback (solid background with slight transparency). Document this in your README.

**Q: Should I write unit tests?**
A: No. This is a UI-focused task. Manual testing (showing it works in your video) is sufficient.

**Q: What if I don't have an iPhone?**
A: Use the iOS simulator in Xcode, or test on Android and document that you tested iOS in simulator. Expo Go works on either platform.

**Q: Can I change the design?**
A: No. The goal is to match the Figma designs as closely as possible. If you think something could be improved, document it in your README but still implement the original design.
* * *


