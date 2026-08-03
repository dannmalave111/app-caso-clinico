ALTER TABLE public.patients
  ADD COLUMN IF NOT EXISTS estado_civil text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS ocupacion text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS diagnostico text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS medicacion jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS formulas text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS excel_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS macros jsonb NOT NULL DEFAULT '{"ch":50,"pr":20,"lp":30}'::jsonb;