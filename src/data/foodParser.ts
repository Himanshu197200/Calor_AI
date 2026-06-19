import rawData from './rawFoodData.json';
import { Food, Cuisine } from '../types/index';

export const foods: Food[] = rawData.foods as Food[];
export const cuisines: Cuisine[] = rawData.cuisines as Cuisine[];

export const foodEmojiMap: Record<number, string> = {
  1:'🐟', 2:'🍗', 3:'🥩', 4:'🫙', 5:'🥚', 6:'🍤',
  7:'🍚', 8:'🍝', 9:'🥔', 10:'🌾', 11:'🥣', 12:'🍞',
  13:'🥦', 14:'🥬', 15:'🥬', 16:'🥕', 17:'🫑', 18:'🥑',
  19:'🍠', 20:'🧀', 21:'🍶', 22:'🥜', 23:'🫘', 24:'🍣',
  25:'🍕', 26:'🥗', 27:'🍔', 28:'🥣', 29:'🌮', 30:'🍜',
};

export const getCardText = (foodName: string) =>
  `I love eating ${foodName.toLowerCase()}`;

export let globalResults: import('../types/index').SwipeResult[] = [];
