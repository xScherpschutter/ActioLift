import { useState } from 'preact/hooks';
import { Client, ClientForm as ClientFormType, UpdateClientForm } from '../../types';
import { clientSchema } from '../../lib/schemas';
import { useClients } from '../../hooks/useClients';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface ClientFormProps {
  client?: Client;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ClientForm({ client, onClose, onSuccess }: ClientFormProps) {
  const { create, update } = useClients();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<ClientFormType>({
    first_name: client?.first_name || '',
    last_name: client?.last_name || '',
    dni: client?.dni || '',
    email: client?.email || '',
    phone: client?.phone || '',
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = clientSchema.parse(formData);
      let success = false;
      if (client) {
        success = await update(client.id!, validatedData as UpdateClientForm);
      } else {
        success = await create(validatedData as ClientFormType);
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

  const handleChange = (field: keyof ClientFormType, value: string) => {
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
            {client ? 'Editar Cliente' : 'Nuevo Cliente'}
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
              Nombre
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => handleChange('first_name', (e.target as HTMLInputElement).value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.first_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingrese el nombre"
            />
            {errors.first_name && (
              <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => handleChange('last_name', (e.target as HTMLInputElement).value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.last_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingrese el apellido"
            />
            {errors.last_name && (
              <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              DNI
            </label>
            <input
              type="text"
              value={formData.dni}
              onChange={(e) => handleChange('dni', (e.target as HTMLInputElement).value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.dni ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingrese el DNI (Opcional)"
            />
            {errors.dni && (
              <p className="text-sm text-red-600 mt-1">{errors.dni}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', (e.target as HTMLInputElement).value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingrese el email (Opcional)"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', (e.target as HTMLInputElement).value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingrese el teléfono (Opcional)"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
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
              {loading ? 'Guardando...' : (client ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}