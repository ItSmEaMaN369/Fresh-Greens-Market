import { Product } from '../types';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

// Whitelist to filter only vegetables from the generic ingredients list
const VEGETABLE_WHITELIST = [
  'Carrot', 'Broccoli', 'Spinach', 'Potatoes', 'Tomato', 'Onion', 'Garlic', 
  'Corn', 'Cucumber', 'Eggplant', 'Avocado', 'Pumpkin', 'Kale', 'Lettuce', 
  'Chili', 'Beetroot', 'Zucchini', 'Cabbage', 'Cauliflower', 'Mushrooms', 
  'Pepper', 'Red Pepper', 'Green Pepper', 'Asparagus', 'Peas', 'Celery', 
  'Sweet Potato', 'Ginger', 'Basil', 'Parsley', 'Coriander', 'Lime', 'Lemon'
];

// Helper to determine category based on name
const getCategory = (name: string): Product['category'] => {
  const lowerName = name.toLowerCase();
  const leafy = ['spinach', 'kale', 'lettuce', 'cabbage', 'celery', 'basil', 'parsley', 'coriander', 'broccoli', 'cauliflower'];
  const root = ['carrot', 'potato', 'onion', 'garlic', 'beetroot', 'ginger', 'sweet potato'];
  const exotic = ['avocado', 'pumpkin', 'chili', 'mushrooms', 'lime', 'lemon', 'ginger'];
  
  if (leafy.some(l => lowerName.includes(l))) return 'Leafy';
  if (root.some(r => lowerName.includes(r))) return 'Root';
  if (exotic.some(e => lowerName.includes(e))) return 'Exotic';
  return 'Seasonal';
};

// Helper to generate a deterministic price based on the string value
const getPrice = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const price = (Math.abs(hash) % 400) / 100 + 1.50; // Price between 1.50 and 5.50
  return parseFloat(price.toFixed(2));
};

// Helper to generate a deterministic unit
const getUnit = (name: string) => {
    const lowerName = name.toLowerCase();
    if (['pumpkin', 'cauliflower', 'cabbage', 'lettuce', 'avocado', 'eggplant'].some(i => lowerName.includes(i))) return 'each';
    if (['garlic', 'onion', 'lime', 'lemon'].some(i => lowerName.includes(i))) return 'pack';
    return 'kg';
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    if (!data.meals) return [];

    return data.meals
      .filter((item: any) => VEGETABLE_WHITELIST.includes(item.strIngredient))
      .map((item: any) => {
        const name = item.strIngredient;
        return {
            id: parseInt(item.idIngredient),
            name: name,
            category: getCategory(name),
            price: getPrice(name),
            unit: getUnit(name),
            // TheMealDB provides high quality ingredient images
            image: `https://www.themealdb.com/images/ingredients/${name}.png`,
            description: item.strDescription 
                ? item.strDescription.slice(0, 150) + "..." 
                : `Fresh, organic ${name.toLowerCase()} sourced directly from local partners. Perfect for healthy cooking and nutritious meals.`,
            nutrition: `${Math.floor(Math.random() * 50) + 10} kcal per 100g` // Mock nutrition as API doesn't provide it
        };
      });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id: number): Promise<Product | undefined> => {
    const products = await fetchProducts();
    return products.find(p => p.id === id);
}
