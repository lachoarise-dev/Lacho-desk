import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import type { LachoMode } from "../modes";

/* ─── 100 Prompts ─── */
type PromptCat = { cat: string; forMode: LachoMode | "all"; prompts: string[] };
const promptCategories: PromptCat[] = [
  {
    cat: "HTML y CSS", forMode: "dev",
    prompts: [
      "Crea una estructura HTML semantica para una landing page con hero, features, testimonios y footer.",
      "Explica la diferencia entre display flex y grid con ejemplos practicos.",
      "Genera un layout responsive de 3 columnas que pase a 1 en movil usando solo CSS.",
      "Crea un componente de card reutilizable con imagen, titulo, texto y boton.",
      "Dame 5 formas de centrar un div vertical y horizontalmente.",
      "Crea un formulario de contacto accesible con validacion HTML nativa.",
      "Explica como funciona CSS specificity con ejemplos de conflictos reales.",
      "Genera un menu hamburguesa responsive sin JavaScript.",
    ],
  },
  {
    cat: "Tailwind CSS", forMode: "dev",
    prompts: [
      "Convierte este diseño Figma a Tailwind: [DESCRIPCION]. Solo usa clases utilitarias.",
      "Crea un sistema de colores custom en Tailwind para una marca con tono dorado y oscuro.",
      "Genera un grid responsive de productos con hover effects usando solo Tailwind.",
      "Explica como configurar dark mode en Tailwind con toggle manual.",
      "Crea un componente de pricing table con 3 planes usando Tailwind.",
      "Dame las 20 clases de Tailwind mas usadas y cuando aplicar cada una.",
      "Optimiza este HTML con Tailwind para que sea mas limpio: [PEGA CODIGO].",
    ],
  },
  {
    cat: "JavaScript", forMode: "dev",
    prompts: [
      "Explica closures en JavaScript con 3 ejemplos practicos de uso real.",
      "Crea una funcion que haga debounce para un input de busqueda.",
      "Explica la diferencia entre map, filter y reduce con ejemplos de datos reales.",
      "Crea un sistema simple de pub/sub en JavaScript vanilla.",
      "Explica el event loop con un ejemplo que mezcle setTimeout, Promise y console.log.",
      "Crea una funcion que valide un email, telefono y URL sin regex complicado.",
      "Dame 10 errores comunes de JavaScript para principiantes y como evitarlos.",
      "Crea un localStorage wrapper con get, set, remove y expiracion.",
    ],
  },
  {
    cat: "React", forMode: "dev",
    prompts: [
      "Explica el ciclo de vida de un componente React con hooks como si tuviera 10 años.",
      "Crea un custom hook useLocalStorage que sincronice estado con localStorage.",
      "Explica cuando usar useState vs useReducer con ejemplos concretos.",
      "Crea un componente de lista con filtros, busqueda y paginacion.",
      "Explica como evitar re-renders innecesarios con memo, useMemo y useCallback.",
      "Crea un sistema de rutas protegidas con React Router.",
      "Genera un formulario multi-step con validacion por paso.",
      "Crea un context provider para tema claro/oscuro con persistencia.",
      "Explica la diferencia entre controlled y uncontrolled components.",
      "Crea un componente de drag and drop simple sin librerias.",
    ],
  },
  {
    cat: "TypeScript", forMode: "dev",
    prompts: [
      "Convierte este componente JavaScript a TypeScript con tipos estrictos: [PEGA CODIGO].",
      "Explica generics en TypeScript con 3 ejemplos utiles para React.",
      "Crea tipos para una API REST que devuelve usuarios, posts y comentarios.",
      "Explica la diferencia entre type e interface con casos donde importa.",
      "Crea un type guard para validar respuestas de API en runtime.",
      "Dame 10 utilidades de TypeScript (Partial, Pick, Omit, etc) con ejemplos.",
    ],
  },
  {
    cat: "Backend y APIs", forMode: "dev",
    prompts: [
      "Diseña una API REST para una app de tareas con CRUD completo.",
      "Explica autenticacion con JWT paso a paso para un principiante.",
      "Crea un schema de Supabase para una app con usuarios, proyectos y tareas.",
      "Explica la diferencia entre REST y GraphQL con pros y contras reales.",
      "Crea un middleware de autenticacion basico para Express/Next.",
      "Genera queries SQL para un dashboard de metricas de usuario.",
      "Explica como manejar errores en una API de forma profesional.",
      "Crea un sistema de rate limiting simple para proteger endpoints.",
    ],
  },
  {
    cat: "Deploy y DevOps", forMode: "dev",
    prompts: [
      "Guiame paso a paso para hacer deploy en Vercel desde GitHub.",
      "Explica variables de entorno en frontend vs backend.",
      "Crea un workflow basico de CI/CD con GitHub Actions.",
      "Explica la diferencia entre SSR, SSG, ISR y CSR con ejemplos.",
      "Como configuro un dominio custom en Vercel o Netlify.",
      "Dame un checklist de pre-deploy para asegurar que todo funciona.",
    ],
  },
  {
    cat: "Webs para negocios", forMode: "dev",
    prompts: [
      "Crea una web profesional para una peluqueria local: hero, servicios, galeria, contacto y reservas. Solo HTML/CSS/Tailwind.",
      "Diseña una landing page para un restaurante: menu, horarios, ubicacion con mapa y boton de WhatsApp.",
      "Crea una web para un estudio de tatuajes: portafolio, artistas, formulario de cita y FAQ.",
      "Diseña una pagina de venta para un servicio de limpieza: precios, testimonios, antes/despues y CTA.",
      "Crea una web para un dentista: servicios, equipo, seguros aceptados y boton de cita online.",
      "Diseña un portfolio profesional minimalista con proyectos, sobre mi, contacto y CV descargable.",
      "Crea una web para un gimnasio: planes, horarios, entrenadores y formulario de prueba gratuita.",
      "Diseña una pagina para un abogado: areas de practica, trayectoria, consulta gratuita y testimonios.",
    ],
  },
  {
    cat: "Webs interactivas y 3D", forMode: "dev",
    prompts: [
      "Crea una landing page con animaciones de scroll usando Framer Motion y React.",
      "Diseña una web interactiva con un modelo 3D usando Three.js o React Three Fiber.",
      "Crea un configurador de producto 3D donde el usuario cambie colores y materiales en tiempo real.",
      "Diseña una experiencia de scroll horizontal con transiciones cinematograficas.",
      "Crea una web con parallax 3D usando capas de profundidad y movimiento del mouse.",
      "Diseña una galeria de imagenes con efecto de profundidad y transiciones suaves.",
      "Crea un dashboard interactivo con graficos animados y datos en tiempo real.",
      "Diseña una web tipo portfolio inmersivo con transiciones de pagina completa.",
    ],
  },
  {
    cat: "Desarrollo de apps", forMode: "dev",
    prompts: [
      "Diseña la arquitectura de una app de tareas con React, TypeScript y Supabase. Dame la estructura de carpetas y los tipos.",
      "Crea un sistema de autenticacion completo con login, registro, recuperacion de contraseña y sesion persistente.",
      "Diseña un sistema de notificaciones push para una app web progresiva (PWA).",
      "Crea una app de seguimiento de habitos con calendario, rachas y estadisticas.",
      "Diseña un sistema de pagos con Stripe: checkout, suscripcion y webhook.",
      "Crea una app de chat en tiempo real con Supabase Realtime o Firebase.",
      "Diseña un CMS simple donde el usuario pueda crear, editar y eliminar contenido sin codigo.",
      "Crea una app de gestion de inventario para un negocio pequeño.",
    ],
  },
  {
    cat: "Debugging y optimizacion", forMode: "dev",
    prompts: [
      "Tengo este error en React: [PEGA ERROR]. Explicame la causa probable sin darme el fix directo. Hazme 3 preguntas para que yo lo resuelva.",
      "Mi web tarda 5 segundos en cargar. Dame un checklist de 10 puntos para optimizar rendimiento.",
      "Este componente se re-renderiza 15 veces. Explicame por que y como diagnosticarlo con React DevTools.",
      "Mi formulario pierde el estado al cambiar de tab. Explicame el ciclo de vida del componente y donde esta el bug.",
      "Dame 10 errores comunes de TypeScript con React y como resolverlos sin desactivar tipos.",
      "Mi API devuelve 500 intermitentemente. Dame un protocolo de debugging paso a paso.",
      "Este CSS no aplica en produccion pero si en desarrollo. Explicame las causas posibles.",
      "Mi app funciona en Chrome pero no en Safari. Dame un checklist de compatibilidad.",
    ],
  },
  {
    cat: "Programar sin codigo", forMode: "dev",
    prompts: [
      "Quiero crear una web para [NEGOCIO] sin escribir codigo. Dame las mejores herramientas no-code y un plan paso a paso.",
      "Crea un prompt para que Claude me genere una web completa en HTML/CSS a partir de una descripcion de negocio.",
      "Dame un workflow para crear una app funcional usando solo Cursor, Claude y Supabase sin escribir codigo manual.",
      "Crea un prompt para Gemini que genere un formulario de contacto funcional con validacion y envio por email.",
      "Dame 5 prompts encadenados para que una IA me construya una tienda online completa paso a paso.",
      "Crea un prompt para DeepSeek que debuggee mi codigo: le paso el error, el archivo y el contexto.",
      "Dame un prompt para que Claude actue como pair programmer y me guie sin escribir todo por mi.",
      "Crea un sistema de prompts para generar una web responsive completa desde el diseño hasta el deploy.",
    ],
  },
  {
    cat: "Contenido e Instagram", forMode: "influencer",
    prompts: [
      "Crea 10 hooks para Reels sobre productividad que detengan el scroll en 2 segundos.",
      "Genera un calendario de contenido mensual con 12 posts, 8 stories y 4 Reels.",
      "Escribe 5 guiones de Reel de 15 segundos usando la estructura AIDA.",
      "Crea 10 carruseles educativos sobre habitos, sistemas y organizacion personal.",
      "Dame 20 CTAs diferentes para posts de Instagram que no sean 'link en bio'.",
      "Analiza este post y dime que mejorar en hook, valor y CTA: [PEGA TEXTO].",
      "Crea una bio de Instagram profesional para un creador de contenido sobre sistemas.",
      "Dame 5 ideas de lead magnets para captar emails desde Instagram.",
      "Crea una secuencia de 7 stories para prelanzar un producto digital.",
      "Genera 10 respuestas a objeciones de compra para un ebook digital.",
    ],
  },
  {
    cat: "Marca personal", forMode: "influencer",
    prompts: [
      "Crea un brand kit basico: colores, tipografia, tono y pilares de contenido.",
      "Escribe una historia de marca personal que conecte mi origen con mi producto.",
      "Dame 5 frameworks de storytelling para redes sociales.",
      "Crea un elevator pitch de 30 segundos para mi proyecto Solo System.",
      "Genera una estrategia de colaboraciones con 5 tipos de cuentas compatibles.",
      "Crea una plantilla de propuesta para colaborar con otro creador.",
      "Dame 10 formas de monetizar una audiencia de 1000 seguidores.",
    ],
  },
  {
    cat: "Productividad y IA", forMode: "dev",
    prompts: [
      "Actua como mi coach de productividad. Mi dia tiene estas tareas: [LISTA]. Organizalas por energia.",
      "Crea un sistema de revision semanal con 10 preguntas accionables.",
      "Genera un prompt para que la IA me haga preguntas socraticas sobre [TEMA].",
      "Crea un template de daily standup personal para 3 proyectos simultaneos.",
      "Dame 5 formas de usar Claude/Gemini para aprender mas rapido sin que me de todo hecho.",
      "Crea un sistema de notas tipo Zettelkasten simplificado para principiantes.",
      "Genera un prompt chain de 3 pasos para investigar, resumir y crear contenido sobre [TEMA].",
      "Actua como mentor y hazme preguntas sobre mi progreso esta semana sin darme respuestas.",
      "Crea un framework de decision para elegir entre 3 opciones: [OPCIONES].",
      "Dame 10 prompts para superar bloqueo creativo cuando no se que publicar.",
    ],
  },
  {
    cat: "Anatomia y fisiologia", forMode: "vet",
    prompts: [
      "Explica el sistema digestivo del perro como si se lo enseñaras a un auxiliar novato.",
      "Hazme 10 preguntas de active recall sobre los signos vitales normales en perro y gato.",
      "Crea un caso clinico de un cachorro con vomitos. Incluye preguntas, signos y material a preparar.",
      "Explica las diferencias anatomicas entre perro y gato que un asistente debe conocer.",
      "Dame un glosario de 20 terminos clinicos esenciales con definicion simple y ejemplo.",
      "Crea un mapa mental del sistema respiratorio del perro con las partes que un auxiliar debe identificar.",
      "Simula una situacion donde el tutor describe sintomas vagos. Hazme preguntas para recoger datos correctamente.",
      "Explica el protocolo de toma de temperatura rectal paso a paso para un principiante.",
    ],
  },
  {
    cat: "Protocolos clinicos", forMode: "vet",
    prompts: [
      "Crea un checklist de preparacion de consulta veterinaria para un asistente novato.",
      "Explica el protocolo de limpieza y esterilizacion de instrumental quirurgico.",
      "Dame los pasos para preparar un quirofano antes de una cirugia de esterilizacion.",
      "Crea un protocolo de recepcion de paciente de urgencia: que hacer en los primeros 5 minutos.",
      "Explica como preparar y etiquetar muestras de sangre, orina y heces correctamente.",
      "Dame un checklist de cierre de clinica al final del dia.",
      "Simula una entrevista de trabajo como asistente veterinario en España. Hazme las preguntas tipicas.",
      "Crea un guion para explicar cuidados postoperatorios a un tutor nervioso.",
    ],
  },
  {
    cat: "Casos clinicos complejos", forMode: "vet",
    prompts: [
      "Crea un caso clinico complejo de un perro con politraumatismo: datos del tutor, signos, prioridades, material y actuacion del asistente.",
      "Simula un caso de intoxicacion por chocolate en cachorro: anamnesis, signos de alerta, protocolo de urgencia y que NO hacer.",
      "Crea un caso de gato con obstruccion urinaria: sintomas que describe el tutor, signos observables, material a preparar y seguimiento.",
      "Simula un caso de perra gestante con distocia: preguntas al tutor, preparacion de quirofano y protocolo de asistencia.",
      "Crea un caso de perro con convulsiones en sala de espera: prioridades inmediatas, seguridad y comunicacion con el veterinario.",
      "Simula un caso de gato con dificultad respiratoria aguda: que observar, que medir, que preparar sin diagnosticar.",
      "Crea un caso de cachorro con parvovirosis sospechada: aislamiento, bioseguridad, material y registro.",
      "Simula un caso de perro geriatrico con masa abdominal: recogida de datos, preparacion de ecografia y apoyo al tutor.",
    ],
  },
  {
    cat: "Tests de nivelacion", forMode: "vet",
    prompts: [
      "Crea un test de 20 preguntas tipo examen sobre anatomia basica del perro y gato para un asistente veterinario.",
      "Genera un test de 15 preguntas sobre protocolos de higiene y bioseguridad en clinica veterinaria.",
      "Crea un examen de 20 preguntas sobre farmacologia basica: vias de administracion, almacenamiento y farmacos comunes.",
      "Genera un test de 15 preguntas sobre tecnicas de sujecion animal para diferentes especies y temperamentos.",
      "Crea un examen de 20 preguntas sobre laboratorio clinico: tipos de muestras, etiquetado y pruebas basicas.",
      "Genera un test de 15 preguntas sobre comunicacion con tutores: situaciones dificiles, limites del asistente y empatia.",
      "Crea un examen completo de 25 preguntas que cubra recepcion, consulta, hospitalizacion y quirofano.",
      "Genera un test de nivelacion final de 30 preguntas mezclando todos los temas del curso IPS para simular un examen real.",
    ],
  },
  {
    cat: "Preparacion para practicas", forMode: "vet",
    prompts: [
      "Crea una guia completa de que esperar el primer dia de practicas en una clinica veterinaria en España.",
      "Genera un checklist de habilidades que debo demostrar en las practicas para conseguir una recomendacion.",
      "Simula 5 situaciones incomodas que pueden pasar en practicas y como manejarlas profesionalmente.",
      "Crea un protocolo de primer dia: como presentarme, que preguntar, que observar y que NO hacer.",
      "Genera una lista de 10 preguntas inteligentes para hacerle al veterinario durante las practicas.",
      "Crea un diario de practicas tipo plantilla: fecha, area, habilidad practicada, feedback recibido, mejora.",
      "Simula una evaluacion de practicas donde el veterinario me da feedback. Que respondo a cada punto.",
      "Genera un plan de accion para convertir 1 mes de practicas gratuitas en una oferta de trabajo real.",
    ],
  },
  {
    cat: "Ventas y embudos", forMode: "influencer",
    prompts: [
      "Diseña un embudo de ventas completo para un ebook digital: desde el primer contacto hasta la compra.",
      "Crea 5 secuencias de email para nutrir leads que descargaron un recurso gratuito.",
      "Dame 10 formas de crear urgencia real sin mentir sobre stock o tiempo.",
      "Crea una pagina de ventas en texto para mi ebook con estructura: problema, agitacion, solucion.",
      "Genera 5 tipos de bonus que puedo añadir al ebook para aumentar el valor percibido.",
      "Dame un script para hacer un directo de ventas de 15 minutos sin sonar a vendedor.",
      "Crea 10 respuestas a la objecion 'es muy caro' para un producto de 15-30 euros.",
      "Diseña un reto gratuito de 5 dias que termine con una oferta de mi ebook.",
    ],
  },
  {
    cat: "Crecimiento en redes", forMode: "influencer",
    prompts: [
      "Analiza mi perfil de Instagram: [URL]. Dime 5 cosas que mejoraria un experto en growth.",
      "Crea un plan de crecimiento de 0 a 1000 seguidores reales en 90 dias.",
      "Dame 10 formatos de contenido que funcionan para cuentas pequeñas.",
      "Genera un calendario semanal de contenido con la regla 3-2-1: 3 valor, 2 conexion, 1 venta.",
      "Crea 5 estrategias para conseguir colaboraciones cuando tienes menos de 500 seguidores.",
      "Dame un framework para analizar por que un Reel funciono o no funciono.",
      "Crea 10 ideas de stories interactivas que generen respuestas y engagement.",
      "Diseña una estrategia de hashtags para una cuenta de productividad y sistemas.",
    ],
  },
];

// totalPrompts calculated per instance in component

/* ─── Saved Links ─── */
type SavedLink = { id: number; title: string; url: string; category: string };

const loadLinks = (): SavedLink[] => {
  try { const r = localStorage.getItem("lacho-saved-links"); return r ? JSON.parse(r) : []; }
  catch { return []; }
};

const defaultCategories = ["Trabajo", "Estudio", "Herramientas", "Referencia", "Otro"];

type Props = { mode?: LachoMode };

export default function ResourcesAndLinks({ mode }: Props) {
  const visiblePrompts = mode
    ? promptCategories.filter((c) => c.forMode === "all" || c.forMode === mode)
    : promptCategories;
  const visibleTotal = visiblePrompts.reduce((s, c) => s + c.prompts.length, 0);

  const [tab, setTab] = useState<"prompts" | "links">("prompts");
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  // Links state
  const [links, setLinks] = useState<SavedLink[]>(loadLinks);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", url: "", category: "Herramientas" });
  const [filterCat, setFilterCat] = useState("all");

  useEffect(() => {
    localStorage.setItem("lacho-saved-links", JSON.stringify(links));
  }, [links]);

  const copyPrompt = async (index: number, text: string) => {
    try { await navigator.clipboard.writeText(text); } catch { /* fallback */ }
    setCopied(index);
    setTimeout(() => setCopied(null), 1200);
  };

  const addLink = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;
    let url = form.url.trim();
    if (!url.startsWith("http")) url = "https://" + url;
    setLinks((prev) => [{ id: Date.now(), title: form.title.trim(), url, category: form.category }, ...prev]);
    setForm({ title: "", url: "", category: "Herramientas" });
    setShowForm(false);
  };

  const removeLink = (id: number) => setLinks((prev) => prev.filter((l) => l.id !== id));

  const usedCategories = [...new Set(links.map((l) => l.category))];
  const filteredLinks = filterCat === "all" ? links : links.filter((l) => l.category === filterCat);

  return (
    <section id="recursos" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-[10px] tracking-[0.1em] text-zinc-600 font-medium mb-3">Recursos</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-zinc-100 mb-4">Prompts y links</h2>
          <p className="text-base text-zinc-500 font-light max-w-lg mb-8">
            {visibleTotal} prompts listos para copiar y un espacio para guardar tus links de acceso diario.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: "prompts" as const, label: `Prompts (${visibleTotal})` },
            { id: "links" as const, label: `Mis links (${links.length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-all duration-300 ${
                tab === t.id ? "bg-zinc-200 text-zinc-950" : "text-zinc-600 hover:text-zinc-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ─── PROMPTS TAB ─── */}
        {tab === "prompts" && (
          <div className="space-y-2">
            {visiblePrompts.map((cat) => {
              const isOpen = openCat === cat.cat;
              return (
                <div key={cat.cat} className="rounded-2xl border border-zinc-800/30 overflow-hidden">
                  <button
                    onClick={() => setOpenCat(isOpen ? null : cat.cat)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-zinc-900/30 transition-colors duration-300"
                  >
                    <div>
                      <span className="text-sm font-bold text-zinc-200">{cat.cat}</span>
                      <span className="text-xs text-zinc-600 ml-3">{cat.prompts.length} prompts</span>
                    </div>
                    <span className="text-zinc-600 text-sm">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-zinc-800/20"
                    >
                      {cat.prompts.map((prompt, i) => {
                        const globalIdx = visiblePrompts.slice(0, visiblePrompts.indexOf(cat)).reduce((s, c) => s + c.prompts.length, 0) + i;
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-4 px-6 py-3.5 border-b border-zinc-800/10 last:border-b-0 hover:bg-zinc-900/20 transition-colors duration-300"
                          >
                            <span className="text-[10px] text-zinc-700 font-mono w-6 flex-shrink-0 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                            <p className="flex-1 text-sm text-zinc-400 leading-relaxed">{prompt}</p>
                            <button
                              onClick={() => copyPrompt(globalIdx, prompt)}
                              className={`flex-shrink-0 text-[10px] font-medium transition-colors duration-300 ${
                                copied === globalIdx ? "text-zinc-200" : "text-zinc-700 hover:text-zinc-300"
                              }`}
                            >
                              {copied === globalIdx ? "✓" : "copiar"}
                            </button>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ─── LINKS TAB ─── */}
        {tab === "links" && (
          <div>
            {/* Add link */}
            {showForm ? (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={addLink}
                className="rounded-2xl border border-zinc-800/30 p-6 mb-6"
              >
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  <input
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Nombre del link"
                    className="rounded-lg bg-zinc-900/50 border border-zinc-800/30 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600"
                  />
                  <input
                    value={form.url}
                    onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                    placeholder="URL (ej: vercel.com)"
                    className="rounded-lg bg-zinc-900/50 border border-zinc-800/30 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600"
                  />
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="rounded-lg bg-zinc-900/50 border border-zinc-800/30 px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-600"
                  >
                    {defaultCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="rounded-lg bg-zinc-200 text-zinc-950 px-4 py-2 text-[11px] font-semibold hover:bg-zinc-100 transition-colors">Guardar</button>
                  <button type="button" onClick={() => setShowForm(false)} className="rounded-lg text-zinc-600 px-4 py-2 text-[11px] font-medium hover:text-zinc-300 transition-colors">Cancelar</button>
                </div>
              </motion.form>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="w-full rounded-2xl border border-dashed border-zinc-800/40 py-4 text-[11px] text-zinc-600 hover:text-zinc-300 hover:border-zinc-600/40 transition-colors duration-300 mb-6"
              >
                + Añadir link
              </button>
            )}

            {/* Filter */}
            {links.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap">
                <button
                  onClick={() => setFilterCat("all")}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors duration-300 ${
                    filterCat === "all" ? "bg-zinc-200 text-zinc-950" : "text-zinc-600 hover:text-zinc-300"
                  }`}
                >
                  Todos ({links.length})
                </button>
                {usedCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilterCat(c)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors duration-300 ${
                      filterCat === c ? "bg-zinc-200 text-zinc-950" : "text-zinc-600 hover:text-zinc-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* Links list */}
            {filteredLinks.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800/30 p-8 text-center">
                <p className="text-zinc-600 text-sm">Aún no hay links guardados. Añade los que uses a diario.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-800/30 overflow-hidden">
                {filteredLinks.map((link) => (
                  <div key={link.id} className="flex items-center gap-4 px-6 py-3.5 border-b border-zinc-800/10 last:border-b-0 hover:bg-zinc-900/20 transition-colors duration-300 group">
                    <div className="flex-1 min-w-0">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors truncate block"
                      >
                        {link.title}
                      </a>
                      <span className="text-[10px] text-zinc-700 truncate block">{link.url}</span>
                    </div>
                    <span className="text-[9px] text-zinc-700 font-medium flex-shrink-0">{link.category}</span>
                    <button
                      onClick={() => removeLink(link.id)}
                      className="opacity-0 group-hover:opacity-100 text-zinc-700 hover:text-zinc-300 text-xs transition-all flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
