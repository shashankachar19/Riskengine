// ─────────────────────────────────────────────────────────────
//  RiskEngine · Multi-Scenario Type Definitions
// ─────────────────────────────────────────────────────────────
import { MarkerIconType } from '../components/icons/SvgIcons';

export type LogLevel = 'system' | 'perception' | 'risk' | 'routing' | 'resource' | 'command';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
  step: number;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  status: 'standby' | 'en_route' | 'deployed' | 'locked';
  location: string;
}

// ── Location ──────────────────────────────────────────────────
export interface LocationConfig {
  name: string;
  district: string;
  lat: number;
  lng: number;
  area: string;
  elevation: string;
  type: string;
}

// ── Map Configuration ─────────────────────────────────────────
export interface SectorGeo {
  id: string;
  label: string;
  position: [number, number];
  isHazardZone: boolean;
  workerCount: number;
  iconType?: MarkerIconType;
  tooltipItems: string[];            // Items shown when safe
  hazardTooltipItems?: string[];     // Items shown when incident active
  hazardFooter?: string;
}

export interface RouteGeo {
  label: string;
  blockedLabel: string;
  path: [number, number][];
  labelPosition: [number, number];
}

export interface AssetGeo {
  iconType: MarkerIconType;
  emoji?: string;
  label: string;
  position: [number, number];
  tooltipTitle: string;
  tooltipDescription: string;
}

export interface SensorReading {
  offsetMin: number;
  value: string;
  pct: string;
  color: string;       // Tailwind bg class e.g. 'bg-emerald-400'
  textColor: string;    // Tailwind text class e.g. 'text-emerald-600'
}

export interface MapConfig {
  center: [number, number];
  zoom: number;

  sectors: SectorGeo[];

  primaryRoute: RouteGeo;
  alternateRoute: RouteGeo;

  depot: AssetGeo;
  primaryResponder: AssetGeo;     // Ambulance 1 / Rescue Boat 1 etc
  backupResponder: AssetGeo;      // Ambulance 2 / Helicopter etc
  blockingVehicle: AssetGeo & {   // Haul Truck / Bridge / Crane
    crashPosition: [number, number];
    crashIconType: MarkerIconType;
    crashEmoji?: string;
    crashTooltipTitle: string;
    crashTooltipDescription: string;
    crashTag?: string;
  };

  // The interpolation target: where primary responder drives to in Step 2
  primaryResponderDriveToIndex: number; // index into primaryRoute.path to drive to

  // The emergency halt index where primary responder stops before the crash in Step 3
  primaryResponderHaltIndex?: number;

  // Distance annotation shown in steps 1-2
  distanceAnnotation?: {
    text: string;
    lineStart: [number, number];
    lineEnd: [number, number];
    labelPosition: [number, number];
  };

  // Optional live sensor panel for map
  sensorPanel?: {
    title: string;
    sensorId: string;
    readings: SensorReading[];
    footer: string;
  };

  // Guided tooltip overlays per step (map top-right)
  guidedTooltips: Record<number, {
    title: string;
    text: string;
    iconType: MarkerIconType;
    icon?: string;
    type: 'warning' | 'danger' | 'success';
  }>;
}

// ── Telemetry (Right Panel at Step 0) ─────────────────────────
export interface TelemetryReading {
  label: string;
  value: string;
  percentage: number;
  status: 'nominal' | 'elevated' | 'critical' | 'saturated';
  iconType:
    | 'displacement'
    | 'piezometer'
    | 'vibration'
    | 'discharge'
    | 'hydrostatic'
    | 'seismic'
    | 'wind'
    | 'moisture'
    | 'water_level'
    | 'structural'
    | 'temperature';
}

// ── Resource Panel (Left Icon Rail) ───────────────────────────
export interface ResourcePanelItem {
  id: string;
  label: string;
  iconType: MarkerIconType;
  emoji?: string;
  count: number;
  badgeColor: string;   // Tailwind bg class
  iconColor: string;    // Tailwind text class
  tooltipTitle: string;
  tooltipDescription: string;
  // Simulation roles — determines dynamic styling per step
  role: 'primary_responder' | 'rescue_team' | 'static';
  // Custom SVG path data (for complex icons like fire engine, drone)
  svgPaths?: string[];
}

// ── Step Configuration ────────────────────────────────────────
export interface StepConfig {
  // HoverBottomNav
  navText: string;
  navButton: string;
  explainerTitle: string;
  explainerText: string;

  // Header status
  siteStatus: 'OPERATIONAL' | 'INCIDENT' | 'AWAITING_APPROVAL' | 'SECONDARY_INCIDENT' | 'RESOLVED';
  statusLabel: string;

  // AI Processing phases (shown sequentially during transition)
  processingPhases: { message: string; duration: number }[];
}

// ── Impact Report ─────────────────────────────────────────────
export interface ImpactMetric {
  label: string;
  simType: string;
  result: string;
  resultColor: string;
}

export interface ImpactReportConfig {
  totalWorkers: number;
  exposedWorkers: number;
  coordCycleTime: string;
  replanningTime: string;
  metrics: ImpactMetric[];
}

// ── Plan Panel Content ────────────────────────────────────────
export interface PlanStep {
  title: string;
  description: string;
  color: 'orange' | 'emerald' | 'red' | 'blue';
}

export interface PlanPanelConfig {
  planSteps: PlanStep[];              // Shown at step 1
  executionMessage: string;           // Shown at step 2
  executionSubMessage: string;        // Sub-line at step 2
  replanTitle: string;                // Shown at step 3
  replanDescription: string;          // Shown at step 3
}

// ══════════════════════════════════════════════════════════════
//  THE MAIN SCENARIO CONFIG
// ══════════════════════════════════════════════════════════════
export interface ScenarioConfig {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  hazardType: string;
  riskLevel: 'ELEVATED' | 'HIGH' | 'CRITICAL' | 'EXTREME';
  badge: string;
  backgroundImage: string;

  location: LocationConfig;
  map: MapConfig;

  baselineTelemetry?: TelemetryReading[];
  crisisTelemetry?: TelemetryReading[];
  telemetry: TelemetryReading[];
  resourcePanel: ResourcePanelItem[];
  resources: Resource[];
  logs: LogEntry[];
  steps: [StepConfig, StepConfig, StepConfig, StepConfig, StepConfig]; // exactly 5 steps (0-4)

  planPanel: PlanPanelConfig;
  impactReport: ImpactReportConfig;
}

// ── Simulation State (generic, scenario-agnostic) ─────────────
export interface SimulationState {
  step: number;
  isProcessing: boolean;
  processingMessage: string;
  siteStatus: string;
  statusLabel: string;
  cameraTarget?: string;
  hazardSector?: string;
  blockedRoute?: string;
  activeRoute?: string;
  visibleLogs: LogEntry[];
  resources: Resource[];
  showPlanPanel: boolean;
  showApprovalModal: boolean;
  showImpactReport: boolean;
}
