import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { loadXp, getLevel } from "../xp";

type Mission = { id: number; text: string; xp: number; done: boolean };

const loadMissions = (key: string): Mission[] => {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : []; }
  catch { return []; }
};

export default function Statistics() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [missionsVet, setMissionsVet] = useState<Mission[]>([]);
  const [missionsDev, setMissionsDev] = useState<Mission[]>([]);
  const [missionsInf, setMissionsInf] = useState<Mission[]>([]);

  useEffect(() => {
    setXp(loadXp());
    setStreak(Number(localStorage.getItem("lacho-streak") || 0));
    setMissionsVet(loadMissions("lacho-missions-vet"));
    setMissionsDev(loadMissions("lacho-missions-dev"));
    setMissionsInf(loadMissions("lacho-missions-influencer"));
  }, []);

  const level = getLevel(xp);
  
  const doneVet = missionsVet.filter(m => m.done).length;
  const doneDev = missionsDev.filter(m => m.done).length;
  const doneInf = missionsInf.filter(m => m.done).length;
  const totalDone = doneVet + doneDev + doneInf;

  return (
    <section id="estadisticas" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-3">Estadísticas globales</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-3" style={{ color: "#ededef" }}>Tu desempeño</h2>
          <p className="text-sm text-[#55555a] font-light max-w-md mb-10">Vista unificada de tu progreso en las tres áreas de vida.</p>
        </motion.div>

        {/* Global Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-5">
            <div className="text-[10px] text-[#55555a] uppercase tracking-widest mb-2">XP Acumulado</div>
            <div className="text-3xl font-black font-mono text-[#ededef]">{xp}</div>
          </div>
          <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-5">
            <div className="text-[10px] text-[#55555a] uppercase tracking-widest mb-2">Nivel Actual</div>
            <div className="text-xl font-black text-[#ededef] mt-1.5">{level.label}</div>
          </div>
          <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-5">
            <div className="text-[10px] text-[#55555a] uppercase tracking-widest mb-2">Racha de días</div>
            <div className="text-3xl font-black font-mono text-[#ededef]">{streak}</div>
          </div>
          <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-5">
            <div className="text-[10px] text-[#55555a] uppercase tracking-widest mb-2">Misiones Listas</div>
            <div className="text-3xl font-black font-mono text-[#ededef]">{totalDone}</div>
          </div>
        </div>

        {/* Distribution */}
        <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-6 mb-8">
          <h3 className="text-lg font-bold text-[#ededef] mb-6">Misiones por área</h3>
          <div className="space-y-5">
            {[
              { label: "Veterinaria", color: "#6fcf97", done: doneVet, total: missionsVet.length },
              { label: "Programación", color: "#7baaf7", done: doneDev, total: missionsDev.length },
              { label: "Marca Personal", color: "#c9a84c", done: doneInf, total: missionsInf.length },
            ].map((m) => {
              const pct = m.total > 0 ? (m.done / m.total) * 100 : 0;
              return (
                <div key={m.label}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-[#9ca3af]">{m.label}</span>
                    <span className="text-xs font-mono text-[#55555a]">{m.done} / {m.total}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#1e1e20] overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full" 
                      initial={{ width: 0 }} 
                      animate={{ width: `${pct}%` }} 
                      transition={{ duration: 1 }}
                      style={{ backgroundColor: m.color }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Import/Export Backup */}
        <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#ededef]">Copias de seguridad</h3>
          </div>
          <p className="text-sm text-[#55555a] mb-6">Exporta tus datos si vas a borrar la caché o cambiar de navegador. Todo se guarda en tu dispositivo actual.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Export */}
            <button
              onClick={() => {
                const data: Record<string, string | null> = {};
                for (let i = 0; i < localStorage.length; i++) {
                  const k = localStorage.key(i);
                  if (k && (k.startsWith("lacho") || k.startsWith("solo-system"))) {
                    data[k] = localStorage.getItem(k);
                  }
                }
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `lacho-desk-backup-${new Date().toISOString().split("T")[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="rounded-xl border border-[#2a2a2d] bg-[#111113] p-4 text-center hover:border-zinc-500 transition-colors"
            >
              <div className="text-xl mb-2">⬇️</div>
              <div className="text-sm font-bold text-[#ededef]">Exportar datos</div>
              <div className="text-xs text-[#55555a] mt-1">Descarga un archivo JSON</div>
            </button>

            {/* Import */}
            <label className="rounded-xl border border-[#2a2a2d] bg-[#111113] p-4 text-center hover:border-zinc-500 transition-colors cursor-pointer block">
              <div className="text-xl mb-2">⬆️</div>
              <div className="text-sm font-bold text-[#ededef]">Importar datos</div>
              <div className="text-xs text-[#55555a] mt-1">Restaura desde un JSON</div>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const data = JSON.parse(event.target?.result as string);
                      Object.keys(data).forEach(k => {
                        if (k.startsWith("lacho") || k.startsWith("solo-system")) {
                          if (data[k] !== null) localStorage.setItem(k, data[k]);
                        }
                      });
                      window.location.reload();
                    } catch (err) {
                      alert("Archivo de backup inválido");
                    }
                  };
                  reader.readAsText(file);
                }}
              />
            </label>
          </div>
        </div>

      </div>
    </section>
  );
}
