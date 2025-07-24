import { useState, useEffect } from 'preact/hooks';
import { Sale, SaleForm } from '../types';
import { mockSales } from '../lib/mockData';
import toast from 'react-hot-toast';

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async () => {
    setLoading(true);
    setError(null);
    try {
      // For development, use mock data
      // const data = await api.sales.getAll();
      const data = mockSales;
      setSales(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar ventas';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id: number): Promise<Sale | null> => {
    try {
      // For development, use mock data
      // const data = await api.sales.getById(id);
      const data = mockSales.find(sale => sale.id === id);
      return data || null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar venta';
      toast.error(message);
      return null;
    }
  };

  const create = async (saleData: SaleForm): Promise<boolean> => {
    try {
      // Calculate total from details
      const total = saleData.details.reduce((sum, detail) => 
        sum + (detail.quantity * detail.price), 0
      );

      // For development, simulate API call
      // const newSale = await api.sales.create({ ...saleData, total });
      const newSale: Sale = {
        id: Date.now(),
        client_id: saleData.client_id,
        date: new Date().toISOString().split('T')[0],
        total,
      };
      
      setSales(prev => [...prev, newSale]);
      toast.success('Venta registrada exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrar venta';
      toast.error(message);
      return false;
    }
  };

  const update = async (id: number, saleData: Partial<Sale>): Promise<boolean> => {
    try {
      // For development, simulate API call
      // const updatedSale = await api.sales.update(id, saleData);
      setSales(prev => prev.map(sale => 
        sale.id === id 
          ? { ...sale, ...saleData }
          : sale
      ));
      toast.success('Venta actualizada exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar venta';
      toast.error(message);
      return false;
    }
  };

  const remove = async (id: number): Promise<boolean> => {
    try {
      // For development, simulate API call
      // await api.sales.remove(id);
      setSales(prev => prev.filter(sale => sale.id !== id));
      toast.success('Venta eliminada exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar venta';
      toast.error(message);
      return false;
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    sales,
    loading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
  };
}