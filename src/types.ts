export type ProductCategory = 
  | 'Fashion' 
  | 'Food' 
  | 'Beauty' 
  | 'Electronics' 
  | 'Other Products';

export type DesignStyle = 
  | 'Premium & Luxury' 
  | 'Modern & Creative' 
  | 'Minimal & Clean' 
  | 'Bold Sale/Offer'
  | 'Mixed Promotional Style';

export type TargetAudience = 
  | 'Everyone' 
  | 'Men' 
  | 'Women' 
  | 'Young Adults' 
  | 'Business Customers';

export type AdPlatform = 'Instagram' | 'Facebook' | 'Both';

export type OrderStatus = 'New' | 'In Progress' | 'Completed';

export interface PortfolioProject {
  id: string;
  title: string;
  category: ProductCategory;
  style: DesignStyle;
  badge: 'Concept Design' | 'Demo Work';
  tagline: string;
  description: string;
  designGoal: string;
  colorPalette: { name: string; hex: string }[];
  targetAudience: string;
  rationale: string;
  creativeTheme: 'sneaker' | 'jacket' | 'burger' | 'serum' | 'earbuds' | 'watch' | 'energy' | 'coffee';
  headlineText: string;
  subText: string;
  offerBadge?: string;
  featured: boolean;
}

export interface UploadedPhoto {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  type: string;
}

export interface OrderSubmission {
  id: string;
  createdAt: string;
  customerName: string;
  whatsappNumber: string;
  category: ProductCategory;
  productName: string;
  productPrice: string;
  offerDiscount: string;
  designStyle: DesignStyle;
  targetAudience: TargetAudience;
  adPlatform: AdPlatform;
  additionalRequirements: string;
  photos: UploadedPhoto[];
  status: OrderStatus;
  totalPrice: number;
  notes?: string;
}

export interface SiteSettings {
  brandName: string;
  roleTitle: string;
  heroHeadline: string;
  heroSubtitle: string;
  aboutBio: string;
  whatsappNumber: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  adPrice: number;
  deliveryTimeHours: number;
  adminPin: string;
}

export interface ContactInquiry {
  id: string;
  createdAt: string;
  name: string;
  whatsappNumber: string;
  businessName: string;
  message: string;
}
