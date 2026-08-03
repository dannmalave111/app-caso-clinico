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

export const medicamentoSchema = z.object({
  id: z.string(),
  tipo: z.string().trim().max(80),
  gramaje: z.string().trim().max(40),
  horario: z.string().trim().max(10),
});

export const clinicoSchema = z.object({
  id: z.string().uuid(),
  estadoCivil: z.string().trim().max(40),
  ocupacion: z.string().trim().max(80),
  diagnostico: z.string().trim().max(500),
  medicacion: z.array(medicamentoSchema).max(20),
  formulas: z.string().trim().max(600),
  excelUrl: z.string().trim().max(400),
  macros: z.object({
    ch: z.number().int().min(0).max(100),
    pr: z.number().int().min(0).max(100),
    lp: z.number().int().min(0).max(100),
  }),
});

export type ClinicoInput = z.infer<typeof clinicoSchema>;
