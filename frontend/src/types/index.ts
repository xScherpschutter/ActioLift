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
  id?: number;
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
  total_sales: number;
  total_revenue: number;
  total_products: number;
  new_clients: number;
  sold_products: number;
  sold_memberships: number;
  average_sale: number;
}

export interface Activity {
  id: number;
	entity: string;
	entity_id: number;
	action: string;
	summary: string;
  created_at: string;
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
}

export interface ProductForm {
  name: string;
  price: number;
  stock: number;
}

export interface SaleForm {
  id?: number;
  client_id: number;
  details: SalesDetailForm[];
}

export interface SalesDetailForm {
  id?: number;
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