import curdImage from '../assets/images/curd.png'
import buttermilkImage from '../assets/images/butter milk.png'
import palkovaImage from '../assets/images/palkova.png'
import gheeImage from '../assets/images/ghee.png'
import paneerImage from '../assets/images/paneer.png'


export const products = [
  {
    id: 1,
    name: 'Farm Fresh Curd',
    category: 'Curd',
    price: 45,
    originalPrice: 55,
    discount: 18,
    image: curdImage,
    images: [
      curdImage,
      curdImage,
      buttermilkImage,
    ],
    description: 'Thick, creamy farm-fresh curd made from pure cow milk. Naturally fermented with live cultures for a tangy, wholesome taste.',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 342,
    sku: 'OMCURD-500G',
    sizes: [250, 500, 1000],
    specifications: {
      milk: {
        icon: 'water_drop',
        title: 'Milk Details',
        items: [
          { label: 'Milk Type', value: 'Cow Milk' },
          { label: 'Fat Content', value: '5%' },
          { label: 'Net Weight', value: '500 g' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '120 kcal' },
          { label: 'Protein', value: '3.2 g' },
          { label: 'Fat', value: '5.0 g' },
          { label: 'Calcium', value: '150 mg' },
        ],
      },
    },
    similarProducts: [
      { id: 201, name: 'Buttermilk', price: 25, image: buttermilkImage },
      { id: 202, name: 'Fresh Paneer', price: 120, image: paneerImage },
    ],
    tags: ['Curd', 'Best Seller', 'Fresh'],
    collection: 'Daily Essentials',
  },
  {
    id: 2,
    name: 'Traditional Buttermilk',
    category: 'Buttermilk',
    price: 25,
    originalPrice: 30,
    discount: 17,
    image: buttermilkImage,
    images: [
      buttermilkImage,
      buttermilkImage,
      curdImage,
    ],
    description: 'Cool, refreshing traditional buttermilk churned from fresh curd. A perfect summer drink that aids digestion and keeps you hydrated.',
    badge: '-17%',
    rating: 4.6,
    reviews: 189,
    sku: 'OMBTM-500ML',
    sizes: [250, 500, 1000],
    specifications: {
      milk: {
        icon: 'water_drop',
        title: 'Milk Details',
        items: [
          { label: 'Milk Type', value: 'Cow Milk' },
          { label: 'Fat Content', value: '2%' },
          { label: 'Net Weight', value: '500 ml' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '45 kcal' },
          { label: 'Protein', value: '2.5 g' },
          { label: 'Fat', value: '2.0 g' },
          { label: 'Calcium', value: '80 mg' },
        ],
      },
    },
    similarProducts: [
      { id: 201, name: 'Fresh Curd', price: 45, image: curdImage },
      { id: 202, name: 'Fresh Paneer', price: 120, image: paneerImage },
    ],
    tags: ['Buttermilk', 'Refreshing', 'Daily'],
    collection: 'Daily Essentials',
  },
  {
    id: 3,
    name: 'Premium Palkova',
    category: 'Sweets',
    price: 180,
    originalPrice: null,
    discount: null,
    image: palkovaImage,
    images: [
      palkovaImage,
      palkovaImage,
      gheeImage,
    ],
    description: 'Rich, melt-in-your-mouth milk sweet made from pure milk and sugar. A traditional delicacy perfect for festivals and celebrations.',
    badge: 'Premium',
    rating: 4.9,
    reviews: 156,
    sku: 'OMPAL-250G',
    sizes: [250, 500],
    specifications: {
      ingredients: {
        icon: 'science',
        title: 'Ingredients',
        items: [
          { label: 'Milk', value: 'Pure Cow Milk' },
          { label: 'Sugar', value: 'Cane Sugar' },
          { label: 'Ghee', value: 'Pure Ghee' },
          { label: 'Net Weight', value: '250 g' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '350 kcal' },
          { label: 'Protein', value: '6.0 g' },
          { label: 'Fat', value: '18.0 g' },
          { label: 'Carbs', value: '35.0 g' },
        ],
      },
    },
    similarProducts: [],
    tags: ['Sweets', 'Palkova', 'Premium', 'Festive'],
    collection: 'Premium Range',
  },
  {
    id: 4,
    name: 'Pure Cow Ghee',
    category: 'Ghee',
    price: 350,
    originalPrice: 420,
    discount: 17,
    image: gheeImage,
    images: [
      gheeImage,
      gheeImage,
      curdImage,
    ],
    description: 'Aromatic, golden pure cow ghee made from hand-churned butter using the traditional bilona method. Rich in omega-3 and vitamins.',
    badge: '-17%',
    rating: 4.9,
    reviews: 278,
    sku: 'OMGHEE-500ML',
    sizes: [200, 500, 1000],
    specifications: {
      milk: {
        icon: 'water_drop',
        title: 'Milk Details',
        items: [
          { label: 'Milk Type', value: 'Cow Milk' },
          { label: 'Method', value: 'Bilona' },
          { label: 'Net Weight', value: '500 ml' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '120 kcal/tbsp' },
          { label: 'Protein', value: '0 g' },
          { label: 'Fat', value: '14 g/tbsp' },
          { label: 'Vitamin A', value: 'High' },
        ],
      },
    },
    similarProducts: [
      { id: 401, name: 'Fresh Curd', price: 45, image: curdImage },
      { id: 402, name: 'Premium Palkova', price: 180, image: palkovaImage },
    ],
    tags: ['Ghee', 'Best Seller', 'Pure', 'Premium'],
    collection: 'Premium Range',
  },
  {
    id: 5,
    name: 'Farm Fresh Paneer',
    category: 'Paneer',
    price: 120,
    originalPrice: null,
    discount: null,
    image: paneerImage,
    images: [
      paneerImage,
      paneerImage,
      buttermilkImage,
    ],
    description: 'Soft, fresh, and crumbly paneer made daily from pure cow milk. No preservatives, no additives - just pure farm goodness.',
    badge: 'NEW',
    rating: 4.7,
    reviews: 98,
    sku: 'OMPAN-200G',
    sizes: [200, 500],
    specifications: {
      milk: {
        icon: 'water_drop',
        title: 'Milk Details',
        items: [
          { label: 'Milk Type', value: 'Cow Milk' },
          { label: 'Texture', value: 'Soft & Crumbly' },
          { label: 'Net Weight', value: '200 g' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '265 kcal' },
          { label: 'Protein', value: '18.0 g' },
          { label: 'Fat', value: '20.0 g' },
          { label: 'Calcium', value: '200 mg' },
        ],
      },
    },
    similarProducts: [],
    tags: ['Paneer', 'Fresh', 'New Arrivals'],
    collection: 'Daily Essentials',
  },
  {
    id: 6,
    name: 'Low Fat Curd',
    category: 'Curd',
    price: 40,
    originalPrice: 50,
    discount: 20,
    image: curdImage,
    images: [
      curdImage,
      curdImage,
      buttermilkImage,
    ],
    description: 'Delicious low-fat curd with all the probiotic benefits of regular curd but with reduced fat content. Perfect for health-conscious families.',
    badge: 'OFFER',
    rating: 4.5,
    reviews: 67,
    sku: 'OMCLF-500G',
    sizes: [500, 1000],
    specifications: {
      milk: {
        icon: 'water_drop',
        title: 'Milk Details',
        items: [
          { label: 'Milk Type', value: 'Cow Milk' },
          { label: 'Fat Content', value: '2%' },
          { label: 'Net Weight', value: '500 g' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '80 kcal' },
          { label: 'Protein', value: '3.5 g' },
          { label: 'Fat', value: '2.0 g' },
          { label: 'Calcium', value: '150 mg' },
        ],
      },
    },
    similarProducts: [],
    tags: ['Curd', 'Low Fat', 'Offers', 'Healthy'],
    collection: 'Daily Essentials',
  },
  {
    id: 7,
    name: 'Masala Buttermilk',
    category: 'Buttermilk',
    price: 35,
    originalPrice: null,
    discount: null,
    image: buttermilkImage,
    images: [
      buttermilkImage,
      buttermilkImage,
      curdImage,
    ],
    description: 'Tangy and spicy masala buttermilk blended with ginger, green chili, and curry leaves. A traditional digestive drink from our farms.',
    badge: null,
    rating: 4.4,
    reviews: 45,
    sku: 'OMMAS-500ML',
    sizes: [250, 500],
    specifications: {
      ingredients: {
        icon: 'science',
        title: 'Ingredients',
        items: [
          { label: 'Base', value: 'Buttermilk' },
          { label: 'Spices', value: 'Ginger, Chili, Curry Leaves' },
          { label: 'Net Weight', value: '500 ml' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '55 kcal' },
          { label: 'Protein', value: '2.8 g' },
          { label: 'Fat', value: '1.5 g' },
          { label: 'Calcium', value: '90 mg' },
        ],
      },
    },
    similarProducts: [],
    tags: ['Buttermilk', 'Masala', 'Traditional'],
    collection: 'Daily Essentials',
  },
  {
    id: 8,
    name: 'Organic Ghee',
    category: 'Ghee',
    price: 450,
    originalPrice: 550,
    discount: 18,
    image: gheeImage,
    images: [
      gheeImage,
      gheeImage,
      curdImage,
    ],
    description: 'Certified organic ghee made from grass-fed desi cow milk. The bilona method ensures maximum nutrients and a rich, nutty aroma.',
    badge: '-18%',
    rating: 4.8,
    reviews: 134,
    sku: 'OMORG-500ML',
    sizes: [200, 500, 1000],
    specifications: {
      milk: {
        icon: 'water_drop',
        title: 'Milk Details',
        items: [
          { label: 'Milk Type', value: 'Desi Cow Milk' },
          { label: 'Certification', value: 'Organic' },
          { label: 'Net Weight', value: '500 ml' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '120 kcal/tbsp' },
          { label: 'Protein', value: '0 g' },
          { label: 'Fat', value: '14 g/tbsp' },
          { label: 'CLA', value: 'High' },
        ],
      },
    },
    similarProducts: [],
    tags: ['Ghee', 'Organic', 'Premium', 'Offers'],
    collection: 'Premium Range',
  },
  {
    id: 9,
    name: 'Malai Paneer',
    category: 'Paneer',
    price: 150,
    originalPrice: null,
    discount: null,
    image: paneerImage,
    images: [
      paneerImage,
      paneerImage,
      curdImage,
    ],
    description: 'Extra soft and creamy malai paneer made from full cream milk. Perfect for rich curries, paneer tikka, and desserts.',
    badge: null,
    rating: 4.7,
    reviews: 89,
    sku: 'OMMAL-200G',
    sizes: [200, 500],
    specifications: {
      milk: {
        icon: 'water_drop',
        title: 'Milk Details',
        items: [
          { label: 'Milk Type', value: 'Buffalo Milk' },
          { label: 'Fat Content', value: '8%' },
          { label: 'Net Weight', value: '200 g' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '280 kcal' },
          { label: 'Protein', value: '16.0 g' },
          { label: 'Fat', value: '22.0 g' },
          { label: 'Calcium', value: '250 mg' },
        ],
      },
    },
    similarProducts: [],
    tags: ['Paneer', 'Malai', 'Premium'],
    collection: 'Premium Range',
  },
  {
    id: 10,
    name: 'Special Palkova',
    category: 'Sweets',
    price: 220,
    originalPrice: 260,
    discount: 15,
    image: palkovaImage,
    images: [
      palkovaImage,
      palkovaImage,
      paneerImage,
    ],
    description: 'Our signature special palkova made with a hint of cardamom and nuts. A luxurious treat that melts in your mouth with every bite.',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 203,
    sku: 'OMSPL-250G',
    sizes: [250, 500],
    specifications: {
      ingredients: {
        icon: 'science',
        title: 'Ingredients',
        items: [
          { label: 'Milk', value: 'Pure Cow Milk' },
          { label: 'Sugar', value: 'Cane Sugar' },
          { label: 'Ghee', value: 'Pure Ghee' },
          { label: 'Flavor', value: 'Cardamom & Nuts' },
          { label: 'Net Weight', value: '250 g' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '380 kcal' },
          { label: 'Protein', value: '6.5 g' },
          { label: 'Fat', value: '20.0 g' },
          { label: 'Carbs', value: '38.0 g' },
        ],
      },
    },
    similarProducts: [],
    tags: ['Sweets', 'Palkova', 'Best Seller', 'Premium'],
    collection: 'Premium Range',
  },
  {
    id: 11,
    name: 'Lassi',
    category: 'Buttermilk',
    price: 30,
    originalPrice: 40,
    discount: 25,
    image: buttermilkImage,
    images: [
      buttermilkImage,
      buttermilkImage,
      curdImage,
    ],
    description: 'Sweet, creamy lassi made from fresh curd blended with pure cane sugar. A refreshing Punjabi classic that energizes your day.',
    badge: '-25%',
    rating: 4.6,
    reviews: 112,
    sku: 'OMLSS-300ML',
    sizes: [300, 500],
    specifications: {
      ingredients: {
        icon: 'science',
        title: 'Ingredients',
        items: [
          { label: 'Base', value: 'Fresh Curd' },
          { label: 'Sweetener', value: 'Cane Sugar' },
          { label: 'Net Weight', value: '300 ml' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '150 kcal' },
          { label: 'Protein', value: '4.0 g' },
          { label: 'Fat', value: '3.0 g' },
          { label: 'Calcium', value: '100 mg' },
        ],
      },
    },
    similarProducts: [],
    tags: ['Buttermilk', 'Lassi', 'Sweet', 'Offers'],
    collection: 'Daily Essentials',
  },
  {
    id: 12,
    name: 'A2 Paneer',
    category: 'Paneer',
    price: 180,
    originalPrice: null,
    discount: null,
    image: paneerImage,
    images: [
      paneerImage,
      paneerImage,
      curdImage,
    ],
    description: 'Premium A2 beta-casein paneer made from heritage breed cow milk. The healthiest choice for your family with superior digestibility.',
    badge: 'Premium',
    rating: 4.9,
    reviews: 76,
    sku: 'OMA2P-200G',
    sizes: [200, 500],
    specifications: {
      milk: {
        icon: 'water_drop',
        title: 'Milk Details',
        items: [
          { label: 'Milk Type', value: 'A2 Cow Milk' },
          { label: 'Breed', value: 'Gir / Sahiwal' },
          { label: 'Net Weight', value: '200 g' },
        ],
      },
      nutrition: {
        icon: 'local_fire_department',
        title: 'Nutritional Info',
        items: [
          { label: 'Calories', value: '250 kcal' },
          { label: 'Protein', value: '20.0 g' },
          { label: 'Fat', value: '15.0 g' },
          { label: 'A2 Protein', value: 'Yes' },
        ],
      },
    },
    similarProducts: [],
    tags: ['Paneer', 'A2', 'Premium', 'Healthy'],
    collection: 'Premium Range',
  },
]

export const categories = [
  { id: 1, name: 'Fresh Curd', slug: 'Curd', image: curdImage },
  { id: 2, name: 'Buttermilk', slug: 'Buttermilk', image: buttermilkImage },
  { id: 3, name: 'Ghee', slug: 'Ghee', image: gheeImage },
  { id: 4, name: 'Sweets', slug: 'Sweets', image: palkovaImage },
  { id: 5, name: 'Paneer', slug: 'Paneer', image: paneerImage },
]

export const getAllProducts = () => products
export const getProductById = (id) => products.find((p) => p.id === id)
export const getProductsByCategory = (category) => products.filter((p) => p.category === category || p.tags?.includes(category))
export const getProductsByTag = (tag) => products.filter((p) => p.tags?.includes(tag))
export const getNewArrivals = () => products.filter((p) => p.tags?.includes('New Arrivals'))
export const getOffers = () => products.filter((p) => p.tags?.includes('Offers'))
export const searchProducts = (query) => {
  const lower = query.toLowerCase()
  return products.filter((p) =>
    p.name.toLowerCase().includes(lower) ||
    p.category.toLowerCase().includes(lower) ||
    p.description.toLowerCase().includes(lower) ||
    p.sku?.toLowerCase().includes(lower) ||
    p.tags?.some((t) => t.toLowerCase().includes(lower)) ||
    p.collection?.toLowerCase().includes(lower)
  )
}
