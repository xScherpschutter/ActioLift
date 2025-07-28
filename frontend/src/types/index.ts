// Client entity
export interface Client {
  id?: number;
  first_name: string;
  last_name: string;
  dni: string;
  email: string;
  phone: string;
  registration_date?: string;
}

// Product entity
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// Sale entity
export interface Sale {
  id: number;
  client_id: number;
  client_name: string;
  date: string;
  total: number;
  details: SalesDetail[];
}

// SalesDetail entity
export interface SalesDetail {
  sale_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

// Subscription entity
export interface Subscription {
  id: number;
  client_id: number;
  client_name: string;
  membership_id: number;
  start_date: string;
  end_date: string;
}

// Membership entity
export interface Membership {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}

// Attendance entity
export interface Attendance {
  id: number;
  client_id: number;
  date: string;
  check_in_time: string;
}

// Dashboard stats
export interface DashboardStats {
  total_clients: number;
  active_subscriptions: number;
  today_sales: number;
  total_revenue: number;
  today_attendance: number;
}

// Form types
export interface ClientForm {
  first_name: string;
  last_name: string;
  dni: string;
  email: string;
  phone: string;
}

export interface UpdateClientForm {
  first_name: string;
  last_name: string;
  dni: string;
  email: string;
  phone: string;
  registration_date: string;
}

export interface ProductForm {
  name: string;
  price: number;
  stock: number;
}

export interface SaleForm {
  client_id: number;
  details: SalesDetailForm[];
}

export interface SalesDetailForm {
  product_id: number;
  quantity: number;
  price: number;
}

export interface SubscriptionForm {
  client_id: number;
  membership_id: number;
  start_date: string;
  end_date: string;
}

export interface MembershipForm {
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface AttendanceForm {
  client_id: number;
  date: string;
  check_in_time: string;
}