export interface Product {
  id: number;
  name: string;
  category: 'Leafy' | 'Root' | 'Seasonal' | 'Exotic';
  price: number;
  image: string;
  description: string;
  nutrition: string;
  unit: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
}