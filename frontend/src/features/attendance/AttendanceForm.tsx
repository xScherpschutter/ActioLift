import { useState } from 'preact/hooks';
import { Attendance, AttendanceForm as AttendanceFormType } from '../../types';
import { attendanceSchema } from '../../lib/schemas';
import { useAttendance } from '../../hooks/useAttendance';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import ClientSearchSelect from '../../components/UI/ClientSearchSelect';

interface AttendanceFormProps {
  attendance?: Attendance;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AttendanceForm({ attendance, onClose, onSuccess }: AttendanceFormProps) {
  const { create, update } = useAttendance();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<AttendanceFormType>({
    client_id: attendance?.client_id || 0,
    date: attendance?.date || new Date().toISOString().split('T')[0],
    check_in_time: attendance?.check_in_time || new Date().toTimeString().slice(0, 5),
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = attendanceSchema.parse(formData);
      
      let success = false;
      if (attendance) {
        success = await update(attendance.id, validatedData);
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
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        toast.error('Error al procesar el formulario');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof AttendanceFormType, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleQuickCheckIn = () => {
    const now = new Date();
    setFormData(prev => ({
      ...prev,
      date: now.toISOString().split('T')[0],
      check_in_time: now.toTimeString().slice(0, 5),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {attendance ? 'Editar Asistencia' : 'Registrar Asistencia'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cliente
            </label>
            <ClientSearchSelect
              selectedClientId={formData.client_id}
              onClientSelect={(clientId) => handleChange('client_id', clientId)}
              placeholder="Buscar y seleccionar cliente..."
              error={errors.client_id}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', (e.target as HTMLInputElement).value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="text-sm text-red-600 mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Hora de Entrada
              </label>
              <button
                type="button"
                onClick={handleQuickCheckIn}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Usar hora actual
              </button>
            </div>
            <input
              type="time"
              value={formData.check_in_time}
              onChange={(e) => handleChange('check_in_time', (e.target as HTMLInputElement).value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.check_in_time ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.check_in_time && (
              <p className="text-sm text-red-600 mt-1">{errors.check_in_time}</p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Resumen</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p><span className="font-medium">Fecha:</span> {formData.date ? new Date(formData.date).toLocaleDateString('es-ES') : 'No seleccionada'}</p>
              <p><span className="font-medium">Hora:</span> {formData.check_in_time || 'No seleccionada'}</p>
            </div>
          </div>

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
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Guardando...' : (attendance ? 'Actualizar' : 'Registrar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}