import { readJsonFile, writeJsonFile, getDataPath } from '../utils/fileHandler.js';
import { SystemData } from '../utils/types.js';

/**
 * Get system data
 */
export async function getSystem(projectPath: string): Promise<SystemData> {
  const systemPath = getDataPath(projectPath, 'System.json');
  return await readJsonFile<SystemData>(systemPath);
}

/**
 * Update system data
 */
export async function updateSystem(
  projectPath: string,
  updates: Partial<SystemData>
): Promise<SystemData> {
  const system = await getSystem(projectPath);
  const updatedSystem = { ...system, ...updates };

  const systemPath = getDataPath(projectPath, 'System.json');
  await writeJsonFile(systemPath, updatedSystem);

  return updatedSystem;
}

/**
 * Get game variables
 */
export async function getVariables(projectPath: string): Promise<string[]> {
  const system = await getSystem(projectPath);
  return system.variables;
}

/**
 * Set a variable name
 */
export async function setVariableName(
  projectPath: string,
  variableId: number,
  name: string
): Promise<void> {
  const system = await getSystem(projectPath);
  system.variables[variableId] = name;

  const systemPath = getDataPath(projectPath, 'System.json');
  await writeJsonFile(systemPath, system);
}

/**
 * Get game switches
 */
export async function getSwitches(projectPath: string): Promise<string[]> {
  const system = await getSystem(projectPath);
  return system.switches;
}

/**
 * Set a switch name
 */
export async function setSwitchName(
  projectPath: string,
  switchId: number,
  name: string
): Promise<void> {
  const system = await getSystem(projectPath);
  system.switches[switchId] = name;

  const systemPath = getDataPath(projectPath, 'System.json');
  await writeJsonFile(systemPath, system);
}

/**
 * Get party members
 */
export async function getPartyMembers(projectPath: string): Promise<number[]> {
  const system = await getSystem(projectPath);
  return system.partyMembers;
}

/**
 * Update party members
 */
export async function updatePartyMembers(
  projectPath: string,
  partyMembers: number[]
): Promise<void> {
  const system = await getSystem(projectPath);
  system.partyMembers = partyMembers;

  const systemPath = getDataPath(projectPath, 'System.json');
  await writeJsonFile(systemPath, system);
}

/**
 * Get starting position
 */
export async function getStartingPosition(
  projectPath: string
): Promise<{ mapId: number; x: number; y: number }> {
  const system = await getSystem(projectPath);
  return {
    mapId: system.startMapId,
    x: system.startX,
    y: system.startY
  };
}

/**
 * Update starting position
 */
export async function updateStartingPosition(
  projectPath: string,
  mapId: number,
  x: number,
  y: number
): Promise<void> {
  const system = await getSystem(projectPath);
  system.startMapId = mapId;
  system.startX = x;
  system.startY = y;

  const systemPath = getDataPath(projectPath, 'System.json');
  await writeJsonFile(systemPath, system);
}

/**
 * Get game title
 */
export async function getGameTitle(projectPath: string): Promise<string> {
  const system = await getSystem(projectPath);
  return system.gameTitle;
}

/**
 * Update game title
 */
export async function updateGameTitle(projectPath: string, title: string): Promise<void> {
  const system = await getSystem(projectPath);
  system.gameTitle = title;

  const systemPath = getDataPath(projectPath, 'System.json');
  await writeJsonFile(systemPath, system);
}

/**
 * Get all terms (vocabulary)
 */
export async function getTerms(projectPath: string): Promise<any> {
  const system = await getSystem(projectPath);
  return system.terms;
}

/**
 * Update a basic term
 */
export async function updateBasicTerm(
  projectPath: string,
  index: number,
  value: string
): Promise<void> {
  const system = await getSystem(projectPath);
  system.terms.basic[index] = value;

  const systemPath = getDataPath(projectPath, 'System.json');
  await writeJsonFile(systemPath, system);
}

/**
 * Update a command term
 */
export async function updateCommandTerm(
  projectPath: string,
  index: number,
  value: string
): Promise<void> {
  const system = await getSystem(projectPath);
  system.terms.commands[index] = value;

  const systemPath = getDataPath(projectPath, 'System.json');
  await writeJsonFile(systemPath, system);
}
