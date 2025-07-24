import { Client, Product, Sale, Subscription, Membership, Attendance, DashboardStats } from '../types';

// Mock data for development
export const mockClients: Client[] = [
  {
    id: 1,
    first_name: 'Juan',
    last_name: 'Pérez',
    dni: '12345678',
    email: 'juan.perez@email.com',
    phone: '987654321',
    registration_date: '2024-01-15',
  },
  {
    id: 2,
    first_name: 'María',
    last_name: 'García',
    dni: '87654321',
    email: 'maria.garcia@email.com',
    phone: '123456789',
    registration_date: '2024-02-20',
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Proteína Whey',
    price: 89.99,
    stock: 25,
  },
  {
    id: 2,
    name: 'Creatina',
    price: 45.50,
    stock: 15,
  },
  {
    id: 3,
    name: 'Toalla Deportiva',
    price: 12.99,
    stock: 50,
  },
];

export const mockMemberships: Membership[] = [
  {
    id: 1,
    name: 'Membresía Básica',
    description: 'Membresía básica para clientes nuevos',
    price: 50.00,
    duration: 30,
  },
  {
    id: 2,
    name: 'Membresía Premium',
    description: 'Membresía premium para clientes frecuentes',
    price: 80.00,
    duration: 30,
  },
  {
    id: 3,
    name: 'Membresía Anual',
    description: 'Membresía anual para clientes con preferencias',
    price: 500.00,
    duration: 365,
  },
];

export const mockSales: Sale[] = [
  {
    id: 1,
    client_id: 1,
    date: '2024-12-20',
    total: 89.99,
  },
  {
    id: 2,
    client_id: 2,
    date: '2024-12-19',
    total: 58.49,
  },
];

export const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    client_id: 1,
    membership_id: 1,
    start_date: '2024-12-01',
    end_date: '2024-12-31',
  },
  {
    id: 2,
    client_id: 2,
    membership_id: 2,
    start_date: '2024-12-15',
    end_date: '2025-01-14',
  },
];

export const mockAttendance: Attendance[] = [
  {
    id: 1,
    client_id: 1,
    date: '2024-12-20',
    check_in_time: '08:30',
  },
  {
    id: 2,
    client_id: 2,
    date: '2024-12-20',
    check_in_time: '09:15',
  },
];

export const mockDashboardStats: DashboardStats = {
  total_clients: 2,
  active_subscriptions: 2,
  today_sales: 148.48,
  total_revenue: 1250.00,
  today_attendance: 2,
};