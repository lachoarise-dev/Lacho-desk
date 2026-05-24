import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";

type Achievement = {
  id: number;
  text: string;
  area: string;
  date: string;
  time: string;
};

const areaOptions = [
  { id: "vet", icon: "🩺", label: "Veterinaria", hex: "#10b981" },
  { id: "ebook", icon: "📕", label: "Ebook / Marca", hex: "#22d3ee" },
  { id: "code", icon: "💻", label: "Programacion", hex: "#8b5cf6" },
  { id: "body", icon: "💪", label: "Calistenia", hex: "#f97316" },
  { id: "habits", icon: "🧘", label: "Habitos", hex: "#06b6d4" },
  { id: "life", icon: "⭐", label: "Vida personal", hex: "#f59e0b" },
];

const loadAchievements = (): Achievement[] => {
  try {
    const raw = localStorage.getItem("lacho-achievements");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export default function AchievementLog() {
  const [achievements, setAchievements] = useState<Achievement[]>(loadAchievements);
  const [text, setText] = useState("");
  const [area, setArea] = useState("life");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    localStorage.setItem("lacho-achievements", JSON.stringify(achievements));
  }, [achievements]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const now = new Date();
    const entry: Achievement = {
      id: Date.now(),
      text: text.trim(),
      area,
      date: now.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
      time: now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    };
    setAchievements((prev) => [entry, ...prev]);
    setText("");
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };

  const remove = (id: number) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
  };

  const filtered = filter === "all" ? achievements : achievements.filter((a) => a.area === filter);
  const areaInfo = (id: string) => areaOptions.find((a) => a.id === id) || areaOptions[5];

  const exportData = () => {
    const data: Record<string, string | null> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith("lacho") || k.startsWith("solo-system"))) data[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lacho-desk-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Stats
  const totalCount = achievements.length;
  const thisWeek = achievements.filter((a) => {
    const d = new Date(a.id);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;
  const topArea = areaOptions
    .map((ao) => ({ ...ao, count: achievements.filter((a) => a.area === ao.id).length }))
    .sort((a, b) => b.count - a.count)[0];

  return (
    <section id="logros" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <div className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-3">Historial</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-3" style={{ color: "#ededef" }}>Logros</h2>
          <p className="text-sm text-[#55555a] font-light max-w-md mb-8">
            Registra tus victorias con fecha y hora. El antídoto contra el síndrome del impostor.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-4 text-center">
            <div className="text-2xl font-black text-[#ededef] font-mono">{totalCount}</div>
            <div className="text-[10px] tracking-[0.1em] uppercase text-[#55555a] mt-1">Totales</div>
          </div>
          <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-4 text-center">
            <div className="text-2xl font-black text-[#ededef] font-mono">{thisWeek}</div>
            <div className="text-[10px] tracking-[0.1em] uppercase text-[#55555a] mt-1">Semana</div>
          </div>
          <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-4 text-center">
            <div className="text-2xl font-black font-mono" style={{ color: topArea?.hex || "#f59e0b" }}>{topArea?.icon || "⭐"}</div>
            <div className="text-[10px] tracking-[0.1em] uppercase text-[#55555a] mt-1">Top</div>
          </div>
          <button onClick={exportData} className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-4 text-center hover:bg-[#1e1e20] hover:border-[#2a2a2d] transition-all flex flex-col items-center justify-center">
            <div className="text-2xl font-black text-[#ededef]">↓</div>
            <div className="text-[10px] tracking-[0.1em] uppercase text-[#55555a] mt-1">Backup</div>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-6 mb-8">
          <h3 className="text-lg font-bold text-[#ededef] mb-4">Nuevo logro</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Hoy logré... (ej: Terminé el capítulo 5 del libro IPS y lo expliqué sin mirar)"
            className="w-full rounded-xl bg-[#111113] border border-[#1e1e20] px-4 py-3 text-sm text-[#9ca3af] placeholder:text-[#2a2a2d] focus:outline-none focus:border-[#3a3a3d] mb-4"
          />
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="text-[10px] uppercase tracking-widest text-[#55555a] mb-2">Área del logro</div>
              <div className="flex flex-wrap gap-2">
                {areaOptions.map((ao) => (
                  <button
                    key={ao.id}
                    type="button"
                    onClick={() => setArea(ao.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                      area === ao.id ? "text-[#111113]" : "bg-[#1e1e20] text-[#55555a] hover:bg-[#2a2a2d]"
                    }`}
                    style={area === ao.id ? { backgroundColor: ao.hex } : undefined}
                  >
                    {ao.icon} {ao.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="rounded-xl bg-[var(--accent)] text-[#111113] px-6 py-2.5 font-bold text-[11px] hover:opacity-80 transition-opacity"
            >
              Guardar logro
            </button>
          </div>
        </form>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === "all" ? "bg-white text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Todos ({achievements.length})
          </button>
          {areaOptions.map((ao) => {
            const count = achievements.filter((a) => a.area === ao.id).length;
            if (count === 0) return null;
            return (
              <button
                key={ao.id}
                onClick={() => setFilter(ao.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === ao.id ? "text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
                style={filter === ao.id ? { backgroundColor: ao.hex } : undefined}
              >
                {ao.icon} {count}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {filtered.length > 0 && (
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400/60 via-cyan-400/30 to-transparent" />
          )}

          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="rune-border rounded-2xl bg-slate-900/50 p-8 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <p className="text-slate-400">Aun no hay logros registrados. Tu primer logro sera el mas importante: marca el inicio.</p>
              </div>
            ) : (
              filtered.map((a, i) => {
                const info = areaInfo(a.area);
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.04, 0.5) }}
                    className="relative pl-12"
                  >
                    {/* Node */}
                    <div
                      className="absolute left-3 top-4 w-5 h-5 rounded-full border-2 border-[#111113]"
                      style={{ backgroundColor: info.hex }}
                    />

                    <div className="rounded-xl bg-[#151517] border border-[#1e1e20] p-4 hover:border-[#2a2a2d] transition-colors group">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span
                              className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                              style={{ backgroundColor: `${info.hex}20`, color: info.hex, border: `1px solid ${info.hex}40` }}
                            >
                              {info.icon} {info.label}
                            </span>
                            <span className="text-[10px] text-[#55555a]">{a.date}</span>
                            <span className="text-[10px] text-[#3a3a3f]">{a.time}</span>
                          </div>
                          <p className="text-[12px] text-[#9ca3af] leading-relaxed">{a.text}</p>
                        </div>
                        <button
                          onClick={() => remove(a.id)}
                          className="opacity-0 group-hover:opacity-100 text-[#3a3a3f] hover:text-red-400 text-[10px] transition-all flex-shrink-0"
                          title="Eliminar"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="fixed bottom-8 right-8 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-lg shadow-2xl shadow-amber-500/50 z-50"
          >
            🏆 Logro registrado
          </motion.div>
        )}
      </div>
    </section>
  );
}
