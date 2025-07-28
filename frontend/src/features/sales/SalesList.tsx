import { useState } from 'preact/hooks';
import { Sale } from '../../types';
import { useSales } from '../../hooks/useSales';
import { Edit, Trash2, Search, Plus, CreditCard, User, Calendar, DollarSign } from 'lucide-react';
import SaleForm from './SaleForm';
import ConfirmationModal from '../../components/UI/ConfirmationModal';

export default function SalesList() {
  const { sales, loading, remove, getAll } = useSales();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | undefined>();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; sale: Sale | null }>({
    isOpen: false,
    sale: null
  });
  const [deleting, setDeleting] = useState(false);

  const filteredSales = sales.filter(sale => {
    const clientName = sale.client_name.toLowerCase();
    const search = searchTerm.toLowerCase();
    return clientName.includes(search) || sale.id.toString().includes(search);
  });

  const handleEdit = (sale: Sale) => {
    setEditingSale(sale);
    setShowForm(true);
  };

  const handleDeleteClick = (sale: Sale) => {
    setDeleteModal({ isOpen: true, sale });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.sale) return;
    
    setDeleting(true);
    const success = await remove(deleteModal.sale.id);
    setDeleting(false);
    
    if (success) {
      setDeleteModal({ isOpen: false, sale: null });
      await getAll();
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSale(undefined);
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
            placeholder="Buscar ventas..."
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
          <span>Nueva Venta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSales.map((sale) => (
          <div key={sale.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(sale)}
                  className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(sale)}
                  className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">Venta #</span>
                <span className="text-lg font-bold text-gray-900">{sale.id}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">{sale.client_name}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">{new Date(sale.date).toLocaleDateString('es-ES')}</span>
              </div>
              
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Total:</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">S/ {sale.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSales.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron ventas</p>
        </div>
      )}

      {showForm && (
        <SaleForm
          sale={editingSale}
          onClose={handleCloseForm}
          onSuccess={async () => {
            await getAll();
          }}
        />
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, sale: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Venta"
        message={`¿Está seguro de que desea eliminar la venta #${deleteModal.sale?.id}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        loading={deleting}
      />
    </div>
  );
}