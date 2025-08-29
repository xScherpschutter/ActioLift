import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Users, Package, CreditCard, Calendar } from 'lucide-react';
import { DashboardStats } from '../../types';

interface BusinessDistributionChartProps {
  stats: DashboardStats;
}

const COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red  
  '#8B5CF6', // Purple
  '#10B981', // Green
];

const RADIAN = Math.PI / 180;

// Custom label function for the pie chart
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="12"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <data.icon className="w-4 h-4" style={{ color: data.color }} />
          <p className="font-semibold text-gray-800">{data.name}</p>
        </div>
        <p className="text-lg font-bold" style={{ color: data.color }}>
          {data.value.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          {((data.value / payload[0].payload.total) * 100).toFixed(1)}% del total
        </p>
      </div>
    );
  }
  return null;
};

// Custom legend
const CustomLegend = ({ payload }: any) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <entry.payload.icon className="w-4 h-4 flex-shrink-0" style={{ color: entry.color }} />
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">{entry.value}</p>
            <p className="text-xs font-bold" style={{ color: entry.color }}>
              {entry.payload.value.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function BusinessDistributionChart({ stats }: BusinessDistributionChartProps) {
  const data = [
    {
      name: 'Clientes',
      value: Number(stats.total_clients),
      color: COLORS[0],
      icon: Users,
    },
    {
      name: 'Productos',
      value: Number(stats.total_products),
      color: COLORS[1],
      icon: Package,
    },
    {
      name: 'Ventas',
      value: Number(stats.total_sales),
      color: COLORS[2],
      icon: CreditCard,
    },
    {
      name: 'Suscripciones',
      value: Number(stats.active_subscriptions),
      color: COLORS[3],
      icon: Calendar,
    },
  ];

  // Calculate total for percentage calculations
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map(item => ({ ...item, total: totalValue }));

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Package className="w-5 h-5" />
          </div>
          Distribución del Negocio
        </h3>
        <p className="text-gray-300 text-sm mt-1">Vista general de entidades</p>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithTotal}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1500}
              >
                {dataWithTotal.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{totalValue.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total de Entidades</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {data.length}
            </p>
            <p className="text-sm text-gray-500">Categorías</p>
          </div>
        </div>
      </div>
    </div>
  );
}
