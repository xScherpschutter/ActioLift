import { useState } from 'preact/hooks';
import { Sale, SaleForm as SaleFormType, SalesDetailForm } from '../../types';
import { saleSchema } from '../../lib/schemas';
import { useSales } from '../../hooks/useSales';
import { useProducts } from '../../hooks/useProducts';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import ClientSearchSelect from '../../components/UI/ClientSearchSelect';
import ProductSearchSelect from '../../components/UI/ProductSearchSelect';

interface SaleFormProps {
  sale?: Sale;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SaleForm({ sale, onClose, onSuccess }: SaleFormProps) {
  const { create, update } = useSales();
  const { products } = useProducts();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<SaleFormType>({
    client_id: sale?.client_id || 0,
    details: sale?.details || [],
  });

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      details: [...prev.details, { product_id: 0, quantity: 1, price: 0 }]
    }));
  };

  const removeProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  const updateDetail = (index: number, field: keyof SalesDetailForm, value: number) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.map((detail, i) => {
        if (i === index) {
          const updated = { ...detail, [field]: value };
          
          // Auto-update price when product changes
          if (field === 'product_id') {
            const product = products.find(p => p.id === value);
            if (product) {
              updated.price = product.price;
            }
          }
          
          return updated;
        }
        return detail;
      })
    }));
  };

  const calculateTotal = () => {
    return formData.details.reduce((sum, detail) => sum + (detail.quantity * detail.price), 0);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = saleSchema.parse(formData);
      
      let success = false;
      if (sale) {
        success = await update(sale.id, {
          client_id: validatedData.client_id,
          details: validatedData.details.map(detail => ({
            ...detail,
            sale_id: sale.id
          }))
        });
      } else {
        success = await create(validatedData);
      }

      if (success) {
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          newErrors[err.path.join('.')] = err.message;
        });
        setErrors(newErrors);
      } else {
        toast.error('Error al procesar el formulario');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {sale ? 'Editar Venta' : 'Nueva Venta'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cliente
            </label>
            <ClientSearchSelect
              selectedClientId={formData.client_id}
              onClientSelect={(clientId) => setFormData(prev => ({ ...prev, client_id: clientId }))}
              placeholder="Buscar y seleccionar cliente..."
              error={errors.client_id}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">Productos</h4>
              <button
                type="button"
                onClick={addProduct}
                className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Producto</span>
              </button>
            </div>

            {formData.details.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No hay productos agregados</p>
                <button
                  type="button"
                  onClick={addProduct}
                  className="mt-2 text-blue-600 hover:text-blue-800"
                >
                  Agregar el primer producto
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.details.map((detail, index) => {
                  const product = products.find(p => p.id === detail.product_id);
                  return (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Producto
                          </label>
                          <ProductSearchSelect
                            selectedProductId={detail.product_id}
                            onProductSelect={(productId) => updateDetail(index, 'product_id', productId)}
                            placeholder="Buscar producto..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cantidad
                          </label>
                          <input
                            type="number"
                            min="1"
                            max={product?.stock || 999}
                            value={detail.quantity}
                            onChange={(e) => updateDetail(index, 'quantity', parseInt((e.target as HTMLInputElement).value) || 1)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio Unitario
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={detail.price}
                            onChange={(e) => updateDetail(index, 'price', parseFloat((e.target as HTMLInputElement).value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => removeProduct(index)}
                            className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 text-right">
                        <span className="text-sm text-gray-600">Subtotal: </span>
                        <span className="font-semibold">S/ {(detail.quantity * detail.price).toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {errors.details && (
              <p className="text-sm text-red-600 mt-1">{errors.details}</p>
            )}
          </div>

          {formData.details.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-blue-900">Total de la Venta:</span>
                <span className="text-2xl font-bold text-blue-900">S/ {calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || formData.details.length === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Guardando...' : (sale ? 'Actualizar' : 'Crear Venta')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}