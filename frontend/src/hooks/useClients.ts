import { useState, useEffect } from 'preact/hooks';
import { Client, ClientForm, UpdateClientForm } from '../types';
import toast from 'react-hot-toast';
import { GetAllClients, DeleteClient, UpdateClient, SaveClient, GetClientByID } from '../../wailsjs/go/main/App'

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await GetAllClients();
      console.log(result);
      setClients(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar clientes';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id: number): Promise<Client | null> => {
    try {
      const data = await GetClientByID({id: id});
      return data || null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar cliente';
      toast.error(message);
      return null;
    }
  };

  const create = async (clientData: ClientForm): Promise<boolean> => {
    try {
      await SaveClient({...clientData, registration_date: new Date().toISOString()});
      toast.success('Cliente creado exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear cliente';
      toast.error(message);
      return false;
    }
  };

  const update = async (id: number, clientData: UpdateClientForm): Promise<boolean> => {
    try {
      await UpdateClient({ id, ...clientData });
      toast.success('Cliente actualizado exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar cliente';
      toast.error(message);
      return false;
    }
  };

  const remove = async (id: number): Promise<boolean> => {
    try {
      await DeleteClient({ id });
      toast.success('Cliente eliminado exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar cliente';
      toast.error(message);
      return false;
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    clients,
    loading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
  };
}