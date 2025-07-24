import { useState } from 'preact/hooks';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import ClientsList from './features/clients/ClientsList';
import ProductsList from './features/products/ProductsList';
import MembershipsList from './features/memberships/MembershipsList';
import SubscriptionsList from './features/subscriptions/SubscriptionsList';
import SalesList from './features/sales/SalesList';
import AttendanceList from './features/attendance/AttendanceList';

const sectionTitles = {
  dashboard: 'Dashboard',
  clients: 'Clientes',
  products: 'Productos',
  memberships: 'Membresías',
  subscriptions: 'Suscripciones',
  sales: 'Ventas',
  attendance: 'Asistencias',
};

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientsList />;
      case 'products':
        return <ProductsList />;
      case 'memberships':
        return <MembershipsList />;
      case 'subscriptions':
        return <SubscriptionsList />;
      case 'sales':
        return <SalesList />;
      case 'attendance':
        return <AttendanceList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={sectionTitles[activeSection as keyof typeof sectionTitles]} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderSection()}
        </main>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}