import { useState, useEffect } from 'preact/hooks';
import { Membership, MembershipForm } from '../types';
import { GetAllMemberships, SaveMembership, DeleteMembership, UpdateMembership } from '../../wailsjs/go/main/App'
import toast from 'react-hot-toast';

export function useMemberships() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GetAllMemberships();
      setMemberships(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar membresías';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (membershipData: MembershipForm): Promise<boolean> => {
    try {
      await SaveMembership(membershipData);
      toast.success('Membresía creada exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear membresía';
      toast.error(message);
      return false;
    }
  };

  const update = async (id: number, membershipData: MembershipForm): Promise<boolean> => {
    try {
      await UpdateMembership({
        id: id,
        ...membershipData
      });
      toast.success('Membresía actualizada exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar membresía';
      toast.error(message);
      return false;
    }
  };

  const remove = async (id: number): Promise<boolean> => {
    try {
      await DeleteMembership({id: id});
      toast.success('Membresía eliminada exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar membresía';
      toast.error(message);
      return false;
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    memberships,
    loading,
    error,
    getAll,
    create,
    update,
    remove,
  };
}