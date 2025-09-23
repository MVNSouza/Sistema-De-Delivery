import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, Truck, X } from 'lucide-react';
import { Order } from '../types';
import { mockOrders } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface CustomerOrdersProps {
  onBack: () => void;
}

const statusConfig = {
  pending: { 
    label: 'Pendente', 
    icon: Clock, 
    color: 'bg-yellow-100 text-yellow-800' 
  },
  preparing: { 
    label: 'Em Preparo', 
    icon: Clock, 
    color: 'bg-blue-100 text-blue-800' 
  },
  ready: { 
    label: 'Pronto', 
    icon: CheckCircle, 
    color: 'bg-green-100 text-green-800' 
  },
  delivered: { 
    label: 'Entregue', 
    icon: Truck, 
    color: 'bg-gray-100 text-gray-800' 
  },
  cancelled: { 
    label: 'Cancelado', 
    icon: X, 
    color: 'bg-red-100 text-red-800' 
  }
};

export function CustomerOrders({ onBack }: CustomerOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

      // Filter orders for current user
      const userOrders = mockOrders.filter(order => order.customerId === user?.id);
      // Sort by creation date (newest first)
      userOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      setOrders(userOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
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
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
        <p className="text-muted-foreground">
          Acompanhe o status dos seus pedidos
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-medium mb-2">Nenhum pedido encontrado</h3>
          <p className="text-muted-foreground mb-6">
            Você ainda não fez nenhum pedido
          </p>
          <Button onClick={onBack}>
            Fazer primeiro pedido
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge className={status.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-2">Itens do pedido:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>
                            {item.quantity}x {item.menuItem.name}
                          </span>
                          <span>R$ {(item.menuItem.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h4 className="font-medium mb-1">Endereço de entrega:</h4>
                    <p className="text-sm text-muted-foreground">{order.address}</p>
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total:</span>
                      <span className="font-semibold text-lg">R$ {order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Status Message */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm">
                      {order.status === 'pending' && 'Seu pedido foi recebido e está aguardando confirmação do restaurante.'}
                      {order.status === 'preparing' && 'Seu pedido está sendo preparado pelo restaurante.'}
                      {order.status === 'ready' && 'Seu pedido está pronto e será entregue em breve.'}
                      {order.status === 'delivered' && 'Seu pedido foi entregue com sucesso!'}
                      {order.status === 'cancelled' && 'Seu pedido foi cancelado.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}