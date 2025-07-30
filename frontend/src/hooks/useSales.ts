import { useState, useEffect } from 'preact/hooks';
import { Sale, SaleForm } from '../types';
import toast from 'react-hot-toast';
import { SaveSale, GetAllSales, DeleteSale, UpdateSale } from '../../wailsjs/go/main/App'
import { save_sale, update_sale } from '../../wailsjs/go/models';
export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GetAllSales();
      console.log(data);
      setSales(data);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Error al cargar ventas';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (saleData: SaleForm): Promise<boolean> => {
    try {
      await SaveSale(saleData as save_sale.SaveSaleRequest)
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
      const updateData = new update_sale.UpdateSaleRequest();
      updateData.id = id;
      updateData.client_id = saleData.client_id!;
      updateData.details = saleData.details!;
      
      await UpdateSale(updateData as update_sale.UpdateSaleRequest);
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
      await DeleteSale({id: id});
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
    create,
    update,
    remove,
  };
}