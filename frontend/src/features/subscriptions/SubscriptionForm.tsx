import { useState, useEffect } from 'preact/hooks';
import { Subscription, SubscriptionForm as SubscriptionFormType } from '../../types';
import { subscriptionSchema } from '../../lib/schemas';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useMemberships } from '../../hooks/useMemberships';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import ClientSearchSelect from '../../components/UI/ClientSearchSelect';

interface SubscriptionFormProps {
  subscription?: Subscription;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SubscriptionForm({ subscription, onClose, onSuccess }: SubscriptionFormProps) {
  const { create, update, getAll } = useSubscriptions();
  const { memberships } = useMemberships();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<SubscriptionFormType>({
    client_id: subscription?.client_id || 0,
    membership_id: subscription?.membership_id || 0,
    start_date: subscription?.start_date || new Date().toISOString().split('T')[0],
    end_date: subscription?.end_date || '',
  });

  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (formData.start_date && formData.membership_id) {
      const membership = memberships.find(m => m.id === formData.membership_id);
      if (membership) {
        const start = new Date(formData.start_date);
        const end = new Date(start);
        end.setDate(end.getDate() + membership.duration);
        setEndDate(end.toISOString().split('T')[0]);
      }
    }
  }, [formData.start_date, formData.membership_id, memberships]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = subscriptionSchema.parse(formData);
      
      let success = false;
      if (subscription) {
        success = await update(subscription.id, {
          client_id: validatedData.client_id,
          membership_id: validatedData.membership_id,
          start_date: validatedData.start_date,
          end_date: endDate
        });
      } else {
        success = await create({
          client_id: validatedData.client_id,
          membership_id: validatedData.membership_id,
          start_date: validatedData.start_date,
          end_date: endDate
        });
      }

      if (success) {
        onSuccess();
        onClose();
        getAll();
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

  const handleChange = (field: keyof SubscriptionFormType, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedMembership = memberships.find(m => m.id === formData.membership_id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {subscription ? 'Editar Suscripción' : 'Nueva Suscripción'}
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
              Membresía
            </label>
            <select
              value={formData.membership_id}
              onChange={(e) => handleChange('membership_id', parseInt((e.target as HTMLSelectElement).value))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.membership_id ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value={0}>Seleccionar membresía</option>
              {memberships.map((membership) => (
                <option key={membership.id} value={membership.id}>
                  {membership.name} - S/ {membership.price.toFixed(2)} ({membership.duration} días)
                </option>
              ))}
            </select>
            {errors.membership_id && (
              <p className="text-sm text-red-600 mt-1">{errors.membership_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Inicio
            </label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => handleChange('start_date', (e.target as HTMLInputElement).value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.start_date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.start_date && (
              <p className="text-sm text-red-600 mt-1">{errors.start_date}</p>
            )}
          </div>

          {endDate && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Resumen de la Suscripción</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p><span className="font-medium">Fecha de fin:</span> {new Date(endDate).toLocaleDateString('es-ES')}</p>
                {selectedMembership && (
                  <>
                    <p><span className="font-medium">Duración:</span> {selectedMembership.duration} días</p>
                    <p><span className="font-medium">Precio:</span> S/ {selectedMembership.price.toFixed(2)}</p>
                  </>
                )}
              </div>
            </div>
          )}

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
              {loading ? 'Guardando...' : (subscription ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}