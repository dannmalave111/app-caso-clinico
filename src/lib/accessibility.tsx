import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type FontScale = 1 | 1.15 | 1.3 | 1.5;
export type ContrastMode = "normal" | "alto" | "oscuro";

export type A11ySettings = {
  fontScale: FontScale;
  contrast: ContrastMode;
  focoAlto: boolean;
};

const DEFAULTS: A11ySettings = { fontScale: 1, contrast: "normal", focoAlto: false };
import { A11Y_STORAGE_KEY } from "@/lib/constants";

type A11yContext = A11ySettings & {
  setFontScale: (v: FontScale) => void;
  setContrast: (v: ContrastMode) => void;
  setFocoAlto: (v: boolean) => void;
  reset: () => void;
};

const Ctx = createContext<A11yContext | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(A11Y_STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<A11ySettings>) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${settings.fontScale * 100}%`;
    root.classList.toggle("dark", settings.contrast === "oscuro");
    root.classList.toggle("contraste-alto", settings.contrast === "alto");
    root.classList.toggle("foco-alto", settings.focoAlto);
    try {
      localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const value = useMemo<A11yContext>(
    () => ({
      ...settings,
      setFontScale: (fontScale) => setSettings((s) => ({ ...s, fontScale })),
      setContrast: (contrast) => setSettings((s) => ({ ...s, contrast })),
      setFocoAlto: (focoAlto) => setSettings((s) => ({ ...s, focoAlto })),
      reset: () => setSettings(DEFAULTS),
    }),
    [settings],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAccessibility() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAccessibility debe usarse dentro de AccessibilityProvider");
  return ctx;
}
