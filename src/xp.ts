const XP_KEY = "lacho-global-xp";

export const loadXp = (): number => {
  try { return Number(localStorage.getItem(XP_KEY) || 0); } catch { return 0; }
};

export const addXp = (amount: number): number => {
  const current = loadXp();
  const next = Math.max(0, current + amount);
  localStorage.setItem(XP_KEY, String(next));
  return next;
};

export const xpLevels = [
  { min: 0, label: "Principiante", next: 100 },
  { min: 100, label: "Aprendiz", next: 300 },
  { min: 300, label: "Practicante", next: 600 },
  { min: 600, label: "Competente", next: 1000 },
  { min: 1000, label: "Avanzado", next: 1500 },
  { min: 1500, label: "Experto", next: 2200 },
  { min: 2200, label: "Maestro", next: 3000 },
  { min: 3000, label: "Leyenda", next: 999999 },
];

export const getLevel = (xp: number) => {
  for (let i = xpLevels.length - 1; i >= 0; i--) {
    if (xp >= xpLevels[i].min) return { ...xpLevels[i], index: i };
  }
  return { ...xpLevels[0], index: 0 };
};
