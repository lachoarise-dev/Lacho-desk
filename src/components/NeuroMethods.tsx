import { motion } from "framer-motion";
import DetoxTracker from "./DetoxTracker";

const methods = [
  { name: "Active Recall", how: "Cierra los apuntes. Intenta recordar. Solo despues comprueba.", why: "Recuperar activa el hipocampo 3x mas que releer. Es la base de toda memoria duradera.", apply: "Despues de cada sesion de estudio, explica lo aprendido sin mirar durante 2 minutos." },
  { name: "Repeticion espaciada", how: "Repasa en intervalos crecientes: 1d, 3d, 7d, 14d, 30d.", why: "La curva del olvido de Ebbinghaus: sin repaso pierdes 70% en 24h. El espaciado la revierte.", apply: "Usa Anki o marca en el calendario cuando debes repasar cada tema." },
  { name: "Interleaving", how: "Alterna materias o temas en la misma sesion. No estudies un solo tema 3 horas.", why: "Mezclar materias mejora la transferencia un 43% frente al estudio en bloque.", apply: "Divide tu sesion en 3 bloques de 25 min con temas diferentes." },
  { name: "Elaboracion", how: "Conecta lo nuevo con lo que ya sabes. Preguntate: por que funciona asi? que pasaria si...?", why: "Las conexiones entre neuronas se refuerzan cuando el cerebro relaciona conceptos.", apply: "Despues de aprender algo, escribe como se conecta con otro tema que ya dominas." },
  { name: "Dual Coding", how: "Combina texto con imagenes, diagramas o mapas mentales.", why: "El cerebro procesa informacion visual y verbal por canales separados. Usar ambos duplica la retencion.", apply: "Para cada tema clave, crea un mapa mental o diagrama ademas del resumen escrito." },
  { name: "Tecnica Feynman", how: "Explica el tema como si se lo enseñaras a un niño de 10 años. Sin jerga.", why: "Si no puedes simplificarlo, no lo entiendes. Las lagunas se hacen visibles al explicar.", apply: "Graba un audio de 2 min explicando el tema del dia en palabras simples." },
  { name: "Chunking", how: "Divide informacion compleja en grupos de 3-5 elementos.", why: "La memoria de trabajo solo retiene 4±1 items. Agrupar permite procesar mas.", apply: "Cuando estudies una lista larga, organizala en categorias de 3-4 items." },
  { name: "Descanso estrategico", how: "Descansa 5-10 min cada 25-50 min de estudio. Sin pantallas.", why: "El default mode network del cerebro consolida informacion durante el descanso.", apply: "Usa Pomodoro 25/5. En el descanso camina, respira o mira por la ventana." },
  { name: "Sleep consolidation", how: "Duerme 7-8h. Repasa brevemente antes de dormir.", why: "Durante el sueño REM la informacion pasa del hipocampo a la neocorteza. Sin sueño no hay memoria.", apply: "Lee tus flashcards 10 min antes de dormir. Duerme minimo 7h." },
  { name: "Testing effect", how: "Hacerte preguntas es mas efectivo que releer. Convierte el estudio en examen.", why: "Los tests activan recuperacion activa + identifican lagunas + generan feedback inmediato.", apply: "Termina cada sesion con 5 preguntas que te hagas a ti mismo sin mirar." },
];

export default function NeuroMethods() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-3">Neurociencia aplicada</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-3" style={{ color: "#ededef" }}>10 métodos de aprendizaje</h2>
          <p className="text-sm text-[#55555a] font-light max-w-md mb-10">Los métodos más efectivos según la investigación en neurociencia cognitiva. Aplicables a veterinaria, código y contenido.</p>
        </motion.div>

        <div className="space-y-3">
          {methods.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="rounded-xl border border-[#1e1e20] overflow-hidden"
            >
              <div className="px-5 py-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[9px] text-[#3a3a3f] font-mono mr-2">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[13px] font-bold" style={{ color: "#ededef" }}>{m.name}</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-[8px] text-[#3a3a3f] mb-1">Cómo</div>
                    <p className="text-[11px] text-[#9ca3af] leading-relaxed">{m.how}</p>
                  </div>
                  <div>
                    <div className="text-[8px] text-[#3a3a3f] mb-1">Por qué funciona</div>
                    <p className="text-[11px] text-[#55555a] leading-relaxed">{m.why}</p>
                  </div>
                  <div>
                    <div className="text-[8px] text-[#3a3a3f] mb-1">Aplica hoy</div>
                    <p className="text-[11px] text-[#55555a] leading-relaxed">{m.apply}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Detox Section ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="mb-2">
            <p className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-1">Higiene digital</p>
            <h3 className="text-xl font-black tracking-[-0.03em]" style={{ color: "#ededef" }}>Detox semanal</h3>
            <p className="text-[11px] text-[#55555a] mt-1 max-w-sm">Pon límites reales a las apps que te roban tiempo. Se reinicia cada semana automáticamente.</p>
          </div>
          <DetoxTracker />
        </motion.div>
      </div>
    </section>
  );
}
