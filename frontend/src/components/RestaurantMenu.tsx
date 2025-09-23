import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Minus, Star, MapPin, Clock } from 'lucide-react';
import { Restaurant, MenuItem } from '../types';
import { mockMenuItems } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantMenuProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export function RestaurantMenu({ restaurant, onBack }: RestaurantMenuProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  
  const { addItem, items: cartItems } = useCart();

  useEffect(() => {
    loadMenuItems();
  }, [restaurant.id]);

  const loadMenuItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate occasional error for demo
      if (Math.random() < 0.1) {
        throw new Error('Falha ao carregar cardápio');
      }

      const items = mockMenuItems.filter(item => item.restaurantId === restaurant.id);
      setMenuItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItemQuantities(prev => {
      const current = prev[itemId] || 0;
      const newQuantity = Math.max(0, current + delta);
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const addToCart = (menuItem: MenuItem) => {
    const quantity = itemQuantities[menuItem.id] || 1;
    addItem(menuItem, quantity);
    setItemQuantities(prev => ({ ...prev, [menuItem.id]: 0 }));
  };

  const getCartQuantity = (itemId: string) => {
    const cartItem = cartItems.find(item => item.menuItem.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Group items by category
  const groupedItems = menuItems.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, MenuItem[]>);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div className="text-center">
          <LoadingSpinner size="lg" text="Carregando cardápio..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <ErrorMessage
          message={error}
          onRetry={loadMenuItems}
          fullPage={false}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para restaurantes
      </Button>

      {/* Restaurant Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold">{restaurant.name}</h1>
              <Badge className="bg-green-100 text-green-800">
                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                {restaurant.rating}
              </Badge>
            </div>
            
            <p className="text-muted-foreground mb-4">{restaurant.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                {restaurant.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                {restaurant.hours}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {Object.keys(groupedItems).length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-medium mb-2">Cardápio indisponível</h3>
          <p className="text-muted-foreground">
            Este restaurante ainda não possui itens no cardápio
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <div className="grid gap-4">
                {items.map((item) => {
                  const quantity = itemQuantities[item.id] || 0;
                  const cartQuantity = getCartQuantity(item.id);
                  
                  return (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Item Image */}
                          {item.image && (
                            <div className="sm:w-48 h-48 sm:h-auto">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          {/* Item Info */}
                          <div className="flex-1 p-6">
                            <div className="flex flex-col h-full">
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg font-semibold">{item.name}</h3>
                                  <span className="text-lg font-semibold text-green-600">
                                    R$ {item.price.toFixed(2)}
                                  </span>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                  {item.description}
                                </p>
                              </div>
                              
                              {/* Quantity and Add to Cart */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateQuantity(item.id, -1)}
                                    disabled={quantity === 0}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="w-8 text-center">{quantity || 1}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  {cartQuantity > 0 && (
                                    <Badge variant="secondary">
                                      {cartQuantity} no carrinho
                                    </Badge>
                                  )}
                                  <Button onClick={() => addToCart(item)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Adicionar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}