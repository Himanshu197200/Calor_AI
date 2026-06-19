export interface Food {
  id: number;
  name: string;
  image: string;
  category: 'protein' | 'carb' | 'vegetable' | 'other';
  tags: string[];
}

export interface Cuisine {
  id: number;
  name: string;
  emoji: string;
  description: string;
}

export type SwipeDirection = 'like' | 'dislike' | 'superlike' | 'unsure';

export interface SwipeResult {
  food: Food;
  direction: SwipeDirection;
}

export type RootStackParamList = {
  Intro: undefined;
  Swipe: undefined;
  FAQ: undefined;
  Search: undefined;
  Results: {
    results: SwipeResult[];
  };
};

export interface TastePersona {
  emoji: string;
  label: string;
}

export interface TasteProfile {
  personas: TastePersona[];
  lifestyleTraits: string[];
  liked: Food[];
  disliked: Food[];
  superliked: Food[];
  unsure: Food[];
}
