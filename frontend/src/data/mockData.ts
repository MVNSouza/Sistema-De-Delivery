import { Restaurant, MenuItem, Order } from '../types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NTg1MDc2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.5,
    location: 'Centro, São Paulo',
    hours: '11:00 - 23:00',
    description: 'Os melhores hambúrgueres artesanais da cidade'
  },
  {
    id: '2',
    name: 'Pizzaria Bella Vista',
    image: 'https://images.unsplash.com/photo-1749169395459-9eb9835bd718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGl0YWxpYW4lMjBmb29kfGVufDF8fHx8MTc1ODUwNzc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    location: 'Vila Madalena, São Paulo',
    hours: '18:00 - 00:00',
    description: 'Pizzas tradicionais italianas em forno a lenha'
  },
  {
    id: '3',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1712725213572-443fe866a69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpfGVufDF8fHx8MTc1ODUyNzMzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    location: 'Liberdade, São Paulo',
    hours: '12:00 - 22:00',
    description: 'Sushi fresco e pratos japoneses autênticos'
  },
  {
    id: '4',
    name: 'Café & Delivery',
    image: 'https://images.unsplash.com/photo-1640082380928-2f7079392823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRlbGl2ZXJ5fGVufDF8fHx8MTc1ODU3MzY2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.3,
    location: 'Pinheiros, São Paulo',
    hours: '07:00 - 20:00',
    description: 'Café especial e refeições saudáveis'
  }
];

export const mockMenuItems: MenuItem[] = [
  // Burger Palace
  {
    id: '1',
    restaurantId: '1',
    name: 'Burger Clássico',
    description: 'Hambúrguer artesanal com queijo, alface, tomate e molho especial',
    price: 25.90,
    category: 'Hambúrgueres'
  },
  {
    id: '2',
    restaurantId: '1',
    name: 'Burger Bacon',
    description: 'Hambúrguer com bacon crocante, queijo cheddar e cebola caramelizada',
    price: 32.90,
    category: 'Hambúrgueres'
  },
  {
    id: '3',
    restaurantId: '1',
    name: 'Batata Frita',
    description: 'Porção de batatas fritas crocantes',
    price: 12.90,
    category: 'Acompanhamentos'
  },
  
  // Pizzaria Bella Vista
  {
    id: '4',
    restaurantId: '2',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mozzarella fresca e manjericão',
    price: 45.90,
    category: 'Pizzas'
  },
  {
    id: '5',
    restaurantId: '2',
    name: 'Pizza Pepperoni',
    description: 'Molho de tomate, mozzarella e pepperoni',
    price: 52.90,
    category: 'Pizzas'
  },
  {
    id: '6',
    restaurantId: '2',
    name: 'Calzone Ricotta',
    description: 'Calzone recheado com ricotta, espinafre e molho de tomate',
    price: 38.90,
    category: 'Calzones'
  },
  
  // Sushi Master
  {
    id: '7',
    restaurantId: '3',
    name: 'Combo Sashimi',
    description: '12 peças de sashimi variados (salmão, atum, peixe branco)',
    price: 65.90,
    category: 'Sashimi'
  },
  {
    id: '8',
    restaurantId: '3',
    name: 'Temaki Salmão',
    description: 'Temaki de salmão com pepino e cream cheese',
    price: 18.90,
    category: 'Temaki'
  },
  {
    id: '9',
    restaurantId: '3',
    name: 'Hot Roll Philadelphia',
    description: '8 peças de hot roll com salmão, cream cheese e gergelim',
    price: 42.90,
    category: 'Hot Rolls'
  },
  
  // Café & Delivery
  {
    id: '10',
    restaurantId: '4',
    name: 'Cappuccino',
    description: 'Cappuccino cremoso com canela',
    price: 8.90,
    category: 'Bebidas'
  },
  {
    id: '11',
    restaurantId: '4',
    name: 'Sanduíche Natural',
    description: 'Pão integral com peito de peru, queijo branco e salada',
    price: 15.90,
    category: 'Sanduíches'
  },
  {
    id: '12',
    restaurantId: '4',
    name: 'Açaí Bowl',
    description: 'Açaí com granola, banana e mel',
    price: 22.90,
    category: 'Açaí'
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    customerId: '1',
    restaurantId: '1',
    items: [
      { menuItem: mockMenuItems[0], quantity: 2 },
      { menuItem: mockMenuItems[2], quantity: 1 }
    ],
    total: 64.70,
    status: 'delivered',
    customerName: 'João Silva',
    address: 'Rua das Flores, 123 - Centro',
    createdAt: new Date('2024-01-15T12:30:00')
  },
  {
    id: '2',
    customerId: '1',
    restaurantId: '2',
    items: [
      { menuItem: mockMenuItems[3], quantity: 1 }
    ],
    total: 45.90,
    status: 'preparing',
    customerName: 'João Silva',
    address: 'Rua das Flores, 123 - Centro',
    createdAt: new Date('2024-01-20T19:15:00')
  },
  {
    id: '3',
    customerId: '2',
    restaurantId: '3',
    items: [
      { menuItem: mockMenuItems[6], quantity: 1 },
      { menuItem: mockMenuItems[7], quantity: 2 }
    ],
    total: 102.70,
    status: 'ready',
    customerName: 'Maria Santos',
    address: 'Av. Paulista, 456 - Bela Vista',
    createdAt: new Date('2024-01-22T20:45:00')
  }
];