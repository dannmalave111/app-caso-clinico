import { Accessibility, RotateCcw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useAccessibility, type ContrastMode, type FontScale } from "@/lib/accessibility";
import { SIZES_ACCESIBILIDAD, CONTRASTS_ACCESIBILIDAD } from "@/lib/constants";

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const a11y = useAccessibility();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Ajustes de accesibilidad"
          className="tap-target fixed right-4 top-4 z-50 flex items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-accent"
        >
          <Accessibility className="size-8" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle className="text-3xl font-extrabold">Accesibilidad</SheetTitle>
          <SheetDescription className="text-lg">
            Ajusta la aplicación para verla y usarla con más comodidad.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8 px-4 pb-10">
          <section aria-labelledby="a11y-tamano" className="space-y-3">
            <h3 id="a11y-tamano" className="text-xl font-bold">
              Tamaño de la letra
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SIZES_ACCESIBILIDAD.map((s) => {
                const active = a11y.fontScale === s.value;
                return (
                  <button
                    key={s.value}
                    onClick={() => a11y.setFontScale(s.value)}
                    aria-pressed={active}
                    className={`tap-target rounded-2xl border-2 px-4 py-3 font-bold transition-colors ${
                      active
                        ? "border-primary bg-primary-soft text-accent-foreground"
                        : "border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    <span style={{ fontSize: `${s.value}rem` }}>Aa</span>
                    <span className="mt-1 block text-base">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="a11y-contraste" className="space-y-3">
            <h3 id="a11y-contraste" className="text-xl font-bold">
              Contraste y colores
            </h3>
            <div className="space-y-3">
              {CONTRASTS_ACCESIBILIDAD.map((c) => {
                const active = a11y.contrast === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => a11y.setContrast(c.value)}
                    aria-pressed={active}
                    className={`tap-target flex w-full flex-col items-start justify-center rounded-2xl border-2 px-4 py-3 text-left transition-colors ${
                      active
                        ? "border-primary bg-primary-soft text-accent-foreground"
                        : "border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="text-lg font-bold">{c.label}</span>
                    <span className="text-base text-muted-foreground">{c.desc}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="a11y-foco" className="space-y-3">
            <h3 id="a11y-foco" className="text-xl font-bold">
              Modo de alto enfoque
            </h3>
            <label className="flex items-center justify-between gap-4 rounded-2xl border-2 border-border bg-card px-4 py-4">
              <span className="text-lg">
                Resalta el elemento seleccionado y reduce animaciones y distracciones.
              </span>
              <Switch
                checked={a11y.focoAlto}
                onCheckedChange={a11y.setFocoAlto}
                aria-label="Activar modo de alto enfoque"
                className="scale-150"
              />
            </label>
          </section>

          <Button
            variant="outline"
            onClick={a11y.reset}
            className="tap-target w-full rounded-2xl text-lg font-bold"
          >
            <RotateCcw className="size-6" aria-hidden="true" />
            Restablecer ajustes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
