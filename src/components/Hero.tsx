import { motion } from "framer-motion";
import { modeConfig, type LachoMode } from "../modes";
import { useEffect, useRef, useState } from "react";
import { loadXp, getLevel, xpLevels } from "../xp";
import PomodoroWidget from "./PomodoroWidget";

const quotes: Record<LachoMode, string[]> = {
  vet: ["Los chivos dan bala. Tu tambien.","Si el gato bufa, tu sonries.","Hoy estudio lo que mañana aplicare.","Mi acento es cubano. Mi compromiso es profesional.","Veterinario de la salsa: porque hasta las urgencias las bailo.","Si sobrevivi al Periodo Especial, sobrevivo a un examen.","El fonendo no se pone solo. Yo lo preparo.","Cada flashcard es un paciente que no se me escapa.","En la clinica no hay ctrl+Z. Practica antes.","Mañana sere el asistente que hoy estoy construyendo."],
  influencer: ["Publicas feo pero publicas.","Tu historia es tu mejor contenido.","El que no postea, no existe.","El algoritmo premia constancia, no perfeccion.","Un Reel feo publicado vale mas que uno perfecto en borradores.","Si no mides, no aprendes.","El hook tiene 2 segundos. Usalos bien.","Cuba, España, veterinaria y codigo. Esa historia nadie la tiene."],
  dev: ["Claude es mi dios y code es mi pastor.","Cada bug es progreso disfrazado.","Si funciona en pantalla, fue aprendizaje.","Un commit al dia mantiene al impostor alejado.","Termux + Acode + cafe = oficina de desarrollo.","El codigo no miente. Si falla, el error soy yo. Y aprendo.","Pseudocodigo primero, teclear despues.","Mi primer deploy fue un logro. El proximo sera un producto."],
};

const loadNum = (k: string) => { try { return Number(localStorage.getItem(k) || 0); } catch { return 0; } };
const PHOTO_KEY = (m: LachoMode) => `lacho-photo-${m}`;
const BIO_KEY = (m: LachoMode) => `lacho-bio-${m}`;
const WATER_KEY = () => `lacho-water-${new Date().toDateString()}`;
const CHECKIN_KEY = () => `lacho-checkin-${new Date().toDateString()}`;

const biorritmo: Record<number, { label: string; focus: Record<LachoMode, string> }> = {
  1: { label: "Muy baja", focus: { vet: "Solo flashcards 15 min.", dev: "Lee docs 15 min.", influencer: "Revisa métricas." } },
  2: { label: "Baja", focus: { vet: "Repaso + 1 caso simple.", dev: "Refactoriza. No features.", influencer: "DMs + programa 1 post." } },
  3: { label: "Normal", focus: { vet: "Estudio 2h + casos.", dev: "1 feature + docs.", influencer: "1 Reel + 1 carrusel." } },
  4: { label: "Alta", focus: { vet: "Sesión completa + simulación.", dev: "Feature + tests + deploy.", influencer: "Contenido + colaboración." } },
  5: { label: "Máxima", focus: { vet: "Estudio intenso + 3 casos + repaso.", dev: "Arquitectura + feature + deploy.", influencer: "Batch: 3 Reels + email + directo." } },
};

const loadJSON = <T,>(k: string, f: T): T => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : f; } catch { return f; } };

type Props = { mode: LachoMode };

export default function Hero({ mode }: Props) {
  const cfg = modeConfig[mode];
  const [quote] = useState(() => quotes[mode][new Date().getDate() % quotes[mode].length]);
  const xp = loadXp();
  const streak = loadNum("lacho-streak");
  const level = getLevel(xp);
  const progressInLevel = level.next < 999999 ? ((xp - level.min) / (level.next - level.min)) * 100 : 100;

  // Photo
  const [photo, setPhoto] = useState<string | null>(() => localStorage.getItem(PHOTO_KEY(mode)));
  const fileRef = useRef<HTMLInputElement>(null);

  // Sync photo and bio when mode changes
  useEffect(() => {
    setPhoto(localStorage.getItem(PHOTO_KEY(mode)));
    setBio(localStorage.getItem(BIO_KEY(mode)) || "");
  }, [mode]);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { const d = reader.result as string; setPhoto(d); localStorage.setItem(PHOTO_KEY(mode), d); };
    reader.readAsDataURL(file);
  };

  // Bio
  const [bio, setBio] = useState(() => localStorage.getItem(BIO_KEY(mode)) || "");
  const [editingBio, setEditingBio] = useState(false);
  useEffect(() => { localStorage.setItem(BIO_KEY(mode), bio); }, [bio, mode]);

  // Save
  const [saved, setSaved] = useState(false);
  const saveDay = () => {
    // Racha logic: Only add a streak day if we haven't saved today
    const lastSaveKey = "lacho-last-save-date";
    const today = new Date().toDateString();
    if (localStorage.getItem(lastSaveKey) !== today) {
      const currentStreak = Number(localStorage.getItem("lacho-streak") || 0);
      localStorage.setItem("lacho-streak", String(currentStreak + 1));
      localStorage.setItem(lastSaveKey, today);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Water
  const [water, setWater] = useState<boolean[]>(() => loadJSON(WATER_KEY(), [false, false, false]));
  useEffect(() => { localStorage.setItem(WATER_KEY(), JSON.stringify(water)); }, [water]);
  const toggleDrop = (i: number) => setWater((w) => w.map((v, idx) => idx === i ? !v : v));

  // Energy
  const [energy, setEnergy] = useState<number>(() => loadJSON(CHECKIN_KEY(), 0));
  useEffect(() => { localStorage.setItem(CHECKIN_KEY(), JSON.stringify(energy)); }, [energy]);
  const energyInfo = energy ? biorritmo[energy] : null;

  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>

          {/* Header: photo + title */}
          <div className="flex items-start gap-5 mb-8">
            <button onClick={() => fileRef.current?.click()} className="w-16 h-16 rounded-xl bg-[#19191b] border border-[#2a2a2d] flex-shrink-0 overflow-hidden hover:border-[#3a3a3d] transition-colors">
              {photo ? <img src={photo} alt="" className="w-full h-full object-cover" /> : <img src="/images/lacho-avatar-default.png" alt="" className="w-full h-full object-cover opacity-50" />}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-black tracking-[-0.04em] leading-[0.9] mb-1" style={{ color: "#ededef" }}>Lacho <span className="text-[#2a2a2d]">Desk</span></h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-3 h-3 flex items-center justify-center opacity-80" style={{ backgroundImage: "url(/images/lacho-icons.png)", backgroundSize: "600% 400%", backgroundPosition: mode === "vet" ? "100% 0%" : mode === "influencer" ? "0% 66%" : "0% 100%" }} />
                <p className="text-[10px] font-medium" style={{ color: cfg.accent }}>{cfg.label}</p>
              </div>
              <p className="text-[9px] text-[#3a3a3f] mt-0.5 max-w-xs leading-relaxed">{cfg.subtitle}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            {editingBio ? (
              <input autoFocus value={bio} onChange={(e) => setBio(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setEditingBio(false)} onBlur={() => setEditingBio(false)} placeholder="Tu frase..." className="w-full bg-transparent border-b border-[#2a2a2d] text-[11px] text-[#9ca3af] font-light focus:outline-none pb-1" />
            ) : (
              <button onClick={() => setEditingBio(true)} className="text-left"><p className="text-[11px] text-[#3a3a3f] font-light italic hover:text-[#55555a] transition-colors">{bio || `"${quote}"`}</p></button>
            )}
          </div>

          {/* XP + Pomodoro row */}
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div className="flex items-center gap-4">
              <span className="text-base font-black font-mono" style={{ color: cfg.accent }}>{xp}</span>
              <span className="text-[9px] text-[#3a3a3f]">XP · {level.label}</span>
              <div className="w-px h-3 bg-[#1e1e20]" />
              <span className="text-[9px] font-mono text-[#3a3a3f]">{streak}d</span>
            </div>
            <PomodoroWidget />
          </div>

          {/* XP bar */}
          <div className="max-w-full mb-6">
            <div className="h-1 rounded-full bg-[#1e1e20] overflow-hidden">
              <motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${progressInLevel}%` }} transition={{ duration: 1.2 }} style={{ backgroundColor: cfg.accent }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[7px] text-[#2a2a2d]">{level.label}</span>
              <span className="text-[7px] text-[#2a2a2d]">{level.next < 999999 ? `${level.next - xp} XP → ${xpLevels[level.index + 1]?.label}` : "Max"}</span>
            </div>
          </div>

          {/* Water + Energy + Save */}
          <div className="flex items-center gap-5 flex-wrap">
            {/* Water */}
            <div className="flex items-center gap-1.5">
              {water.map((f, i) => (
                <button key={i} onClick={() => toggleDrop(i)} className={`text-sm transition-opacity duration-300 ${f ? "opacity-100" : "opacity-15 hover:opacity-40"}`}>💧</button>
              ))}
            </div>
            <div className="w-px h-3 bg-[#1e1e20]" />
            {/* Energy */}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setEnergy(n)} className={`w-5 h-5 rounded text-[8px] font-medium transition-all duration-300 ${energy === n ? "text-[#ededef] bg-[#222225]" : "text-[#2a2a2d] hover:text-[#55555a]"}`}>{n}</button>
              ))}
            </div>
            <div className="w-px h-3 bg-[#1e1e20]" />
            {/* Save */}
            <button onClick={saveDay} className={`text-[9px] font-medium transition-all duration-300 ${saved ? "text-[#3a3a3f]" : "text-[#9ca3af] hover:text-[#ededef]"}`}>{saved ? "Guardado ✓" : "Guardar día"}</button>
          </div>

          {/* Biorritmo */}
          {energyInfo && (
            <div className="max-w-md mt-4 rounded-lg border border-[#1e1e20] bg-[#151517] px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-[#3a3a3f]">Energía {energyInfo.label}</span>
                <span className="text-[9px]" style={{ color: cfg.accent }}>{energy}/5</span>
              </div>
              <p className="text-[10px] text-[#55555a] mt-0.5">{energyInfo.focus[mode]}</p>
            </div>
          )}

        </motion.div>
      </div>
    </section>
  );
}
