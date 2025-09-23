const API_BASE_URL = 'http://localhost:5000';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // 1. Autenticação
  async login(email: string, senha: string) {
    const response = await fetch(`${API_BASE_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao fazer login');
    }
    
    return response.json();
  }

  async register(nome: string, email: string, senha: string, tipo: 'customer' | 'restaurant') {
    const response = await fetch(`${API_BASE_URL}register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, tipo })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao criar conta');
    }
    
    return response.json();
  }

  // 2. Restaurantes
  async getRestaurants() {
    const response = await fetch(`${API_BASE_URL}/restaurants`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Erro ao carregar restaurantes');
    }
    
    return response.json();
  }

  // 3. Produtos de um restaurante
  async getRestaurantProducts(restaurantId: string) {
    const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/products`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Erro ao carregar produtos');
    }
    
    return response.json();
  }

  // 4. Adicionar produto ao carrinho / criar pedido
  async addToCart(productId: string, quantity: number) {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ produto_id: productId, quantidade: quantity })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao adicionar ao carrinho');
    }
    
    return response.json();
  }

  // 5. Checkout - criar pedido
  async createOrder(endereco: string, itens: Array<{ produto_id: string; quantidade: number }>) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ endereco, itens })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao criar pedido');
    }
    
    return response.json();
  }

  // 6. Listar pedidos de um restaurante
  async getRestaurantOrders(restaurantId: string) {
    const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/orders`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Erro ao carregar pedidos');
    }
    
    return response.json();
  }

  // 7. Atualizar status do pedido
  async updateOrderStatus(orderId: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar status');
    }
    
    return response.json();
  }

  // Listar pedidos do cliente
  async getCustomerOrders(customerId: string) {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}/orders`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Erro ao carregar pedidos');
    }
    
    return response.json();
  }
}

export const apiService = new ApiService();