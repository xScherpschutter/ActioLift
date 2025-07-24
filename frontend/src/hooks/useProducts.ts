import { useState, useEffect } from 'preact/hooks';
import { Product, ProductForm } from '../types';
import { GetAllProducts, DeleteProduct, SaveProduct, UpdateProduct } from '../../wailsjs/go/main/App'
import toast from 'react-hot-toast';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GetAllProducts();
      console.log(data);
      setProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (productData: ProductForm): Promise<boolean> => {
    try {
      await SaveProduct(productData);
      toast.success('Producto creado exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear producto';
      toast.error(message);
      return false;
    }
  };

  const update = async (id: number, productData: ProductForm): Promise<boolean> => {
    try {
      await UpdateProduct({
        id: id,
        ...productData
      });
      toast.success('Producto actualizado exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar producto';
      toast.error(message);
      return false;
    }
  };

  const remove = async (id: number): Promise<boolean> => {
    try {
      await DeleteProduct({id: id});
      toast.success('Producto eliminado exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar producto';
      toast.error(message);
      return false;
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    products,
    loading,
    error,
    getAll,
    create,
    update,
    remove,
  };
}