import { ScenarioConfig } from './types';
import { mineScenario } from './mineScenario';
import { floodScenario } from './floodScenario';
import { constructionScenario } from './constructionScenario';

export * from './types';
export { mineScenario } from './mineScenario';
export { floodScenario } from './floodScenario';
export { constructionScenario } from './constructionScenario';

export const ALL_SCENARIOS: ScenarioConfig[] = [
  mineScenario,
  floodScenario,
  constructionScenario,
];

export function getScenarioById(id: string): ScenarioConfig {
  const found = ALL_SCENARIOS.find(s => s.id === id);
  return found || mineScenario;
}
