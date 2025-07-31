import { z } from 'zod';

// Client validation schema
export const clientSchema = z.object({
  first_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  last_name: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  dni: z.string().min(8, 'El DNI debe tener al menos 8 caracteres').or(z.literal('')).optional(),
  email: z.string().email('Email inválido').or(z.literal('')).optional(), 
  phone: z.string().min(9, 'El teléfono debe tener al menos 9 caracteres').or(z.literal('')).optional(),
});

// Product validation schema
export const productSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo'),
});

// Sale validation schema
export const saleSchema = z.object({
  client_id: z.number().min(1, 'Debe seleccionar un cliente'),
  details: z.array(z.object({
    id: z.number().optional(),
    product_id: z.number().min(1, 'Debe seleccionar un producto'),
    quantity: z.number().int().min(1, 'La cantidad debe ser mayor a 0'),
    price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
  })).min(1, 'Debe agregar al menos un producto'),
});

// Subscription validation schema
export const subscriptionSchema = z.object({
  client_id: z.number().min(1, 'Debe seleccionar un cliente'),
  membership_id: z.number().min(1, 'Debe seleccionar una membresía'),
  start_date: z.string().min(1, 'Debe seleccionar una fecha de inicio'),
});

// Membership validation schema
export const membershipSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().min(2, 'La descripción debe tener al menos 2 caracteres'),
  price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
  duration: z.number().int().min(1, 'La duración debe ser mayor a 0 días'),
});

// Attendance validation schema
export const attendanceSchema = z.object({
  client_id: z.number().min(1, 'Debe seleccionar un cliente'),
  date: z.string().min(1, 'Debe seleccionar una fecha'),
  check_in_time: z.string().min(1, 'Debe seleccionar una hora'),
});