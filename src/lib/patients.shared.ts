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
  tipo: z.string().trim().max(120),
  gramaje: z.string().trim().max(80),
  horario: z.string().trim().max(20),
  horariosNotificables: z.array(z.string().trim().max(20)).optional(),
});

export const clinicoSchema = z.object({
  id: z.string().uuid(),
  estadoCivil: z.string().trim().max(60).optional().default(""),
  ocupacion: z.string().trim().max(120).optional().default(""),
  diagnostico: z.string().trim().max(2000).optional().default(""),
  medicacion: z.array(medicamentoSchema).max(40).optional().default([]),
  formulas: z.string().trim().max(2000).optional().default(""),
  excelUrl: z.string().trim().max(1000).optional().default(""),
  macros: z.object({
    ch: z.number().int().min(0).max(100),
    pr: z.number().int().min(0).max(100),
    lp: z.number().int().min(0).max(100),
  }),
  requerimientoCalorico: z.number().optional(),
  requerimientoHidricoMl: z.number().optional(),
  encuestaFrecuenciaUrl: z.string().trim().max(1000).optional().default(""),
  quienPreparaComida: z.string().trim().max(120).optional().default(""),
  tieneHijos: z.string().trim().max(60).optional().default(""),
  detallesHijos: z.string().trim().max(200).optional().default(""),
  observacionesClinicas: z.string().trim().max(2000).optional().default(""),
  antecedentesDriveUrl: z.string().trim().max(1000).optional().default(""),
  menuDriveUrl: z.string().trim().max(1000).optional().default(""),
});

export type ClinicoInput = z.infer<typeof clinicoSchema>;

