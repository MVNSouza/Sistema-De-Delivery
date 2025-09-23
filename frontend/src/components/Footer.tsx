import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-xl font-semibold">DeliveryApp</span>
            </div>
            <p className="text-muted-foreground">
              A melhor plataforma de delivery da cidade. Conectando você aos seus restaurantes favoritos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4">Links Úteis</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Sobre nós
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Como funciona
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Suporte
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Para restaurantes
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Contato</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>📧 contato@deliveryapp.com</p>
              <p>📞 (11) 9999-9999</p>
              <p>📍 São Paulo, SP</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 DeliveryApp. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}