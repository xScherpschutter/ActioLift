import { Users, CreditCard, Calendar, Package, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import { useDashboard } from '../../hooks/useDashboard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import esLocale from 'dayjs/locale/es';

dayjs.extend(relativeTime);
dayjs.locale(esLocale);

// Mapea colores y etiquetas por entidad, y texto según acción
function getActivityStyle(entity: string) {
  const map = {
    Client: { 
      color: 'blue', 
      label: 'Clientes',
      bgColor: 'bg-blue-50',
      dotColor: 'bg-blue-500'
    },
    Product: { 
      color: 'red', 
      label: 'Productos',
      bgColor: 'bg-red-50',
      dotColor: 'bg-red-500'
    },
    Sale: { 
      color: 'green', 
      label: 'Ventas',
      bgColor: 'bg-green-50',
      dotColor: 'bg-green-500'
    },
    Subscription: { 
      color: 'purple', 
      label: 'Suscripciones',
      bgColor: 'bg-purple-50',
      dotColor: 'bg-purple-500'
    },
    Membership: { 
      color: 'orange', 
      label: 'Membresías',
      bgColor: 'bg-orange-50',
      dotColor: 'bg-orange-500'
    },
  };

  const style = map[entity as keyof typeof map] || { 
    color: 'gray', 
    label: entity,
    bgColor: 'bg-gray-50',
    dotColor: 'bg-gray-500'
  };


  return {
    ...style
  };
}

export default function Dashboard() {
  const { stats, loading, activities } = useDashboard();

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

  const toNumber = (value: any) => {
    const n = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(n) ? 0 : n;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatsCard
          title="Total Clientes"
          value={toNumber(stats.total_clients)}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Suscripciones Activas"
          value={toNumber(stats.active_subscriptions)}
          icon={Calendar}
          color="green"
        />
        <StatsCard
          title="Ventas Totales"
          value={toNumber(stats.total_sales).toString()}
          icon={CreditCard}
          color="purple"
        />
        <StatsCard
          title="Ingresos Totales"
          value={`$ ${toNumber(stats.total_revenue).toFixed(2)}`}
          icon={TrendingUp}
          color="orange"
        />
        <StatsCard
          title="Productos Totales"
          value={toNumber(stats.total_products)}
          icon={Package}
          color="red"
        />
      </div>

      {/* Resumen y Actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen del Día */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de los últimos 30 días</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Nuevos Clientes</span>
              <span className="font-semibold text-gray-900">{toNumber(stats.new_clients)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Productos Vendidos</span>
              <span className="font-semibold text-gray-900">{toNumber(stats.sold_products)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Membresías Vendidas</span>
              <span className="font-semibold text-gray-900">{toNumber(stats.sold_memberships)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Promedio por Venta</span>
              <span className="font-semibold text-gray-900">
                $ {toNumber(stats.average_sale).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad reciente</h3>
          <div className="space-y-4">
            {(!activities || activities.length === 0) && (
                <p className="text-gray-500 text-center">No hay actividad reciente</p>
              )}
              {activities && activities.length > 0 && activities.map(({ id, entity, created_at, summary }) => {
                const { bgColor, dotColor, label } = getActivityStyle(entity);
                return (
                  <div key={id} className={`flex items-center space-x-3 p-3 rounded-lg ${bgColor}`}>
                    <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {label}: {summary}
                      </p>
                      <p className="text-xs text-gray-500">{dayjs(created_at).fromNow()}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}