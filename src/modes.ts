export type LachoMode = "vet" | "influencer" | "dev";

export const modeConfig: Record<LachoMode, {
  label: string;
  subtitle: string;
  accent: string;
  emoji: string;
}> = {
  vet: {
    label: "Veterinario de la salsa",
    subtitle: "Los chivos me dan dinero",
    accent: "#6fcf97",
    emoji: "🩺",
  },
  influencer: {
    label: "Influencer de pacotilla",
    subtitle: "No busco likes, busco validación existencial pero si me dejas un like también sirve",
    accent: "#c9a84c",
    emoji: "📸",
  },
  dev: {
    label: "Programador deficiente",
    subtitle: "Claude es mi dios y code es mi pastor",
    accent: "#7baaf7",
    emoji: "💻",
  },
};

export const loadMode = (): LachoMode | null => {
  try {
    const v = localStorage.getItem("lachoMode");
    if (v === "vet" || v === "influencer" || v === "dev") return v;
    return null;
  } catch { return null; }
};

export const saveMode = (m: LachoMode) => {
  localStorage.setItem("lachoMode", m);
};

export const applyAccent = (mode: LachoMode) => {
  document.documentElement.style.setProperty("--accent", modeConfig[mode].accent);
};
