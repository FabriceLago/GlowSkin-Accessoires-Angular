export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  type: 'couleur' | 'materiau';
  hex?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'rouleaux' | 'gua-sha' | 'brosses' | 'masques-led' | 'eponges' | 'bandeaux' | 'mini-frigos' | 'pinceaux' | 'spatules' | 'kits';
  categoryLabel: string;
  material: 'jade' | 'quartz-rose' | 'obsidienne' | 'bambou' | 'konjac' | 'silicone' | 'inox' | 'coton' | 'bois';
  materialLabel: string;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  usage: string;
  care: string;
  images: ProductImage[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  stock: number;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  variantId: string;
  quantity: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: ProductImage;
  date: string;
  readingTime: number;
  category: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: ProductImage;
}
