import { motion } from "framer-motion";
import { sixMonthPlan } from "../data";
import { useEffect, useState } from "react";
import type { LachoMode } from "../modes";
import { addXp } from "../xp";

const MILESTONE_XP = 50;
const modeField: Record<LachoMode, "vet" | "ebook" | "code"> = { vet: "vet", influencer: "ebook", dev: "code" };
const loadCompleted = (): Record<number, boolean> => { try { const r = localStorage.getItem("lacho-milestones"); return r ? JSON.parse(r) : {}; } catch { return {}; } };

type Props = { mode?: LachoMode };

export default function SixMonthTimeline({ mode }: Props) {
  const [completed, setCompleted] = useState<Record<number, boolean>>(loadCompleted);
  const field = mode ? modeField[mode] : null;

  useEffect(() => { localStorage.setItem("lacho-milestones", JSON.stringify(completed)); }, [completed]);

  const toggleMilestone = (month: number) => {
    const was = !!completed[month];
    setCompleted((c) => ({ ...c, [month]: !was }));
    addXp(was ? -MILESTONE_XP : MILESTONE_XP);
  };

  return (
    <section id="plan" className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-3">Hoja de ruta</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-3" style={{ color: "#ededef" }}>Metas mensuales</h2>
          <p className="text-sm text-[#55555a] font-light max-w-md mb-10">6 metas claras. Una por mes. Marca cada hito al completarlo.</p>
        </motion.div>

        <div className="space-y-3">
          {sixMonthPlan.map((m, i) => {
            const done = !!completed[m.month];
            const task = field ? m[field] : `${m.vet} · ${m.ebook} · ${m.code}`;
            return (
              <motion.div
                key={m.month}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-start gap-4 py-4 border-b border-[#1e1e20] last:border-b-0"
              >
                {/* Month number */}
                <span className="text-xl font-black font-mono text-[#2a2a2d] w-8 flex-shrink-0">{String(m.month).padStart(2, "0")}</span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#ededef] mb-0.5">{m.title}</div>
                  <p className="text-xs text-[#55555a] leading-relaxed">{task}</p>
                </div>

                {/* Milestone checkbox */}
                <button onClick={() => toggleMilestone(m.month)} className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center mt-0.5 transition-all duration-300 ${done ? "bg-[#ededef] border-[#ededef]" : "border-[#2a2a2d] hover:border-[#3a3a3d]"}`}>
                  {done && <span className="text-[#111113] text-[10px] font-bold">✓</span>}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
