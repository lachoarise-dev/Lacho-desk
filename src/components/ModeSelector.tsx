import { motion } from "framer-motion";
import { modeConfig, type LachoMode } from "../modes";

const modes: LachoMode[] = ["dev", "vet", "influencer"];

// Inline SVG icons per mode — Lucide outline style, stroke-width 1.5
const ModeIcons: Record<LachoMode, JSX.Element> = {
  dev: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  vet: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
      <circle cx="20" cy="10" r="2"/>
    </svg>
  ),
  influencer: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  ),
};

type Props = { onSelect: (m: LachoMode) => void };

export default function ModeSelector({ onSelect }: Props) {
  return (
    <div className="min-h-screen bg-[#111113] overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg w-full"
        >
          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] leading-[0.85]"
              style={{ color: "#ffffff" }}
            >
              Lacho
              <br />
              Desk
            </motion.h1>
          </div>

          <div className="space-y-0">
            {modes.map((id, i) => {
              const cfg = modeConfig[id];
              return (
                <motion.button
                  key={id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
                  onClick={() => onSelect(id)}
                  className="w-full text-left py-5 border-b border-[#1e1e20] first:border-t transition-all duration-500 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className="opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ color: cfg.accent }}
                      >
                        {ModeIcons[id]}
                      </span>
                      <span
                        className="text-lg md:text-xl font-semibold transition-colors duration-500"
                        style={{ color: "#3a3a3f" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = cfg.accent; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#3a3a3f"; }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ color: cfg.accent }}>
                      →
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-center text-[10px] mt-16 tracking-[0.15em]"
            style={{ color: "#2a2a2f" }}
          >
            selecciona tu modo
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
