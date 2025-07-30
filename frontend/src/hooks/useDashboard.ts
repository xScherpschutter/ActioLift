import { useState, useEffect } from 'preact/hooks';
import { DashboardStats, Activity } from '../types';
import { GetDashboard, GetActivities} from '../../wailsjs/go/main/App'
import toast from 'react-hot-toast';

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GetDashboard();
      setStats(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar estadísticas';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GetActivities();
      setActivities(data);
      console.log(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar últimos registros';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
    getActivities();
  }, []);

  return {
    stats,
    activities,
    loading,
    error,
    getStats,
    getActivities,
  };
}