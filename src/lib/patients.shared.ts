import { z } from "zod";

export const patientEmail = (codigo: string) => `p${codigo}@nutricuida.app`;
export const patientPassword = (codigo: string) => `NutriCuida-${codigo}`;

export const registroSchema = z.object({
  nombre: z.string().trim().min(3).max(80),
  edad: z.number().int().min(1).max(120),
  telefono: z
    .string()
    .trim()
    .max(20)
    .regex(/^[0-9+\s-]*$/, "Teléfono inválido"),
  objetivo: z.string().trim().max(200),
  metaAgua: z.number().int().min(1).max(20),
});

export type RegistroInput = z.infer<typeof registroSchema>;
