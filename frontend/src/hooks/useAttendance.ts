import { useState, useEffect } from 'preact/hooks';
import { Attendance, AttendanceForm } from '../types';
import { mockAttendance } from '../lib/mockData';
import toast from 'react-hot-toast';

export function useAttendance() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async () => {
    setLoading(true);
    setError(null);
    try {
      // For development, use mock data
      // const data = await api.attendance.getAll();
      const data = mockAttendance;
      setAttendance(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar asistencias';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id: number): Promise<Attendance | null> => {
    try {
      // For development, use mock data
      // const data = await api.attendance.getById(id);
      const data = mockAttendance.find(record => record.id === id);
      return data || null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar asistencia';
      toast.error(message);
      return null;
    }
  };

  const create = async (attendanceData: AttendanceForm): Promise<boolean> => {
    try {
      // For development, simulate API call
      // const newAttendance = await api.attendance.create(attendanceData);
      const newAttendance: Attendance = {
        id: Date.now(),
        ...attendanceData,
      };
      
      setAttendance(prev => [...prev, newAttendance]);
      toast.success('Asistencia registrada exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrar asistencia';
      toast.error(message);
      return false;
    }
  };

  const update = async (id: number, attendanceData: AttendanceForm): Promise<boolean> => {
    try {
      // For development, simulate API call
      // const updatedAttendance = await api.attendance.update(id, attendanceData);
      setAttendance(prev => prev.map(record => 
        record.id === id 
          ? { ...record, ...attendanceData }
          : record
      ));
      toast.success('Asistencia actualizada exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar asistencia';
      toast.error(message);
      return false;
    }
  };

  const remove = async (id: number): Promise<boolean> => {
    try {
      // For development, simulate API call
      // await api.attendance.remove(id);
      setAttendance(prev => prev.filter(record => record.id !== id));
      toast.success('Asistencia eliminada exitosamente');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar asistencia';
      toast.error(message);
      return false;
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    attendance,
    loading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
  };
}