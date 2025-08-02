import { useState } from 'preact/hooks';
import { Membership, MembershipForm as MembershipFormType } from '../../types';
import { membershipSchema } from '../../lib/schemas';
import { useMemberships } from '../../hooks/useMemberships';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface MembershipFormProps {
  membership?: Membership;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MembershipForm({ membership, onClose, onSuccess }: MembershipFormProps) {
  const { create, update } = useMemberships();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<MembershipFormType>({
    name: membership?.name || '',
    description: membership?.description || '',
    price: membership?.price || 0,
    duration: membership?.duration || 30,
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = membershipSchema.parse(formData);
      
      let success = false;
      if (membership) {
        success = await update(membership.id, validatedData);
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

  const handleChange = (field: keyof MembershipFormType, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {membership ? 'Editar Membresía' : 'Nueva Membresía'}
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
              Nombre de la Membresía
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', (e.target as HTMLInputElement).value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Membresía Premium"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', (e.target as HTMLTextAreaElement).value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe brevemente los beneficios o condiciones de esta membresía"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat((e.target as HTMLInputElement).value) || 0)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-sm text-red-600 mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duración (días)
            </label>
            <select
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseInt((e.target as HTMLSelectElement).value))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.duration_days ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value={1}>1 Día</option>
              <option value={7}>1 Semana (7 días)</option>
              <option value={15}>15 días</option>
              <option value={30}>1 Mes (30 días)</option>
              <option value={60}>2 Meses (60 días)</option>
              <option value={90}>3 Meses (90 días)</option>
              <option value={180}>6 Meses (180 días)</option>
              <option value={365}>1 Año (365 días)</option>
            </select>
            {errors.duration_days && (
              <p className="text-sm text-red-600 mt-1">{errors.duration_days}</p>
            )}
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
              {loading ? 'Guardando...' : (membership ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}