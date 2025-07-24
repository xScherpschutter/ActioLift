// Base API configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Generic API function
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// API functions for each entity
export const api = {
  // Clients
  clients: {
    getAll: () => apiRequest<any[]>('/clients'),
    getById: (id: number) => apiRequest<any>(`/clients/${id}`),
    create: (data: any) => apiRequest<any>('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => apiRequest<any>(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    remove: (id: number) => apiRequest<void>(`/clients/${id}`, {
      method: 'DELETE',
    }),
  },

  // Products
  products: {
    getAll: () => apiRequest<any[]>('/products'),
    getById: (id: number) => apiRequest<any>(`/products/${id}`),
    create: (data: any) => apiRequest<any>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => apiRequest<any>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    remove: (id: number) => apiRequest<void>(`/products/${id}`, {
      method: 'DELETE',
    }),
  },

  // Sales
  sales: {
    getAll: () => apiRequest<any[]>('/sales'),
    getById: (id: number) => apiRequest<any>(`/sales/${id}`),
    create: (data: any) => apiRequest<any>('/sales', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => apiRequest<any>(`/sales/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    remove: (id: number) => apiRequest<void>(`/sales/${id}`, {
      method: 'DELETE',
    }),
  },

  // Sales Details
  salesDetails: {
    getAll: () => apiRequest<any[]>('/sales-details'),
    getBySaleId: (saleId: number) => apiRequest<any[]>(`/sales/${saleId}/details`),
    getById: (id: number) => apiRequest<any>(`/sales-details/${id}`),
    create: (data: any) => apiRequest<any>('/sales-details', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => apiRequest<any>(`/sales-details/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    remove: (id: number) => apiRequest<void>(`/sales-details/${id}`, {
      method: 'DELETE',
    }),
  },

  // Subscriptions
  subscriptions: {
    getAll: () => apiRequest<any[]>('/subscriptions'),
    getById: (id: number) => apiRequest<any>(`/subscriptions/${id}`),
    create: (data: any) => apiRequest<any>('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => apiRequest<any>(`/subscriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    remove: (id: number) => apiRequest<void>(`/subscriptions/${id}`, {
      method: 'DELETE',
    }),
  },

  // Memberships
  memberships: {
    getAll: () => apiRequest<any[]>('/memberships'),
    getById: (id: number) => apiRequest<any>(`/memberships/${id}`),
    create: (data: any) => apiRequest<any>('/memberships', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => apiRequest<any>(`/memberships/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    remove: (id: number) => apiRequest<void>(`/memberships/${id}`, {
      method: 'DELETE',
    }),
  },

  // Attendance
  attendance: {
    getAll: () => apiRequest<any[]>('/attendance'),
    getById: (id: number) => apiRequest<any>(`/attendance/${id}`),
    create: (data: any) => apiRequest<any>('/attendance', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => apiRequest<any>(`/attendance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    remove: (id: number) => apiRequest<void>(`/attendance/${id}`, {
      method: 'DELETE',
    }),
  },

  // Dashboard
  dashboard: {
    getStats: () => apiRequest<any>('/dashboard/stats'),
  },
};