import { Users, CreditCard, Calendar, Package, TrendingUp, Activity, Clock, ShoppingCart, Award, ArrowUp, ArrowDown } from 'lucide-react';
import StatsCard from './StatsCard';
import BusinessDistributionChart from './BusinessDistributionChart';
import AverageSaleGauge from './AverageSaleGauge';
import { useDashboard } from '../../hooks/useDashboard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import esLocale from 'dayjs/locale/es';

dayjs.extend(relativeTime);
dayjs.locale(esLocale);

function getActivityStyle(entity: string) {
  const map = {
    Client: { 
      color: 'blue', 
      label: 'Clientes',
      bgColor: 'bg-gradient-to-r from-blue-50 to-blue-100',
      dotColor: 'bg-blue-500',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-500',
      icon: Users
    },
    Product: { 
      color: 'red', 
      label: 'Productos',
      bgColor: 'bg-gradient-to-r from-red-50 to-red-100',
      dotColor: 'bg-red-500',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-500',
      icon: Package
    },
    Sale: { 
      color: 'green', 
      label: 'Ventas',
      bgColor: 'bg-gradient-to-r from-green-50 to-green-100',
      dotColor: 'bg-green-500',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-500',
      icon: ShoppingCart
    },
    Subscription: { 
      color: 'purple', 
      label: 'Suscripciones',
      bgColor: 'bg-gradient-to-r from-purple-50 to-purple-100',
      dotColor: 'bg-purple-500',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-500',
      icon: Calendar
    },
    Membership: { 
      color: 'orange', 
      label: 'Membresías',
      bgColor: 'bg-gradient-to-r from-orange-50 to-orange-100',
      dotColor: 'bg-orange-500',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-500',
      icon: Award
    },
  };

  const style = map[entity as keyof typeof map] || { 
    color: 'gray', 
    label: entity,
    bgColor: 'bg-gradient-to-r from-gray-50 to-gray-100',
    dotColor: 'bg-gray-500',
    borderColor: 'border-gray-200',
    iconBg: 'bg-gray-500',
    icon: Activity
  };

  return style;
}


export default function Dashboard() {
  const { stats, loading, activities } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-gray-500 text-lg">No se pudieron cargar las estadísticas</p>
      </div>
    );
  }

  const toNumber = (value: any) => {
    const n = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(n) ? 0 : n;
  };

  return (
    <div className="space-y-8">

      {/* Stats Cards con diseño mejorado */}
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

      {/* Nuevos Gráficos Analíticos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BusinessDistributionChart stats={stats} />
        <AverageSaleGauge stats={stats} target={150} />
      </div>

      {/* Resumen y Actividad con diseño mejorado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resumen del Día */}
        <div className=" rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Resumen de los últimos 30 días
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="group flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">Nuevos Clientes</span>
              </div>
              <span className="font-bold text-xl text-gray-900">{toNumber(stats.new_clients)}</span>
            </div>
            
            <div className="group flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Productos Vendidos</span>
              </div>
              <span className="font-bold text-xl text-gray-900">{toNumber(stats.sold_products)}</span>
            </div>
            
            <div className="group flex justify-between items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Award className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">Membresías Vendidas</span>
              </div>
              <span className="font-bold text-xl text-gray-900">{toNumber(stats.sold_memberships)}</span>
            </div>
            
            <div className="group flex justify-between items-center py-3 px-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-200 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-gray-700 font-medium">Promedio por Venta</span>
              </div>
              <span className="font-bold text-2xl text-orange-600">
                $ {toNumber(stats.average_sale).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6 opacity-95">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Actividad reciente
            </h3>
          </div>
          <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
            {(!activities || activities.length === 0) && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-gray-500">No hay actividad reciente</p>
              </div>
            )}
            {activities && activities.length > 0 && activities.map(({ id, entity, created_at, summary }) => {
              const { bgColor, dotColor, label, borderColor, iconBg, icon: IconComponent } = getActivityStyle(entity);
              return (
                <div key={id} className={`group flex items-start space-x-4 p-4 rounded-xl ${bgColor} border ${borderColor} hover:shadow-md transition-all duration-200 cursor-pointer`}>
                  <div className={`p-2 ${iconBg} rounded-lg shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-block w-2 h-2 rounded-full ${dotColor} animate-pulse`}></span>
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {summary}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {dayjs(created_at).fromNow()}
                    </p>
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