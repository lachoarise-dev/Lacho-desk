import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { modeConfig, type LachoMode } from "../modes";
import {
  Home,
  Target,
  CalendarDays,
  BookOpen,
  Terminal,
  Megaphone,
  Brain,
  Trophy,
  GraduationCap,
  Stethoscope,
  Sparkles,
  Library,
  Layers,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type TabId = string;
type TabEntry = { id: TabId; label: string; modes: LachoMode[] | "all"; group: "general" | "mode"; icon: LucideIcon };

export const allTabs: TabEntry[] = [
  { id: "home",      label: "Inicio",             modes: "all",                         group: "general", icon: Home },
  { id: "metas",     label: "Metas",              modes: "all",                         group: "general", icon: Target },
  { id: "rutina",    label: "Rutina",             modes: "all",                         group: "general", icon: CalendarDays },
  { id: "missions",  label: "Aula Virtual",       modes: ["vet"] as LachoMode[],        group: "general", icon: BookOpen },
  { id: "missions",  label: "Terminal",           modes: ["dev"] as LachoMode[],        group: "general", icon: Terminal },
  { id: "missions",  label: "Marca Personal",     modes: ["influencer"] as LachoMode[], group: "general", icon: Megaphone },
  { id: "neuro",     label: "Neurociencia",       modes: "all",                         group: "general", icon: Brain },
  { id: "logros",    label: "Logros",             modes: "all",                         group: "general", icon: Trophy },
  // Vet
  { id: "academia",  label: "Academia",           modes: ["vet"],                       group: "mode",    icon: GraduationCap },
  { id: "clinica",   label: "Casos clínicos",     modes: ["vet"],                       group: "mode",    icon: Stethoscope },
  { id: "sara",      label: "Dream builder",      modes: ["vet"],                       group: "mode",    icon: Sparkles },
  { id: "recursos-vet", label: "Recursos",        modes: ["vet"],                       group: "mode",    icon: Library },
  // Influencer
  { id: "dream-inf", label: "Dream builder",      modes: ["influencer"],                group: "mode",    icon: Sparkles },
  { id: "pipeline",  label: "Flujo de contenido", modes: ["influencer"],                group: "mode",    icon: Layers },
  { id: "recursos-inf", label: "Recursos",        modes: ["influencer"],                group: "mode",    icon: Library },
  // Dev
  { id: "proyectos", label: "Proyectos",          modes: ["dev"],                       group: "mode",    icon: Layers },
  { id: "log",       label: "Revisión",           modes: ["dev"],                       group: "mode",    icon: BarChart3 },
  { id: "recursos-dev", label: "Recursos",        modes: ["dev"],                       group: "mode",    icon: Library },
  // Stats
  { id: "stats",     label: "Estadísticas",       modes: "all",                         group: "general", icon: BarChart3 },
];

type Props = { mode: LachoMode; activeTab: TabId; onTabChange: (t: TabId) => void; onModeChange?: () => void };

export default function SystemSideNav({ mode, activeTab, onTabChange }: Props) {
  const [open, setOpen] = useState(false);
  const cfg = modeConfig[mode];
  const tabs = allTabs.filter((t) => t.modes === "all" || t.modes.includes(mode));

  useEffect(() => {
    if (!open) return;
    const ov = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ov; };
  }, [open]);

  const pick = (id: TabId) => {
    onTabChange(id);
    setOpen(false);
    requestAnimationFrame(() => { requestAnimationFrame(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }); });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed right-5 top-5 z-[60] flex flex-col items-center gap-1.5 px-2 py-2.5 text-[#55555a] hover:text-[#9ca3af] transition-colors duration-500" aria-label="Menú">
        <span className="w-5 h-px bg-current" /><span className="w-3.5 h-px bg-current" /><span className="w-5 h-px bg-current" />
      </button>

      {/* Desktop mini */}
      <div className="fixed left-4 top-1/2 z-[55] hidden -translate-y-1/2 flex-col lg:flex">
        {tabs.map((t, i) => {
          const prev = i > 0 ? tabs[i - 1].group : t.group;
          const Icon = t.icon;
          return (
            <div key={`m-${t.id}-${t.label}`}>
              {i > 0 && prev !== t.group && <div className="h-px bg-[#1e1e20] my-1.5 mx-1" />}
              <button
                onClick={() => pick(t.id)}
                title={t.label}
                className={`rounded px-2 py-1.5 transition-all duration-300 flex items-center justify-center ${activeTab === t.id ? "text-[#ededef]" : "text-[#3a3a3f] hover:text-[#65656d]"}`}
              >
                <Icon size={14} strokeWidth={1.5} stroke="currentColor" fill="none" />
              </button>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[70] bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setOpen(false)} />
            <motion.aside
              className="system-scrollbar fixed right-0 top-0 z-[80] h-[100dvh] w-[min(260px,82vw)] overflow-y-auto overscroll-contain bg-[#111113] border-l border-[#1e1e20] py-6 px-5 flex flex-col"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-[#3a3a3f] hover:text-[#9ca3af] transition-colors">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.2"/></svg>
              </button>

              <div className="mb-5">
                <div className="text-[12px] font-semibold" style={{ color: cfg.accent }}>{cfg.label}</div>
              </div>

              {/* Tabs */}
              <div className="flex-1">
                {tabs.map((t, i) => {
                  const prev = i > 0 ? tabs[i - 1].group : t.group;
                  const Icon = t.icon;
                  return (
                    <div key={`${t.id}-${t.label}`}>
                      {i > 0 && prev !== t.group && <div className="h-px bg-[#1e1e20] my-2" />}
                      <button
                        onClick={() => pick(t.id)}
                        className={`w-full text-left px-2 py-2 rounded transition-all duration-300 flex items-center gap-2.5 ${activeTab === t.id ? "" : "text-[#45454a] hover:text-[#9ca3af]"}`}
                        style={activeTab === t.id ? { color: cfg.accent } : undefined}
                      >
                        <Icon size={13} strokeWidth={1.5} stroke="currentColor" fill="none" className="flex-shrink-0" />
                        <span className="text-[12px] font-medium">{t.label}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-[#1e1e20]">
                <span className="text-[8px] text-[#2a2a2d]">Jaén, ES</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
