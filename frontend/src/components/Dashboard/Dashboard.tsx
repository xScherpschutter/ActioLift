import { Users, CreditCard, Calendar, UserCheck, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import { useDashboard } from '../../hooks/useDashboard';

export default function Dashboard() {
  const { stats, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se pudieron cargar las estadísticas</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatsCard
          title="Total Clientes"
          value={stats.total_clients}
          icon={Users}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatsCard
          title="Suscripciones Activas"
          value={stats.active_subscriptions}
          icon={Calendar}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        
        <StatsCard
          title="Ventas Hoy"
          value={`S/ ${stats.today_sales.toFixed(2)}`}
          icon={CreditCard}
          color="purple"
          trend={{ value: 15, isPositive: true }}
        />
        
        <StatsCard
          title="Ingresos Totales"
          value={`S/ ${stats.total_revenue.toFixed(2)}`}
          icon={TrendingUp}
          color="orange"
          trend={{ value: 23, isPositive: true }}
        />
        
        <StatsCard
          title="Asistencias Hoy"
          value={stats.today_attendance}
          icon={UserCheck}
          color="red"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Día</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Nuevos Clientes</span>
              <span className="font-semibold text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Productos Vendidos</span>
              <span className="font-semibold text-gray-900">12</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Membresías Vendidas</span>
              <span className="font-semibold text-gray-900">2</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Promedio por Venta</span>
              <span className="font-semibold text-gray-900">S/ 74.24</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Nuevo cliente registrado</p>
                <p className="text-xs text-gray-500">Juan Pérez - hace 5 minutos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Venta completada</p>
                <p className="text-xs text-gray-500">Proteína Whey - S/ 89.99 - hace 12 minutos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Suscripción renovada</p>
                <p className="text-xs text-gray-500">María García - Membresía Premium - hace 1 hora</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}