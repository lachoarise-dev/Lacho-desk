import { useEffect, useState } from "react";
import { loadMode, saveMode, applyAccent, modeConfig, type LachoMode } from "./modes";
import ModeSelector from "./components/ModeSelector";
import Hero from "./components/Hero";
import SixMonthTimeline from "./components/SixMonthTimeline";
import DailyView from "./components/DailyView";

import VeterinaryClinic from "./components/VeterinaryClinic";
import GrowthAndCodeSystems from "./components/GrowthAndCodeSystems";
import WeeklyReview from "./components/WeeklyReview";
import RecallStudio from "./components/RecallStudio";
// PomodoroWidget now rendered inside Hero
import SkillTree from "./components/SkillTree";
import DreamBuilder from "./components/DreamBuilder";
import AchievementLog from "./components/AchievementLog";
import ResourcesAndLinks from "./components/ResourcesAndLinks";
import Missions from "./components/Missions";
import NeuroMethods from "./components/NeuroMethods";
import Statistics from "./components/Statistics";
import SystemSideNav, { type TabId } from "./components/SystemSideNav";

export default function App() {
  const [mode, setMode] = useState<LachoMode | null>(loadMode);
  const [activeTab, setActiveTab] = useState<TabId>("home");

  useEffect(() => { if (mode) applyAccent(mode); }, [mode]);

  const selectMode = (m: LachoMode) => { setMode(m); saveMode(m); applyAccent(m); setActiveTab("home"); };
  const changeMode = () => setMode(null);

  if (!mode) return <ModeSelector onSelect={selectMode} />;

  const cfg = modeConfig[mode];

  const renderTab = () => {
    switch (activeTab) {
      case "home":         return <Hero mode={mode} />;
      case "metas":        return <SixMonthTimeline mode={mode} />;
      case "rutina":       return <DailyView />;
      case "missions":     return <Missions mode={mode} />;
      case "neuro":        return <NeuroMethods />;
      case "logros":       return <AchievementLog />;
      case "stats":        return <Statistics />;
      // Vet
      case "academia":     return <><RecallStudio mode="vet" /><SkillTree mode="vet" /><WeeklyReview mode="vet" /></>;
      case "clinica":      return <VeterinaryClinic />;
      case "sara":         return <DreamBuilder mode="vet" />;
      case "recursos-vet": return <ResourcesAndLinks mode="vet" />;
      // Influencer
      case "dream-inf":    return <DreamBuilder mode="influencer" />;
      case "pipeline":     return <><GrowthAndCodeSystems mode="influencer" /><SkillTree mode="influencer" /><WeeklyReview mode="influencer" /></>;
      case "recursos-inf": return <ResourcesAndLinks mode="influencer" />;
      // Dev
      case "proyectos":    return <><SkillTree mode="dev" /><GrowthAndCodeSystems mode="dev" /></>;
      case "log":          return <WeeklyReview mode="dev" />;
      case "recursos-dev": return <ResourcesAndLinks mode="dev" />;
      default:             return <Hero mode={mode} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#111113] text-[#9ca3af]">
      <SystemSideNav mode={mode} activeTab={activeTab} onTabChange={setActiveTab} onModeChange={changeMode} />

      <nav className="fixed top-0 inset-x-0 z-50 bg-[#111113]/90 backdrop-blur-xl border-b border-[#1e1e20]/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-[#55555a] tracking-[0.05em]">Lacho Desk</span>
            <div className="w-px h-3 bg-[#1e1e20]" />
            <span className="text-[10px] font-medium" style={{ color: cfg.accent }}>{cfg.label}</span>
          </div>

        </div>
      </nav>

      {renderTab()}

      <footer className="py-16 px-6 text-center space-y-4">
        <button onClick={changeMode} className="text-[10px] text-[#3a3a3f] hover:text-[#65656d] transition-colors duration-300 font-medium">
          Cambiar modo
        </button>
        <p className="text-[9px] tracking-[0.15em] font-medium text-[#1e1e20]">Lacho Desk</p>
      </footer>
    </div>
  );
}
