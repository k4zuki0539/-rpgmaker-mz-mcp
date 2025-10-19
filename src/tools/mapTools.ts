import { readJsonFile, writeJsonFile, getMapPath, getDataPath } from '../utils/fileHandler.js';
import { MapData, MapEvent, EventCommand } from '../utils/types.js';

/**
 * Get map data by ID
 */
export async function getMap(projectPath: string, mapId: number): Promise<MapData> {
  const mapPath = getMapPath(projectPath, mapId);
  return await readJsonFile<MapData>(mapPath);
}

/**
 * Get all map info
 */
export async function getMapInfos(projectPath: string): Promise<any[]> {
  const mapInfosPath = getDataPath(projectPath, 'MapInfos.json');
  return await readJsonFile<any[]>(mapInfosPath);
}

/**
 * Update map properties
 */
export async function updateMap(
  projectPath: string,
  mapId: number,
  updates: Partial<MapData>
): Promise<MapData> {
  const map = await getMap(projectPath, mapId);
  const updatedMap = { ...map, ...updates };

  const mapPath = getMapPath(projectPath, mapId);
  await writeJsonFile(mapPath, updatedMap);

  return updatedMap;
}

/**
 * Get events from a specific map
 */
export async function getMapEvents(projectPath: string, mapId: number): Promise<(MapEvent | null)[]> {
  const map = await getMap(projectPath, mapId);
  return map.events;
}

/**
 * Get a specific event from a map
 */
export async function getMapEvent(
  projectPath: string,
  mapId: number,
  eventId: number
): Promise<MapEvent | null> {
  const events = await getMapEvents(projectPath, mapId);
  return events[eventId] || null;
}

/**
 * Update a map event
 */
export async function updateMapEvent(
  projectPath: string,
  mapId: number,
  eventId: number,
  updates: Partial<MapEvent>
): Promise<MapEvent> {
  const map = await getMap(projectPath, mapId);

  if (!map.events[eventId]) {
    throw new Error(`Event ${eventId} not found on map ${mapId}`);
  }

  map.events[eventId] = { ...map.events[eventId]!, ...updates };

  const mapPath = getMapPath(projectPath, mapId);
  await writeJsonFile(mapPath, map);

  return map.events[eventId]!;
}

/**
 * Create a new event on a map
 */
export async function createMapEvent(
  projectPath: string,
  mapId: number,
  eventData: Omit<MapEvent, 'id'>
): Promise<MapEvent> {
  const map = await getMap(projectPath, mapId);

  // Find the next available event ID
  const maxId = map.events.reduce((max, event, index) => {
    return event && index > max ? index : max;
  }, 0);

  const newEvent: MapEvent = {
    id: maxId + 1,
    ...eventData
  };

  map.events[maxId + 1] = newEvent;

  const mapPath = getMapPath(projectPath, mapId);
  await writeJsonFile(mapPath, map);

  return newEvent;
}

/**
 * Delete an event from a map
 */
export async function deleteMapEvent(
  projectPath: string,
  mapId: number,
  eventId: number
): Promise<boolean> {
  const map = await getMap(projectPath, mapId);

  if (!map.events[eventId]) {
    return false;
  }

  map.events[eventId] = null;

  const mapPath = getMapPath(projectPath, mapId);
  await writeJsonFile(mapPath, map);

  return true;
}

/**
 * Search events by name
 */
export async function searchMapEvents(
  projectPath: string,
  mapId: number,
  searchTerm: string
): Promise<MapEvent[]> {
  const events = await getMapEvents(projectPath, mapId);
  const lowerSearchTerm = searchTerm.toLowerCase();

  return events.filter(event =>
    event && event.name.toLowerCase().includes(lowerSearchTerm)
  ) as MapEvent[];
}

/**
 * Add a command to an event page
 */
export async function addEventCommand(
  projectPath: string,
  mapId: number,
  eventId: number,
  pageIndex: number,
  command: EventCommand,
  position?: number
): Promise<MapEvent> {
  const map = await getMap(projectPath, mapId);

  if (!map.events[eventId]) {
    throw new Error(`Event ${eventId} not found on map ${mapId}`);
  }

  const event = map.events[eventId]!;

  if (!event.pages[pageIndex]) {
    throw new Error(`Page ${pageIndex} not found on event ${eventId}`);
  }

  const commandList = event.pages[pageIndex].list;

  if (position !== undefined && position >= 0 && position < commandList.length - 1) {
    // Insert at specific position (before the end command)
    commandList.splice(position, 0, command);
  } else {
    // Add before the end command (code 0)
    commandList.splice(commandList.length - 1, 0, command);
  }

  const mapPath = getMapPath(projectPath, mapId);
  await writeJsonFile(mapPath, map);

  return event;
}

/**
 * Get map dimensions
 */
export async function getMapDimensions(
  projectPath: string,
  mapId: number
): Promise<{ width: number; height: number }> {
  const map = await getMap(projectPath, mapId);
  return {
    width: map.width,
    height: map.height
  };
}

/**
 * Set map tile at specific position
 */
export async function setMapTile(
  projectPath: string,
  mapId: number,
  x: number,
  y: number,
  layer: number,
  tileId: number
): Promise<void> {
  const map = await getMap(projectPath, mapId);

  if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
    throw new Error(`Position (${x}, ${y}) is out of map bounds`);
  }

  // RPG Maker MZ stores tiles in a 1D array with 6 layers
  // Index = (layer * height + y) * width + x
  const index = (layer * map.height + y) * map.width + x;
  map.data[index] = tileId;

  const mapPath = getMapPath(projectPath, mapId);
  await writeJsonFile(mapPath, map);
}
