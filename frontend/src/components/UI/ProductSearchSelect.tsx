import { useState, useEffect } from 'preact/hooks';
import { Search, Package, X } from 'lucide-react';
import { Product } from '../../types';
import { useProducts } from '../../hooks/useProducts';

interface ProductSearchSelectProps {
  selectedProductId: number;
  onProductSelect: (productId: number) => void;
  placeholder?: string;
  error?: string;
}

export default function ProductSearchSelect({
  selectedProductId,
  onProductSelect,
  placeholder = 'Buscar producto...',
  error
}: ProductSearchSelectProps) {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const selectedProduct = products.find(p => p.id === selectedProductId);
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (product: Product) => {
    onProductSelect(product.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onProductSelect(0);
    setSearchTerm('');
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Sin stock', color: 'text-red-600' };
    if (stock <= 10) return { text: 'Stock bajo', color: 'text-yellow-600' };
    return { text: 'En stock', color: 'text-green-600' };
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.product-search-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="product-search-container relative">
      <div className={`relative border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}>
        <div className="flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={selectedProduct ? `${selectedProduct.name} (Stock: ${selectedProduct.stock})` : searchTerm}
            onChange={(e) => {
              setSearchTerm((e.target as HTMLInputElement).value);
              setIsOpen(true);
              if (selectedProduct) {
                onProductSelect(0);
              }
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          {selectedProduct && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleProductSelect(product)}
                  disabled={product.stock === 0}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        S/ {product.price.toFixed(2)}
                      </p>
                      <p className={`text-sm font-medium ${stockStatus.color}`}>
                        {stockStatus.text} ({product.stock})
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">
              No se encontraron productos
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}