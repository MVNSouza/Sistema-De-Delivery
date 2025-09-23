import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { RestaurantMenu } from './components/RestaurantMenu';
import { Cart } from './components/Cart';
import { OrderSuccess } from './components/OrderSuccess';
import { CustomerOrders } from './components/CustomerOrders';
import { RestaurantDashboard } from './components/RestaurantDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Restaurant } from './types';
import { Toaster } from './components/ui/sonner';

type Page = '/' | '/login' | '/restaurant' | '/cart' | '/order-success' | '/orders' | '/dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('/');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentPage('/restaurant');
  };

  const handleBackToHome = () => {
    setSelectedRestaurant(null);
    setCurrentPage('/');
  };

  const handleOrderSuccess = () => {
    setCurrentPage('/order-success');
  };

  const renderPage = () => {
    switch (currentPage) {
      case '/login':
        return <Login />;
      
      case '/restaurant':
        return selectedRestaurant ? (
          <RestaurantMenu
            restaurant={selectedRestaurant}
            onBack={handleBackToHome}
          />
        ) : (
          <Home onRestaurantSelect={handleRestaurantSelect} />
        );
      
      case '/cart':
        return (
          <ProtectedRoute allowedRoles={['customer']}>
            <Cart
              onBack={handleBackToHome}
              onOrderSuccess={handleOrderSuccess}
            />
          </ProtectedRoute>
        );
      
      case '/order-success':
        return (
          <ProtectedRoute allowedRoles={['customer']}>
            <OrderSuccess
              onGoHome={handleBackToHome}
              onViewOrders={() => navigate('/orders')}
            />
          </ProtectedRoute>
        );
      
      case '/orders':
        return (
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerOrders onBack={handleBackToHome} />
          </ProtectedRoute>
        );
      
      case '/dashboard':
        return (
          <ProtectedRoute allowedRoles={['restaurant']}>
            <RestaurantDashboard onBack={handleBackToHome} />
          </ProtectedRoute>
        );
      
      default:
        return <Home onRestaurantSelect={handleRestaurantSelect} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Header currentPage={currentPage} onNavigate={navigate} />
          
          <main className="flex-1">
            {renderPage()}
          </main>
          
          <Footer />
          <Toaster />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}