import { BRISTOL, ORINA, useStore } from "@/lib/store";

/** Ilustración sencilla y de alto contraste para cada tipo de la escala de Bristol. */
function BristolIcon({ n }: { n: number }) {
  const c = "currentColor";
  return (
    <svg viewBox="0 0 60 32" className="h-8 w-full" aria-hidden="true" fill={c}>
      {n === 1 && [6, 20, 34, 48].map((x) => <circle key={x} cx={x} cy={16} r={5} />)}
      {n === 2 && (
        <>
          <rect x="4" y="8" width="52" height="16" rx="8" />
          <circle cx="16" cy="16" r="7" opacity="0.45" />
          <circle cx="30" cy="16" r="7" opacity="0.45" />
          <circle cx="44" cy="16" r="7" opacity="0.45" />
        </>
      )}
      {n === 3 && (
        <>
          <rect x="4" y="10" width="52" height="12" rx="6" />
          <rect x="18" y="10" width="2" height="12" fill="var(--card)" />
          <rect x="34" y="10" width="2" height="12" fill="var(--card)" />
        </>
      )}
      {n === 4 && <rect x="4" y="11" width="52" height="10" rx="5" />}
      {n === 5 && [10, 30, 50].map((x) => <ellipse key={x} cx={x} cy={16} rx={8} ry={6} />)}
      {n === 6 && (
        <>
          <ellipse cx="14" cy="14" rx="9" ry="6" />
          <ellipse cx="32" cy="19" rx="10" ry="6" />
          <ellipse cx="48" cy="13" rx="7" ry="5" />
        </>
      )}
      {n === 7 && (
        <path d="M2 20c8-8 14 6 22-2s16 8 24 0v8H2z" />
      )}
    </svg>
  );
}

export function EscalaBristol({ fecha }: { fecha: string }) {
  const { activePatient, getLog, updateLog } = useStore();
  const log = getLog(activePatient.id, fecha);

  return (
    <div>
      <p className="text-xl text-muted-foreground">
        ¿Cómo estuvo su digestión hoy? Toque el dibujo que más se parezca.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {BRISTOL.map((b) => {
          const sel = log.bristol === b.n;
          return (
            <button
              key={b.n}
              type="button"
              onClick={() => updateLog(activePatient.id, fecha, { bristol: b.n })}
              aria-pressed={sel}
              aria-label={`Tipo ${b.n}: ${b.label}. ${b.desc}`}
              className={`flex min-h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 transition-colors ${
                sel
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              <span className="text-2xl font-extrabold">{b.n}</span>
              <BristolIcon n={b.n} />
              <span className="text-center text-sm font-bold leading-tight">{b.label}</span>
            </button>
          );
        })}
      </div>
      {log.bristol && (
        <p className="mt-3 text-lg font-semibold text-muted-foreground">
          Tipo {log.bristol}: {BRISTOL[log.bristol - 1]?.label} ({BRISTOL[log.bristol - 1]?.desc})
        </p>
      )}
    </div>
  );
}

export function EscalaOrina({ fecha }: { fecha: string }) {
  const { activePatient, getLog, updateLog } = useStore();
  const log = getLog(activePatient.id, fecha);
  const sel = log.orina ? ORINA[log.orina - 1] : undefined;

  return (
    <div>
      <p className="text-xl text-muted-foreground">
        ¿De qué color fue su orina hoy? Toque el color más parecido.
      </p>
      <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-7">
        {ORINA.map((o) => {
          const activo = log.orina === o.n;
          return (
            <button
              key={o.n}
              type="button"
              onClick={() => updateLog(activePatient.id, fecha, { orina: o.n })}
              aria-pressed={activo}
              aria-label={`Nivel ${o.n}: ${o.label}. ${o.desc}`}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-2 transition-colors ${
                activo ? "border-primary bg-primary-soft" : "border-border bg-card hover:bg-muted"
              }`}
            >
              <span
                className="block h-16 w-full rounded-xl border-2 border-border"
                style={{ backgroundColor: o.color }}
              />
              <span className="text-lg font-extrabold">{o.n}</span>
            </button>
          );
        })}
      </div>
      {sel && (
        <p className="mt-3 text-lg font-semibold text-muted-foreground">
          {sel.label}: {sel.desc}
        </p>
      )}
    </div>
  );
}
