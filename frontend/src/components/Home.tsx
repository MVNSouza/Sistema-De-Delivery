import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Clock } from 'lucide-react';
import { Restaurant } from '../types';
import { apiService } from '../services/api';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

export function Home({ onRestaurantSelect }: HomeProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = restaurants.filter(restaurant =>
        restaurant.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [searchTerm, restaurants]);

  const loadRestaurants = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.getRestaurants();
      
      if (response.success) {
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      } else {
        throw new Error(response.message || 'Falha ao carregar restaurantes');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <LoadingSpinner size="lg" text="Carregando restaurantes..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={error}
          onRetry={loadRestaurants}
          fullPage={false}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Delivery dos seus restaurantes favoritos
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Peça comida deliciosa no conforto da sua casa
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar restaurantes ou localização..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredRestaurants.length === 0 && searchTerm ? (
            `Nenhum restaurante encontrado para "${searchTerm}"`
          ) : (
            `${filteredRestaurants.length} restaurante${filteredRestaurants.length !== 1 ? 's' : ''} ${searchTerm ? `encontrado${filteredRestaurants.length !== 1 ? 's' : ''}` : 'disponíveis'}`
          )}
        </p>
      </div>

      {/* Restaurants Grid */}
      {filteredRestaurants.length === 0 && searchTerm ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium mb-2">Nenhum resultado encontrado</h3>
          <p className="text-muted-foreground">
            Tente buscar por outro nome ou localização
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              onClick={() => onRestaurantSelect(restaurant)}
            >
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white text-black">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {restaurant.rating}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{restaurant.nome}</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {restaurant.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {restaurant.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {restaurant.hours}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredRestaurants.length === 0 && !searchTerm && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-medium mb-2">Nenhum restaurante disponível</h3>
          <p className="text-muted-foreground">
            Volte em breve para ver novos restaurantes
          </p>
        </div>
      )}
    </div>
  );
}