import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { LoadingSpinner } from './LoadingSpinner';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartProps {
  onBack: () => void;
  onOrderSuccess: () => void;
}

export function Cart({ onBack, onOrderSuccess }: CartProps) {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleCheckout = async () => {
    if (!address.trim()) {
      setAddressError('Endereço de entrega é obrigatório');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock order
      const order = {
        id: Date.now().toString(),
        customerId: user?.id || '',
        items,
        total,
        address: address.trim(),
        notes: notes.trim(),
        status: 'pending' as const,
        createdAt: new Date()
      };

      console.log('Order created:', order);
      
      clearCart();
      onOrderSuccess();
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
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

        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold mb-2">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground mb-6">
            Adicione alguns itens deliciosos para começar
          </p>
          <Button onClick={onBack}>
            Ver restaurantes
          </Button>
        </div>
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
        <ArrowLeft className="w-4 h-4" />
        Continuar comprando
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Seu Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.menuItem.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.menuItem.image ? (
                      <ImageWithFallback
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        🍽️
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold">{item.menuItem.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.menuItem.description}
                    </p>
                    <p className="font-semibold text-green-600">
                      R$ {item.menuItem.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(item.menuItem.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-right font-semibold">
                    R$ {(item.menuItem.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Checkout */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span>R$ 5,00</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>R$ {(total + 5).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {!isCheckingOut ? (
                <Button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full"
                  size="lg"
                >
                  Finalizar Pedido
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Endereço de entrega *</Label>
                    <Textarea
                      id="address"
                      placeholder="Digite seu endereço completo..."
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (addressError) setAddressError('');
                      }}
                      className={addressError ? 'border-destructive' : ''}
                    />
                    {addressError && (
                      <p className="text-sm text-destructive mt-1">{addressError}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Alguma observação sobre o pedido..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleCheckout}
                      className="w-full"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Confirmar Pedido
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-full"
                      disabled={isLoading}
                    >
                      Voltar
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}