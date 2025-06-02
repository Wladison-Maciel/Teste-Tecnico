import { z } from 'zod';

// Schema para criar tarefa
export const taskCreateSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'COMPLETED']).optional(),
  dueDate: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), 'Data inválida'),
}).strict();

// Schema para atualizar tarefa
export const taskUpdateSchema = z.object({
  title: z.string().min(1, 'Título inválido').optional(),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'COMPLETED']).optional(),
  dueDate: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), 'Data inválida')
    .optional(),
}).strict();
