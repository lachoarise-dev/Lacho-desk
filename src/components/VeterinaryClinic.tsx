import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { clinicalCases, practiceChecklist } from "../learningData";

const levels = ["No visto", "Lo entiendo", "Lo explico", "Lo hago supervisado", "Seguro"];

const loadLevels = () => { try { const r = localStorage.getItem("solo-system-practice-levels"); return r ? (JSON.parse(r) as Record<string, number>) : {}; } catch { return {}; } };
const loadSolved = () => { try { const r = localStorage.getItem("lacho-cases-solved"); return r ? (JSON.parse(r) as Record<number, boolean>) : {}; } catch { return {}; } };

export default function VeterinaryClinic() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>(loadLevels);
  const [solved, setSolved] = useState<Record<number, boolean>>(loadSolved);
  const activeCase = clinicalCases[caseIndex];
  const total = clinicalCases.length;
  const solvedCount = Object.values(solved).filter(Boolean).length;

  useEffect(() => { localStorage.setItem("solo-system-practice-levels", JSON.stringify(skillLevels)); }, [skillLevels]);
  useEffect(() => { localStorage.setItem("lacho-cases-solved", JSON.stringify(solved)); }, [solved]);

  const cycleSkill = (key: string) => setSkillLevels((c) => ({ ...c, [key]: ((c[key] || 0) + 1) % levels.length }));
  const toggleSolved = (n: number) => setSolved((s) => ({ ...s, [n]: !s[n] }));

  return (
    <section id="clinica" className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-3">Casos clínicos</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-3" style={{ color: "#ededef" }}>50 casos simulados</h2>
          <p className="text-sm text-[#55555a] font-light max-w-md mb-8">{solvedCount}/{total} resueltos. Incluye consulta, urgencia, cirugía, laboratorio y exóticos.</p>
        </motion.div>

        {/* Case navigator */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setCaseIndex(Math.max(0, caseIndex - 1))} className="w-8 h-8 rounded-lg bg-[#19191b] text-[#55555a] hover:text-[#ededef] transition-colors text-sm">←</button>
          <div className="flex-1 overflow-x-auto flex gap-1 py-1">
            {clinicalCases.map((c, i) => (
              <button key={c.num} onClick={() => setCaseIndex(i)}
                className={`w-7 h-7 rounded text-[8px] font-mono flex-shrink-0 transition-all duration-300 ${
                  i === caseIndex ? "bg-[#ededef] text-[#111113]" :
                  solved[c.num] ? "bg-[#1e1e20] text-[#55555a]" :
                  "text-[#2a2a2d] hover:text-[#55555a]"
                }`}
              >
                {c.num}
              </button>
            ))}
          </div>
          <button onClick={() => setCaseIndex(Math.min(total - 1, caseIndex + 1))} className="w-8 h-8 rounded-lg bg-[#19191b] text-[#55555a] hover:text-[#ededef] transition-colors text-sm">→</button>
        </div>

        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-6">
          {/* Active case */}
          <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[9px] text-[#3a3a3f] font-mono">Caso #{activeCase.num}</span>
                <h3 className="text-lg font-bold" style={{ color: "#ededef" }}>{activeCase.title}</h3>
              </div>
              <span className="text-[9px] px-2 py-1 rounded bg-[#19191b] text-[#55555a]">{activeCase.level}</span>
            </div>

            <p className="text-[12px] text-[#9ca3af] leading-relaxed rounded-xl bg-[#111113] border border-[#1e1e20] p-4 mb-5">{activeCase.scenario}</p>

            <div className="mb-5">
              <div className="text-[10px] text-[#3a3a3f] mb-2">Preguntas de razonamiento</div>
              <div className="space-y-2">
                {activeCase.questions.map((q, i) => (
                  <div key={q} className="rounded-lg bg-[#111113] border border-[#1e1e20] p-3 text-[11px] text-[#9ca3af]">
                    <span className="text-[#3a3a3f] font-mono mr-2">{i + 1}.</span>{q}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="text-[10px] text-[#3a3a3f] mb-2">Checklist</div>
              <div className="flex flex-wrap gap-1.5">
                {activeCase.checklist.map((c) => (
                  <span key={c} className="rounded-full bg-[#19191b] border border-[#1e1e20] px-2.5 py-1 text-[9px] text-[#55555a]">{c}</span>
                ))}
              </div>
            </div>

            <button onClick={() => toggleSolved(activeCase.num)}
              className={`w-full rounded-lg py-2.5 text-[11px] font-medium transition-all duration-300 ${
                solved[activeCase.num] ? "bg-[#19191b] text-[#3a3a3f]" : "bg-[#222225] text-[#ededef] hover:bg-[#2a2a2d]"
              }`}
            >
              {solved[activeCase.num] ? "Resuelto ✓" : "Marcar como resuelto"}
            </button>
          </div>

          {/* Skills checklist */}
          <div className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-6">
            <div className="text-[10px] text-[#3a3a3f] mb-1">Habilidades prácticas</div>
            <h3 className="text-base font-bold mb-4" style={{ color: "#ededef" }}>Niveles de dominio</h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 system-scrollbar">
              {practiceChecklist.map((group) => (
                <div key={group.area} className="rounded-xl bg-[#111113] border border-[#1e1e20] p-3">
                  <div className="text-[10px] font-medium text-[#55555a] mb-2">{group.area}</div>
                  <div className="grid sm:grid-cols-2 gap-1.5">
                    {group.skills.map((skill) => {
                      const key = `${group.area}-${skill}`;
                      const level = skillLevels[key] || 0;
                      const pct = (level / (levels.length - 1)) * 100;
                      return (
                        <button key={skill} onClick={() => cycleSkill(key)} className="rounded-lg bg-[#151517] border border-[#1e1e20] p-2 text-left hover:border-[#2a2a2d] transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-[#9ca3af]">{skill}</span>
                            <span className="text-[8px] text-[#3a3a3f]">{levels[level]}</span>
                          </div>
                          <div className="h-1 rounded-full bg-[#1e1e20] overflow-hidden">
                            <div className="h-full bg-[#3a3a3d]" style={{ width: `${pct}%` }} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
