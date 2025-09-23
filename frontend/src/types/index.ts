export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'restaurant';
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  hours: string;
  description: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  customerName?: string;
  address: string;
  createdAt: Date;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}