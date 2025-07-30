import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: typeof LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600 ring-blue-200',
  green: 'bg-green-100 text-green-600 ring-green-200',
  purple: 'bg-purple-100 text-purple-600 ring-purple-200',
  orange: 'bg-orange-100 text-orange-600 ring-orange-200',
  red: 'bg-red-100 text-red-600 ring-red-200',
};

export default function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ring-2 ${colorClasses[color]} bg-opacity-30`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
