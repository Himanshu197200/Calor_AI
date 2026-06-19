import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import IntroScreen from './src/screens/IntroScreen';
import SwipeScreen from './src/screens/SwipeScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import FAQScreen from './src/screens/FAQScreen';
import SearchScreen from './src/screens/SearchScreen';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Intro"
          screenOptions={{ headerShown: false, animation: 'none' }}
        >
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Swipe" component={SwipeScreen} />
          <Stack.Screen 
            name="Results" 
            component={ResultsScreen} 
            initialParams={{ results: [] }}
          />
          <Stack.Screen name="FAQ" component={FAQScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
