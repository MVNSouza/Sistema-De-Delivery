import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, Truck, X, Eye } from 'lucide-react';
import { Order } from '../types';
import { mockOrders, mockRestaurants } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface RestaurantDashboardProps {
  onBack: () => void;
}

const statusConfig = {
  pending: { 
    label: 'Pendente', 
    icon: Clock, 
    color: 'bg-yellow-100 text-yellow-800',
    nextStatus: 'preparing' as const
  },
  preparing: { 
    label: 'Em Preparo', 
    icon: Clock, 
    color: 'bg-blue-100 text-blue-800',
    nextStatus: 'ready' as const
  },
  ready: { 
    label: 'Pronto', 
    icon: CheckCircle, 
    color: 'bg-green-100 text-green-800',
    nextStatus: 'delivered' as const
  },
  delivered: { 
    label: 'Entregue', 
    icon: Truck, 
    color: 'bg-gray-100 text-gray-800',
    nextStatus: null
  },
  cancelled: { 
    label: 'Cancelado', 
    icon: X, 
    color: 'bg-red-100 text-red-800',
    nextStatus: null
  }
};

export function RestaurantDashboard({ onBack }: RestaurantDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate occasional error for demo
      if (Math.random() < 0.1) {
        throw new Error('Falha ao carregar pedidos');
      }

      // Get restaurant ID based on user
      // For demo purposes, we'll map users to restaurants
      const userToRestaurant: Record<string, string> = {
        '3': '1', // burger@example.com -> Burger Palace
        '4': '2', // pizza@example.com -> Pizzaria Bella Vista
      };

      const restaurantId = userToRestaurant[user?.id || ''];
      
      if (!restaurantId) {
        setOrders([]);
        return;
      }

      // Filter orders for current restaurant
      const restaurantOrders = mockOrders.filter(order => order.restaurantId === restaurantId);
      // Sort by creation date (newest first)
      restaurantOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      setOrders(restaurantOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRestaurantName = (restaurantId: string) => {
    const restaurant = mockRestaurants.find(r => r.id === restaurantId);
    return restaurant?.name || 'Restaurante';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div className="text-center">
          <LoadingSpinner size="lg" text="Carregando pedidos..." />
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
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <ErrorMessage
          message={error}
          onRetry={loadOrders}
          fullPage={false}
        />
      </div>
    );
  }

  const activeOrders = orders.filter(order => 
    order.status !== 'delivered' && order.status !== 'cancelled'
  );
  const completedOrders = orders.filter(order => 
    order.status === 'delivered' || order.status === 'cancelled'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard do Restaurante</h1>
        <p className="text-muted-foreground">
          Gerencie os pedidos do seu restaurante
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{activeOrders.length}</div>
            <p className="text-sm text-muted-foreground">Pedidos Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</div>
            <p className="text-sm text-muted-foreground">Aguardando</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{orders.filter(o => o.status === 'preparing').length}</div>
            <p className="text-sm text-muted-foreground">Em Preparo</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              R$ {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">Total do Dia</p>
          </CardContent>
        </Card>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-medium mb-2">Nenhum pedido encontrado</h3>
          <p className="text-muted-foreground">
            Quando você receber pedidos, eles aparecerão aqui
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Active Orders */}
          {activeOrders.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Pedidos Ativos</h2>
              <div className="grid gap-4">
                {activeOrders.map((order) => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;

                  return (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {order.customerName} • {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={status.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.label}
                            </Badge>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Detalhes do Pedido #{order.id}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Cliente:</h4>
                                    <p>{order.customerName}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Endereço:</h4>
                                    <p className="text-sm">{order.address}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Itens:</h4>
                                    <div className="space-y-1">
                                      {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                          <span>{item.quantity}x {item.menuItem.name}</span>
                                          <span>R$ {(item.menuItem.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="border-t pt-2">
                                    <div className="flex justify-between font-semibold">
                                      <span>Total:</span>
                                      <span>R$ {order.total.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Order Items Summary */}
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''} • 
                            R$ {order.total.toFixed(2)}
                          </div>
                        </div>

                        {/* Status Actions */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {order.address}
                          </div>
                          
                          {status.nextStatus && (
                            <div className="flex space-x-2">
                              <Select
                                value={order.status}
                                onValueChange={(value: Order['status']) => 
                                  updateOrderStatus(order.id, value)
                                }
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pendente</SelectItem>
                                  <SelectItem value="preparing">Em Preparo</SelectItem>
                                  <SelectItem value="ready">Pronto</SelectItem>
                                  <SelectItem value="delivered">Entregue</SelectItem>
                                  <SelectItem value="cancelled">Cancelado</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed Orders */}
          {completedOrders.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Pedidos Concluídos</h2>
              <div className="grid gap-4">
                {completedOrders.slice(0, 5).map((order) => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;

                  return (
                    <Card key={order.id} className="opacity-75">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Pedido #{order.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.customerName} • {formatDate(order.createdAt)}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold">R$ {order.total.toFixed(2)}</span>
                            <Badge className={status.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}