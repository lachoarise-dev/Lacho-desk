import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { flashcardTemplates, pathMeta, recallQuestionBank, type PathId } from "../learningData";

import type { LachoMode } from "../modes";

const modeToPath: Record<LachoMode, PathId> = { vet: "vet", influencer: "ebook", dev: "code" };

const loadNotes = () => {
  try {
    const raw = localStorage.getItem("solo-system-recall-notes");
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
};

type Props = { mode?: LachoMode };

export default function RecallStudio({ mode }: Props) {
  const filteredIds: PathId[] = mode ? [modeToPath[mode]] : (Object.keys(pathMeta) as PathId[]);
  const [active, setActive] = useState<PathId>(filteredIds[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [notes, setNotes] = useState<Record<string, string>>(loadNotes);
  const [grade, setGrade] = useState(3);
  const meta = pathMeta[active];
  const questions = recallQuestionBank[active];
  const question = questions[questionIndex % questions.length];
  const noteKey = `${active}-${questionIndex}`;

  useEffect(() => {
    localStorage.setItem("solo-system-recall-notes", JSON.stringify(notes));
  }, [notes]);

  const gradeText = useMemo(() => {
    if (grade <= 2) return "Rojo: repasar hoy";
    if (grade <= 4) return "Amarillo: repasar en D+1";
    return "Verde: repasar en D+3/D+7";
  }, [grade]);

  const nextQuestion = () => {
    setQuestionIndex((current) => (current + 1) % questions.length);
    setGrade(3);
  };

  return (
    <section id="recall" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-3">Academia</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-4" style={{ color: "#ededef" }}>
            Prueba antes de releer
          </h2>
          <p className="text-sm text-[#55555a] font-light max-w-lg mx-auto">
            Responde sin mirar, califica tu dominio y convierte lagunas en flashcards.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filteredIds.map((id) => {
            const item = pathMeta[id];
            const isActive = id === active;
            return (
              <button
                key={id}
                onClick={() => {
                  setActive(id);
                  setQuestionIndex(0);
                }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive ? "text-[#111113]" : "text-[#55555a] hover:text-[#9ca3af]"
                }`}
                style={isActive ? { backgroundColor: item.hex } : undefined}
              >
                {item.icon} {item.title}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
          <motion.div
            key={active + questionIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-6"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
              <div>
                <div className="text-[10px] tracking-[0.1em]" style={{ color: meta.hex }}>Pregunta activa</div>
                <h3 className="text-xl font-bold mt-1" style={{ color: "#ededef" }}>{question}</h3>
              </div>
              <button
                onClick={nextQuestion}
                className="rounded-lg px-4 py-2 bg-[#19191b] border border-[#2a2a2d] text-[12px] text-[#9ca3af] hover:text-[#ededef] transition-colors"
              >
                Siguiente
              </button>
            </div>

            <textarea
              value={notes[noteKey] || ""}
              onChange={(event) => setNotes((current) => ({ ...current, [noteKey]: event.target.value }))}
              rows={9}
              placeholder="Responde sin mirar. Luego corrige con tus apuntes..."
              className="w-full rounded-xl bg-[#111113] border border-[#1e1e20] px-4 py-3 text-[12px] text-[#9ca3af] placeholder:text-[#2a2a2d] focus:outline-none focus:border-[#3a3a3d]"
            />

            <div className="mt-5 rounded-xl bg-[#111113] border border-[#1e1e20] p-4">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[12px] font-bold" style={{ color: "#ededef" }}>Autoevaluación</span>
                <span className="text-[12px] font-bold font-mono" style={{ color: meta.hex }}>{grade}/5 · {gradeText}</span>
              </div>
              <input
                min="1"
                max="5"
                type="range"
                value={grade}
                onChange={(event) => setGrade(Number(event.target.value))}
                className="w-full"
              />
            </div>
          </motion.div>

          <motion.div
            key={`${active}-templates`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-[#1e1e20] bg-[#151517] p-6"
          >
            <div className="mb-5">
              <div className="text-[10px] tracking-[0.1em]" style={{ color: meta.hex }}>Plantillas Anki / Notion</div>
              <h3 className="text-xl font-bold" style={{ color: "#ededef" }}>Convierte errores en tarjetas</h3>
            </div>
            <div className="space-y-3">
              {flashcardTemplates[active].map((template) => (
                <div key={template.name} className="rounded-xl bg-[#111113] border border-[#1e1e20] p-4">
                  <h4 className="font-bold text-[#ededef] mb-2 text-[12px]">{template.name}</h4>
                  <div className="text-[10px] text-[#55555a] mb-1">Frente</div>
                  <p className="text-[12px] text-[#9ca3af] mb-3">{template.front}</p>
                  <div className="text-[10px] text-[#55555a] mb-1">Reverso</div>
                  <p className="text-[12px] text-[#9ca3af]">{template.back}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
