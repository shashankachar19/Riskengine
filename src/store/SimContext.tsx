import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { ScenarioConfig, SimulationState, LogEntry, Resource } from '../scenarios/types';
import { mineScenario, getScenarioById } from '../scenarios';

interface SimContextType {
  state: SimulationState;
  activeScenario: ScenarioConfig;
  missionStarted: boolean;
  selectScenario: (scenarioOrId: ScenarioConfig | string) => void;
  startMission: () => void;
  returnToHome: () => void;
  resetSimulation: () => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  approveAndResolve: () => void;
  visibleLogs: LogEntry[];
  closePlanPanel: () => void;
  openApprovalModal: () => void;
  closeApprovalModal: () => void;
  openImpactReport: () => void;
  closeImpactReport: () => void;
  pendingStep: number | null;
  setPendingStep: (step: number | null) => void;
  executePendingStep: () => void;
}

const SimContext = createContext<SimContextType | undefined>(undefined);

function createInitialState(scenario: ScenarioConfig): SimulationState {
  return {
    step: 0,
    isProcessing: false,
    processingMessage: '',
    siteStatus: scenario.steps[0].siteStatus,
    statusLabel: scenario.steps[0].statusLabel,
    visibleLogs: scenario.logs
      .filter(l => l.step === 0)
      .map((l, idx) => ({
        ...l,
        timestamp: new Date(Date.now() + idx * 1000).toLocaleTimeString('en-GB', { hour12: false })
      })),
    resources: scenario.resources,
    showPlanPanel: false,
    showApprovalModal: false,
    showImpactReport: false,
  };
}

export function SimProvider({ children }: { children: ReactNode }) {
  const [activeScenario, setActiveScenario] = useState<ScenarioConfig>(mineScenario);
  const activeScenarioRef = useRef<ScenarioConfig>(mineScenario);
  activeScenarioRef.current = activeScenario;

  const [state, setState] = useState<SimulationState>(() => createInitialState(mineScenario));
  const [missionStarted, setMissionStarted] = useState(false);
  const [pendingStep, setPendingStep] = useState<number | null>(null);

  const selectScenario = (scenarioOrId: ScenarioConfig | string) => {
    const nextScenario = typeof scenarioOrId === 'string' ? getScenarioById(scenarioOrId) : scenarioOrId;
    setActiveScenario(nextScenario);
    activeScenarioRef.current = nextScenario;
    setState(createInitialState(nextScenario));
  };

  const startMission = () => {
    setMissionStarted(true);
  };

  const returnToHome = () => {
    setMissionStarted(false);
    resetSimulation();
  };

  const resetSimulation = () => {
    setState(createInitialState(activeScenarioRef.current));
    setPendingStep(null);
  };

  const executePendingStep = async () => {
    if (pendingStep === null) return;
    const targetStep = pendingStep;
    setPendingStep(null);
    await simulateProcessing(targetStep);
  };

  const simulateProcessing = async (targetStep: number) => {
    const currentScenario = activeScenarioRef.current;
    const stepConfig = currentScenario.steps[targetStep];
    const phases = stepConfig?.processingPhases || [{ message: 'AI Processing...', duration: 2000 }];

    // Run through each thinking phase sequentially
    for (const phase of phases) {
      setState(prev => ({ ...prev, isProcessing: true, processingMessage: phase.message }));
      await new Promise(resolve => setTimeout(resolve, phase.duration));
    }

    // Apply the completed step state
    setState(prev => {
      const targetStepConfig = currentScenario.steps[targetStep];
      const newState: SimulationState = {
        ...prev,
        step: targetStep,
        isProcessing: false,
        processingMessage: '',
        siteStatus: targetStepConfig?.siteStatus || 'OPERATIONAL',
        statusLabel: targetStepConfig?.statusLabel || 'ACTIVE',
      };

      // Add new logs for this step with real-time timestamps
      const stepLogs = currentScenario.logs
        .filter(l => l.step === targetStep)
        .map((l, idx) => ({
          ...l,
          timestamp: new Date(Date.now() + idx * 1000).toLocaleTimeString('en-GB', { hour12: false })
        }));

      newState.visibleLogs = [...prev.visibleLogs, ...stepLogs];

      // Update resources dynamically based on scenario responders
      if (targetStep === 1) {
        newState.showPlanPanel = true;
      } else if (targetStep === 2) {
        // Primary responder & rescue team deployed
        const primaryId = currentScenario.resources[0]?.id;
        const rescueId = currentScenario.resources[2]?.id;
        newState.resources = prev.resources.map(r =>
          (r.id === primaryId || r.id === rescueId)
            ? { ...r, status: 'en_route', location: currentScenario.map.primaryRoute.label }
            : r
        );
      } else if (targetStep === 3) {
        // Blockage & primary responder locked
        const primaryId = currentScenario.resources[0]?.id;
        const obstacleId = currentScenario.resources[3]?.id;
        newState.resources = prev.resources.map(r => {
          if (r.id === obstacleId || r.id === primaryId) {
            return { ...r, status: 'locked', location: currentScenario.map.primaryRoute.label };
          }
          return r;
        });
      } else if (targetStep === 4) {
        // Secondary responder deployed to hazard zone
        const backupId = currentScenario.resources[1]?.id;
        const hazardSector = currentScenario.map.sectors.find(s => s.isHazardZone)?.label || 'Hazard Zone';
        newState.resources = prev.resources.map(r =>
          r.id === backupId ? { ...r, status: 'deployed', location: hazardSector } : r
        );
      }

      return newState;
    });
  };

  const goToStep = (step: number) => {
    simulateProcessing(step);
  };

  const nextStep = () => {
    if (state.step < 4) goToStep(state.step + 1);
  };

  const approveAndResolve = () => {
    goToStep(4);
  };

  const closePlanPanel = () => setState(prev => ({ ...prev, showPlanPanel: false }));
  const openApprovalModal = () => setState(prev => ({ ...prev, showApprovalModal: true }));
  const closeApprovalModal = () => setState(prev => ({ ...prev, showApprovalModal: false }));
  const openImpactReport = () => setState(prev => ({ ...prev, showImpactReport: true }));
  const closeImpactReport = () => setState(prev => ({ ...prev, showImpactReport: false }));

  return (
    <SimContext.Provider value={{
      state,
      activeScenario,
      missionStarted,
      selectScenario,
      startMission,
      returnToHome,
      resetSimulation,
      goToStep,
      nextStep,
      approveAndResolve,
      visibleLogs: state.visibleLogs,
      closePlanPanel,
      openApprovalModal,
      closeApprovalModal,
      openImpactReport,
      closeImpactReport,
      pendingStep,
      setPendingStep,
      executePendingStep
    }}>
      {children}
    </SimContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimContext);
  if (context === undefined) throw new Error('useSimulation must be used within SimProvider');
  return context;
}
