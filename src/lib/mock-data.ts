import { MenuItem, Review } from "@/types";

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    customerId: "customer1",
    customerName: "Ahmed Hassan",
    rating: 5,
    comment:
      "Absolutely authentic! The lamb mandi reminded me of home. Perfect spices and tender meat.",
    images: [],
    createdAt: new Date("2024-01-15"),
    isVerified: true,
  },
  {
    id: "2",
    customerId: "customer2",
    customerName: "Sarah Johnson",
    rating: 4,
    comment:
      "Delicious food and generous portions. The chicken mandi was flavorful and the rice was perfectly cooked.",
    images: [],
    createdAt: new Date("2024-01-10"),
    isVerified: true,
  },
  {
    id: "3",
    customerId: "customer3",
    customerName: "Omar Al-Rashid",
    rating: 5,
    comment:
      "Best Middle Eastern food in the city! The mutton mandi is exceptional.",
    createdAt: new Date("2024-01-08"),
    isVerified: true,
  },
];

// Menu data based on provided Soofi Mandi menu
export const mockMenuItems: MenuItem[] = [
  // MANDI SECTION
  {
    id: "chicken-mandi",
    name: "Chicken Mandi",
    description:
      "Traditional Arabian chicken mandi with fragrant basmati rice, slow-cooked to perfection",
    price: 780,
    category: "mandi",
    images: [],
    ingredients: [
      "Whole chicken",
      "Basmati rice",
      "Traditional spices",
      "Saffron",
      "Onions",
    ],
    nutritionalInfo: { calories: 580, protein: 40, carbs: 50, fat: 20 },
    spiceLevel: "medium",
    preparationTime: 45,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -580, description: "Quarter portion - ₹200" },
        { name: "Half", price: -380, description: "Half portion - ₹400" },
        { name: "Full", price: 0, description: "Full portion - ₹780" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -660 },
        { name: "Chicken Only Half", price: -540 },
        { name: "Chicken Only Full", price: -300 },
        { name: "Extra Rice", price: 40 },
      ],
    },
    reviews: mockReviews.slice(0, 2),
    averageRating: 4.6,
  },
  {
    id: "mutton-mandi",
    name: "Mutton Mandi",
    description:
      "Premium mutton slow-cooked with aromatic spices and served with golden basmati rice",
    price: 1500,
    category: "mandi",
    images: [],
    ingredients: [
      "Premium mutton",
      "Basmati rice",
      "Traditional spices",
      "Saffron",
    ],
    nutritionalInfo: { calories: 720, protein: 48, carbs: 52, fat: 30 },
    spiceLevel: "medium",
    preparationTime: 60,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        {
          name: "Quarter",
          price: -1100,
          description: "Quarter portion - ₹400",
        },
        { name: "Half", price: -700, description: "Half portion - ₹800" },
        { name: "Full", price: 0, description: "Full portion - ₹1500" },
      ],
      addOns: [
        { name: "Mutton Only Quarter", price: -1200 },
        { name: "Mutton Only Half", price: -900 },
        { name: "Mutton Only Full", price: -300 },
      ],
    },
    reviews: [mockReviews[2]],
    averageRating: 4.9,
  },
  {
    id: "mutton-magli-mandi",
    name: "Mutton Magli Mandi",
    description:
      "Fried mutton mandi with crispy texture and traditional spices, served with aromatic rice",
    price: 1680,
    category: "mandi",
    images: [],
    ingredients: [
      "Fried mutton",
      "Basmati rice",
      "Special spice blend",
      "Crispy onions",
    ],
    nutritionalInfo: { calories: 750, protein: 45, carbs: 55, fat: 35 },
    spiceLevel: "medium",
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        {
          name: "Quarter",
          price: -1250,
          description: "Quarter portion - ₹430",
        },
        { name: "Half", price: -820, description: "Half portion - ₹860" },
        { name: "Full", price: 0, description: "Full portion - ₹1680" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -1350 },
        { name: "Chicken Only Half", price: -1020 },
        { name: "Chicken Only Full", price: -380 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },
  {
    id: "grilled-mutton-mandi",
    name: "Grilled Mutton Mandi",
    description:
      "Perfectly grilled mutton with smoky flavor, served with traditional mandi rice",
    price: 1680,
    category: "mandi",
    images: [],
    ingredients: [
      "Grilled mutton",
      "Basmati rice",
      "Smoky spices",
      "Charcoal flavor",
    ],
    nutritionalInfo: { calories: 680, protein: 50, carbs: 48, fat: 28 },
    spiceLevel: "medium",
    preparationTime: 55,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        {
          name: "Quarter",
          price: -1250,
          description: "Quarter portion - ₹430",
        },
        { name: "Half", price: -820, description: "Half portion - ₹860" },
        { name: "Full", price: 0, description: "Full portion - ₹1680" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -1350 },
        { name: "Chicken Only Half", price: -1020 },
        { name: "Chicken Only Full", price: -380 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },
  {
    id: "fish-mandi",
    name: "Fish Mandi",
    description:
      "Fresh fish cooked with traditional mandi spices and served with aromatic basmati rice",
    price: 1160,
    category: "mandi",
    images: [],
    ingredients: [
      "Fresh fish",
      "Basmati rice",
      "Coastal spices",
      "Lemon",
      "Fresh herbs",
    ],
    nutritionalInfo: { calories: 520, protein: 42, carbs: 45, fat: 18 },
    spiceLevel: "mild",
    preparationTime: 40,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -870, description: "Quarter portion - ₹290" },
        { name: "Half", price: -580, description: "Half portion - ₹580" },
        { name: "Full", price: 0, description: "Full portion - ₹1160" },
      ],
      addOns: [
        { name: "Fish Only Quarter", price: -970 },
        { name: "Fish Only Half", price: -880 },
        { name: "Fish Only Full", price: -600 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },
  {
    id: "chicken-madfoon-mandi",
    name: "Chicken Madfoon Mandi",
    description:
      "Traditional buried chicken cooked underground style with special spices and mandi rice",
    price: 850,
    category: "mandi",
    images: [],
    ingredients: [
      "Buried chicken",
      "Basmati rice",
      "Underground spices",
      "Traditional herbs",
    ],
    nutritionalInfo: { calories: 600, protein: 42, carbs: 52, fat: 22 },
    spiceLevel: "medium",
    preparationTime: 60,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -630, description: "Quarter portion - ₹220" },
        { name: "Half", price: -410, description: "Half portion - ₹440" },
        { name: "Full", price: 0, description: "Full portion - ₹850" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -730 },
        { name: "Chicken Only Half", price: -610 },
        { name: "Chicken Only Full", price: -370 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },
  {
    id: "mutton-madfoon-mandi",
    name: "Mutton Madfoon Mandi",
    description:
      "Traditional buried mutton cooked underground style with authentic spices and mandi rice",
    price: 1680,
    category: "mandi",
    images: [],
    ingredients: [
      "Buried mutton",
      "Basmati rice",
      "Underground spices",
      "Traditional herbs",
    ],
    nutritionalInfo: { calories: 740, protein: 48, carbs: 50, fat: 32 },
    spiceLevel: "medium",
    preparationTime: 70,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        {
          name: "Quarter",
          price: -1250,
          description: "Quarter portion - ₹430",
        },
        { name: "Half", price: -820, description: "Half portion - ₹860" },
        { name: "Full", price: 0, description: "Full portion - ₹1680" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -1350 },
        { name: "Chicken Only Half", price: -1020 },
        { name: "Chicken Only Full", price: -380 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },

  // ALFAHM MANDI SECTION
  {
    id: "alfahm-mandi",
    name: "Alfahm Mandi",
    description:
      "Traditional charcoal-grilled chicken with aromatic mandi rice and authentic spices",
    price: 850,
    category: "mandi",
    images: [],
    ingredients: [
      "Charcoal-grilled chicken",
      "Basmati rice",
      "Alfahm spices",
      "Smoky flavor",
    ],
    nutritionalInfo: { calories: 620, protein: 45, carbs: 48, fat: 25 },
    spiceLevel: "medium",
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -650, description: "Quarter portion - ₹200" },
        { name: "Half", price: -450, description: "Half portion - ₹400" },
        { name: "Full", price: 0, description: "Full portion - ₹850" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -720 },
        { name: "Chicken Only Half", price: -590 },
        { name: "Chicken Only Full", price: -370 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },
  {
    id: "fil-fil-alfahm-mandi",
    name: "Fil Fil Alfahm Mandi",
    description:
      "Spicy pepper-infused alfahm chicken with traditional mandi rice and fiery spices",
    price: 880,
    category: "mandi",
    images: [],
    ingredients: [
      "Pepper-spiced chicken",
      "Basmati rice",
      "Fil fil spices",
      "Hot peppers",
    ],
    nutritionalInfo: { calories: 640, protein: 46, carbs: 50, fat: 26 },
    spiceLevel: "hot",
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -660, description: "Quarter portion - ₹220" },
        { name: "Half", price: -440, description: "Half portion - ₹440" },
        { name: "Full", price: 0, description: "Full portion - ₹880" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -740 },
        { name: "Chicken Only Half", price: -610 },
        { name: "Chicken Only Full", price: -330 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },
  {
    id: "peri-peri-alfahm-mandi",
    name: "Peri Peri Alfahm Mandi",
    description:
      "Portuguese-style peri peri spiced alfahm chicken with aromatic mandi rice",
    price: 880,
    category: "mandi",
    images: [],
    ingredients: [
      "Peri peri chicken",
      "Basmati rice",
      "Portuguese spices",
      "Chili peppers",
    ],
    nutritionalInfo: { calories: 630, protein: 44, carbs: 49, fat: 27 },
    spiceLevel: "hot",
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -650, description: "Quarter portion - ₹230" },
        { name: "Half", price: -420, description: "Half portion - ₹460" },
        { name: "Full", price: 0, description: "Full portion - ₹880" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -740 },
        { name: "Chicken Only Half", price: -610 },
        { name: "Chicken Only Full", price: -330 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },
  {
    id: "honey-chilli-alfahm-mandi",
    name: "Honey Chilli Alfahm Mandi",
    description:
      "Sweet and spicy honey chilli glazed alfahm chicken with traditional mandi rice",
    price: 920,
    category: "mandi",
    images: [],
    ingredients: [
      "Honey chilli chicken",
      "Basmati rice",
      "Honey glaze",
      "Chilli spices",
    ],
    nutritionalInfo: { calories: 650, protein: 43, carbs: 52, fat: 28 },
    spiceLevel: "medium",
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -680, description: "Quarter portion - ₹240" },
        { name: "Half", price: -440, description: "Half portion - ₹480" },
        { name: "Full", price: 0, description: "Full portion - ₹920" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -770 },
        { name: "Chicken Only Half", price: -620 },
        { name: "Chicken Only Full", price: -340 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },
  {
    id: "turkish-alfahm-mandi",
    name: "Turkish Alfahm Mandi",
    description:
      "Turkish-style spiced alfahm chicken with aromatic mandi rice and Mediterranean herbs",
    price: 920,
    category: "mandi",
    images: [],
    ingredients: [
      "Turkish spiced chicken",
      "Basmati rice",
      "Mediterranean herbs",
      "Turkish spices",
    ],
    nutritionalInfo: { calories: 640, protein: 45, carbs: 50, fat: 26 },
    spiceLevel: "medium",
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -680, description: "Quarter portion - ₹240" },
        { name: "Half", price: -440, description: "Half portion - ₹480" },
        { name: "Full", price: 0, description: "Full portion - ₹920" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -770 },
        { name: "Chicken Only Half", price: -620 },
        { name: "Chicken Only Full", price: -330 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  // SPECIAL ALFAHM SECTION
  {
    id: "afgani-alfahm-mandi",
    name: "Afgani Alfahm Mandi",
    description:
      "Afghan-style creamy and mild alfahm chicken with traditional mandi rice",
    price: 950,
    category: "mandi",
    images: [],
    ingredients: [
      "Afgani spiced chicken",
      "Basmati rice",
      "Cream marinade",
      "Afghan spices",
    ],
    nutritionalInfo: { calories: 680, protein: 47, carbs: 52, fat: 30 },
    spiceLevel: "mild",
    preparationTime: 55,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -680, description: "Quarter portion - ₹270" },
        { name: "Half", price: -410, description: "Half portion - ₹540" },
        { name: "Full", price: 0, description: "Full portion - ₹950" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -770 },
        { name: "Chicken Only Half", price: -590 },
        { name: "Chicken Only Full", price: -270 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },
  {
    id: "lebanese-alfahm-mandi",
    name: "Lebanese Alfahm Mandi",
    description:
      "Lebanese-style herb-crusted alfahm chicken with aromatic mandi rice",
    price: 980,
    category: "mandi",
    images: [],
    ingredients: [
      "Lebanese spiced chicken",
      "Basmati rice",
      "Fresh herbs",
      "Lebanese spices",
    ],
    nutritionalInfo: { calories: 660, protein: 46, carbs: 51, fat: 28 },
    spiceLevel: "medium",
    preparationTime: 55,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -710, description: "Quarter portion - ₹270" },
        { name: "Half", price: -440, description: "Half portion - ₹540" },
        { name: "Full", price: 0, description: "Full portion - ₹980" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -800 },
        { name: "Chicken Only Half", price: -620 },
        { name: "Chicken Only Full", price: -300 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },
  {
    id: "tawa-alfahm-mandi",
    name: "Tawa Alfahm Mandi",
    description:
      "Tawa-grilled alfahm chicken with smoky flavor and traditional mandi rice",
    price: 980,
    category: "mandi",
    images: [],
    ingredients: [
      "Tawa-grilled chicken",
      "Basmati rice",
      "Tawa spices",
      "Smoky flavor",
    ],
    nutritionalInfo: { calories: 650, protein: 45, carbs: 50, fat: 27 },
    spiceLevel: "medium",
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -710, description: "Quarter portion - ₹270" },
        { name: "Half", price: -440, description: "Half portion - ₹540" },
        { name: "Full", price: 0, description: "Full portion - ₹980" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -790 },
        { name: "Chicken Only Half", price: -620 },
        { name: "Chicken Only Full", price: -300 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },
  {
    id: "spicy-kanthari-alfahm-mandi",
    name: "Spicy Kanthari Alfahm Mandi",
    description:
      "Fiery kanthari pepper spiced alfahm chicken with traditional mandi rice",
    price: 980,
    category: "mandi",
    images: [],
    ingredients: [
      "Kanthari spiced chicken",
      "Basmati rice",
      "Kanthari peppers",
      "Spicy marinade",
    ],
    nutritionalInfo: { calories: 640, protein: 44, carbs: 49, fat: 28 },
    spiceLevel: "hot",
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -710, description: "Quarter portion - ₹270" },
        { name: "Half", price: -440, description: "Half portion - ₹540" },
        { name: "Full", price: 0, description: "Full portion - ₹980" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -790 },
        { name: "Chicken Only Half", price: -620 },
        { name: "Chicken Only Full", price: -300 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  // SHAWAYA MANDI SECTION
  {
    id: "arabic-shawaya-mandi",
    name: "Arabic Shawaya Mandi",
    description:
      "Traditional Arabic-style grilled chicken with authentic spices and mandi rice",
    price: 850,
    category: "mandi",
    images: [],
    ingredients: [
      "Arabic grilled chicken",
      "Basmati rice",
      "Traditional Arabic spices",
      "Grilled flavor",
    ],
    nutritionalInfo: { calories: 600, protein: 42, carbs: 48, fat: 24 },
    spiceLevel: "medium",
    preparationTime: 45,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -630, description: "Quarter portion - ₹220" },
        { name: "Half", price: -410, description: "Half portion - ₹440" },
        { name: "Full", price: 0, description: "Full portion - ₹850" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -730 },
        { name: "Chicken Only Half", price: -610 },
        { name: "Chicken Only Full", price: -370 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },
  {
    id: "masala-shawaya-mandi",
    name: "Masala Shawaya Mandi",
    description:
      "Indian masala spiced shawaya chicken with aromatic mandi rice",
    price: 880,
    category: "mandi",
    images: [],
    ingredients: [
      "Masala spiced chicken",
      "Basmati rice",
      "Indian spices",
      "Grilled flavor",
    ],
    nutritionalInfo: { calories: 620, protein: 43, carbs: 49, fat: 25 },
    spiceLevel: "medium",
    preparationTime: 45,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -650, description: "Quarter portion - ₹230" },
        { name: "Half", price: -420, description: "Half portion - ₹460" },
        { name: "Full", price: 0, description: "Full portion - ₹880" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -740 },
        { name: "Chicken Only Half", price: -600 },
        { name: "Chicken Only Full", price: -330 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },
  {
    id: "peri-peri-shawaya-mandi",
    name: "Peri Peri Shawaya Mandi",
    description:
      "Portuguese peri peri spiced shawaya chicken with traditional mandi rice",
    price: 920,
    category: "mandi",
    images: [],
    ingredients: [
      "Peri peri chicken",
      "Basmati rice",
      "Portuguese spices",
      "Chili peppers",
    ],
    nutritionalInfo: { calories: 630, protein: 44, carbs: 50, fat: 26 },
    spiceLevel: "hot",
    preparationTime: 45,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -670, description: "Quarter portion - ₹250" },
        { name: "Half", price: -440, description: "Half portion - ₹480" },
        { name: "Full", price: 0, description: "Full portion - ₹920" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -770 },
        { name: "Chicken Only Half", price: -620 },
        { name: "Chicken Only Full", price: -340 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },
  {
    id: "honey-shawaya-mandi",
    name: "Honey Shawaya Mandi",
    description: "Sweet honey glazed shawaya chicken with aromatic mandi rice",
    price: 920,
    category: "mandi",
    images: [],
    ingredients: [
      "Honey glazed chicken",
      "Basmati rice",
      "Honey marinade",
      "Sweet spices",
    ],
    nutritionalInfo: { calories: 640, protein: 43, carbs: 52, fat: 25 },
    spiceLevel: "mild",
    preparationTime: 45,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -670, description: "Quarter portion - ₹250" },
        { name: "Half", price: -440, description: "Half portion - ₹480" },
        { name: "Full", price: 0, description: "Full portion - ₹920" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -770 },
        { name: "Chicken Only Half", price: -620 },
        { name: "Chicken Only Full", price: -340 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },
  {
    id: "spicy-kanthari-shawaya-mandi",
    name: "Spicy Kanthari Shawaya Mandi",
    description:
      "Fiery kanthari pepper spiced shawaya chicken with traditional mandi rice",
    price: 980,
    category: "mandi",
    images: [],
    ingredients: [
      "Kanthari spiced chicken",
      "Basmati rice",
      "Kanthari peppers",
      "Spicy marinade",
    ],
    nutritionalInfo: { calories: 630, protein: 44, carbs: 49, fat: 27 },
    spiceLevel: "hot",
    preparationTime: 45,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Quarter", price: -720, description: "Quarter portion - ₹260" },
        { name: "Half", price: -460, description: "Half portion - ₹520" },
        { name: "Full", price: 0, description: "Full portion - ₹980" },
      ],
      addOns: [
        { name: "Chicken Only Quarter", price: -830 },
        { name: "Chicken Only Half", price: -680 },
        { name: "Chicken Only Full", price: -400 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  // CHICKEN BROAST SECTION
  {
    id: "chicken-broast-2pcs",
    name: "Chicken Broast 2 PCS Combo",
    description:
      "Our expertly seasoned chicken is coated in a perfectly crispy batter, guaranteeing a satisfying crunch in every bite. Served with bun, spicy mayo and french fries.",
    price: 170,
    category: "appetizers",
    images: [],
    ingredients: [
      "Crispy chicken",
      "Bun",
      "Spicy mayo",
      "French fries",
      "Special coating",
    ],
    nutritionalInfo: { calories: 520, protein: 35, carbs: 40, fat: 25 },
    spiceLevel: "medium",
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Normal", price: 0, description: "Regular spice level - ₹170" },
        { name: "Spicy", price: 10, description: "Extra spicy - ₹180" },
      ],
      addOns: [
        { name: "Extra Mayo", price: 20 },
        { name: "Extra Fries", price: 30 },
        { name: "Cheese Slice", price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },
  {
    id: "chicken-broast-4pcs",
    name: "Chicken Broast 4 PCS Combo",
    description:
      "Four pieces of expertly seasoned crispy chicken with bun, spicy mayo and french fries.",
    price: 330,
    category: "appetizers",
    images: [],
    ingredients: [
      "Crispy chicken (4pcs)",
      "Bun",
      "Spicy mayo",
      "French fries",
      "Special coating",
    ],
    nutritionalInfo: { calories: 920, protein: 65, carbs: 70, fat: 45 },
    spiceLevel: "medium",
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Normal", price: 0, description: "Regular spice level - ₹330" },
        { name: "Spicy", price: 20, description: "Extra spicy - ₹350" },
      ],
      addOns: [
        { name: "Extra Mayo", price: 30 },
        { name: "Extra Fries", price: 50 },
        { name: "Cheese Slice", price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },
  {
    id: "chicken-broast-8pcs",
    name: "Chicken Broast 8 PCS Combo",
    description:
      "Eight pieces of expertly seasoned crispy chicken with bun, spicy mayo and french fries.",
    price: 580,
    category: "appetizers",
    images: [],
    ingredients: [
      "Crispy chicken (8pcs)",
      "Bun",
      "Spicy mayo",
      "French fries",
      "Special coating",
    ],
    nutritionalInfo: { calories: 1680, protein: 120, carbs: 130, fat: 85 },
    spiceLevel: "medium",
    preparationTime: 30,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Normal", price: 0, description: "Regular spice level - ₹580" },
        { name: "Spicy", price: 40, description: "Extra spicy - ₹620" },
      ],
      addOns: [
        { name: "Extra Mayo", price: 50 },
        { name: "Extra Fries", price: 80 },
        { name: "Cheese Slice", price: 60 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  // RICE & NOODLES SECTION
  {
    id: "steamed-rice",
    name: "Steamed Rice",
    description: "Perfectly steamed basmati rice, light and fluffy",
    price: 90,
    category: "rice",
    images: [],
    ingredients: ["Basmati rice", "Water", "Salt"],
    nutritionalInfo: { calories: 280, protein: 6, carbs: 58, fat: 1 },
    spiceLevel: "mild",
    preparationTime: 20,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹90" },
      ],
      addOns: [
        { name: "Butter", price: 15 },
        { name: "Fried Onions", price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.0,
  },
  {
    id: "jeera-rice",
    name: "Jeera Rice",
    description: "Aromatic basmati rice cooked with cumin seeds and spices",
    price: 130,
    category: "rice",
    images: [],
    ingredients: ["Basmati rice", "Cumin seeds", "Ghee", "Spices"],
    nutritionalInfo: { calories: 320, protein: 7, carbs: 62, fat: 6 },
    spiceLevel: "mild",
    preparationTime: 25,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹130" },
      ],
      addOns: [
        { name: "Extra Ghee", price: 20 },
        { name: "Fried Onions", price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },
  {
    id: "ghee-rice",
    name: "Ghee Rice",
    description:
      "Fragrant basmati rice cooked in pure ghee with aromatic spices",
    price: 90,
    category: "rice",
    images: [],
    ingredients: ["Basmati rice", "Pure ghee", "Cardamom", "Bay leaves"],
    nutritionalInfo: { calories: 340, protein: 6, carbs: 60, fat: 8 },
    spiceLevel: "mild",
    preparationTime: 25,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹90" },
      ],
      addOns: [
        { name: "Extra Ghee", price: 25 },
        { name: "Cashews", price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },
  {
    id: "veg-fried-rice",
    name: "Veg Fried Rice",
    description: "Wok-tossed rice with fresh vegetables and aromatic spices",
    price: 190,
    category: "rice",
    images: [],
    ingredients: ["Basmati rice", "Mixed vegetables", "Soy sauce", "Spices"],
    nutritionalInfo: { calories: 380, protein: 8, carbs: 65, fat: 10 },
    spiceLevel: "medium",
    preparationTime: 20,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹190" },
      ],
      addOns: [
        { name: "Extra Vegetables", price: 30 },
        { name: "Paneer", price: 50 },
      ],
    },
    reviews: [],
    averageRating: 4.1,
  },
  {
    id: "egg-fried-rice",
    name: "Egg Fried Rice",
    description: "Classic fried rice with scrambled eggs and aromatic spices",
    price: 180,
    category: "rice",
    images: [],
    ingredients: ["Basmati rice", "Eggs", "Onions", "Soy sauce", "Spices"],
    nutritionalInfo: { calories: 420, protein: 12, carbs: 62, fat: 14 },
    spiceLevel: "medium",
    preparationTime: 18,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹180" },
      ],
      addOns: [
        { name: "Extra Egg", price: 25 },
        { name: "Vegetables", price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    description:
      "Delicious fried rice with tender chicken pieces and aromatic spices",
    price: 220,
    category: "rice",
    images: [],
    ingredients: ["Basmati rice", "Chicken", "Eggs", "Vegetables", "Soy sauce"],
    nutritionalInfo: { calories: 480, protein: 22, carbs: 58, fat: 18 },
    spiceLevel: "medium",
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹220" },
      ],
      addOns: [
        { name: "Extra Chicken", price: 50 },
        { name: "Extra Vegetables", price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  // TIKKA & KEBABS SECTION
  {
    id: "chicken-kebab-1pc",
    name: "Chicken Kebab (1 PC)",
    description: "Tender grilled chicken kebab marinated in traditional spices",
    price: 130,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken", "Yogurt", "Spices", "Herbs"],
    nutritionalInfo: { calories: 180, protein: 25, carbs: 5, fat: 8 },
    spiceLevel: "medium",
    preparationTime: 15,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "1 PC", price: 0, description: "Single piece - ₹130" },
        { name: "3 PCS", price: 250, description: "Three pieces - ₹380" },
      ],
      addOns: [
        { name: "Mint Chutney", price: 20 },
        { name: "Onion Salad", price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: "mutton-kebab-1pc",
    name: "Mutton Kebab (1 PC)",
    description:
      "Succulent mutton kebab grilled to perfection with aromatic spices",
    price: 180,
    category: "appetizers",
    images: [],
    ingredients: ["Mutton", "Yogurt", "Garam masala", "Fresh herbs"],
    nutritionalInfo: { calories: 220, protein: 28, carbs: 4, fat: 12 },
    spiceLevel: "medium",
    preparationTime: 18,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "1 PC", price: 0, description: "Single piece - ₹180" },
        { name: "3 PCS", price: 340, description: "Three pieces - ₹520" },
      ],
      addOns: [
        { name: "Mint Chutney", price: 20 },
        { name: "Onion Salad", price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: "chicken-tikka-6pcs",
    name: "Chicken Tikka (6 PCS)",
    description:
      "Six pieces of tender chicken tikka marinated in yogurt and spices",
    price: 290,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken", "Yogurt", "Tikka masala", "Bell peppers"],
    nutritionalInfo: { calories: 480, protein: 45, carbs: 8, fat: 18 },
    spiceLevel: "medium",
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [{ name: "6 PCS", price: 0, description: "Six pieces - ₹290" }],
      addOns: [
        { name: "Mint Chutney", price: 25 },
        { name: "Onion Salad", price: 20 },
        { name: "Extra Tikka", price: 80 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: "malai-tikka-6pcs",
    name: "Malai Tikka (6 PCS)",
    description:
      "Creamy and mild chicken tikka marinated in cream and cashew paste",
    price: 320,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken", "Cream", "Cashew paste", "Mild spices"],
    nutritionalInfo: { calories: 520, protein: 42, carbs: 6, fat: 22 },
    spiceLevel: "mild",
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [{ name: "6 PCS", price: 0, description: "Six pieces - ₹320" }],
      addOns: [
        { name: "Mint Chutney", price: 25 },
        { name: "Extra Cream", price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },

  {
    id: "jojo-kebab-6pcs",
    name: "Jojo Kebab (6 PCS)",
    description:
      "Special jojo style kebab with unique spice blend and tender texture",
    price: 350,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken", "Special jojo spices", "Yogurt", "Herbs"],
    nutritionalInfo: { calories: 460, protein: 40, carbs: 8, fat: 20 },
    spiceLevel: "medium",
    preparationTime: 22,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [{ name: "6 PCS", price: 0, description: "Six pieces - ₹350" }],
      addOns: [
        { name: "Mint Chutney", price: 25 },
        { name: "Onion Salad", price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: "chicken-cheese-kebab",
    name: "Chicken Cheese Kebab",
    description: "Delicious chicken kebab stuffed with melted cheese",
    price: 390,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken", "Cheese", "Spices", "Herbs"],
    nutritionalInfo: { calories: 540, protein: 38, carbs: 6, fat: 25 },
    spiceLevel: "medium",
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹390" },
      ],
      addOns: [
        { name: "Extra Cheese", price: 40 },
        { name: "Mint Chutney", price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: "mutton-babri-seekh-kebab-1pc",
    name: "Mutton Babri Seekh Kebab (1 PC)",
    description: "Traditional mutton seekh kebab with authentic babri spices",
    price: 200,
    category: "appetizers",
    images: [],
    ingredients: ["Minced mutton", "Babri spices", "Onions", "Herbs"],
    nutritionalInfo: { calories: 240, protein: 22, carbs: 4, fat: 15 },
    spiceLevel: "medium",
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "1 PC", price: 0, description: "Single piece - ₹200" },
        { name: "3 PCS", price: 380, description: "Three pieces - ₹580" },
      ],
      addOns: [
        { name: "Mint Chutney", price: 20 },
        { name: "Onion Salad", price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: "paneer-tikka-6pcs",
    name: "Paneer Tikka (6 PCS)",
    description: "Grilled cottage cheese cubes marinated in spices and yogurt",
    price: 330,
    category: "appetizers",
    images: [],
    ingredients: ["Paneer", "Yogurt", "Spices", "Bell peppers", "Onions"],
    nutritionalInfo: { calories: 420, protein: 24, carbs: 12, fat: 18 },
    spiceLevel: "medium",
    preparationTime: 18,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [{ name: "6 PCS", price: 0, description: "Six pieces - ₹330" }],
      addOns: [
        { name: "Mint Chutney", price: 25 },
        { name: "Extra Paneer", price: 50 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  {
    id: "ajwaini-fish-tikka",
    name: "Ajwaini Fish Tikka",
    description: "Fresh fish tikka marinated with ajwain and aromatic spices",
    price: 390,
    category: "appetizers",
    images: [],
    ingredients: ["Fresh fish", "Ajwain", "Yogurt", "Spices", "Lemon"],
    nutritionalInfo: { calories: 380, protein: 35, carbs: 6, fat: 16 },
    spiceLevel: "medium",
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹390" },
      ],
      addOns: [
        { name: "Mint Chutney", price: 25 },
        { name: "Lemon Wedges", price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: "kebab-platter-small",
    name: "Kebab Platter (Small)",
    description:
      "Assorted kebab platter with chicken, mutton, and fish varieties",
    price: 800,
    category: "appetizers",
    images: [],
    ingredients: [
      "Mixed kebabs",
      "Chicken tikka",
      "Mutton kebab",
      "Fish tikka",
    ],
    nutritionalInfo: { calories: 920, protein: 65, carbs: 15, fat: 35 },
    spiceLevel: "medium",
    preparationTime: 30,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Small", price: 0, description: "Small platter - ₹800" },
        { name: "Large", price: 400, description: "Large platter - ₹1200" },
      ],
      addOns: [
        { name: "Mint Chutney", price: 30 },
        { name: "Onion Salad", price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },

  // STARTERS - CHICKEN SECTION
  {
    id: "chicken-kebab-starter",
    name: "Chicken Kebab Starter",
    description: "Starter portion of grilled chicken kebab with spices",
    price: 120,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken", "Starter spices", "Yogurt", "Herbs"],
    nutritionalInfo: { calories: 280, protein: 28, carbs: 6, fat: 12 },
    spiceLevel: "medium",
    preparationTime: 15,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Small", price: 0, description: "Small portion - ₹120" },
        { name: "Medium", price: 110, description: "Medium portion - ₹230" },
        { name: "Large", price: 270, description: "Large portion - ₹390" },
      ],
      addOns: [
        { name: "Mint Chutney", price: 20 },
        { name: "Onion Salad", price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },

  {
    id: "dynamite-chicken",
    name: "Dynamite Chicken",
    description: "Explosive flavored chicken with spicy dynamite sauce",
    price: 280,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken", "Dynamite sauce", "Spices", "Bell peppers"],
    nutritionalInfo: { calories: 420, protein: 32, carbs: 12, fat: 18 },
    spiceLevel: "hot",
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹280" },
      ],
      addOns: [
        { name: "Extra Sauce", price: 25 },
        { name: "Cheese", price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: "chicken-mushroom",
    name: "Chicken Mushroom",
    description: "Tender chicken pieces cooked with fresh mushrooms",
    price: 290,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken", "Fresh mushrooms", "Onions", "Spices"],
    nutritionalInfo: { calories: 380, protein: 30, carbs: 8, fat: 16 },
    spiceLevel: "medium",
    preparationTime: 22,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹290" },
      ],
      addOns: [
        { name: "Extra Mushrooms", price: 30 },
        { name: "Garlic Sauce", price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  {
    id: "dragon-chicken",
    name: "Dragon Chicken",
    description: "Fiery dragon-style chicken with bold flavors and spices",
    price: 280,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken", "Dragon sauce", "Chili", "Garlic"],
    nutritionalInfo: { calories: 400, protein: 31, carbs: 10, fat: 17 },
    spiceLevel: "hot",
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹280" },
      ],
      addOns: [
        { name: "Extra Spicy", price: 15 },
        { name: "Garlic Sauce", price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: "lollypop-chicken",
    name: "Lollypop Chicken",
    description: "Chicken drumettes shaped like lollipops with crispy coating",
    price: 290,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken drumettes", "Crispy coating", "Spices", "Herbs"],
    nutritionalInfo: { calories: 450, protein: 28, carbs: 15, fat: 20 },
    spiceLevel: "medium",
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹290" },
      ],
      addOns: [
        { name: "Dipping Sauce", price: 25 },
        { name: "Extra Spicy", price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: "chicken-strips",
    name: "Chicken Strips",
    description: "Crispy chicken strips with golden coating and herbs",
    price: 220,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken strips", "Breadcrumbs", "Herbs", "Spices"],
    nutritionalInfo: { calories: 380, protein: 26, carbs: 18, fat: 16 },
    spiceLevel: "mild",
    preparationTime: 18,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹220" },
      ],
      addOns: [
        { name: "Honey Mustard", price: 20 },
        { name: "BBQ Sauce", price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },

  {
    id: "hakka-chicken",
    name: "Hakka Chicken",
    description: "Indo-Chinese style hakka chicken with bold flavors",
    price: 360,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken", "Hakka sauce", "Vegetables", "Soy sauce"],
    nutritionalInfo: { calories: 480, protein: 35, carbs: 12, fat: 22 },
    spiceLevel: "medium",
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹360" },
      ],
      addOns: [
        { name: "Extra Vegetables", price: 30 },
        { name: "Schezwan Sauce", price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: "flaming-hot-wings",
    name: "Flaming Hot Wings",
    description: "Spicy chicken wings with fiery hot sauce coating",
    price: 280,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken wings", "Hot sauce", "Butter", "Spices"],
    nutritionalInfo: { calories: 420, protein: 24, carbs: 8, fat: 22 },
    spiceLevel: "hot",
    preparationTime: 22,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹280" },
      ],
      addOns: [
        { name: "Extra Hot Sauce", price: 20 },
        { name: "Blue Cheese Dip", price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: "hot-chilly-wings",
    name: "Hot Chilly Wings",
    description: "Chicken wings tossed in spicy chili sauce",
    price: 290,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken wings", "Chili sauce", "Garlic", "Herbs"],
    nutritionalInfo: { calories: 410, protein: 25, carbs: 9, fat: 21 },
    spiceLevel: "hot",
    preparationTime: 22,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹290" },
      ],
      addOns: [
        { name: "Extra Chili", price: 15 },
        { name: "Ranch Dip", price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: "chicken-nuggets-tawa",
    name: "Chicken Nuggets/Tawa",
    description: "Crispy chicken nuggets cooked on tawa with spices",
    price: 280,
    category: "appetizers",
    images: [],
    ingredients: ["Chicken nuggets", "Tawa spices", "Onions", "Peppers"],
    nutritionalInfo: { calories: 390, protein: 28, carbs: 16, fat: 18 },
    spiceLevel: "medium",
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹280" },
      ],
      addOns: [
        { name: "Ketchup", price: 15 },
        { name: "Mayo", price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  {
    id: "loaded-fries-chicken",
    name: "Loaded Fries Chicken",
    description: "Crispy fries loaded with chicken pieces, cheese and sauces",
    price: 390,
    category: "appetizers",
    images: [],
    ingredients: ["French fries", "Chicken pieces", "Cheese", "Sauces"],
    nutritionalInfo: { calories: 620, protein: 25, carbs: 45, fat: 28 },
    spiceLevel: "medium",
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹390" },
      ],
      addOns: [
        { name: "Extra Cheese", price: 40 },
        { name: "Extra Chicken", price: 50 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  // STARTERS - VEG SECTION
  {
    id: "crispy-corn",
    name: "Crispy Corn",
    description: "Golden crispy corn kernels with spices and herbs",
    price: 220,
    category: "appetizers",
    images: [],
    ingredients: ["Sweet corn", "Spices", "Herbs", "Crispy coating"],
    nutritionalInfo: { calories: 280, protein: 8, carbs: 35, fat: 12 },
    spiceLevel: "mild",
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹220" },
      ],
      addOns: [
        { name: "Cheese", price: 30 },
        { name: "Chili Flakes", price: 10 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },

  {
    id: "periperi-fries",
    name: "Peri Peri Fries",
    description: "Crispy french fries tossed in spicy peri peri seasoning",
    price: 120,
    category: "appetizers",
    images: [],
    ingredients: ["French fries", "Peri peri seasoning", "Herbs"],
    nutritionalInfo: { calories: 320, protein: 4, carbs: 42, fat: 16 },
    spiceLevel: "hot",
    preparationTime: 12,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹120" },
      ],
      addOns: [
        { name: "Cheese", price: 30 },
        { name: "Mayo", price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.1,
  },

  {
    id: "crispy-ca",
    name: "Crispy CA",
    description: "Crispy cauliflower with special coating and spices",
    price: 220,
    category: "appetizers",
    images: [],
    ingredients: ["Cauliflower", "Crispy coating", "Spices", "Herbs"],
    nutritionalInfo: { calories: 290, protein: 6, carbs: 28, fat: 14 },
    spiceLevel: "medium",
    preparationTime: 18,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹220" },
      ],
      addOns: [
        { name: "Sweet Chili Sauce", price: 20 },
        { name: "Mayo", price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },

  {
    id: "paneer-65",
    name: "Paneer 65",
    description: "Spicy and tangy paneer cubes in South Indian style",
    price: 260,
    category: "appetizers",
    images: [],
    ingredients: ["Paneer", "Yogurt", "Spices", "Curry leaves"],
    nutritionalInfo: { calories: 380, protein: 18, carbs: 12, fat: 22 },
    spiceLevel: "hot",
    preparationTime: 18,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹260" },
      ],
      addOns: [
        { name: "Mint Chutney", price: 20 },
        { name: "Onion Salad", price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  {
    id: "crispy-fried-veg",
    name: "Crispy Fried Veg",
    description: "Mixed vegetables with crispy coating and spices",
    price: 220,
    category: "appetizers",
    images: [],
    ingredients: ["Mixed vegetables", "Crispy coating", "Spices", "Herbs"],
    nutritionalInfo: { calories: 300, protein: 8, carbs: 28, fat: 14 },
    spiceLevel: "medium",
    preparationTime: 18,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹220" },
      ],
      addOns: [
        { name: "Sweet Chili Sauce", price: 20 },
        { name: "Mayo", price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },

  {
    id: "crispy-baby-corn",
    name: "Crispy Baby Corn",
    description: "Tender baby corn with golden crispy coating",
    price: 260,
    category: "appetizers",
    images: [],
    ingredients: ["Baby corn", "Crispy coating", "Spices", "Herbs"],
    nutritionalInfo: { calories: 290, protein: 6, carbs: 32, fat: 12 },
    spiceLevel: "mild",
    preparationTime: 16,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹260" },
      ],
      addOns: [
        { name: "Schezwan Sauce", price: 25 },
        { name: "Cheese", price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },

  {
    id: "chilli-mushroom",
    name: "Chilli Mushroom",
    description: "Spicy mushrooms tossed in chili sauce with peppers",
    price: 230,
    category: "appetizers",
    images: [],
    ingredients: ["Mushrooms", "Chili sauce", "Bell peppers", "Onions"],
    nutritionalInfo: { calories: 250, protein: 8, carbs: 18, fat: 10 },
    spiceLevel: "hot",
    preparationTime: 18,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Mushroom", price: 0, description: "Mushroom - ₹230" },
        { name: "Paneer", price: 0, description: "Paneer - ₹230" },
        { name: "Baby Corn", price: 0, description: "Baby Corn - ₹230" },
      ],
      addOns: [
        { name: "Extra Vegetables", price: 25 },
        { name: "Cheese", price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  // STARTERS - FISH SECTION
  {
    id: "kanthari-fish",
    name: "Kanthari Fish",
    description: "Spicy fish preparation with fiery kanthari peppers",
    price: 340,
    category: "appetizers",
    images: [],
    ingredients: ["Fresh fish", "Kanthari peppers", "Spices", "Curry leaves"],
    nutritionalInfo: { calories: 380, protein: 32, carbs: 8, fat: 18 },
    spiceLevel: "hot",
    preparationTime: 22,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Fish", price: 0, description: "Fish - ₹340" },
        { name: "Prawns", price: 40, description: "Prawns - ₹380" },
      ],
      addOns: [
        { name: "Extra Spicy", price: 15 },
        { name: "Lemon", price: 10 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: "seafood-basket",
    name: "Seafood Basket",
    description: "Mixed seafood platter with fish, prawns and calamari",
    price: 420,
    category: "appetizers",
    images: [],
    ingredients: ["Mixed seafood", "Fish", "Prawns", "Calamari", "Spices"],
    nutritionalInfo: { calories: 480, protein: 42, carbs: 12, fat: 22 },
    spiceLevel: "medium",
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹420" },
      ],
      addOns: [
        { name: "Tartar Sauce", price: 25 },
        { name: "Lemon Wedges", price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: "fish-finger",
    name: "Fish Finger",
    description: "Crispy fish fingers with golden coating and herbs",
    price: 280,
    category: "appetizers",
    images: [],
    ingredients: ["Fish fillets", "Breadcrumbs", "Herbs", "Spices"],
    nutritionalInfo: { calories: 350, protein: 28, carbs: 18, fat: 16 },
    spiceLevel: "mild",
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹280" },
      ],
      addOns: [
        { name: "Tartar Sauce", price: 25 },
        { name: "Ketchup", price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },

  {
    id: "dynamite-prawns",
    name: "Dynamite Prawns",
    description: "Explosive flavored prawns with spicy dynamite sauce",
    price: 410,
    category: "appetizers",
    images: [],
    ingredients: ["Prawns", "Dynamite sauce", "Spices", "Herbs"],
    nutritionalInfo: { calories: 420, protein: 35, carbs: 10, fat: 20 },
    spiceLevel: "hot",
    preparationTime: 22,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹410" },
      ],
      addOns: [
        { name: "Extra Sauce", price: 25 },
        { name: "Lemon", price: 10 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: "fish-n-chips",
    name: "Fish N Chips",
    description: "Classic fish and chips with crispy coating and fries",
    price: 420,
    category: "appetizers",
    images: [],
    ingredients: ["Fish fillet", "French fries", "Batter", "Tartar sauce"],
    nutritionalInfo: { calories: 580, protein: 30, carbs: 45, fat: 25 },
    spiceLevel: "mild",
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0, description: "Standard portion - ₹420" },
      ],
      addOns: [
        { name: "Extra Fries", price: 40 },
        { name: "Mushy Peas", price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  // DESSERTS SECTION
  {
    id: 'cream-kunafa',
    name: 'Cream Kunafa',
    description: 'Traditional Middle Eastern dessert with shredded phyllo and cream',
    price: 290,
    category: 'desserts',
    images: [],
    ingredients: ['Shredded phyllo', 'Cream', 'Sugar syrup', 'Pistachios'],
    nutritionalInfo: { calories: 420, protein: 8, carbs: 45, fat: 18 },
    spiceLevel: 'mild',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹290' },
      ],
      addOns: [
        { name: 'Extra Pistachios', price: 30 },
        { name: 'Ice Cream', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },

  {
    id: 'cheese-kunafa',
    name: 'Cheese Kunafa',
    description: 'Sweet cheese kunafa with crispy phyllo and rose syrup',
    price: 290,
    category: 'desserts',
    images: [],
    ingredients: ['Shredded phyllo', 'Sweet cheese', 'Rose syrup', 'Nuts'],
    nutritionalInfo: { calories: 450, protein: 12, carbs: 42, fat: 20 },
    spiceLevel: 'mild',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹290' },
      ],
      addOns: [
        { name: 'Extra Cheese', price: 35 },
        { name: 'Honey', price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: 'chocolate-kunafa',
    name: 'Chocolate Kunafa',
    description: 'Rich chocolate kunafa with crispy phyllo and chocolate sauce',
    price: 310,
    category: 'desserts',
    images: [],
    ingredients: ['Shredded phyllo', 'Chocolate', 'Chocolate sauce', 'Nuts'],
    nutritionalInfo: { calories: 480, protein: 9, carbs: 48, fat: 22 },
    spiceLevel: 'mild',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹310' },
      ],
      addOns: [
        { name: 'Extra Chocolate', price: 40 },
        { name: 'Vanilla Ice Cream', price: 45 },
      ],
    },
    reviews: [],
    averageRating: 4.9,
  },

  {
    id: 'ice-cream-kunafa',
    name: 'Ice Cream Kunafa',
    description: 'Cold kunafa served with vanilla ice cream and syrup',
    price: 340,
    category: 'desserts',
    images: [],
    ingredients: ['Shredded phyllo', 'Vanilla ice cream', 'Syrup', 'Nuts'],
    nutritionalInfo: { calories: 520, protein: 10, carbs: 52, fat: 24 },
    spiceLevel: 'mild',
    preparationTime: 10,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹340' },
      ],
      addOns: [
        { name: 'Extra Ice Cream', price: 50 },
        { name: 'Chocolate Sauce', price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },

  {
    id: 'nutella-kunafa',
    name: 'Nutella Kunafa',
    description: 'Decadent kunafa filled with creamy Nutella and hazelnuts',
    price: 370,
    category: 'desserts',
    images: [],
    ingredients: ['Shredded phyllo', 'Nutella', 'Hazelnuts', 'Syrup'],
    nutritionalInfo: { calories: 550, protein: 11, carbs: 50, fat: 28 },
    spiceLevel: 'mild',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹370' },
      ],
      addOns: [
        { name: 'Extra Nutella', price: 45 },
        { name: 'Whipped Cream', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.9,
  },

  {
    id: 'lotus-biscoff-kunafa',
    name: 'Lotus Biscoff Kunafa',
    description: 'Unique kunafa with Lotus Biscoff spread and cookie crumbs',
    price: 390,
    category: 'desserts',
    images: [],
    ingredients: ['Shredded phyllo', 'Lotus Biscoff', 'Cookie crumbs', 'Syrup'],
    nutritionalInfo: { calories: 580, protein: 9, carbs: 55, fat: 30 },
    spiceLevel: 'mild',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹390' },
      ],
      addOns: [
        { name: 'Extra Biscoff', price: 50 },
        { name: 'Ice Cream', price: 45 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },

  {
    id: 'chocolate-kunafa-bowl',
    name: 'Chocolate Kunafa Bowl',
    description: 'Chocolate kunafa served in a bowl with toppings',
    price: 240,
    category: 'desserts',
    images: [],
    ingredients: ['Kunafa', 'Chocolate', 'Toppings', 'Syrup'],
    nutritionalInfo: { calories: 380, protein: 7, carbs: 42, fat: 18 },
    spiceLevel: 'mild',
    preparationTime: 10,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹240' },
      ],
      addOns: [
        { name: 'Extra Chocolate', price: 30 },
        { name: 'Nuts', price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: 'mango-kunafa-bowl',
    name: 'Mango Kunafa Bowl',
    description: 'Fresh mango kunafa bowl with seasonal mango pieces',
    price: 250,
    category: 'desserts',
    images: [],
    ingredients: ['Kunafa', 'Fresh mango', 'Mango syrup', 'Cream'],
    nutritionalInfo: { calories: 360, protein: 6, carbs: 45, fat: 16 },
    spiceLevel: 'mild',
    preparationTime: 10,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹250' },
      ],
      addOns: [
        { name: 'Extra Mango', price: 35 },
        { name: 'Ice Cream', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: 'mixed-fruits-kunafa-bowl',
    name: 'Mixed Fruits Kunafa Bowl',
    description: 'Kunafa bowl topped with assorted fresh fruits',
    price: 250,
    category: 'desserts',
    images: [],
    ingredients: ['Kunafa', 'Mixed fruits', 'Fruit syrup', 'Cream'],
    nutritionalInfo: { calories: 340, protein: 6, carbs: 43, fat: 15 },
    spiceLevel: 'mild',
    preparationTime: 10,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹250' },
      ],
      addOns: [
        { name: 'Extra Fruits', price: 40 },
        { name: 'Honey', price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: 'umm-ali-nuts',
    name: 'Umm Ali Nuts',
    description: 'Traditional Egyptian bread pudding with mixed nuts',
    price: 190,
    category: 'desserts',
    images: [],
    ingredients: ['Bread', 'Milk', 'Mixed nuts', 'Raisins', 'Sugar'],
    nutritionalInfo: { calories: 320, protein: 8, carbs: 38, fat: 14 },
    spiceLevel: 'mild',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹190' },
      ],
      addOns: [
        { name: 'Extra Nuts', price: 30 },
        { name: 'Cream', price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  {
    id: 'umm-ali-chocolate',
    name: 'Umm Ali Chocolate',
    description: 'Chocolate flavored Umm Ali with rich cocoa and nuts',
    price: 250,
    category: 'desserts',
    images: [],
    ingredients: ['Bread', 'Chocolate milk', 'Cocoa', 'Nuts', 'Sugar'],
    nutritionalInfo: { calories: 380, protein: 9, carbs: 42, fat: 18 },
    spiceLevel: 'mild',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹250' },
      ],
      addOns: [
        { name: 'Extra Chocolate', price: 35 },
        { name: 'Whipped Cream', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: 'umm-ali-mango',
    name: 'Umm Ali Mango',
    description: 'Mango flavored Umm Ali with fresh mango pieces',
    price: 250,
    category: 'desserts',
    images: [],
    ingredients: ['Bread', 'Mango milk', 'Fresh mango', 'Nuts', 'Sugar'],
    nutritionalInfo: { calories: 350, protein: 7, carbs: 45, fat: 15 },
    spiceLevel: 'mild',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹250' },
      ],
      addOns: [
        { name: 'Extra Mango', price: 40 },
        { name: 'Ice Cream', price: 45 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: 'luqimat',
    name: 'Luqimat',
    description: 'Sweet ball with a crispy outside and fluffy within, drizzled with syrup',
    price: 100,
    category: 'desserts',
    images: [],
    ingredients: ['Flour', 'Yeast', 'Sugar syrup', 'Cardamom', 'Saffron'],
    nutritionalInfo: { calories: 220, protein: 4, carbs: 35, fat: 8 },
    spiceLevel: 'mild',
    preparationTime: 20,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹100' },
      ],
      addOns: [
        { name: 'Extra Syrup', price: 15 },
        { name: 'Honey', price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },

  // BREADS SECTION
  {
    id: 'kerala-parota',
    name: 'Kerala Parota',
    description: 'Traditional layered flatbread from Kerala, soft and flaky',
    price: 20,
    category: 'appetizers',
    images: [],
    ingredients: ['Flour', 'Oil', 'Salt', 'Water'],
    nutritionalInfo: { calories: 180, protein: 4, carbs: 28, fat: 6 },
    spiceLevel: 'mild',
    preparationTime: 10,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Single piece - ₹20' },
      ],
      addOns: [
        { name: 'Extra Ghee', price: 10 },
        { name: 'Curry', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },

  {
    id: 'wheat-parota',
    name: 'Wheat Parota',
    description: 'Healthy whole wheat parota, soft and nutritious',
    price: 25,
    category: 'appetizers',
    images: [],
    ingredients: ['Whole wheat flour', 'Oil', 'Salt', 'Water'],
    nutritionalInfo: { calories: 160, protein: 5, carbs: 26, fat: 5 },
    spiceLevel: 'mild',
    preparationTime: 10,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Single piece - ₹25' },
      ],
      addOns: [
        { name: 'Extra Ghee', price: 10 },
        { name: 'Curry', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.1,
  },

  {
    id: 'masala-roti',
    name: 'Masala Roti',
    description: 'Spiced Indian flatbread with aromatic herbs and spices',
    price: 30,
    category: 'appetizers',
    images: [],
    ingredients: ['Wheat flour', 'Spices', 'Herbs', 'Oil'],
    nutritionalInfo: { calories: 170, protein: 5, carbs: 28, fat: 5 },
    spiceLevel: 'medium',
    preparationTime: 12,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Regular - ₹30' },
        { name: 'Butter', price: 10, description: 'With butter - ₹40' },
      ],
      addOns: [
        { name: 'Extra Butter', price: 15 },
        { name: 'Pickle', price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },

  {
    id: 'masala-naan',
    name: 'Masala Naan',
    description: 'Leavened bread with spices, baked in tandoor',
    price: 35,
    category: 'appetizers',
    images: [],
    ingredients: ['Refined flour', 'Yogurt', 'Spices', 'Yeast'],
    nutritionalInfo: { calories: 200, protein: 6, carbs: 32, fat: 6 },
    spiceLevel: 'medium',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Regular - ₹35' },
        { name: 'Butter', price: 10, description: 'With butter - ₹45' },
      ],
      addOns: [
        { name: 'Extra Butter', price: 15 },
        { name: 'Garlic', price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  {
    id: 'kulcha',
    name: 'Kulcha',
    description: 'Soft leavened bread, perfect with curries',
    price: 45,
    category: 'appetizers',
    images: [],
    ingredients: ['Refined flour', 'Yogurt', 'Baking powder', 'Ghee'],
    nutritionalInfo: { calories: 220, protein: 6, carbs: 35, fat: 7 },
    spiceLevel: 'mild',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Regular - ₹45' },
        { name: 'Butter', price: 5, description: 'With butter - ₹50' },
      ],
      addOns: [
        { name: 'Extra Butter', price: 15 },
        { name: 'Onion Stuffing', price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },

  {
    id: 'kashmiri-naan',
    name: 'Kashmiri Naan',
    description: 'Sweet naan stuffed with dry fruits and nuts',
    price: 50,
    category: 'appetizers',
    images: [],
    ingredients: ['Refined flour', 'Dry fruits', 'Nuts', 'Sugar', 'Ghee'],
    nutritionalInfo: { calories: 280, protein: 8, carbs: 40, fat: 10 },
    spiceLevel: 'mild',
    preparationTime: 18,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹50' },
      ],
      addOns: [
        { name: 'Extra Nuts', price: 25 },
        { name: 'Honey', price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: 'garlic-naan',
    name: 'Garlic Naan',
    description: 'Aromatic naan topped with fresh garlic and herbs',
    price: 50,
    category: 'appetizers',
    images: [],
    ingredients: ['Refined flour', 'Fresh garlic', 'Herbs', 'Butter'],
    nutritionalInfo: { calories: 240, protein: 7, carbs: 34, fat: 8 },
    spiceLevel: 'mild',
    preparationTime: 15,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹50' },
      ],
      addOns: [
        { name: 'Extra Garlic', price: 15 },
        { name: 'Cheese', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: 'khamiri-roti',
    name: 'Khamiri Roti',
    description: 'Traditional fermented bread, soft and spongy',
    price: 30,
    category: 'appetizers',
    images: [],
    ingredients: ['Wheat flour', 'Yeast', 'Milk', 'Sugar'],
    nutritionalInfo: { calories: 190, protein: 6, carbs: 30, fat: 5 },
    spiceLevel: 'mild',
    preparationTime: 20,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹30' },
      ],
      addOns: [
        { name: 'Butter', price: 15 },
        { name: 'Jam', price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },

  // GRAVIES - VEG SECTION
  {
    id: 'veg-kurma',
    name: 'Veg Kurma',
    description: 'Mixed vegetables cooked in coconut and spice gravy',
    price: 190,
    category: 'appetizers',
    images: [],
    ingredients: ['Mixed vegetables', 'Coconut', 'Spices', 'Curry leaves'],
    nutritionalInfo: { calories: 280, protein: 8, carbs: 25, fat: 15 },
    spiceLevel: 'medium',
    preparationTime: 25,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹190' },
      ],
      addOns: [
        { name: 'Extra Vegetables', price: 30 },
        { name: 'Rice', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },

  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    description: 'Creamy tomato-based curry with soft paneer cubes',
    price: 240,
    category: 'appetizers',
    images: [],
    ingredients: ['Paneer', 'Tomatoes', 'Cream', 'Butter', 'Spices'],
    nutritionalInfo: { calories: 380, protein: 15, carbs: 18, fat: 25 },
    spiceLevel: 'mild',
    preparationTime: 20,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹240' },
      ],
      addOns: [
        { name: 'Extra Paneer', price: 50 },
        { name: 'Extra Cream', price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: 'gobi-manchurian',
    name: 'Gobi Manchurian',
    description: 'Indo-Chinese cauliflower in tangy sauce',
    price: 180,
    category: 'appetizers',
    images: [],
    ingredients: ['Cauliflower', 'Soy sauce', 'Vinegar', 'Spices'],
    nutritionalInfo: { calories: 250, protein: 6, carbs: 22, fat: 12 },
    spiceLevel: 'medium',
    preparationTime: 20,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹180' },
      ],
      addOns: [
        { name: 'Extra Sauce', price: 20 },
        { name: 'Fried Rice', price: 60 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  {
    id: 'paneer-mango-curry',
    name: 'Paneer Mango Curry',
    description: 'Unique paneer curry with sweet mango flavor',
    price: 280,
    category: 'appetizers',
    images: [],
    ingredients: ['Paneer', 'Mango pulp', 'Cream', 'Spices'],
    nutritionalInfo: { calories: 350, protein: 14, carbs: 25, fat: 20 },
    spiceLevel: 'mild',
    preparationTime: 22,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹280' },
      ],
      addOns: [
        { name: 'Extra Paneer', price: 50 },
        { name: 'Extra Mango', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: 'dal-palak',
    name: 'Dal Palak',
    description: 'Lentils cooked with spinach and aromatic spices',
    price: 130,
    category: 'appetizers',
    images: [],
    ingredients: ['Lentils', 'Spinach', 'Onions', 'Spices'],
    nutritionalInfo: { calories: 200, protein: 12, carbs: 28, fat: 6 },
    spiceLevel: 'mild',
    preparationTime: 25,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹130' },
      ],
      addOns: [
        { name: 'Extra Ghee', price: 20 },
        { name: 'Rice', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },

  {
    id: 'dal-fry',
    name: 'Dal Fry',
    description: 'Tempered lentils with onions, tomatoes and spices',
    price: 140,
    category: 'appetizers',
    images: [],
    ingredients: ['Yellow lentils', 'Onions', 'Tomatoes', 'Spices'],
    nutritionalInfo: { calories: 220, protein: 14, carbs: 30, fat: 7 },
    spiceLevel: 'medium',
    preparationTime: 20,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹140' },
      ],
      addOns: [
        { name: 'Extra Ghee', price: 20 },
        { name: 'Papad', price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.3,
  },

  {
    id: 'mushroom-masala',
    name: 'Mushroom Masala',
    description: 'Fresh mushrooms in rich spicy gravy',
    price: 230,
    category: 'appetizers',
    images: [],
    ingredients: ['Fresh mushrooms', 'Onions', 'Tomatoes', 'Spices'],
    nutritionalInfo: { calories: 180, protein: 8, carbs: 15, fat: 10 },
    spiceLevel: 'medium',
    preparationTime: 18,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹230' },
      ],
      addOns: [
        { name: 'Extra Mushrooms', price: 40 },
        { name: 'Cream', price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  {
    id: 'kadai-veg',
    name: 'Kadai Veg',
    description: 'Mixed vegetables cooked in kadai with bell peppers',
    price: 180,
    category: 'appetizers',
    images: [],
    ingredients: ['Mixed vegetables', 'Bell peppers', 'Onions', 'Kadai spices'],
    nutritionalInfo: { calories: 200, protein: 6, carbs: 20, fat: 8 },
    spiceLevel: 'medium',
    preparationTime: 20,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹180' },
      ],
      addOns: [
        { name: 'Extra Vegetables', price: 30 },
        { name: 'Paneer', price: 50 },
      ],
    },
    reviews: [],
    averageRating: 4.2,
  },

  {
    id: 'kadai-paneer',
    name: 'Kadai Paneer',
    description: 'Paneer cooked with bell peppers in kadai style',
    price: 230,
    category: 'appetizers',
    images: [],
    ingredients: ['Paneer', 'Bell peppers', 'Onions', 'Kadai spices'],
    nutritionalInfo: { calories: 320, protein: 16, carbs: 15, fat: 18 },
    spiceLevel: 'medium',
    preparationTime: 18,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹230' },
      ],
      addOns: [
        { name: 'Extra Paneer', price: 50 },
        { name: 'Extra Peppers', price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: 'matar-paneer',
    name: 'Matar Paneer',
    description: 'Classic curry with green peas and paneer',
    price: 230,
    category: 'appetizers',
    images: [],
    ingredients: ['Paneer', 'Green peas', 'Tomatoes', 'Spices'],
    nutritionalInfo: { calories: 300, protein: 15, carbs: 18, fat: 16 },
    spiceLevel: 'mild',
    preparationTime: 20,
    isVegetarian: true,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹230' },
      ],
      addOns: [
        { name: 'Extra Paneer', price: 50 },
        { name: 'Extra Peas', price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  // GRAVIES - CHICKEN SECTION
  {
    id: 'malabar-chicken-curry',
    name: 'Malabar Chicken Curry',
    description: 'Traditional Kerala chicken curry with coconut milk',
    price: 190,
    category: 'appetizers',
    images: [],
    ingredients: ['Chicken', 'Coconut milk', 'Curry leaves', 'Spices'],
    nutritionalInfo: { calories: 380, protein: 28, carbs: 12, fat: 22 },
    spiceLevel: 'medium',
    preparationTime: 30,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Small', price: 0, description: 'Small portion - ₹190' },
        { name: 'Large', price: 180, description: 'Large portion - ₹370' },
      ],
      addOns: [
        { name: 'Extra Chicken', price: 60 },
        { name: 'Rice', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: 'chicken-pal-curry',
    name: 'Chicken Pal Curry',
    description: 'Creamy chicken curry with coconut and spices',
    price: 360,
    category: 'appetizers',
    images: [],
    ingredients: ['Chicken', 'Coconut', 'Yogurt', 'Spices'],
    nutritionalInfo: { calories: 420, protein: 32, carbs: 15, fat: 25 },
    spiceLevel: 'mild',
    preparationTime: 35,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹360' },
      ],
      addOns: [
        { name: 'Extra Chicken', price: 80 },
        { name: 'Extra Coconut', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    description: 'Creamy tomato-based chicken curry with butter',
    price: 200,
    category: 'appetizers',
    images: [],
    ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Butter', 'Spices'],
    nutritionalInfo: { calories: 450, protein: 30, carbs: 18, fat: 28 },
    spiceLevel: 'mild',
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Small', price: 0, description: 'Small portion - ₹200' },
        { name: 'Large', price: 190, description: 'Large portion - ₹390' },
      ],
      addOns: [
        { name: 'Extra Chicken', price: 70 },
        { name: 'Extra Butter', price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: 'kadai-chicken',
    name: 'Kadai Chicken',
    description: 'Chicken cooked with bell peppers in kadai style',
    price: 370,
    category: 'appetizers',
    images: [],
    ingredients: ['Chicken', 'Bell peppers', 'Onions', 'Kadai spices'],
    nutritionalInfo: { calories: 400, protein: 35, carbs: 12, fat: 22 },
    spiceLevel: 'medium',
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹370' },
      ],
      addOns: [
        { name: 'Extra Chicken', price: 80 },
        { name: 'Extra Peppers', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: 'hyderabadi-chicken',
    name: 'Hyderabadi Chicken',
    description: 'Rich Hyderabadi style chicken with aromatic spices',
    price: 320,
    category: 'appetizers',
    images: [],
    ingredients: ['Chicken', 'Yogurt', 'Fried onions', 'Hyderabadi spices'],
    nutritionalInfo: { calories: 420, protein: 32, carbs: 15, fat: 24 },
    spiceLevel: 'medium',
    preparationTime: 40,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹320' },
      ],
      addOns: [
        { name: 'Extra Chicken', price: 70 },
        { name: 'Raita', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: 'mughlai-chicken',
    name: 'Mughlai Chicken',
    description: 'Royal Mughlai chicken with rich creamy gravy',
    price: 330,
    category: 'appetizers',
    images: [],
    ingredients: ['Chicken', 'Cream', 'Nuts', 'Mughlai spices'],
    nutritionalInfo: { calories: 480, protein: 35, carbs: 12, fat: 30 },
    spiceLevel: 'mild',
    preparationTime: 35,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹330' },
      ],
      addOns: [
        { name: 'Extra Chicken', price: 80 },
        { name: 'Extra Nuts', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: 'chicken-kolhapuri',
    name: 'Chicken Kolhapuri',
    description: 'Spicy Maharashtrian chicken curry with coconut',
    price: 330,
    category: 'appetizers',
    images: [],
    ingredients: ['Chicken', 'Coconut', 'Red chilies', 'Kolhapuri spices'],
    nutritionalInfo: { calories: 390, protein: 30, carbs: 10, fat: 24 },
    spiceLevel: 'hot',
    preparationTime: 30,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹330' },
      ],
      addOns: [
        { name: 'Extra Chicken', price: 70 },
        { name: 'Extra Spicy', price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  {
    id: 'chicken-ghee-roast',
    name: 'Chicken Ghee Roast',
    description: 'Mangalorean style chicken roasted in ghee and spices',
    price: 340,
    category: 'appetizers',
    images: [],
    ingredients: ['Chicken', 'Ghee', 'Red chilies', 'Mangalorean spices'],
    nutritionalInfo: { calories: 410, protein: 32, carbs: 8, fat: 26 },
    spiceLevel: 'hot',
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹340' },
      ],
      addOns: [
        { name: 'Extra Chicken', price: 80 },
        { name: 'Extra Ghee', price: 30 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: 'chicken-chilli-garlic',
    name: 'Chicken Chilli/Garlic/Pepper/Schezwan',
    description: 'Indo-Chinese chicken with choice of sauce',
    price: 280,
    category: 'appetizers',
    images: [],
    ingredients: ['Chicken', 'Sauce variations', 'Vegetables', 'Spices'],
    nutritionalInfo: { calories: 350, protein: 28, carbs: 15, fat: 18 },
    spiceLevel: 'hot',
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Chilli', price: 0, description: 'Chilli sauce - ₹280' },
        { name: 'Garlic', price: 0, description: 'Garlic sauce - ₹280' },
        { name: 'Pepper', price: 0, description: 'Pepper sauce - ₹280' },
        { name: 'Schezwan', price: 0, description: 'Schezwan sauce - ₹280' },
      ],
      addOns: [
        { name: 'Extra Chicken', price: 60 },
        { name: 'Extra Sauce', price: 25 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  // GRAVIES - MUTTON SECTION
  {
    id: 'mutton-masala',
    name: 'Mutton Masala',
    description: 'Traditional mutton curry with rich spices',
    price: 380,
    category: 'appetizers',
    images: [],
    ingredients: ['Mutton', 'Onions', 'Tomatoes', 'Spices'],
    nutritionalInfo: { calories: 450, protein: 35, carbs: 12, fat: 28 },
    spiceLevel: 'medium',
    preparationTime: 45,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹380' },
      ],
      addOns: [
        { name: 'Extra Mutton', price: 100 },
        { name: 'Rice', price: 50 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: 'mutton-pal-curry',
    name: 'Mutton Pal Curry',
    description: 'Creamy mutton curry with coconut milk',
    price: 430,
    category: 'appetizers',
    images: [],
    ingredients: ['Mutton', 'Coconut milk', 'Spices', 'Curry leaves'],
    nutritionalInfo: { calories: 480, protein: 38, carbs: 15, fat: 30 },
    spiceLevel: 'medium',
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹430' },
      ],
      addOns: [
        { name: 'Extra Mutton', price: 120 },
        { name: 'Extra Coconut', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: 'malabar-mutton-curry',
    name: 'Malabar Mutton Curry',
    description: 'Kerala style mutton curry with coconut',
    price: 230,
    category: 'appetizers',
    images: [],
    ingredients: ['Mutton', 'Coconut', 'Curry leaves', 'Kerala spices'],
    nutritionalInfo: { calories: 420, protein: 32, carbs: 12, fat: 26 },
    spiceLevel: 'medium',
    preparationTime: 45,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Small', price: 0, description: 'Small portion - ₹230' },
        { name: 'Large', price: 220, description: 'Large portion - ₹450' },
      ],
      addOns: [
        { name: 'Extra Mutton', price: 100 },
        { name: 'Appam', price: 60 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: 'mughlai-mutton',
    name: 'Mughlai Mutton',
    description: 'Royal Mughlai mutton with rich creamy gravy',
    price: 420,
    category: 'appetizers',
    images: [],
    ingredients: ['Mutton', 'Cream', 'Nuts', 'Mughlai spices'],
    nutritionalInfo: { calories: 520, protein: 40, carbs: 15, fat: 35 },
    spiceLevel: 'mild',
    preparationTime: 50,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹420' },
      ],
      addOns: [
        { name: 'Extra Mutton', price: 120 },
        { name: 'Extra Nuts', price: 50 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },

  {
    id: 'mutton-rogan-josh',
    name: 'Mutton Rogan Josh',
    description: 'Kashmiri mutton curry with aromatic spices',
    price: 420,
    category: 'appetizers',
    images: [],
    ingredients: ['Mutton', 'Yogurt', 'Kashmiri spices', 'Saffron'],
    nutritionalInfo: { calories: 460, protein: 36, carbs: 12, fat: 28 },
    spiceLevel: 'medium',
    preparationTime: 55,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹420' },
      ],
      addOns: [
        { name: 'Extra Mutton', price: 120 },
        { name: 'Saffron Rice', price: 80 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: 'mutton-ghee-roast',
    name: 'Mutton Ghee Roast',
    description: 'Mangalorean style mutton roasted in ghee',
    price: 420,
    category: 'appetizers',
    images: [],
    ingredients: ['Mutton', 'Ghee', 'Red chilies', 'Mangalorean spices'],
    nutritionalInfo: { calories: 480, protein: 38, carbs: 8, fat: 32 },
    spiceLevel: 'hot',
    preparationTime: 40,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹420' },
      ],
      addOns: [
        { name: 'Extra Mutton', price: 120 },
        { name: 'Extra Ghee', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: 'mutton-nihari',
    name: 'Mutton Nihari',
    description: 'Slow-cooked mutton stew with aromatic spices',
    price: 420,
    category: 'appetizers',
    images: [],
    ingredients: ['Mutton', 'Wheat flour', 'Nihari spices', 'Ginger'],
    nutritionalInfo: { calories: 500, protein: 42, carbs: 18, fat: 30 },
    spiceLevel: 'medium',
    preparationTime: 60,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹420' },
      ],
      addOns: [
        { name: 'Extra Mutton', price: 120 },
        { name: 'Naan', price: 50 },
      ],
    },
    reviews: [],
    averageRating: 4.8,
  },

  // GRAVIES - FISH SECTION
  {
    id: 'prawns-mango-curry',
    name: 'Prawns Mango Curry',
    description: 'Sweet and tangy prawns curry with mango',
    price: 430,
    category: 'appetizers',
    images: [],
    ingredients: ['Prawns', 'Mango', 'Coconut milk', 'Spices'],
    nutritionalInfo: { calories: 380, protein: 32, carbs: 18, fat: 20 },
    spiceLevel: 'mild',
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹430' },
      ],
      addOns: [
        { name: 'Extra Prawns', price: 100 },
        { name: 'Extra Mango', price: 40 },
      ],
    },
    reviews: [],
    averageRating: 4.6,
  },

  {
    id: 'prawns-fry-roast',
    name: 'Prawns Fry/Roast',
    description: 'Spicy fried or roasted prawns with coastal spices',
    price: 390,
    category: 'appetizers',
    images: [],
    ingredients: ['Prawns', 'Coastal spices', 'Curry leaves', 'Oil'],
    nutritionalInfo: { calories: 320, protein: 28, carbs: 8, fat: 18 },
    spiceLevel: 'hot',
    preparationTime: 20,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Fry', price: 0, description: 'Fried style - ₹390' },
        { name: 'Roast', price: 0, description: 'Roasted style - ₹390' },
      ],
      addOns: [
        { name: 'Extra Prawns', price: 80 },
        { name: 'Lemon', price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: 'squid-fry-roast',
    name: 'Squid Fry/Roast',
    description: 'Tender squid fried or roasted with spices',
    price: 340,
    category: 'appetizers',
    images: [],
    ingredients: ['Squid', 'Spices', 'Curry leaves', 'Oil'],
    nutritionalInfo: { calories: 280, protein: 24, carbs: 6, fat: 16 },
    spiceLevel: 'hot',
    preparationTime: 18,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Fry', price: 0, description: 'Fried style - ₹340' },
        { name: 'Roast', price: 0, description: 'Roasted style - ₹340' },
      ],
      addOns: [
        { name: 'Extra Squid', price: 70 },
        { name: 'Lemon', price: 15 },
      ],
    },
    reviews: [],
    averageRating: 4.4,
  },

  {
    id: 'prawns-pepper-masala',
    name: 'Prawns Pepper Masala',
    description: 'Spicy prawns with black pepper and masala',
    price: 390,
    category: 'appetizers',
    images: [],
    ingredients: ['Prawns', 'Black pepper', 'Onions', 'Spices'],
    nutritionalInfo: { calories: 340, protein: 30, carbs: 10, fat: 18 },
    spiceLevel: 'hot',
    preparationTime: 22,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹390' },
      ],
      addOns: [
        { name: 'Extra Prawns', price: 80 },
        { name: 'Extra Pepper', price: 20 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

  {
    id: 'paal-konju',
    name: 'Paal Konju',
    description: 'Kerala style prawns in coconut milk curry',
    price: 450,
    category: 'appetizers',
    images: [],
    ingredients: ['Prawns', 'Coconut milk', 'Curry leaves', 'Kerala spices'],
    nutritionalInfo: { calories: 400, protein: 32, carbs: 12, fat: 24 },
    spiceLevel: 'medium',
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹450' },
      ],
      addOns: [
        { name: 'Extra Prawns', price: 100 },
        { name: 'Appam', price: 60 },
      ],
    },
    reviews: [],
    averageRating: 4.7,
  },

  {
    id: 'ajwaini-fish-masala',
    name: 'Ajwaini Fish Masala',
    description: 'Fish curry with ajwain and aromatic spices',
    price: 390,
    category: 'appetizers',
    images: [],
    ingredients: ['Fish', 'Ajwain', 'Onions', 'Tomatoes', 'Spices'],
    nutritionalInfo: { calories: 350, protein: 28, carbs: 12, fat: 20 },
    spiceLevel: 'medium',
    preparationTime: 25,
    isVegetarian: false,
    isAvailable: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0, description: 'Standard portion - ₹390' },
      ],
      addOns: [
        { name: 'Extra Fish', price: 80 },
        { name: 'Rice', price: 50 },
      ],
    },
    reviews: [],
    averageRating: 4.5,
  },

];

// Helper functions to filter mock data
export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  if (category === "all") return mockMenuItems;
  return mockMenuItems.filter((item) => item.category === category);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return mockMenuItems.find((item) => item.id === id);
};

export const searchMenuItems = (query: string): MenuItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockMenuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(lowercaseQuery)
      )
  );
};

export const getFeaturedItems = (count: number = 6): MenuItem[] => {
  return mockMenuItems
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, count);
};
