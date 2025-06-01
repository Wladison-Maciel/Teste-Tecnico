import { z } from 'zod';

export const taskCreateSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'COMPLETED']).optional(),
  dueDate: z.string().refine(date => !isNaN(Date.parse(date)), 'Data inválida'),
});

export const taskUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'COMPLETED']).optional(),
  dueDate: z.string().optional(),
});
