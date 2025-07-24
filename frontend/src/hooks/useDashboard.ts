import { useState, useEffect } from 'preact/hooks';
import { DashboardStats } from '../types';
import { api } from '../lib/api';
import { mockDashboardStats } from '../lib/mockData';
import toast from 'react-hot-toast';

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStats = async () => {
    setLoading(true);
    setError(null);
    try {
      // For development, use mock data
      // const data = await api.dashboard.getStats();
      const data = mockDashboardStats;
      setStats(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar estadísticas';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return {
    stats,
    loading,
    error,
    getStats,
  };
}