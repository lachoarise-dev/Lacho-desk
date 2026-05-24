import { motion } from "framer-motion";
import { dailySchedule } from "../data";
import { useState } from "react";

// Lucide-style SVG icons for each slot type
const SlotIcon = ({ type }: { type: string }) => {
  const props = { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "vet":
      return <svg {...props}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>;
    case "ebook":
      return <svg {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
    case "code":
      return <svg {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case "body":
      return <svg {...props}><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>;
    case "mindset":
      return <svg {...props}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66Z"/></svg>;
    case "bonus":
      return <svg {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
    case "reset":
    default:
      return <svg {...props}><path d="M18.364 4.636a9 9 0 1 1-12.728 0"/><path d="M12 2v4"/></svg>;
  }
};

const typeColors: Record<string, string> = {
  vet: "#6fcf97",
  ebook: "#c9a84c",
  code: "#7baaf7",
  body: "#f97316",
  mindset: "#a78bfa",
  bonus: "#f472b6",
  reset: "#3a3a3f",
};

const typeLabels: Record<string, string> = {
  vet: "Veterinaria", ebook: "Ebook", code: "Código",
  body: "Calistenia", mindset: "Mindset", bonus: "Bonus", reset: "Descanso",
};

const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

export default function DailyView() {
  const [day, setDay] = useState(0);
  const isWeekend = day >= 5;

  return (
    <section id="diario" className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-[10px] tracking-[0.1em] text-[#3a3a3f] font-medium mb-3">Rutina unificada</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em]" style={{ color: "#ededef" }}>Tu día completo</h2>
              <p className="text-[10px] text-[#3a3a3f] mt-2">Los 3 modos en un solo día. Veterinaria + Ebook + Código.</p>
            </div>
            <div className="flex gap-1">
              {days.map((d, i) => (
                <button key={d} onClick={() => setDay(i)} className={`w-9 h-9 rounded-lg text-[10px] font-medium transition-all duration-300 ${day === i ? "bg-[#222225] text-[#ededef]" : "text-[#3a3a3f] hover:text-[#65656d]"}`}>{d}</button>
              ))}
            </div>
          </div>
        </motion.div>

        {isWeekend && (
          <div className="rounded-lg bg-[#151517] border border-[#1e1e20] px-4 py-2.5 mb-4 text-[10px] text-[#55555a]">
            Fin de semana — descanso activo o estudio libre.
          </div>
        )}

        <div className="rounded-xl border border-[#1e1e20] overflow-hidden">
          {dailySchedule.map((slot, i) => {
            const dimmed = isWeekend && slot.type === "body";
            const color = typeColors[slot.type] || "#3a3a3f";
            return (
              <div key={i} className={`flex items-center border-b border-[#1e1e20]/50 last:border-b-0 px-5 py-3 transition-colors duration-300 hover:bg-[#151517] ${dimmed ? "opacity-20" : ""}`}>
                <span className="w-11 text-right text-[11px] font-mono font-medium text-[#3a3a3f] flex-shrink-0">{slot.time}</span>
                <span className="mx-3 flex-shrink-0 flex items-center gap-1.5 w-[88px]" style={{ color }}>
                  <SlotIcon type={slot.type} />
                  <span className="text-[9px] font-medium truncate">{typeLabels[slot.type]}</span>
                </span>
                <span className="flex-1 text-[12px] text-[#9ca3af] font-medium">{dimmed ? "Descanso activo" : slot.block.replace(/^[^\s]+\s/, "")}</span>
                <span className="text-[9px] font-mono text-[#2a2a2d] flex-shrink-0">{slot.min}m</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
