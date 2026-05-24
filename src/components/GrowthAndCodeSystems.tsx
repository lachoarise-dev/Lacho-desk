import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { ebookFunnel, programmingRoadmap } from "../learningData";
import type { LachoMode } from "../modes";

type ErrorEntry = {
  id: number;
  error: string;
  cause: string;
  solution: string;
  lesson: string;
};

const loadErrors = () => {
  try {
    const raw = localStorage.getItem("solo-system-error-log");
    return raw ? (JSON.parse(raw) as ErrorEntry[]) : [];
  } catch {
    return [];
  }
};

type Props = { mode?: LachoMode };
export default function GrowthAndCodeSystems({ mode }: Props) {
  const showFunnel = !mode || mode === "influencer";
  const showRoadmap = !mode || mode === "dev";
  const showBitacora = !mode || mode === "dev";
  const [errors, setErrors] = useState<ErrorEntry[]>(loadErrors);
  const [form, setForm] = useState({ error: "", cause: "", solution: "", lesson: "" });

  useEffect(() => {
    localStorage.setItem("solo-system-error-log", JSON.stringify(errors));
  }, [errors]);

  const submitError = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.error.trim()) return;
    setErrors((current) => [{ id: Date.now(), ...form }, ...current].slice(0, 8));
    setForm({ error: "", cause: "", solution: "", lesson: "" });
  };

  return (
    <section id="growth-code" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-3">{showFunnel ? "Pipeline" : "Proyectos"}</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-4" style={{ color: "#ededef" }}>
            {showFunnel ? "Construye tu marca" : "Construye con codigo"}
          </h2>
          <p className="text-sm text-[#55555a] font-light max-w-md">
            {showFunnel ? "Cada pieza de contenido es un experimento. Mide, aprende, itera." : "Cada feature es un concepto aprendido. Pseudocodigo primero, teclear despues."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6" style={showFunnel ? undefined : { display: "none" }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rune-border rounded-2xl bg-slate-900/65 backdrop-blur p-6"
          >
            <div className="mb-5">
              <div className="text-xs uppercase tracking-widest text-cyan-300">Embudo del ebook</div>
              <h3 className="text-2xl font-black text-white">De contenido a comunidad</h3>
              <p className="text-sm text-slate-400 mt-1">Cada post debe tener una funcion y una metrica. Si no mide nada, no enseña nada.</p>
            </div>

            <div className="space-y-3 mb-6">
              {ebookFunnel.stages.map((stage, index) => (
                <div key={stage.name} className="rounded-xl bg-slate-950/45 border border-slate-800 p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h4 className="font-black text-white"><span className="text-cyan-300 font-mono">0{index + 1}</span> {stage.name}</h4>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">{stage.metric}</span>
                  </div>
                  <p className="text-sm text-slate-300">{stage.content}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#2a2a2d] bg-[#19191b] p-4">
              <h4 className="font-black text-white mb-3">Pilares de contenido</h4>
              <div className="flex flex-wrap gap-2">
                {ebookFunnel.contentPillars.map((pillar) => (
                  <span key={pillar} className="rounded-full px-3 py-1.5 bg-slate-950/60 border border-cyan-400/20 text-xs text-cyan-100">
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rune-border rounded-2xl bg-slate-900/65 backdrop-blur p-6"
          >
            <div className="mb-5">
              <div className="text-xs uppercase tracking-widest text-violet-300">Ciclo Instagram</div>
              <h3 className="text-2xl font-black text-white">Experimento semanal</h3>
              <p className="text-sm text-slate-400 mt-1">Usa este flujo cada domingo para decidir que repetir y que eliminar.</p>
            </div>

            <div className="relative grid gap-3">
              {ebookFunnel.experimentLoop.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-4 rounded-xl bg-slate-950/45 border border-violet-400/20 p-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2a2a2d] text-[#ededef] flex items-center justify-center font-black font-mono">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-black">{step}</h4>
                    <p className="text-xs text-slate-400">
                      {index === 0 && "Que crees que funcionara y por que?"}
                      {index === 1 && "Publica Reel, carrusel o story con CTA concreto."}
                      {index === 2 && "Mide retencion, guardados, comentarios, DMs y clicks."}
                      {index === 3 && "Escribe una leccion accionable, no una opinion vaga."}
                      {index === 4 && "Repite el patron ganador cambiando solo una variable."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6" style={showRoadmap || showBitacora ? undefined : { display: "none" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rune-border rounded-2xl bg-slate-900/65 backdrop-blur p-6"
          >
            <div className="mb-5">
              <div className="text-xs uppercase tracking-widest text-violet-300">Roadmap de programacion</div>
              <h3 className="text-2xl font-black text-white">Concepto ligado a feature</h3>
            </div>
            <div className="space-y-3">
              {programmingRoadmap.map((item) => (
                <div key={item.month} className="grid md:grid-cols-[70px_1fr] gap-3 rounded-xl bg-slate-950/45 border border-slate-800 p-4">
                  <div className="text-center md:text-left">
                    <div className="text-xs text-slate-500 uppercase tracking-widest">Mes</div>
                    <div className="text-2xl font-black text-violet-300 font-mono">{item.month}</div>
                  </div>
                  <div>
                    <h4 className="text-white font-black">{item.concept}</h4>
                    <p className="text-sm text-slate-300 mt-1">Feature: {item.feature}</p>
                    <p className="text-xs text-cyan-200 mt-2">Prueba de aprendizaje: {item.proof}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rune-border rounded-2xl bg-slate-900/65 backdrop-blur p-6"
          >
            <div className="mb-5">
              <div className="text-xs uppercase tracking-widest text-cyan-300">Bitacora de errores</div>
              <h3 className="text-2xl font-black text-white">Debug = aprendizaje</h3>
              <p className="text-sm text-slate-400 mt-1">Cada error registrado reduce la probabilidad de repetirlo.</p>
            </div>

            <form onSubmit={submitError} className="space-y-3 mb-5">
              {[
                ["error", "Error encontrado"],
                ["cause", "Causa probable"],
                ["solution", "Solucion aplicada"],
                ["lesson", "Aprendizaje"],
              ].map(([key, label]) => (
                <input
                  key={key}
                  value={form[key as keyof typeof form]}
                  onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                  placeholder={label}
                  className="w-full rounded-lg bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              ))}
              <button className="w-full rounded-lg bg-[#ededef] text-[#111113] py-2 font-black hover:bg-white transition-colors">
                Guardar en bitacora
              </button>
            </form>

            <div className="space-y-3 max-h-[410px] overflow-y-auto pr-1">
              {errors.length === 0 ? (
                <p className="text-sm text-slate-500 rounded-xl bg-slate-950/45 border border-slate-800 p-4">
                  Aun no hay errores guardados. El primero sera valioso: registra que paso, causa, solucion y leccion.
                </p>
              ) : (
                errors.map((entry) => (
                  <div key={entry.id} className="rounded-xl bg-slate-950/45 border border-slate-800 p-4">
                    <h4 className="font-black text-white text-sm mb-2">{entry.error}</h4>
                    <p className="text-xs text-slate-400">Causa: {entry.cause || "pendiente"}</p>
                    <p className="text-xs text-slate-400">Solucion: {entry.solution || "pendiente"}</p>
                    <p className="text-xs text-cyan-200 mt-2">Leccion: {entry.lesson || "pendiente"}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
