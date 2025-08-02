import { useState } from 'preact/hooks';
import { Membership } from '../../types';
import { useMemberships } from '../../hooks/useMemberships';
import { Edit, Trash2, Search, Plus, Dumbbell, Clock, DollarSign } from 'lucide-react';
import MembershipForm from './MembershipForm';
import ConfirmationModal from '../../components/UI/ConfirmationModal';

export default function MembershipsList() {
  const { memberships, loading, remove, getAll } = useMemberships();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMembership, setEditingMembership] = useState<Membership | undefined>();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; membership: Membership | null }>({
    isOpen: false,
    membership: null
  });
  const [deleting, setDeleting] = useState(false);

  const filteredMemberships = memberships.filter(membership =>
    membership.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (membership: Membership) => {
    setEditingMembership(membership);
    setShowForm(true);
  };

  const handleDeleteClick = (membership: Membership) => {
    setDeleteModal({ isOpen: true, membership });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.membership) return;
    
    setDeleting(true);
    const success = await remove(deleteModal.membership.id);
    setDeleting(false);
    
    if (success) {
      setDeleteModal({ isOpen: false, membership: null });
      await getAll();
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMembership(undefined);
  };

  const getDurationText = (days: number) => {
    if (days === 1) return '1 día';
    if (days === 7) return '1 Semana';
    if (days === 15) return '15 días';
    if (days === 30) return '1 Mes';
    if (days === 60) return '2 Meses';
    if (days === 90) return '3 Meses';
    if (days === 180) return '6 Meses';
    if (days === 365) return '1 Año';
    return `${days} días`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar membresías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Membresía</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemberships.map((membership) => (
          <div key={membership.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(membership)}
                  className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(membership)}
                  className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{membership.name}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Precio:</span>
                <span className="font-semibold text-green-600">{membership.price.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">Duración:</span>
                <span className="font-semibold text-blue-600">{getDurationText(membership.duration)}</span>
              </div>
              
             <div className="text-sm text-gray-500 font-medium">Descripción:</div>
              <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded-md border border-gray-200 whitespace-pre-line">
                {membership.description || 'Sin descripción'}
              </div>

            </div>
          </div>
        ))}
      </div>

      {filteredMemberships.length === 0 && (
        <div className="text-center py-12">
          <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron membresías</p>
        </div>
      )}

      {showForm && (
        <MembershipForm
          membership={editingMembership}
          onClose={handleCloseForm}
          onSuccess={ async () => {await getAll()}}
        />
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, membership: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Membresía"
        message={`¿Está seguro de que desea eliminar la membresía "${deleteModal.membership?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        loading={deleting}
      />
    </div>
  );
}