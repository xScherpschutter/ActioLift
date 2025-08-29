import { Users, Package, CreditCard, Calendar, BarChart3, Dumbbell, ChevronLeft, ChevronRight } from 'lucide-react';
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
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} relative z-50 overflow-hidden flex flex-col transition-all duration-300 ease-in-out shadow-2xl`}>
      {/* Animated background matching header */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 opacity-95"></div>
      
      {/* Liquid glass overlay with animated blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-10 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-8 w-24 h-24 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-3000"></div>
        <div className="absolute bottom-20 left-4 w-40 h-40 bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-1000"></div>
      </div>
      
      {/* Toggle Button with glassmorphism - Outside main container for proper z-index */}
          <button
            onClick={toggleSidebar}
            className={`fixed top-20 w-6 h-6 backdrop-blur-xl bg-blue-600/80 hover:bg-blue-600 
                        border border-white/20 rounded-full flex items-center justify-center shadow-xl 
                        transition-all duration-300 hover:scale-110 z-[9999]
                        ${isCollapsed ? 'left-16' : 'left-64'}`}
          >
            {isCollapsed ? (
              <ChevronRight className="w-3 h-3 text-white" />
            ) : (
              <ChevronLeft className="w-3 h-3 text-white" />
            )}
          </button>

      {/* Main sidebar content */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col h-full">
        {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3 opacity-100 transition-opacity duration-300">
              {/* Icon with glassmorphism */}
              <div className="w-10 h-10 backdrop-blur-xl bg-white/20 rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                <img 
                  src="/favicon.png" 
                  alt="Icono ActioLift" 
                  className="w-6 h-6 object-contain" 
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">ActioLift</h1>
                <p className="text-xs text-white/80 font-medium backdrop-blur-sm bg-white/10 px-2 py-0.5 rounded-full border border-white/20 inline-block mt-1">Gestión de gimnasio</p>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-10 h-10 backdrop-blur-xl bg-blue-600/80 hover:bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto border border-white/20 transition-all duration-300">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                  console.log('➡️ Cambiando sección a:', item.id);
                  onSectionChange(item.id);
                  }}
                  className={`w-full group relative flex items-center px-3 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600/90 hover:bg-blue-600 text-white shadow-2xl shadow-blue-500/25 transform scale-105 border-white/30'
                      : 'text-white/80 hover:text-white hover:bg-white/15 bg-white/5 hover:transform hover:scale-105 border-white/10 hover:border-white/20 hover:shadow-xl'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} transition-all duration-200`} />
                  
                  {!isCollapsed && (
                    <span className="font-medium transition-opacity duration-300 opacity-100">
                      {item.label}
                    </span>
                  )}

                  {/* Tooltip for collapsed state with glassmorphism */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 backdrop-blur-xl bg-gray-900/90 border border-white/20 text-white text-sm rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 border-l border-t border-white/20 rotate-45"></div>
                    </div>
                  )}

                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer with glassmorphism */}
      <div className="p-4 border-t border-white/10">
        {!isCollapsed ? (
          <div className="transition-opacity duration-300 opacity-100">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="text-xs text-white/70 space-y-1 text-center">
                <p className="font-medium text-white/90">Versión 1.0.2</p>
                <p className="text-white/60">© 2025 ActioMeta</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 hover:bg-white/20">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          </div>
        )}
      </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
