import { useState, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type AppEntry = {
  id: string;
  name: string;
  limitMin: number; // weekly limit in minutes
  usedMin: number;  // minutes used this week
  notified: boolean;
};

const STORAGE_KEY = "lacho-detox-v1";
const WEEK_KEY = "lacho-detox-week";

const defaultApps: AppEntry[] = [
  { id: "whatsapp",       name: "WhatsApp",      limitMin: 60,  usedMin: 0, notified: false },
  { id: "instagram",      name: "Instagram",     limitMin: 90,  usedMin: 0, notified: false },
  { id: "mobilelegends",  name: "Mobile Legends",limitMin: 120, usedMin: 0, notified: false },
];

const getWeekKey = () => {
  const d = new Date();
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
};

const load = (): AppEntry[] => {
  try {
    const week = localStorage.getItem(WEEK_KEY);
    const raw  = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultApps;
    const saved: AppEntry[] = JSON.parse(raw);
    if (week !== getWeekKey()) {
      // New week → reset usage and notifications, keep limits and names
      const reset = saved.map(a => ({ ...a, usedMin: 0, notified: false }));
      localStorage.setItem(WEEK_KEY, getWeekKey());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
      return reset;
    }
    return saved;
  } catch { return defaultApps; }
};

const save = (apps: AppEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  localStorage.setItem(WEEK_KEY, getWeekKey());
};

// ── Icon: shield with ban ──────────────────────────────────────────────────
const DetoxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);
const EditIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

// ── Notification banner ───────────────────────────────────────────────────
function NotifBanner({ app, onDismiss }: { app: AppEntry; onDismiss: () => void }) {
  return (
    <div className="rounded-xl border border-[#3a1a1a] bg-[#1a0f0f] px-4 py-3 mb-4 flex items-start justify-between gap-3">
      <div>
        <p className="text-[11px] font-bold text-[#ef4444] mb-1">⚠ {app.name}</p>
        <p className="text-[11px] text-[#9ca3af] leading-relaxed">
          Has sobrepasado el límite semanal que propusiste para esta app.<br/>
          Si la abres eres gay... ¿tienes miedo putica?
        </p>
      </div>
      <button onClick={onDismiss} className="text-[#3a3a3f] hover:text-[#9ca3af] transition-colors flex-shrink-0 mt-0.5">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1l8 8M9 1L1 9"/>
        </svg>
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function DetoxTracker() {
  const [apps, setApps]         = useState<AppEntry[]>(load);
  const [editing, setEditing]   = useState<string | null>(null);
  const [adding, setAdding]     = useState(false);
  const [newName, setNewName]   = useState("");
  const [newLimit, setNewLimit] = useState(60);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  // Persist on change
  useEffect(() => { save(apps); }, [apps]);

  // Check banners on mount (for apps already over limit)
  const overLimit = apps.filter(a => !dismissed.has(a.id) && a.usedMin >= a.limitMin);

  const addMinutes = (id: string, delta: number) => {
    setApps(prev => prev.map(a => {
      if (a.id !== id) return a;
      const next = Math.max(0, a.usedMin + delta);
      return { ...a, usedMin: next };
    }));
  };

  const updateLimit = (id: string, val: number) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, limitMin: val } : a));
  };

  const updateName = (id: string, val: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, name: val } : a));
  };

  const removeApp = (id: string) => {
    setApps(prev => prev.filter(a => a.id !== id));
  };

  const addApp = () => {
    if (!newName.trim()) return;
    const entry: AppEntry = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      limitMin: newLimit,
      usedMin: 0,
      notified: false,
    };
    setApps(prev => [...prev, entry]);
    setNewName(""); setNewLimit(60); setAdding(false);
  };

  const resetWeek = () => {
    setApps(prev => prev.map(a => ({ ...a, usedMin: 0, notified: false })));
    setDismissed(new Set());
  };

  const fmtMin = (m: number) => m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;

  return (
    <div className="rounded-2xl border border-[#1e1e20] bg-[#111113] overflow-hidden mt-8">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#1e1e20] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-[#ef4444]"><DetoxIcon /></span>
          <div>
            <p className="text-[13px] font-bold text-[#ededef]">Detox Digital</p>
            <p className="text-[9px] text-[#3a3a3f]">Límite semanal de apps · se reinicia cada lunes</p>
          </div>
        </div>
        <button onClick={resetWeek} className="text-[9px] text-[#3a3a3f] hover:text-[#65656d] transition-colors border border-[#2a2a2d] rounded px-2 py-1">
          Reset semana
        </button>
      </div>

      <div className="px-5 py-4 space-y-3">
        {/* Notification banners */}
        {overLimit.map(app => (
          <NotifBanner key={app.id} app={app} onDismiss={() => setDismissed(prev => new Set([...prev, app.id]))} />
        ))}

        {/* App rows */}
        {apps.map(app => {
          const pct = Math.min(100, (app.usedMin / app.limitMin) * 100);
          const over = app.usedMin >= app.limitMin;
          const isEdit = editing === app.id;
          const barColor = over ? "#ef4444" : pct > 75 ? "#f59e0b" : "#6fcf97";

          return (
            <div key={app.id} className="rounded-xl border border-[#1e1e20] bg-[#151517] overflow-hidden">
              <div className="px-4 py-3">
                {/* Name + actions */}
                <div className="flex items-center justify-between mb-2">
                  {isEdit ? (
                    <input
                      value={app.name}
                      onChange={e => updateName(app.id, e.target.value)}
                      onBlur={() => setEditing(null)}
                      autoFocus
                      className="bg-transparent border-b border-[#3a3a3f] text-[12px] text-[#ededef] font-semibold focus:outline-none w-32"
                    />
                  ) : (
                    <span className="text-[12px] font-semibold text-[#ededef]">{app.name}</span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono ${over ? "text-[#ef4444]" : "text-[#3a3a3f]"}`}>
                      {fmtMin(app.usedMin)} / {fmtMin(app.limitMin)}
                    </span>
                    <button onClick={() => setEditing(isEdit ? null : app.id)} className="text-[#3a3a3f] hover:text-[#9ca3af] transition-colors">
                      <EditIcon />
                    </button>
                    <button onClick={() => removeApp(app.id)} className="text-[#3a3a3f] hover:text-[#ef4444] transition-colors">
                      <TrashIcon />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1 rounded-full bg-[#1e1e20] mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: barColor }}
                  />
                </div>

                {/* Controls */}
                {isEdit ? (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] text-[#3a3a3f] flex items-center gap-1"><ClockIcon /> Límite semanal</span>
                    <input
                      type="number"
                      min={5}
                      max={10080}
                      step={5}
                      value={app.limitMin}
                      onChange={e => updateLimit(app.id, Number(e.target.value))}
                      className="w-16 bg-[#1e1e20] border border-[#2a2a2d] rounded px-2 py-0.5 text-[11px] text-[#ededef] text-center focus:outline-none"
                    />
                    <span className="text-[9px] text-[#3a3a3f]">min</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[-30, -15, -5].map(d => (
                      <button key={d} onClick={() => addMinutes(app.id, d)}
                        className="text-[9px] font-mono px-2 py-0.5 rounded border border-[#2a2a2d] text-[#55555a] hover:text-[#ededef] hover:border-[#3a3a3f] transition-all">
                        {d}m
                      </button>
                    ))}
                    <span className="text-[#2a2a2d] text-[9px]">|</span>
                    {[5, 15, 30, 60].map(d => (
                      <button key={d} onClick={() => addMinutes(app.id, d)}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-all ${over ? "border-[#3a1a1a] text-[#ef4444] hover:bg-[#1a0f0f]" : "border-[#2a2a2d] text-[#55555a] hover:text-[#ededef] hover:border-[#3a3a3f]"}`}>
                        +{d}m
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Over-limit warning strip */}
              {over && (
                <div className="px-4 py-1.5 bg-[#1a0f0f] border-t border-[#3a1a1a]">
                  <p className="text-[9px] text-[#ef4444]">⚠ Límite superado esta semana</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Add new app */}
        {adding ? (
          <div className="rounded-xl border border-[#2a2a2d] bg-[#151517] px-4 py-3 space-y-2">
            <input
              placeholder="Nombre de la app..."
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="w-full bg-transparent border-b border-[#2a2a2d] text-[12px] text-[#ededef] focus:outline-none pb-1"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-[#3a3a3f]">Límite semanal:</span>
              <input
                type="number" min={5} max={10080} step={5} value={newLimit}
                onChange={e => setNewLimit(Number(e.target.value))}
                className="w-16 bg-[#1e1e20] border border-[#2a2a2d] rounded px-2 py-0.5 text-[11px] text-[#ededef] text-center focus:outline-none"
              />
              <span className="text-[9px] text-[#3a3a3f]">min</span>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={addApp} className="text-[10px] px-3 py-1 rounded bg-[#1e1e20] text-[#ededef] hover:bg-[#2a2a2d] transition-colors">Añadir</button>
              <button onClick={() => setAdding(false)} className="text-[10px] px-3 py-1 rounded text-[#3a3a3f] hover:text-[#65656d] transition-colors">Cancelar</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-[#2a2a2d] text-[#3a3a3f] hover:text-[#65656d] hover:border-[#3a3a3f] transition-all text-[10px]"
          >
            <PlusIcon /> Añadir app al detox
          </button>
        )}
      </div>
    </div>
  );
}
