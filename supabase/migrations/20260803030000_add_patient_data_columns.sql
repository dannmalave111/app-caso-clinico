-- Agrega columnas para datos dinámicos del paciente (plan semanal, medidas, logs, actividad)
ALTER TABLE public.patients
  ADD COLUMN IF NOT EXISTS plan_semanal jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS medidas      jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS logs         jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS actividades  jsonb NOT NULL DEFAULT '[]'::jsonb;
