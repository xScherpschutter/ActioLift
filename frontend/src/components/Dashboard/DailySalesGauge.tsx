import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { DashboardStats } from '../../types';

interface DailySalesGaugeProps {
  stats: DashboardStats;
  target?: number; // Meta diaria configurable
}

export default function DailySalesGauge({ stats, target = 150 }: DailySalesGaugeProps) {
  const currentValue = Number(stats.today_sales) || 0;
  const maxValue = Math.max(target, currentValue) * 1.2; // 20% more than the higher value
  
  // Calculate percentage for the gauge
  const percentage = Math.min((currentValue / target) * 100, 100);
  const gaugePercentage = (currentValue / maxValue) * 100;
  
  // Determine colors based on performance
  const getColor = () => {
    if (currentValue >= target) return '#10B981'; // Green
    if (currentValue >= target * 0.8) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };
  
  const color = getColor();
  const isAboveTarget = currentValue >= target;
  const performanceText = isAboveTarget ? 'Meta alcanzada' : 'Meta pendiente';
  
  // Data for the gauge (semicircle)
  const data = [
    { name: 'Current', value: gaugePercentage, fill: color },
    { name: 'Empty', value: 100 - gaugePercentage, fill: '#E5E7EB' }
  ];
  
  // Target indicator position (fixed calculation)
  const targetPercentage = (target / maxValue) * 100;
  const targetAngle = -90 + (targetPercentage / 100) * 180; // Convert to angle for semicircle
  
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 p-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Target className="w-5 h-5" />
          </div>
          Meta Diaria de Ventas
        </h3>
        <p className="text-gray-300 text-sm mt-1">Progreso hacia la meta diaria</p>
      </div>

      {/* Gauge Chart */}
      <div className="p-6">
        <div className="relative h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                animationBegin={0}
                animationDuration={2000}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Target indicator line */}
          <div 
            className="absolute w-1 bg-red-500 h-10 origin-bottom z-10"
            style={{
              bottom: '20%',
              left: '50%',
              transform: `translateX(-50%) rotate(${targetAngle}deg)`,
              transformOrigin: 'bottom center',
              borderRadius: '2px'
            }}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
          </div>
          
          {/* Center value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
            <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-gray-200">
              <p className="text-3xl font-bold text-gray-800">
                ${currentValue.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mt-1 font-medium">Ventas de hoy</p>
            </div>
          </div>
          
          {/* Target value */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-1 text-sm bg-red-50 px-3 py-1 rounded-full border border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-700 font-semibold">Meta: ${target.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Performance indicators */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              {isAboveTarget ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`font-bold text-lg ${isAboveTarget ? 'text-green-500' : 'text-red-500'}`}>
                {percentage.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-gray-500">vs Meta</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-lg text-blue-500">
                ${Math.abs(currentValue - target).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {isAboveTarget ? 'Excedente' : 'Faltante'}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <div className="mt-4 text-center">
          <span 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              isAboveTarget 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {isAboveTarget ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            {performanceText}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>$0</span>
            <span className="text-red-600 font-semibold">Meta: ${target}</span>
            <span>${maxValue.toFixed(0)}</span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div 
              className="h-3 rounded-full transition-all duration-1500 relative overflow-hidden"
              style={{ 
                width: `${Math.min(gaugePercentage, 100)}%`,
                backgroundColor: color 
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
            {/* Target marker on progress bar */}
            <div 
              className="absolute top-0 w-1 h-3 bg-red-500 rounded-full shadow-md border-l border-r border-white"
              style={{
                left: `${Math.min(targetPercentage, 100)}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {/* Small triangle indicator above */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-red-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
