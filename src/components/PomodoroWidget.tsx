import { useEffect, useMemo, useRef, useState } from "react";

const WORK = 25 * 60;
const BREAK = 5 * 60;
type Mode = "work" | "break";

export default function PomodoroWidget() {
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem("lacho-pomo-mode") as Mode) || "work");
  const [left, setLeft] = useState(() => { const s = Number(localStorage.getItem("lacho-pomo-seconds")); return Number.isFinite(s) && s > 0 ? s : WORK; });
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => { localStorage.setItem("lacho-pomo-mode", mode); }, [mode]);
  useEffect(() => { localStorage.setItem("lacho-pomo-seconds", String(left)); }, [left]);

  useEffect(() => {
    if (!running) { if (ref.current) window.clearInterval(ref.current); return; }
    ref.current = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) { const n: Mode = mode === "work" ? "break" : "work"; setMode(n); setRunning(false); return n === "work" ? WORK : BREAK; }
        return s - 1;
      });
    }, 1000);
    return () => { if (ref.current) window.clearInterval(ref.current); };
  }, [running, mode]);

  const mmss = useMemo(() => `${Math.floor(left / 60).toString().padStart(2, "0")}:${(left % 60).toString().padStart(2, "0")}`, [left]);

  return (
    <div className="flex items-center gap-3 text-zinc-600">
      <button onClick={() => setRunning((r) => !r)} className="hover:text-zinc-300 transition-colors duration-300 text-[10px] font-medium">
        {running ? "||" : "▶"}
      </button>
      <span className="font-mono text-[12px] tabular-nums text-zinc-500">{mmss}</span>
      <button
        onClick={() => { const n: Mode = mode === "work" ? "break" : "work"; setMode(n); setRunning(false); setLeft(n === "work" ? WORK : BREAK); }}
        className="text-[9px] uppercase tracking-[0.15em] hover:text-zinc-300 transition-colors duration-300"
      >
        {mode === "work" ? "focus" : "break"}
      </button>
    </div>
  );
}
