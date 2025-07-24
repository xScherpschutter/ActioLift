import { useState } from 'preact/hooks';
import { Attendance } from '../../types';
import { useAttendance } from '../../hooks/useAttendance';
import { useClients } from '../../hooks/useClients';
import { Edit, Trash2, Search, Plus, UserCheck, User, Calendar, Clock } from 'lucide-react';
import AttendanceForm from './AttendanceForm';
import ConfirmationModal from '../../components/UI/ConfirmationModal';

export default function AttendanceList() {
  const { attendance, loading, remove } = useAttendance();
  const { clients } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState<Attendance | undefined>();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; attendance: Attendance | null }>({
    isOpen: false,
    attendance: null
  });
  const [deleting, setDeleting] = useState(false);

  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.first_name} ${client.last_name}` : 'Cliente no encontrado';
  };

  const filteredAttendance = attendance.filter(record => {
    const clientName = getClientName(record.client_id).toLowerCase();
    const search = searchTerm.toLowerCase();
    return clientName.includes(search) || record.date.includes(search);
  });

  const groupedAttendance = filteredAttendance.reduce((groups, record) => {
    const date = record.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
    return groups;
  }, {} as Record<string, Attendance[]>);

  const handleEdit = (attendance: Attendance) => {
    setEditingAttendance(attendance);
    setShowForm(true);
  };

  const handleDeleteClick = (attendance: Attendance) => {
    setDeleteModal({ isOpen: true, attendance });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.attendance) return;
    
    setDeleting(true);
    const success = await remove(deleteModal.attendance.id);
    setDeleting(false);
    
    if (success) {
      setDeleteModal({ isOpen: false, attendance: null });
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAttendance(undefined);
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
            placeholder="Buscar asistencias..."
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
          <span>Registrar Asistencia</span>
        </button>
      </div>

      {Object.keys(groupedAttendance).length === 0 ? (
        <div className="text-center py-12">
          <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron registros de asistencia</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedAttendance)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, records]) => (
              <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {new Date(date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                      {records.length} asistencia{records.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {records
                    .sort((a, b) => a.check_in_time.localeCompare(b.check_in_time))
                    .map((record) => (
                      <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <UserCheck className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-600" />
                                <span className="font-medium text-gray-900">
                                  {getClientName(record.client_id)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-gray-600">
                                  Entrada: {record.check_in_time}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(record)}
                              className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(record)}
                              className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {showForm && (
        <AttendanceForm
          attendance={editingAttendance}
          onClose={handleCloseForm}
          onSuccess={() => {}}
        />
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, attendance: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Asistencia"
        message={`¿Está seguro de que desea eliminar este registro de asistencia? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        loading={deleting}
      />
    </div>
  );
}