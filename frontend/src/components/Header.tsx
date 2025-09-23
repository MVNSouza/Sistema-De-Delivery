import React from 'react';
import { ShoppingCart, User, LogOut, Home, History, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-xl font-semibold">DeliveryApp</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant={currentPage === '/' ? 'default' : 'ghost'}
              onClick={() => onNavigate('/')}
              className="flex items-center space-x-1"
            >
              <Home className="w-4 h-4" />
              <span>Início</span>
            </Button>

            {user?.role === 'customer' && (
              <Button
                variant={currentPage === '/orders' ? 'default' : 'ghost'}
                onClick={() => onNavigate('/orders')}
                className="flex items-center space-x-1"
              >
                <History className="w-4 h-4" />
                <span>Meus Pedidos</span>
              </Button>
            )}

            {user?.role === 'restaurant' && (
              <Button
                variant={currentPage === '/dashboard' ? 'default' : 'ghost'}
                onClick={() => onNavigate('/dashboard')}
                className="flex items-center space-x-1"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart (only for customers) */}
            {user?.role === 'customer' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate('/cart')}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center p-0">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            )}

            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  
                  {/* Mobile navigation items */}
                  <div className="md:hidden">
                    <DropdownMenuItem onClick={() => onNavigate('/')}>
                      <Home className="w-4 h-4 mr-2" />
                      Início
                    </DropdownMenuItem>
                    
                    {user.role === 'customer' && (
                      <DropdownMenuItem onClick={() => onNavigate('/orders')}>
                        <History className="w-4 h-4 mr-2" />
                        Meus Pedidos
                      </DropdownMenuItem>
                    )}
                    
                    {user.role === 'restaurant' && (
                      <DropdownMenuItem onClick={() => onNavigate('/dashboard')}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Dashboard
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                  </div>
                  
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => onNavigate('/login')}>
                Entrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}