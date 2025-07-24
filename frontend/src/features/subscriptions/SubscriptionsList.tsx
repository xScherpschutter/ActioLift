import { useState } from 'preact/hooks';
import { Subscription } from '../../types';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useClients } from '../../hooks/useClients';
import { useMemberships } from '../../hooks/useMemberships';
import { Edit, Trash2, Search, Plus, Calendar, User, CreditCard, Clock } from 'lucide-react';
import SubscriptionForm from './SubscriptionForm';
import ConfirmationModal from '../../components/UI/ConfirmationModal';

export default function SubscriptionsList() {
  const { subscriptions, loading, remove, getAll} = useSubscriptions();
  const { clients } = useClients();
  const { memberships } = useMemberships();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | undefined>();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; subscription: Subscription | null }>({
    isOpen: false,
    subscription: null
  });
  const [deleting, setDeleting] = useState(false);

  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.first_name} ${client.last_name}` : 'Cliente no encontrado';
  };

  const getMembershipName = (membershipId: number) => {
    const membership = memberships.find(m => m.id === membershipId);
    return membership ? membership.name : 'Membresía no encontrada';
  };

  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
      const [month, year, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    }

  const getStatusBadge = (endDate: string) => {
    const daysRemaining = getDaysRemaining(endDate);
    
    if (daysRemaining < 0) {
      return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Vencida</span>;
    } else if (daysRemaining <= 7) {
      return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Por vencer</span>;
    } else {
      return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Activa</span>;
    }
  };

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const clientName = getClientName(subscription.client_id).toLowerCase();
    const membershipName = getMembershipName(subscription.membership_id).toLowerCase();
    const search = searchTerm.toLowerCase();
    return clientName.includes(search) || membershipName.includes(search);
  });

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setShowForm(true);
  };

  const handleDeleteClick = (subscription: Subscription) => {
    setDeleteModal({ isOpen: true, subscription });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.subscription) return;
    
    setDeleting(true);
    const success = await remove(deleteModal.subscription.id);
    setDeleting(false);
    
    if (success) {
      setDeleteModal({ isOpen: false, subscription: null });
      getAll()
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSubscription(undefined);
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
            placeholder="Buscar suscripciones..."
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
          <span>Nueva Suscripción</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSubscriptions.map((subscription) => {
          const daysRemaining = getDaysRemaining(subscription.end_date);
          const membership = memberships.find(m => m.id === subscription.membership_id);
          
          return (
            <div key={subscription.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(subscription)}
                    className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(subscription)}
                    className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{getClientName(subscription.client_id)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">{getMembershipName(subscription.membership_id)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">
                      {daysRemaining >= 0 ? `${daysRemaining} días restantes` : `Vencida hace ${Math.abs(daysRemaining)} días`}
                    </span>
                  </div>
                  {getStatusBadge(subscription.end_date)}
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Inicio:</span>
                    <span className="font-medium">{formatDate(subscription.start_date)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Fin:</span>
                    <span className="font-medium">{formatDate(subscription.end_date)}</span>
                  </div>
                  {membership && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Precio:</span>
                      <span className="font-medium text-green-600">S/ {membership.price.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron suscripciones</p>
        </div>
      )}

      {showForm && (
        <SubscriptionForm
          subscription={editingSubscription}
          onClose={handleCloseForm}
          onSuccess={async () => {await getAll()}}
        />
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, subscription: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Suscripción"
        message={`¿Está seguro de que desea eliminar esta suscripción? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        loading={deleting}
      />
    </div>
  );
}