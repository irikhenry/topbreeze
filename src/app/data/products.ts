export interface Product {
  id: string;
  name: string;
  category: 'fragrance' | 'perfumery' | 'diffuser';
  price: number;
  description: string;
  shortDescription: string;
  story: string;
  mood: string;
  ingredients: string[];
  usage: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  volume: string;
  intensity: 'Light' | 'Moderate' | 'Intense';
  featured: boolean;
  imageUrl: string;
}

export const products: Product[] = [
  // Fragrances
  {
    id: 'frag-01',
    name: 'Nordic Dawn',
    category: 'fragrance',
    price: 245,
    description: 'Nordic Dawn captures the first light of morning across the Scandinavian fjords. A crisp, ethereal composition that speaks to new beginnings and quiet contemplation. The interplay of fresh citrus with warm woods creates an aura of understated elegance.',
    shortDescription: 'Fresh citrus meets warm woods in this ethereal morning fragrance',
    story: 'Inspired by the serene beauty of the Nordic morning, Nordic Dawn is a blend of fresh citrus and warm woods, evoking a sense of new beginnings and quiet contemplation.',
    mood: 'Calm, Contemplative, Fresh',
    ingredients: ['Bergamot', 'Lemon Zest', 'Sea Salt', 'White Cedar', 'Juniper', 'Lavender', 'Sandalwood', 'Amber', 'Musk'],
    usage: 'Spray on pulse points for a subtle, long-lasting fragrance',
    notes: {
      top: ['Bergamot', 'Lemon Zest', 'Sea Salt'],
      heart: ['White Cedar', 'Juniper', 'Lavender'],
      base: ['Sandalwood', 'Amber', 'Musk'],
    },
    volume: '100ml',
    intensity: 'Moderate',
    featured: true,
    imageUrl: '',
  },
  {
    id: 'frag-02',
    name: 'Winter Solstice',
    category: 'fragrance',
    price: 265,
    description: 'A profound tribute to the longest night of the year. Winter Solstice weaves rich spices with deep, resinous woods, creating a scent that embodies warmth and introspection. Perfect for moments of quiet luxury.',
    shortDescription: 'Rich spices and deep woods for contemplative evenings',
    story: 'Winter Solstice is a rich blend of spices and deep woods, capturing the essence of the longest night of the year and embodying warmth and introspection.',
    mood: 'Warm, Introspective, Luxurious',
    ingredients: ['Cardamom', 'Black Pepper', 'Cinnamon', 'Cedarwood', 'Incense', 'Iris', 'Patchouli', 'Vetiver', 'Tonka Bean'],
    usage: 'Spray on pulse points for a rich, long-lasting fragrance',
    notes: {
      top: ['Cardamom', 'Black Pepper', 'Cinnamon'],
      heart: ['Cedarwood', 'Incense', 'Iris'],
      base: ['Patchouli', 'Vetiver', 'Tonka Bean'],
    },
    volume: '100ml',
    intensity: 'Intense',
    featured: true,
    imageUrl: '',
  },
  {
    id: 'frag-03',
    name: 'Coastal Breeze',
    category: 'fragrance',
    price: 225,
    description: 'The essence of windswept shores and endless horizons. Coastal Breeze is a celebration of clarity and freedom, blending aquatic notes with subtle florals. A signature scent for those who seek refinement in simplicity.',
    shortDescription: 'Aquatic clarity with delicate floral undertones',
    story: 'Coastal Breeze is a blend of aquatic notes and subtle florals, capturing the essence of windswept shores and endless horizons, embodying clarity and freedom.',
    mood: 'Clear, Free, Refreshing',
    ingredients: ['Marine Accord', 'Mint', 'Grapefruit', 'Lily of the Valley', 'Jasmine', 'Driftwood', 'White Musk', 'Ambroxan', 'Oakmoss'],
    usage: 'Spray on pulse points for a fresh, long-lasting fragrance',
    notes: {
      top: ['Marine Accord', 'Mint', 'Grapefruit'],
      heart: ['Lily of the Valley', 'Jasmine', 'Driftwood'],
      base: ['White Musk', 'Ambroxan', 'Oakmoss'],
    },
    volume: '100ml',
    intensity: 'Light',
    featured: false,
    imageUrl: '',
  },
  {
    id: 'frag-04',
    name: 'Midnight Garden',
    category: 'fragrance',
    price: 285,
    description: 'An olfactory journey through a moonlit botanical sanctuary. Midnight Garden layers velvety florals with mysterious spices, creating an aura of nocturnal sophistication and timeless allure.',
    shortDescription: 'Velvety florals meet mysterious night spices',
    story: 'Midnight Garden is a blend of velvety florals and mysterious spices, capturing the essence of a moonlit botanical sanctuary, embodying nocturnal sophistication and timeless allure.',
    mood: 'Mysterious, Sophisticated, Alluring',
    ingredients: ['Saffron', 'Pink Pepper', 'Neroli', 'Turkish Rose', 'Tuberose', 'Ylang-Ylang', 'Oud', 'Leather', 'Vanilla'],
    usage: 'Spray on pulse points for a rich, long-lasting fragrance',
    notes: {
      top: ['Saffron', 'Pink Pepper', 'Neroli'],
      heart: ['Turkish Rose', 'Tuberose', 'Ylang-Ylang'],
      base: ['Oud', 'Leather', 'Vanilla'],
    },
    volume: '100ml',
    intensity: 'Intense',
    featured: true,
    imageUrl: '',
  },

  // Perfumery
  {
    id: 'perf-01',
    name: 'Essential Collection',
    category: 'perfumery',
    price: 450,
    description: 'A curated trio of our most iconic fragrances in elegant travel sizes. The Essential Collection offers versatility and sophistication, perfect for the discerning individual who values both quality and convenience.',
    shortDescription: 'Three signature scents in refined travel editions',
    story: 'The Essential Collection is a trio of our most iconic fragrances in elegant travel sizes, offering versatility and sophistication for the discerning individual who values both quality and convenience.',
    mood: 'Versatile, Sophisticated, Convenient',
    ingredients: ['Various'],
    usage: 'Spray on pulse points for a subtle, long-lasting fragrance',
    notes: {
      top: ['Various'],
      heart: ['Various'],
      base: ['Various'],
    },
    volume: '3x30ml',
    intensity: 'Moderate',
    featured: true,
    imageUrl: '',
  },
  {
    id: 'perf-02',
    name: 'Discovery Set',
    category: 'perfumery',
    price: 120,
    description: 'Embark on a sensory exploration with our Discovery Set. Five carefully selected fragrances in sample vials, allowing you to find your perfect signature scent.',
    shortDescription: 'Five sample vials to discover your signature',
    story: 'The Discovery Set is a collection of five carefully selected fragrances in sample vials, allowing you to find your perfect signature scent.',
    mood: 'Explorative, Sensory, Discovering',
    ingredients: ['Various'],
    usage: 'Spray on pulse points for a subtle, long-lasting fragrance',
    notes: {
      top: ['Various'],
      heart: ['Various'],
      base: ['Various'],
    },
    volume: '5x5ml',
    intensity: 'Moderate',
    featured: false,
    imageUrl: '',
  },

  // Diffusers
  {
    id: 'diff-01',
    name: 'Sanctum Reed Diffuser',
    category: 'diffuser',
    price: 165,
    description: 'Transform your space into a haven of tranquility. The Sanctum Reed Diffuser releases a continuous, subtle fragrance that elevates any environment with Nordic sophistication.',
    shortDescription: 'Continuous ambient fragrance for refined spaces',
    story: 'The Sanctum Reed Diffuser is a continuous, subtle fragrance that elevates any environment with Nordic sophistication, transforming your space into a haven of tranquility.',
    mood: 'Tranquil, Sophisticated, Refined',
    ingredients: ['Eucalyptus', 'White Tea', 'Cedar', 'Sage', 'Cashmere Woods', 'Soft Musk'],
    usage: 'Place reeds in the diffuser and trim as needed to adjust fragrance strength',
    notes: {
      top: ['Eucalyptus', 'White Tea'],
      heart: ['Cedar', 'Sage'],
      base: ['Cashmere Woods', 'Soft Musk'],
    },
    volume: '200ml',
    intensity: 'Light',
    featured: true,
    imageUrl: '',
  },
  {
    id: 'diff-02',
    name: 'Hearth Stone Diffuser',
    category: 'diffuser',
    price: 185,
    description: 'Inspired by the warmth of a Nordic fireplace, Hearth Stone infuses your home with comforting notes of smoked wood and spiced amber. A grounding presence for intimate gatherings.',
    shortDescription: 'Warming notes of smoked wood and amber',
    story: 'Hearth Stone is a diffuser inspired by the warmth of a Nordic fireplace, infusing your home with comforting notes of smoked wood and spiced amber, a grounding presence for intimate gatherings.',
    mood: 'Warm, Comforting, Grounding',
    ingredients: ['Birch', 'Smoke', 'Clove', 'Cedarwood', 'Amber', 'Tobacco Leaves'],
    usage: 'Place reeds in the diffuser and trim as needed to adjust fragrance strength',
    notes: {
      top: ['Birch', 'Smoke'],
      heart: ['Clove', 'Cedarwood'],
      base: ['Amber', 'Tobacco Leaves'],
    },
    volume: '200ml',
    intensity: 'Moderate',
    featured: false,
    imageUrl: '',
  },
  {
    id: 'diff-03',
    name: 'Serenity Candle',
    category: 'diffuser',
    price: 95,
    description: 'Hand-poured with premium soy wax, the Serenity Candle casts a gentle glow while releasing calming notes of lavender and chamomile. An essential ritual for mindful evenings.',
    shortDescription: 'Calming lavender and chamomile in hand-poured wax',
    story: 'The Serenity Candle is hand-poured with premium soy wax, casting a gentle glow while releasing calming notes of lavender and chamomile, an essential ritual for mindful evenings.',
    mood: 'Calming, Mindful, Gentle',
    ingredients: ['Lavender', 'Chamomile', 'Linen', 'Honey', 'Vanilla', 'Light Woods'],
    usage: 'Light the candle and enjoy the calming fragrance',
    notes: {
      top: ['Lavender', 'Chamomile'],
      heart: ['Linen', 'Honey'],
      base: ['Vanilla', 'Light Woods'],
    },
    volume: '250g',
    intensity: 'Light',
    featured: false,
    imageUrl: '',
  },
];