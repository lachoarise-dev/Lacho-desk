import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LachoMode } from "../modes";

type Skill = { name: string; desc: string; tier: number; requires?: string };
type Tree = { id: string; title: string; icon: string; tiers: string[]; skills: Skill[]; forMode: LachoMode };

const trees: Tree[] = [
  {
    id: "code", title: "Programación", icon: "💻", forMode: "dev",
    tiers: ["Novato", "Aprendiz", "Builder", "Developer", "Profesional"],
    skills: [
      { name: "HTML estructura", desc: "Etiquetas semanticas, head, body, secciones y formularios basicos.", tier: 0 },
      { name: "CSS layout", desc: "Flexbox, Grid, responsive media queries y unidades relativas.", tier: 0 },
      { name: "Tailwind CSS", desc: "Clases utilitarias, diseño rapido, temas y responsive sin CSS manual.", tier: 0, requires: "CSS layout" },
      { name: "Git basico", desc: "init, add, commit, push, pull y GitHub como portafolio.", tier: 0 },
      { name: "JS variables y tipos", desc: "let/const, strings, numbers, booleans, arrays y objetos.", tier: 1, requires: "HTML estructura" },
      { name: "JS funciones", desc: "Declaracion, parametros, return, arrow functions y scope.", tier: 1, requires: "JS variables y tipos" },
      { name: "JS DOM", desc: "querySelector, eventos, manipular texto/clases y formularios.", tier: 1, requires: "JS funciones" },
      { name: "JS arrays avanzado", desc: "map, filter, reduce, find, spread y destructuring.", tier: 1, requires: "JS funciones" },
      { name: "React componentes", desc: "JSX, props, composicion, children y estructura de proyecto.", tier: 2, requires: "JS DOM" },
      { name: "React estado", desc: "useState, eventos, renderizado condicional y listas.", tier: 2, requires: "React componentes" },
      { name: "React efectos", desc: "useEffect, ciclo de vida, fetch de datos y cleanup.", tier: 2, requires: "React estado" },
      { name: "localStorage", desc: "Guardar y recuperar datos, serializar JSON y persistencia.", tier: 2, requires: "React estado" },
      { name: "TypeScript", desc: "Tipos basicos, interfaces, generics y tipado de props.", tier: 3, requires: "React efectos" },
      { name: "Formularios avanzados", desc: "Validacion, controlled inputs, errores y submit.", tier: 3, requires: "TypeScript" },
      { name: "API y fetch", desc: "REST, async/await, manejo de errores y estados de carga.", tier: 3, requires: "React efectos" },
      { name: "Routing", desc: "React Router, navegacion SPA, rutas dinamicas y protegidas.", tier: 3, requires: "React componentes" },
      { name: "Backend basico", desc: "Supabase o Firebase: auth, base de datos y reglas.", tier: 4, requires: "API y fetch" },
      { name: "Deploy", desc: "Vercel/Netlify, dominio, variables de entorno y CI/CD.", tier: 4, requires: "Backend basico" },
      { name: "Testing", desc: "Vitest, testing-library, tests unitarios y de integracion.", tier: 4, requires: "TypeScript" },
      { name: "Arquitectura", desc: "Patrones, separacion de capas, estado global y escalabilidad.", tier: 4, requires: "Deploy" },
    ],
  },
  {
    id: "vet", title: "Veterinaria", icon: "🩺", forMode: "vet",
    tiers: ["Novato", "Estudiante", "Auxiliar", "Asistente", "Profesional"],
    skills: [
      { name: "Anatomia basica", desc: "Sistemas principales: digestivo, respiratorio, musculoesqueletico.", tier: 0 },
      { name: "Razas y especies", desc: "Razas comunes perro/gato, temperamento y necesidades basicas.", tier: 0 },
      { name: "Terminologia clinica", desc: "Glosario de 100 terminos: signos, procedimientos y farmacos.", tier: 0 },
      { name: "Higiene y bioseguridad", desc: "Lavado, EPIs, desinfeccion, residuos y protocolos.", tier: 0 },
      { name: "Sujecion animal", desc: "Tecnicas seguras para perro, gato y exoticos sin daño.", tier: 1, requires: "Razas y especies" },
      { name: "Signos vitales", desc: "Temperatura, frecuencia cardiaca, respiratoria y mucosas.", tier: 1, requires: "Anatomia basica" },
      { name: "Historia clinica", desc: "Recoger datos del tutor, motivo, vacunas y alergias.", tier: 1, requires: "Terminologia clinica" },
      { name: "Material de consulta", desc: "Preparar mesa, instrumental, guantes y formularios.", tier: 1, requires: "Higiene y bioseguridad" },
      { name: "Recepcion clinica", desc: "Atencion al tutor, agenda, cobro y comunicacion empatica.", tier: 2, requires: "Historia clinica" },
      { name: "Toma de muestras", desc: "Sangre, orina, heces: preparar material y etiquetar.", tier: 2, requires: "Material de consulta" },
      { name: "Laboratorio basico", desc: "Tiras reactivas, centrifugado, frotis y registro.", tier: 2, requires: "Toma de muestras" },
      { name: "Hospitalizacion", desc: "Jaulas, alimentacion, medicacion supervisada y seguimiento.", tier: 2, requires: "Signos vitales" },
      { name: "Preparacion quirofano", desc: "Esterilizacion, mesa, material e instrumental.", tier: 3, requires: "Laboratorio basico" },
      { name: "Asistencia anestesia", desc: "Preanestesia, monitorizacion basica y recuperacion.", tier: 3, requires: "Preparacion quirofano" },
      { name: "Farmacia basica", desc: "Dispensacion supervisada, almacenamiento y caducidad.", tier: 3, requires: "Hospitalizacion" },
      { name: "Comunicacion tutor", desc: "Explicar cuidados postop, medicacion y seguimiento.", tier: 3, requires: "Recepcion clinica" },
      { name: "Urgencias basicas", desc: "Priorizar, estabilizar, material y comunicar al vet.", tier: 4, requires: "Asistencia anestesia" },
      { name: "Gestion clinica", desc: "Stock, pedidos, agenda y protocolo de apertura/cierre.", tier: 4, requires: "Farmacia basica" },
      { name: "Entrevista laboral", desc: "CV, presentacion, fortalezas y disponibilidad en España.", tier: 4, requires: "Comunicacion tutor" },
      { name: "Formacion continua", desc: "Congresos, cursos online, homologacion y plan de carrera.", tier: 4, requires: "Entrevista laboral" },
    ],
  },
  {
    id: "brand", title: "Marca personal", icon: "📸", forMode: "influencer",
    tiers: ["Novato", "Creador", "Estratega", "Influencer", "Profesional"],
    skills: [
      { name: "Perfil IG optimizado", desc: "Bio clara, foto, link, highlights y 9 posts base.", tier: 0 },
      { name: "Canva basico", desc: "Plantillas, colores de marca, tipografia y formatos.", tier: 0 },
      { name: "Storytelling personal", desc: "Tu historia: Cuba, España, veterinaria y Solo System.", tier: 0 },
      { name: "Copywriting hooks", desc: "Primeras lineas que detienen scroll en 2 segundos.", tier: 0 },
      { name: "Reels produccion", desc: "CapCut, transiciones, musica, texto y ritmo de 15-30s.", tier: 1, requires: "Canva basico" },
      { name: "Carruseles educativos", desc: "5-10 slides con idea clara, progresion y CTA final.", tier: 1, requires: "Copywriting hooks" },
      { name: "Hashtags y SEO IG", desc: "Investigar, mezclar volumen y nicho, bio keywords.", tier: 1, requires: "Perfil IG optimizado" },
      { name: "Stories engagement", desc: "Encuestas, preguntas, countdowns y behind the scenes.", tier: 1, requires: "Storytelling personal" },
      { name: "Landing con codigo", desc: "Crear tu propia landing en React/HTML para el ebook.", tier: 2, requires: "Reels produccion" },
      { name: "Email/waitlist", desc: "Capturar emails con lead magnet y secuencia basica.", tier: 2, requires: "Landing con codigo" },
      { name: "Metricas e iteracion", desc: "Leer alcance, retencion, guardados y optimizar.", tier: 2, requires: "Carruseles educativos" },
      { name: "Contenido pilar", desc: "6 pilares definidos con calendario mensual repetible.", tier: 2, requires: "Stories engagement" },
      { name: "Embudo de ventas", desc: "Atraer, educar, conectar, convertir y retener.", tier: 3, requires: "Email/waitlist" },
      { name: "Avatar interactivo", desc: "Demo publica del avatar como diferenciador de marca.", tier: 3, requires: "Landing con codigo" },
      { name: "Colaboraciones", desc: "Contactar cuentas afines, propuesta y cross-promotion.", tier: 3, requires: "Metricas e iteracion" },
      { name: "Comunidad activa", desc: "Retos semanales, directos, respuestas y conexion real.", tier: 3, requires: "Contenido pilar" },
      { name: "Producto 2.0", desc: "Ebook v2 + plantillas + comunidad premium.", tier: 4, requires: "Embudo de ventas" },
      { name: "Automatizacion", desc: "Respuestas auto, programacion y secuencias de email.", tier: 4, requires: "Colaboraciones" },
      { name: "Monetizacion multiple", desc: "Ebook + afiliados + servicios + comunidad pagada.", tier: 4, requires: "Producto 2.0" },
      { name: "Marca personal solida", desc: "Autoridad reconocida, ingresos pasivos y sistema replicable.", tier: 4, requires: "Automatizacion" },
    ],
  },
];

const loadUnlocked = (): Record<string, boolean> => {
  try { const r = localStorage.getItem("lacho-skill-tree"); return r ? JSON.parse(r) : {}; }
  catch { return {}; }
};

type Props = { mode?: LachoMode };

export default function SkillTree({ mode }: Props) {
  const filtered = mode ? trees.filter((t) => t.forMode === mode) : trees;
  const [activeIdx, setActiveIdx] = useState(0);
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>(loadUnlocked);

  useEffect(() => { localStorage.setItem("lacho-skill-tree", JSON.stringify(unlocked)); }, [unlocked]);

  const tree = filtered[activeIdx] || filtered[0];
  if (!tree) return null;
  const k = (treeId: string, skillName: string) => `${treeId}-${skillName}`;
  const isUnlockable = (skill: Skill) => !skill.requires || !!unlocked[k(tree.id, skill.requires)];
  const toggle = (skill: Skill) => {
    const key = k(tree.id, skill.name);
    if (unlocked[key]) { setUnlocked((u) => { const n = { ...u }; delete n[key]; return n; }); }
    else if (isUnlockable(skill)) { setUnlocked((u) => ({ ...u, [key]: true })); }
  };

  const total = tree.skills.length;
  const done = tree.skills.filter((s) => unlocked[k(tree.id, s.name)]).length;
  const pct = Math.round((done / total) * 100);

  return (
    <section id="skill-tree" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-[10px] tracking-[0.1em] text-zinc-600 font-medium mb-3">Habilidades</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-zinc-100 mb-4">Árbol de {tree.title.toLowerCase()}</h2>
          <p className="text-base text-zinc-500 font-light max-w-lg mb-8">De novato a profesional. Desbloquea en orden.</p>
        </motion.div>

        {filtered.length > 1 && (
          <div className="flex gap-2 mb-8">
            {filtered.map((t, i) => (
              <button key={t.id} onClick={() => setActiveIdx(i)} className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-all duration-300 ${activeIdx === i ? "bg-zinc-200 text-zinc-950" : "text-zinc-600 hover:text-zinc-300"}`}>
                {t.icon} {t.title}
              </button>
            ))}
          </div>
        )}

        {/* Progress */}
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{tree.icon}</span>
              <div>
                <div className="text-base font-bold text-zinc-100">{tree.title}</div>
                <div className="text-xs text-zinc-600">{done}/{total} · {tree.tiers[Math.min(4, Math.floor(done / 4))]}</div>
              </div>
            </div>
            <span className="text-xl font-black font-mono accent">{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-[#2a2a2a] overflow-hidden">
            <motion.div className="h-full rounded-full" animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} style={{ backgroundColor: "#3a3a3d" }} />
          </div>
        </div>

        {/* Tiers */}
        <div className="space-y-6">
          {tree.tiers.map((tierName, tierIndex) => {
            const tierSkills = tree.skills.filter((s) => s.tier === tierIndex);
            if (!tierSkills.length) return null;
            return (
              <div key={tierName}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono text-zinc-700">T{tierIndex + 1}</span>
                  <span className="text-sm font-bold text-zinc-300">{tierName}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {tierSkills.map((skill) => {
                    const sk = k(tree.id, skill.name);
                    const isDone = !!unlocked[sk];
                    const canDo = isUnlockable(skill);
                    const isLocked = !isDone && !canDo;
                    return (
                      <button key={skill.name} onClick={() => toggle(skill)} disabled={isLocked}
                        className={`rounded-xl border p-4 text-left transition-all duration-300 ${isDone ? "border-[#3a3a3d]" : isLocked ? "border-[#2a2a2a]/40 opacity-30 cursor-not-allowed" : "border-[#2a2a2a] hover:border-[#3a3a3d] cursor-pointer"}`}
                      >
                        <span className={`text-[9px] font-medium ${isDone ? "accent" : "text-zinc-700"}`} style={isDone ? { color: "var(--accent)" } : undefined}>
                          {isDone ? "✓ Hecho" : isLocked ? "Bloqueado" : "Disponible"}
                        </span>
                        <div className={`text-sm font-medium mt-1 ${isDone ? "text-zinc-200" : "text-zinc-400"}`}>{skill.name}</div>
                        <p className="text-[10px] text-zinc-600 mt-1 leading-snug">{skill.desc}</p>
                        {skill.requires && <p className="text-[9px] text-zinc-700 mt-1.5">← {skill.requires}</p>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
