import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { energyDays, weeklyReviewByMode, masteryByMode } from "../learningData";
import type { LachoMode } from "../modes";

const loadRecord = (key: string) => { try { const r = localStorage.getItem(key); return r ? (JSON.parse(r) as Record<string, string>) : {}; } catch { return {}; } };
const loadScores = () => { try { const r = localStorage.getItem("solo-system-mastery-scores"); return r ? (JSON.parse(r) as Record<string, number>) : {}; } catch { return {}; } };

type Props = { mode?: LachoMode };

export default function WeeklyReview({ mode }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => loadRecord("solo-system-weekly-review"));
  const [scores, setScores] = useState<Record<string, number>>(loadScores);

  useEffect(() => { localStorage.setItem("solo-system-weekly-review", JSON.stringify(answers)); }, [answers]);
  useEffect(() => { localStorage.setItem("solo-system-mastery-scores", JSON.stringify(scores)); }, [scores]);

  const modeKey = mode || "dev";
  const sections = weeklyReviewByMode[modeKey] || weeklyReviewByMode.dev;
  const metrics = masteryByMode[modeKey] || masteryByMode.dev;

  return (
    <section id="revision" className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-3">Revisión semanal</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-3" style={{ color: "#ededef" }}>Mide dominio, no esfuerzo</h2>
          <p className="text-sm text-[#55555a] font-light max-w-md mb-10">Cada domingo, responde estas preguntas y ajusta la siguiente semana.</p>
        </motion.div>

        {/* Energy levels */}
        <div className="grid md:grid-cols-3 gap-3 mb-10">
          {energyDays.map((e) => (
            <div key={e.rank} className="rounded-xl border border-[#1e1e20] bg-[#151517] p-5">
              <div className="text-sm font-bold text-[#ededef] mb-1">{e.rank}</div>
              <div className="text-[10px] text-[#3a3a3f] mb-3">{e.when}</div>
              <p className="text-xs text-[#55555a] mb-2">{e.rule}</p>
              <p className="text-[10px] text-[#3a3a3f]">{e.minimum}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Review questions */}
          <div className="rounded-xl border border-[#1e1e20] bg-[#151517] p-6">
            <h3 className="text-base font-bold text-[#ededef] mb-4">Review guiada</h3>
            <div className="space-y-5">
              {sections.map((section) => (
                <div key={section.title}>
                  <div className="text-[10px] text-[#3a3a3f] font-medium mb-2">{section.title}</div>
                  {section.questions.map((q, i) => {
                    const key = `${modeKey}-${section.title}-${i}`;
                    return (
                      <label key={q} className="block mb-2">
                        <span className="text-[11px] text-[#55555a]">{q}</span>
                        <textarea
                          value={answers[key] || ""}
                          onChange={(e) => setAnswers((a) => ({ ...a, [key]: e.target.value }))}
                          rows={2}
                          className="mt-1 w-full rounded-lg bg-[#111113] border border-[#1e1e20] px-3 py-2 text-[11px] text-[#9ca3af] placeholder:text-[#2a2a2d] focus:outline-none focus:border-[#3a3a3d]"
                          placeholder="..."
                        />
                      </label>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Mastery metrics */}
          <div className="rounded-xl border border-[#1e1e20] bg-[#151517] p-6">
            <h3 className="text-base font-bold text-[#ededef] mb-4">Métricas de dominio</h3>
            <p className="text-[10px] text-[#3a3a3f] mb-4">Puntaje semanal del 0 al 10.</p>
            {[
              { key: "effort", label: "Esfuerzo", desc: metrics.effort },
              { key: "mastery", label: "Dominio", desc: metrics.mastery },
              { key: "result", label: "Resultado", desc: metrics.result },
            ].map((m) => {
              const k = `${modeKey}-${m.key}`;
              const value = scores[k] ?? 5;
              return (
                <div key={k} className="mb-5 last:mb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[#9ca3af]">{m.label}</span>
                    <span className="text-xs font-bold font-mono text-[#ededef]">{value}/10</span>
                  </div>
                  <p className="text-[10px] text-[#3a3a3f] mb-2">{m.desc}</p>
                  <input type="range" min="0" max="10" value={value} onChange={(e) => setScores((s) => ({ ...s, [k]: Number(e.target.value) }))} className="w-full accent-[#3a3a3d]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
