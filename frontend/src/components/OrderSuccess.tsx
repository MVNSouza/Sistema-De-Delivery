import React from 'react';
import { CheckCircle, Home, History } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface OrderSuccessProps {
  onGoHome: () => void;
  onViewOrders: () => void;
}

export function OrderSuccess({ onGoHome, onViewOrders }: OrderSuccessProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-2">Pedido realizado com sucesso!</h2>
            <p className="text-muted-foreground mb-6">
              Seu pedido foi enviado para o restaurante e você receberá atualizações sobre o status.
            </p>
            
            <div className="space-y-3">
              <Button onClick={onViewOrders} className="w-full">
                <History className="w-4 h-4 mr-2" />
                Ver meus pedidos
              </Button>
              
              <Button variant="outline" onClick={onGoHome} className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}