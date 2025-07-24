import { Users, Package, CreditCard, Calendar, UserCheck, BarChart3, Dumbbell, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'preact/hooks';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'products', label: 'Productos', icon: Package },
  { id: 'memberships', label: 'Membresías', icon: Dumbbell },
  { id: 'subscriptions', label: 'Suscripciones', icon: Calendar },
  { id: 'sales', label: 'Ventas', icon: CreditCard },
  { id: 'attendance', label: 'Asistencias', icon: UserCheck },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out relative shadow-xl`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3 opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">GymPOS</h1>
                <p className="text-xs text-gray-300">Sistema de Gestión</p>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg mx-auto">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-white" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-white" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full group relative flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:transform hover:scale-105'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} transition-all duration-200`} />
                  
                  {!isCollapsed && (
                    <span className="font-medium transition-opacity duration-300 opacity-100">
                      {item.label}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}

                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        {!isCollapsed ? (
          <div className="transition-opacity duration-300 opacity-100">
            <div className="text-xs text-gray-400 space-y-1">
              <p className="font-medium">Versión 1.0.0</p>
              <p>© 2024 GymPOS</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}