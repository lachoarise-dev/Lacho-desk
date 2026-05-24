import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ─── helpers ─── */
const loadJSON = <T,>(key: string, fallback: T): T => {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; }
  catch { return fallback; }
};
const saveJSON = (key: string, v: unknown) => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {/**/} };

/* ─── types ─── */
type DreamArea = {
  id: string;
  icon: string;
  title: string;
  hex: string;
  vision: string;
  identity: string;
  beliefs: string[];
  visualizations: { title: string; script: string }[];
  exercises: { name: string; how: string; when: string; why: string }[];
};

/* ─── data ─── */
const areas: DreamArea[] = [
  {
    id: "vet",
    icon: "🩺",
    title: "Asistente veterinario",
    hex: "#10b981",
    vision: "Trabajo fijo en una clinica de Jaen. Me conocen como el cubano que no falla. Abro por la mañana, preparo consultas, asisto cirugias y los tutores me piden por nombre. Estoy homologando mi carrera mientras trabajo.",
    identity: "Soy un profesional de la salud animal que empezo desde cero en España y se gano cada oportunidad con disciplina y humanidad.",
    beliefs: [
      "Aprender veterinaria en España es posible aunque venga de otro sistema.",
      "Cada dia de practicas me acerca mas al contrato que necesito.",
      "Mi acento es diferente, pero mi compromiso es el mismo que el de cualquier profesional aqui.",
      "Puedo estudiar, practicar y trabajar al mismo tiempo si organizo bien mi energia.",
    ],
    visualizations: [
      {
        title: "Primer dia de trabajo",
        script: "Cierro los ojos. Llego a la clinica 15 minutos antes. Abro la puerta, enciendo las luces, preparo las jaulas. El veterinario llega y me dice 'buenos dias, Lacho'. Reviso la agenda del dia, peso al primer paciente, calmo al tutor nervioso. Todo fluye porque practique esto cientos de veces en mi mente.",
      },
      {
        title: "Asistiendo una cirugia",
        script: "El quirofano esta listo porque yo lo prepare. Material esteril, mesa ordenada, temperatura correcta. El veterinario opera y yo monitorizo. El gato respira estable. Cuando termina, llevo al paciente a recuperacion, registro todo y limpio. Soy parte del equipo.",
      },
      {
        title: "Recibiendo mi primer contrato",
        script: "Me siento frente al escritorio del director. Me dice que estan contentos con mi trabajo. Firma el contrato. Leo mi nombre: Lacho. Asistente veterinario. Contrato indefinido. Lo guardo. Lo fotografío. Se lo envio a mi familia. Este papel dice que lo logre.",
      },
    ],
    exercises: [
      { name: "Visualizacion matutina", how: "3 minutos con ojos cerrados. Imagina tu dia ideal en la clinica con todos los sentidos: olor a desinfectante, sonido de la agenda, peso del animal en tus manos.", when: "Despues del journal, antes de calistenia.", why: "Neuroplasticidad: el cerebro no distingue una visualizacion vivida de la experiencia real. Activa las mismas redes neuronales." },
      { name: "Simulacion de caso en voz alta", how: "Elige un caso clinico del sistema. Resuelvelo hablando en voz alta como si estuvieras en consulta real. Usa lenguaje profesional.", when: "Despues de estudiar veterinaria, 5 minutos.", why: "Ensayo mental + output verbal refuerza memoria motora y reduce ansiedad de ejecucion." },
      { name: "Carta al Lacho veterinario", how: "Escribe 10 lineas a tu yo de dentro de 6 meses que ya tiene trabajo. Describe como se siente, que hace en un dia normal y que consejo te da.", when: "Domingo, durante la revision semanal.", why: "Proyeccion de identidad futura: le das al cerebro un destino concreto al que dirigirse." },
    ],
  },
  {
    id: "ebook",
    icon: "📕",
    title: "Creador Solo System",
    hex: "#22d3ee",
    vision: "Mi comunidad crece cada semana. Los DMs son de gente que aplico mi sistema y me cuentan sus progresos. El ebook se vende solo porque el contenido gratuito demuestra que funciona. Tengo 3 fuentes de ingreso digitales y no dependo de un solo canal.",
    identity: "Soy el creador de Solo System: un metodo real para convertir tu vida en un RPG sin motivacion toxica. Mi historia de Cuba a España es la prueba de que el sistema funciona.",
    beliefs: [
      "Mi historia personal es mi mejor contenido.",
      "No necesito ser perfecto para publicar, necesito ser util.",
      "Cada Reel es un experimento, no un examen.",
      "La constancia en redes crea autoridad que el talento solo no puede.",
    ],
    visualizations: [
      {
        title: "Primer mensaje de compra",
        script: "Abro el movil. Notificacion de Gumroad: 'Alguien compro Solo System'. Leo el nombre. Es una persona real que confio en mi trabajo. Le escribo un DM: 'Gracias, cualquier duda aqui estoy'. Responde: 'Ya empece con la primera quest'. Sonrio. Funciona.",
      },
      {
        title: "Directo con 50 personas",
        script: "Abro el directo. Hay 12 personas esperando. Empiezo explicando como funciona el sistema de quests. Las preguntas llegan. Respondo con calma. Alguien dice 'esto es justo lo que necesitaba'. Termino el directo con 50 personas y 8 mensajes nuevos. Guardo el replay.",
      },
      {
        title: "Milestone: 1000 seguidores reales",
        script: "Abro Instagram. 1.003 seguidores. No comprados, no bots. Gente que comenta, guarda posts, responde stories. Publico una story: 'Gracias por los primeros 1000. Esto no es un numero, es una comunidad'. Los corazones llegan. Grabo un Reel celebrando.",
      },
    ],
    exercises: [
      { name: "Visualizacion del feed ideal", how: "Dibuja o imagina tu feed de Instagram con 9 posts. Que colores tiene, que tipo de contenido, que dice tu bio. Sientelo como si ya existiera.", when: "Lunes al empezar el bloque de ebook.", why: "Pre-activacion de metas: cuando el cerebro ve el destino, filtra informacion relevante automaticamente (Sistema Reticular Activador)." },
      { name: "Grabacion sin editar", how: "Graba un Reel de 15 segundos hablando de Solo System SIN editar. Publicalo tal cual. El objetivo es romper el perfeccionismo.", when: "1 vez por semana como minimo.", why: "Exposicion gradual: cada publicacion imperfecta reduce la amigdala (centro del miedo) y normaliza la accion." },
      { name: "Diario de experimentos", how: "Despues de cada contenido publicado, escribe: Hipotesis → Resultado → Leccion en 3 lineas. Acumula 30 entradas.", when: "Inmediatamente despues de revisar metricas (24-48h post).", why: "Metacognicion: reflexionar sobre tu propio proceso multiplica la velocidad de aprendizaje." },
    ],
  },
  {
    id: "code",
    icon: "💻",
    title: "Programador web",
    hex: "#8b5cf6",
    vision: "Puedo crear cualquier web o app que imagine desde mi movil con Termux. Entiendo React, TypeScript y backend basico. Mi portafolio tiene 5 proyectos reales y la app Solo System ya la usan personas. Las empresas o clientes ven mi GitHub y dicen 'este sabe construir'.",
    identity: "Soy un programador autodidacta que aprendio con IA y proyectos reales. No vengo de una universidad de informatica, vengo de resolver problemas cada dia.",
    beliefs: [
      "No necesito un titulo para ser programador, necesito proyectos que funcionen.",
      "Cada error que documento me acerca al dominio.",
      "La IA no me reemplaza, me amplifica. Yo dirijo, ella ejecuta.",
      "Programar desde el movil no es una limitacion, es mi superpoder creativo.",
    ],
    visualizations: [
      {
        title: "App Solo System publicada",
        script: "Abro el navegador. Tecleo solosystem.app. Carga MI aplicacion. Los botones funcionan, las tareas se guardan, el progreso sube. Le paso el link a alguien. Me dice 'esto es increible, lo hiciste tu?'. Respondo: 'desde un movil con Termux'. No lo puede creer.",
      },
      {
        title: "Primer cliente de desarrollo web",
        script: "Me escribe alguien que vio el estudio fotografico de mi hermana. 'Quiero una web asi para mi negocio. Cuanto cobras?'. Abro un documento. Escribo presupuesto, tiempos y entregables. Envio. Acepta. Mi primera venta como programador.",
      },
      {
        title: "Debugging like a pro",
        script: "La app falla. No entro en panico. Abro la consola. Leo el error. Busco la linea. Entiendo que paso. Lo corrijo en 10 minutos. Hago commit: 'fix: resolved state issue on quest completion'. Sonrio. Hace 6 meses no sabia que era un commit.",
      },
    ],
    exercises: [
      { name: "Visualizacion del deploy", how: "Imagina tu app cargando en un navegador real con URL propia. Navega mentalmente por las secciones. Siente la satisfaccion de que funciona.", when: "Antes de empezar el bloque de programacion.", why: "Anticipacion de recompensa: libera dopamina anticipatoria que sostiene la motivacion durante el esfuerzo." },
      { name: "Pseudocodigo verbal", how: "Antes de escribir codigo, explica en voz alta que quieres construir y los pasos. Solo DESPUES abre el editor.", when: "Al inicio de cada sesion de codigo.", why: "Planning prefrontal: obligar al cerebro a planificar antes de ejecutar reduce errores un 40%." },
      { name: "Bitacora de victorias", how: "Al final de cada sesion anota 1 cosa que FUNCIONO que antes no sabias hacer. Aunque sea minima.", when: "Ultimos 5 minutos del bloque de codigo.", why: "Evidencia acumulada de progreso previene el sindrome del impostor y refuerza identidad de builder." },
    ],
  },
  {
    id: "body",
    icon: "💪",
    title: "Calistenia y salud",
    hex: "#f97316",
    vision: "Mi cuerpo es mi herramienta principal. Hago muscle-ups, handstands y domino mi peso corporal. Duermo bien, como bien y tengo energia para mis 3 proyectos porque mi base fisica es solida. La gente me pregunta como tengo tanta energia y la respuesta siempre es: disciplina fisica.",
    identity: "Soy alguien que entrena con su propio cuerpo cada dia no por vanidad, sino porque la fuerza fisica alimenta la fuerza mental.",
    beliefs: [
      "El entrenamiento no compite con mis proyectos, los potencia.",
      "90 minutos de calistenia son una inversion, no un gasto de tiempo.",
      "Mi cuerpo necesita progresion igual que mi codigo: paso a paso.",
      "La salud es el unico proyecto que no puedo pausar.",
    ],
    visualizations: [
      {
        title: "Primer muscle-up limpio",
        script: "Agarro la barra. Respiro. Tiro con fuerza y transiciono arriba. Mis brazos se extienden. Estoy ENCIMA de la barra. La gente en el parque mira. Bajo controlado. Hago otro. Ya no es un sueño, es un movimiento que domine.",
      },
      {
        title: "Rutina fluida de mañana",
        script: "Me despierto a las 7:30. Bebo agua. Journal. Salgo al parque. Mi cuerpo ya sabe que viene. Calentamiento, movilidad, fuerza, skill work. 90 minutos pasan como 30. Termino sudando y sonriendo. Ducha fria. Desayuno. Empiezo el dia invencible.",
      },
      {
        title: "6 meses de consistencia",
        script: "Miro el calendario. 180 dias entrenados. Mi cuerpo se ve diferente. Mis progresiones han subido. Hago 15 pull-ups donde antes hacia 5. Mi espalda esta recta despues de horas de programar. La calistenia me salvo de la vida sedentaria del teclado.",
      },
    ],
    exercises: [
      { name: "Visualizacion de la sesion", how: "Antes de entrenar, cierra los ojos 60 segundos e imagina los 3 ejercicios principales del dia. Visualiza la forma perfecta, la respiracion y el ultimo rep.", when: "Justo antes de calentar.", why: "Ensayo motor mental: los atletas olimpicos lo usan. Activa cortex motor sin desgaste fisico y mejora ejecucion real." },
      { name: "Tracking de progresion", how: "Registra en tu movil: ejercicio, series, reps y RPE (esfuerzo 1-10). Compara cada 2 semanas.", when: "Inmediatamente despues de cada sesion.", why: "Feedback cuantificado: sin datos no hay progresion real, solo sensacion." },
      { name: "Movilidad pre-work", how: "5 minutos de movilidad articular: circulos de hombro, cadera, muñeca y columna toracica. No es calentamiento, es mantenimiento.", when: "Antes de calistenia, TODOS los dias.", why: "Previene lesion, mejora rango de movimiento y prepara el sistema nervioso." },
    ],
  },
  {
    id: "habits",
    icon: "🧘",
    title: "Habitos y bienestar",
    hex: "#06b6d4",
    vision: "Duermo 7-8 horas. Mi mente esta clara porque medito, escribo y reflexiono cada dia. No reacciono al caos: respondo con calma. Mi energia no es accidental, es el resultado de un sistema de autocuidado que protejo como un tesoro.",
    identity: "Soy alguien que cuida su mente con la misma disciplina con la que cuida su codigo, sus pacientes y su comunidad.",
    beliefs: [
      "El descanso no es debilidad, es recarga estrategica.",
      "3 lineas de journal valen mas que 3 horas de ansiedad mental.",
      "Mi estado emocional afecta la calidad de todo lo que hago.",
      "Los habitos pequeños repetidos son mas poderosos que los esfuerzos heroicos ocasionales.",
    ],
    visualizations: [
      {
        title: "Mañana perfecta",
        script: "Suena la alarma a las 7:30. No la pospongo. Me levanto. Bebo agua con limon. Me siento 3 minutos en silencio. Abro el journal: una gratitud, una emocion, una cosa que controlo hoy. Cierro el cuaderno. Estoy listo. No necesito mas. Solo necesitaba empezar bien.",
      },
      {
        title: "Noche de calidad",
        script: "Son las 21:30. Dejo el movil en la cocina. Me lavo los dientes. Leo 10 paginas de algo que no sea productividad. Me acuesto. Repaso mentalmente 3 cosas que aprendi hoy. Cierro los ojos. Duermo profundo. Mañana sera otro buen dia porque protegi mi noche.",
      },
      {
        title: "Dia minimo sin culpa",
        script: "Hoy no tengo energia para el plan completo. Esta bien. Hago 30 minutos de veterinaria. 15 de ebook. 25 de codigo. Marco mi review. No fue un dia perfecto. Fue un dia que mantuve la cadena. Eso es suficiente. Mañana vuelvo al plan completo.",
      },
    ],
    exercises: [
      { name: "Journal de 3 lineas", how: "1) Algo que agradezco. 2) Emocion dominante ahora. 3) Una cosa que puedo controlar hoy. No mas, no menos.", when: "Cada mañana antes de entrenar.", why: "Escritura expresiva: 3 minutos de journal reducen cortisol (estres) y mejoran claridad de pensamiento." },
      { name: "Respiracion box 4-4-4-4", how: "Inhala 4s, retienes 4s, exhala 4s, retienes 4s. Repite 4 ciclos. 2 minutos total.", when: "Antes de cada bloque de deep work y cuando sientas ansiedad.", why: "Activa el nervio vago: pasa el sistema nervioso de simpatico (lucha) a parasimpatico (calma y foco)." },
      { name: "Regla 2 min de descarga", how: "Cuando sientas saturacion: timer 2 min, escribe TODO lo que tienes en la cabeza sin filtrar. Luego cierra el papel y sigue.", when: "En cualquier momento de bloqueo.", why: "Vaciado de memoria de trabajo: libera espacio cognitivo. Como cerrar pestañas del navegador mental." },
      { name: "Revision nocturna 5 min", how: "Antes de dormir: que aprendi hoy? que hare distinto mañana? una frase de agradecimiento.", when: "21:20 cada noche.", why: "Consolidacion: el ultimo pensamiento antes de dormir tiene peso desproporcionado en la memoria a largo plazo." },
    ],
  },
];

/* ─── mode mapping ─── */
import type { LachoMode } from "../modes";
const modeToAreas: Record<LachoMode, string[]> = {
  vet: ["vet", "body", "habits"],
  influencer: ["ebook", "body", "habits"],
  dev: ["code", "body", "habits"],
};

/* ─── component ─── */
type Props = { mode?: LachoMode };
export default function DreamBuilder({ mode }: Props) {
  const filtered = mode ? areas.filter((a) => modeToAreas[mode].includes(a.id)) : areas;
  const [activeArea, setActiveArea] = useState(0);
  const [journalEntries, setJournalEntries] = useState<Record<string, string>>(() => loadJSON("lacho-dream-journal", {}));

  useEffect(() => { saveJSON("lacho-dream-journal", journalEntries); }, [journalEntries]);

  const area = filtered[activeArea] || filtered[0];
  if (!area) return null;

  return (
    <section id="dream-builder" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="text-xs tracking-[0.3em] text-amber-400 uppercase mb-3">Dream Builder</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Construye tu vision</h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            Visualiza, siente y entrena cada area de tu vida. Basado en neurociencia de la visualizacion: tu cerebro no distingue una imagen vivida de la realidad.
          </p>
        </motion.div>

        {/* Area tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filtered.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setActiveArea(i)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeArea === i ? "text-[#ededef]" : "text-[#55555a] hover:text-[#9ca3af]"
              }`}
            >
              {a.icon} {a.title}
            </button>
          ))}
        </div>

        <motion.div key={area.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Vision + Identity */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="rune-border rounded-2xl bg-slate-900/65 p-6">
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: area.hex }}>La vision a 6 meses</div>
              <h3 className="text-xl font-black text-white mb-3">Como se ve tu vida cuando lo logres</h3>
              <p className="text-sm text-slate-200 leading-relaxed rounded-xl bg-slate-950/50 border border-slate-800 p-4">{area.vision}</p>
              <div className="mt-4">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">Tu identidad</div>
                <p className="text-sm font-bold italic" style={{ color: area.hex }}>"{area.identity}"</p>
              </div>
            </div>

            <div className="rune-border rounded-2xl bg-slate-900/65 p-6">
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: area.hex }}>Creencias de soporte</div>
              <h3 className="text-xl font-black text-white mb-3">Lo que necesitas creer para llegar</h3>
              <div className="space-y-2.5">
                {area.beliefs.map((b, i) => (
                  <div key={i} className="flex gap-3 rounded-xl bg-slate-950/45 border border-slate-800 p-3">
                    <span className="text-lg" style={{ color: area.hex }}>◈</span>
                    <p className="text-sm text-slate-200">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visualizations */}
          <div className="rune-border rounded-2xl bg-slate-900/65 p-6 mb-6">
            <div className="text-xs uppercase tracking-widest mb-2" style={{ color: area.hex }}>Visualizaciones guiadas</div>
            <h3 className="text-xl font-black text-white mb-2">Cierra los ojos y vive estas escenas</h3>
            <p className="text-xs text-slate-400 mb-5">Lee cada guion en voz baja o en silencio. Siente los detalles: olores, sonidos, texturas, emociones. 2-3 minutos por escena.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {area.visualizations.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl bg-slate-950/50 border border-slate-800 p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ backgroundColor: `${area.hex}25`, color: area.hex }}>
                      {i + 1}
                    </div>
                    <h4 className="text-sm font-black text-white">{v.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">{v.script}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Exercises */}
          <div className="rune-border rounded-2xl bg-slate-900/65 p-6 mb-6">
            <div className="text-xs uppercase tracking-widest mb-2" style={{ color: area.hex }}>Ejercicios practicos</div>
            <h3 className="text-xl font-black text-white mb-2">Hazlo real: acciones concretas</h3>
            <p className="text-xs text-slate-400 mb-5">Cada ejercicio tiene un como, un cuando y un por que respaldado por neurociencia.</p>
            <div className="space-y-4">
              {area.exercises.map((ex, i) => (
                <motion.div
                  key={ex.name}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl bg-slate-950/45 border border-slate-800 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-sm" style={{ backgroundColor: `${area.hex}20`, color: area.hex, border: `1px solid ${area.hex}50` }}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-white">{ex.name}</h4>
                      <p className="text-sm text-slate-200 mt-1">{ex.how}</p>
                      <div className="grid sm:grid-cols-2 gap-3 mt-3">
                        <div className="rounded-lg bg-slate-900/60 p-2.5">
                          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">Cuando</div>
                          <p className="text-xs text-slate-300">{ex.when}</p>
                        </div>
                        <div className="rounded-lg bg-slate-900/60 p-2.5">
                          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">Neurociencia</div>
                          <p className="text-xs text-slate-300">{ex.why}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dream Journal */}
          <div className="rune-border rounded-2xl bg-slate-900/65 p-6">
            <div className="text-xs uppercase tracking-widest mb-2" style={{ color: area.hex }}>Dream Journal</div>
            <h3 className="text-xl font-black text-white mb-2">Escribe tu version futura</h3>
            <p className="text-xs text-slate-400 mb-4">Escribe en presente como si ya lo hubieras logrado. Tu cerebro necesita leer esta version de ti cada semana.</p>
            <textarea
              rows={6}
              placeholder={`Soy Lacho. Hoy en mi vida como ${area.title.toLowerCase()}...`}
              value={journalEntries[area.id] || ""}
              onChange={(e) => setJournalEntries((j) => ({ ...j, [area.id]: e.target.value }))}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
            />
            <p className="text-[10px] text-slate-500 mt-2">Se guarda automaticamente. Releelo cada domingo durante la revision semanal.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
