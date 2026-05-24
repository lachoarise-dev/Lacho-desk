import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import type { LachoMode } from "../modes";
import { addXp, loadXp, getLevel, xpLevels } from "../xp";

type Mission = { id: number; text: string; xp: number; done: boolean };

const XP_DEFAULT = 25;
const storageKey = (mode: LachoMode) => `lacho-missions-${mode}`;
const loadMissions = (mode: LachoMode): Mission[] => { try { const r = localStorage.getItem(storageKey(mode)); return r ? JSON.parse(r) : []; } catch { return []; } };

const modeTitle: Record<LachoMode, string> = {
  vet: "Aula Virtual",
  dev: "Terminal",
  influencer: "Marca Personal",
};

type Props = { mode: LachoMode };

export default function Missions({ mode }: Props) {
  const [missions, setMissions] = useState<Mission[]>(() => loadMissions(mode));
  const [xp, setXp] = useState(loadXp);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem(storageKey(mode), JSON.stringify(missions)); }, [missions, mode]);

  const addMission = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMissions((m) => [...m, { id: Date.now(), text: input.trim(), xp: XP_DEFAULT, done: false }]);
    setInput("");
  };

  const toggleMission = (id: number) => {
    setMissions((ms) => ms.map((m) => {
      if (m.id !== id) return m;
      if (!m.done) {
        setXp(addXp(m.xp));
        setToast(`+${m.xp} XP`);
        setTimeout(() => setToast(null), 1500);
      } else {
        setXp(addXp(-m.xp));
      }
      return { ...m, done: !m.done };
    }));
  };

  const removeMission = (id: number) => {
    const m = missions.find((x) => x.id === id);
    if (m?.done) setXp(addXp(-m.xp));
    setMissions((ms) => ms.filter((x) => x.id !== id));
  };

  const level = getLevel(xp);
  const progressInLevel = level.next < 999999 ? ((xp - level.min) / (level.next - level.min)) * 100 : 100;
  const doneCount = missions.filter((m) => m.done).length;

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-3">Misiones diarias</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-8" style={{ color: "#ededef" }}>{modeTitle[mode]}</h2>
        </motion.div>

        {/* XP Bar */}
        <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-bold" style={{ color: "#ededef" }}>{level.label}</div>
              <div className="text-[10px] text-[#3a3a3f] font-mono">{xp} XP · {doneCount} completadas</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black font-mono" style={{ color: "var(--accent)" }}>{xp}</div>
              <div className="text-[9px] text-[#3a3a3f]">{level.next < 999999 ? `${level.next - xp} para ${xpLevels[level.index + 1]?.label || "siguiente"}` : "Nivel máximo"}</div>
            </div>
          </div>
          <div className="h-2 rounded-full bg-[#1e1e20] overflow-hidden">
            <motion.div className="h-full rounded-full" animate={{ width: `${progressInLevel}%` }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ backgroundColor: "var(--accent)" }} />
          </div>
        </div>

        {/* Add mission */}
        <form onSubmit={addMission} className="flex gap-2 mb-6">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Añadir misión..."
            className="flex-1 rounded-xl bg-[#151517] border border-[#1e1e20] px-4 py-3 text-[12px] text-[#ededef] placeholder:text-[#2a2a2d] focus:outline-none focus:border-[#3a3a3d]" />
          <button type="submit" className="rounded-xl bg-[#222225] px-4 py-3 text-[11px] font-medium text-[#9ca3af] hover:text-[#ededef] transition-colors">+{XP_DEFAULT}xp</button>
        </form>

        {/* Missions list */}
        <div className="rounded-2xl border border-[#1e1e20] overflow-hidden">
          {missions.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-[11px] text-[#3a3a3f]">Sin misiones. Añade la primera.</p>
            </div>
          ) : (
            missions.map((m) => (
              <div key={m.id} className={`flex items-center gap-3 px-5 py-3 border-b border-[#1e1e20] last:border-b-0 group transition-colors duration-300 ${m.done ? "bg-[#151517]" : "hover:bg-[#151517]"}`}>
                <button onClick={() => toggleMission(m.id)} className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all duration-300 ${m.done ? "bg-[#ededef] border-[#ededef]" : "border-[#2a2a2d] hover:border-[#3a3a3d]"}`}>
                  {m.done && <span className="text-[#111113] text-[9px] font-bold">✓</span>}
                </button>
                <span className={`flex-1 text-[12px] transition-all duration-300 ${m.done ? "text-[#3a3a3f] line-through" : "text-[#9ca3af]"}`}>{m.text}</span>
                <span className="text-[9px] font-mono text-[#2a2a2d]">{m.xp}xp</span>
                <button onClick={() => removeMission(m.id)} className="text-[#1e1e20] group-hover:text-[#3a3a3f] hover:text-[#65656d] text-[10px] transition-colors">✕</button>
              </div>
            ))
          )}
        </div>

        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 z-[90] rounded-lg px-4 py-2 text-sm font-bold"
            style={{ backgroundColor: "var(--accent)", color: "#111113" }}>
            {toast}
          </motion.div>
        )}
      </div>
    </section>
  );
}
