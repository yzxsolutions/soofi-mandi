import { MenuItem, Review } from '@/types';

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    customerId: 'customer1',
    customerName: 'Ahmed Hassan',
    rating: 5,
    comment: 'Absolutely authentic! The lamb mandi reminded me of home. Perfect spices and tender meat. The presentation was beautiful and the portion size was perfect for sharing.',
    images: ['/images/mandi/mandi.png', '/images/mandi/mandi.png'],
    createdAt: new Date('2024-01-15'),
    isVerified: true,
  },
  {
    id: '2',
    customerId: 'customer2',
    customerName: 'Sarah Johnson',
    rating: 4,
    comment: 'Delicious food and generous portions. The chicken mandi was flavorful and the rice was perfectly cooked. Great value for money!',
    images: ['/images/mandi/mandi.png'],
    createdAt: new Date('2024-01-10'),
    isVerified: true,
  },
  {
    id: '3',
    customerId: 'customer3',
    customerName: 'Omar Al-Rashid',
    rating: 5,
    comment: 'Best Middle Eastern food in the city! The mutton mandi is exceptional. The meat was so tender it fell off the bone.',
    createdAt: new Date('2024-01-08'),
    isVerified: true,
  },
  {
    id: '4',
    customerId: 'customer4',
    customerName: 'Fatima Al-Zahra',
    rating: 5,
    comment: 'Amazing traditional flavors! The spices were perfectly balanced and the rice was aromatic. Highly recommend!',
    images: ['/images/mandi/mandi.png', '/images/mandi/mandi.png', '/images/mandi/mandi.png'],
    createdAt: new Date('2024-01-12'),
    isVerified: true,
  },
];

// Mock menu data based on actual Soofi Mandi menu
export const mockMenuItems: MenuItem[] = [
  // Mandi Varieties - Bangalore pricing
  {
    id: 'chicken-mandi',
    name: 'Chicken Mandi',
    description: 'Traditional Arabian chicken mandi with fragrant basmati rice, slow-cooked to perfection',
    price: 180, // Full price for Bangalore market
    category: 'mandi',
    images: [
      
    ],
    ingredients: ['Whole chicken', 'Basmati rice', 'Traditional spices', 'Saffron', 'Onions', 'Cardamom'],
    nutritionalInfo: {
      calories: 580,
      protein: 40,
      carbs: 50,
      fat: 20,
    },
    spiceLevel: 'medium',
    preparationTime: 45,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Quarter', price: -130, description: 'Quarter portion - ₹50' },
        { name: 'Half', price: -80, description: 'Half portion - ₹100' },
        { name: 'Full', price: 0, description: 'Full portion - ₹180' },
      ],
      addOns: [
        { name: 'Extra Rice', price: 40 },
        { name: 'Extra Chicken', price: 60 },
        { name: 'Yogurt Sauce', price: 20 },
        { name: 'Hot Sauce', price: 10 },
      ],
    },
    reviews: mockReviews.slice(0, 3),
    averageRating: 4.6,
  },
  {
    id: 'mutton-mandi',
    name: 'Mutton Mandi',
    description: 'Premium mutton slow-cooked with aromatic spices and served with golden basmati rice',
    price: 350, // Full price for Bangalore market
    category: 'mandi',
    images: [
    
    ],
    ingredients: ['Premium mutton', 'Basmati rice', 'Traditional spices', 'Saffron', 'Black cardamom', 'Bay leaves'],
    nutritionalInfo: {
      calories: 720,
      protein: 48,
      carbs: 52,
      fat: 30,
    },
    spiceLevel: 'medium',
    preparationTime: 60,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Quarter', price: -260, description: 'Quarter portion - ₹90' },
        { name: 'Half', price: -170, description: 'Half portion - ₹180' },
        { name: 'Full', price: 0, description: 'Full portion - ₹350' },
      ],
      addOns: [
        { name: 'Extra Rice', price: 40 },
        { name: 'Extra Mutton', price: 100 },
        { name: 'Yogurt Sauce', price: 20 },
        { name: 'Grilled Vegetables', price: 60 },
      ],
    },
    reviews: [mockReviews[2], mockReviews[3]],
    averageRating: 4.9,
  },
  {
    id: 'mutton-maqli-mandi',
    name: 'Mutton Maqli Mandi',
    description: 'Fried mutton mandi with crispy texture and traditional spices, served with aromatic rice',
    price: 380, // Full price for Bangalore market
    category: 'mandi',
    images: [
    
    ],
    ingredients: ['Fried mutton', 'Basmati rice', 'Special spice blend', 'Crispy onions', 'Saffron'],
    nutritionalInfo: {
      calories: 750,
      protein: 45,
      carbs: 55,
      fat: 35,
    },
    spiceLevel: 'medium',
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Quarter', price: -280, description: 'Quarter portion - ₹100' },
        { name: 'Half', price: -180, description: 'Half portion - ₹200' },
        { name: 'Full', price: 0, description: 'Full portion - ₹380' },
      ],
      addOns: [
        { name: 'Extra Rice', price: 40 },
        { name: 'Extra Crispy Onions', price: 30 },
        { name: 'Yogurt Sauce', price: 20 },
        { name: 'Pickles', price: 20 },
      ],
    },
    reviews: [mockReviews[0], mockReviews[1]],
    averageRating: 4.7,
  },
  {
    id: 'grilled-mutton-mandi',
    name: 'Grilled Mutton Mandi',
    description: 'Perfectly grilled mutton with smoky flavor, served with traditional mandi rice',
    price: 380, // Full price for Bangalore market
    category: 'mandi',
    images: [
      
    ],
    ingredients: ['Grilled mutton', 'Basmati rice', 'Smoky spices', 'Charcoal flavor', 'Traditional herbs'],
    nutritionalInfo: {
      calories: 680,
      protein: 50,
      carbs: 48,
      fat: 28,
    },
    spiceLevel: 'medium',
    preparationTime: 55,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Quarter', price: -280, description: 'Quarter portion - ₹100' },
        { name: 'Half', price: -180, description: 'Half portion - ₹200' },
        { name: 'Full', price: 0, description: 'Full portion - ₹380' },
      ],
      addOns: [
        { name: 'Extra Rice', price: 40 },
        { name: 'Grilled Vegetables', price: 60 },
        { name: 'Garlic Sauce', price: 20 },
        { name: 'Extra Grilled Mutton', price: 100 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },
  {
    id: 'fish-mandi',
    name: 'Fish Mandi',
    description: 'Fresh fish cooked with traditional mandi spices and served with aromatic basmati rice',
    price: 260, // Full price for Bangalore market
    category: 'mandi',
    images: [
     
    ],
    ingredients: ['Fresh fish', 'Basmati rice', 'Coastal spices', 'Lemon', 'Fresh herbs', 'Turmeric'],
    nutritionalInfo: {
      calories: 520,
      protein: 42,
      carbs: 45,
      fat: 18,
    },
    spiceLevel: 'mild',
    preparationTime: 40,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Quarter', price: -190, description: 'Quarter portion - ₹70' },
        { name: 'Half', price: -130, description: 'Half portion - ₹130' },
        { name: 'Full', price: 0, description: 'Full portion - ₹260' },
      ],
      addOns: [
        { name: 'Extra Rice', price: 40 },
        { name: 'Lemon Wedges', price: 10 },
        { name: 'Tartar Sauce', price: 20 },
        { name: 'Grilled Vegetables', price: 60 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },
  {
    id: 'chicken-madfoon-mandi',
    name: 'Chicken Madfoon Mandi',
    description: 'Traditional buried chicken cooked underground style with special spices and mandi rice',
    price: 190, // Full price for Bangalore market
    category: 'mandi',
    images: [
      
    ],
    ingredients: ['Buried chicken', 'Basmati rice', 'Underground spices', 'Traditional herbs', 'Smoky flavor'],
    nutritionalInfo: {
      calories: 600,
      protein: 42,
      carbs: 52,
      fat: 22,
    },
    spiceLevel: 'medium',
    preparationTime: 60,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Quarter', price: -140, description: 'Quarter portion - ₹50' },
        { name: 'Half', price: -90, description: 'Half portion - ₹100' },
        { name: 'Full', price: 0, description: 'Full portion - ₹190' },
      ],
      addOns: [
        { name: 'Extra Rice', price: 40 },
        { name: 'Traditional Sauce', price: 20 },
        { name: 'Extra Chicken', price: 60 },
        { name: 'Pickled Vegetables', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },
  {
    id: 'mutton-madfoon-mandi',
    name: 'Mutton Madfoon Mandi',
    description: 'Traditional buried mutton cooked underground style with authentic spices and mandi rice',
    price: 380, // Full price for Bangalore market
    category: 'mandi',
    images: [
      
    ],
    ingredients: ['Buried mutton', 'Basmati rice', 'Underground spices', 'Traditional herbs', 'Smoky essence'],
    nutritionalInfo: {
      calories: 740,
      protein: 48,
      carbs: 50,
      fat: 32,
    },
    spiceLevel: 'medium',
    preparationTime: 70,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Quarter', price: -280, description: 'Quarter portion - ₹100' },
        { name: 'Half', price: -180, description: 'Half portion - ₹200' },
        { name: 'Full', price: 0, description: 'Full portion - ₹380' },
      ],
      addOns: [
        { name: 'Extra Rice', price: 40 },
        { name: 'Traditional Sauce', price: 20 },
        { name: 'Extra Mutton', price: 100 },
        { name: 'Roasted Nuts', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },

  // Rice Dishes
  {
    id: 'kabsa-rice',
    name: 'Kabsa Rice',
    description: 'Traditional Saudi rice dish with aromatic spices, vegetables, and fragrant basmati rice',
    price: 150,
    category: 'rice',
    images: [
     
    ],
    ingredients: ['Basmati rice', 'Mixed vegetables', 'Tomatoes', 'Onions', 'Kabsa spice mix', 'Almonds', 'Raisins'],
    nutritionalInfo: {
      calories: 420,
      protein: 12,
      carbs: 75,
      fat: 8,
    },
    spiceLevel: 'mild',
    preparationTime: 30,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion' },
        { name: 'Large', price: 50, description: 'Extra portion' },
      ],
      addOns: [
        { name: 'Grilled Chicken', price: 80 },
        { name: 'Fried Onions', price: 20 },
        { name: 'Extra Almonds', price: 30 },
        { name: 'Yogurt Sauce', price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },
  {
    id: 'plain-rice',
    name: 'Plain Mandi Rice',
    description: 'Aromatic basmati rice cooked with traditional mandi spices - perfect as a side dish',
    price: 80,
    category: 'rice',
    images: [
      
    ],
    ingredients: ['Basmati rice', 'Mandi spices', 'Saffron', 'Cardamom', 'Bay leaves'],
    nutritionalInfo: {
      calories: 320,
      protein: 8,
      carbs: 65,
      fat: 5,
    },
    spiceLevel: 'mild',
    preparationTime: 25,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion' },
        { name: 'Large', price: 30, description: 'Extra portion' },
      ],
      addOns: [
        { name: 'Extra Saffron', price: 20 },
        { name: 'Fried Onions', price: 20 },
        { name: 'Butter', price: 10 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },

  // Appetizers
  {
    id: 'hummus-pita',
    name: 'Hummus with Pita',
    description: 'Creamy chickpea dip served with warm pita bread and olive oil drizzle',
    price: 100,
    category: 'appetizers',
    images: [
      
    ],
    ingredients: ['Chickpeas', 'Tahini', 'Lemon juice', 'Garlic', 'Olive oil', 'Pita bread'],
    nutritionalInfo: {
      calories: 280,
      protein: 10,
      carbs: 35,
      fat: 12,
    },
    spiceLevel: 'mild',
    preparationTime: 10,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion' },
        { name: 'Large', price: 40, description: 'Extra hummus and pita' },
      ],
      addOns: [
        { name: 'Extra Pita', price: 20 },
        { name: 'Olives', price: 30 },
        { name: 'Pine Nuts', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },
  {
    id: 'arabic-salad',
    name: 'Arabic Salad',
    description: 'Fresh mixed salad with tomatoes, cucumbers, onions, and traditional Arabic dressing',
    price: 80,
    category: 'appetizers',
    images: [
     
    ],
    ingredients: ['Tomatoes', 'Cucumbers', 'Onions', 'Lettuce', 'Parsley', 'Lemon', 'Olive oil'],
    nutritionalInfo: {
      calories: 120,
      protein: 3,
      carbs: 15,
      fat: 6,
    },
    spiceLevel: 'mild',
    preparationTime: 10,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion' },
        { name: 'Large', price: 30, description: 'Extra portion' },
      ],
      addOns: [
        { name: 'Feta Cheese', price: 40 },
        { name: 'Extra Dressing', price: 10 },
        { name: 'Grilled Chicken', price: 60 },
      ],
    },
    reviews: [],
    averageRating: 4.1,
  },
  {
    id: 'soup-day',
    name: 'Soup of the Day',
    description: 'Traditional Middle Eastern soup made fresh daily with seasonal ingredients',
    price: 60,
    category: 'appetizers',
    images: [
      
    ],
    ingredients: ['Seasonal vegetables', 'Traditional spices', 'Fresh herbs', 'Broth'],
    nutritionalInfo: {
      calories: 150,
      protein: 6,
      carbs: 20,
      fat: 4,
    },
    spiceLevel: 'mild',
    preparationTime: 5,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Cup' },
        { name: 'Large', price: 20, description: 'Bowl' },
      ],
      addOns: [
        { name: 'Bread Roll', price: 20 },
        { name: 'Extra Herbs', price: 10 },
      ],
    },
    reviews: [],
    averageRating: 4.0,
  },

  // Beverages
  {
    id: 'arabic-coffee',
    name: 'Arabic Coffee',
    description: 'Traditional cardamom-infused coffee served in small cups',
    price: 50,
    category: 'beverages',
    images: [
     
    ],
    ingredients: ['Arabic coffee beans', 'Cardamom', 'Sugar'],
    spiceLevel: 'mild',
    preparationTime: 5,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Traditional serving' },
        { name: 'Large', price: 20, description: 'Double serving' },
      ],
      addOns: [
        { name: 'Extra Cardamom', price: 10 },
        { name: 'Dates', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },
  {
    id: 'mint-lemonade',
    name: 'Fresh Mint Lemonade',
    description: 'Refreshing blend of fresh mint, lemon juice, and sparkling water',
    price: 80,
    category: 'beverages',
    images: [
      
    ],
    ingredients: ['Fresh mint', 'Lemon juice', 'Sugar', 'Sparkling water', 'Ice'],
    spiceLevel: 'mild',
    preparationTime: 5,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: '300ml' },
        { name: 'Large', price: 30, description: '500ml' },
      ],
      addOns: [
        { name: 'Extra Mint', price: 10 },
        { name: 'Less Sugar', price: 0 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },
  {
    id: 'soft-drinks',
    name: 'Soft Drinks',
    description: 'Selection of cold soft drinks including Pepsi, Coke, Sprite, and Thums Up',
    price: 40,
    category: 'beverages',
    images: [
   
    ],
    ingredients: ['Carbonated beverages', 'Various flavors'],
    spiceLevel: 'mild',
    preparationTime: 2,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: '330ml can' },
        { name: 'Large', price: 20, description: '500ml bottle' },
      ],
      addOns: [
        { name: 'Ice', price: 0 },
        { name: 'Lemon Slice', price: 10 },
      ],
    },
    reviews: [],
    averageRating: 4.0,
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Juice',
    description: 'Freshly squeezed orange, apple, or mixed fruit juice',
    price: 90,
    category: 'beverages',
    images: [
      
    ],
    ingredients: ['Fresh fruits', 'No added sugar'],
    spiceLevel: 'mild',
    preparationTime: 5,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: '250ml' },
        { name: 'Large', price: 40, description: '400ml' },
      ],
      addOns: [
        { name: 'Ice', price: 0 },
        { name: 'Mint Leaves', price: 10 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },

  // Desserts
  {
    id: 'baklava',
    name: 'Baklava',
    description: 'Layers of phyllo pastry filled with nuts and sweetened with honey syrup',
    price: 80,
    category: 'desserts',
    images: [
     
    ],
    ingredients: ['Phyllo pastry', 'Walnuts', 'Pistachios', 'Honey', 'Butter', 'Cinnamon'],
    nutritionalInfo: {
      calories: 250,
      protein: 6,
      carbs: 30,
      fat: 12,
    },
    spiceLevel: 'mild',
    preparationTime: 5,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: '2 pieces' },
        { name: 'Large', price: 40, description: '4 pieces' },
      ],
      addOns: [
        { name: 'Vanilla Ice Cream', price: 40 },
        { name: 'Extra Honey', price: 10 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },
  {
    id: 'kunafa',
    name: 'Kunafa',
    description: 'Traditional Middle Eastern dessert with shredded phyllo, cheese, and rose syrup',
    price: 100,
    category: 'desserts',
    images: [
    ],
    ingredients: ['Shredded phyllo', 'Ricotta cheese', 'Rose syrup', 'Pistachios', 'Butter'],
    nutritionalInfo: {
      calories: 320,
      protein: 8,
      carbs: 35,
      fat: 16,
    },
    spiceLevel: 'mild',
    preparationTime: 10,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Individual serving' },
        { name: 'Large', price: 50, description: 'Sharing portion' },
      ],
      addOns: [
        { name: 'Extra Pistachios', price: 20 },
        { name: 'Rose Petals', price: 10 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },
  {
    id: 'ice-cream',
    name: 'Ice Cream',
    description: 'Selection of premium ice cream flavors including vanilla, chocolate, and pistachio',
    price: 60,
    category: 'desserts',
    images: [
      
    ],
    ingredients: ['Premium ice cream', 'Various flavors'],
    nutritionalInfo: {
      calories: 180,
      protein: 4,
      carbs: 20,
      fat: 10,
    },
    spiceLevel: 'mild',
    preparationTime: 2,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Single scoop' },
        { name: 'Large', price: 30, description: 'Double scoop' },
      ],
      addOns: [
        { name: 'Chocolate Sauce', price: 10 },
        { name: 'Nuts', price: 20 },
        { name: 'Wafer', price: 10 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },
];

// Helper functions to filter mock data
export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  if (category === 'all') return mockMenuItems;
  return mockMenuItems.filter(item => item.category === category);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return mockMenuItems.find(item => item.id === id);
};

export const searchMenuItems = (query: string): MenuItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockMenuItems.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowercaseQuery))
  );
};

export const getFeaturedItems = (count: number = 6): MenuItem[] => {
  return mockMenuItems
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, count);
}; 