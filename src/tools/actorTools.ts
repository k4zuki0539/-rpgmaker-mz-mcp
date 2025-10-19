import { readJsonFile, writeJsonFile, getDataPath } from '../utils/fileHandler.js';
import { Actor } from '../utils/types.js';

/**
 * Get all actors from the project
 */
export async function getActors(projectPath: string): Promise<Actor[]> {
  const actorsPath = getDataPath(projectPath, 'Actors.json');
  return await readJsonFile<Actor[]>(actorsPath);
}

/**
 * Get a specific actor by ID
 */
export async function getActor(projectPath: string, actorId: number): Promise<Actor | null> {
  const actors = await getActors(projectPath);
  return actors.find(actor => actor && actor.id === actorId) || null;
}

/**
 * Update an actor's data
 */
export async function updateActor(
  projectPath: string,
  actorId: number,
  updates: Partial<Actor>
): Promise<Actor> {
  const actors = await getActors(projectPath);
  const actorIndex = actors.findIndex(actor => actor && actor.id === actorId);

  if (actorIndex === -1) {
    throw new Error(`Actor with ID ${actorId} not found`);
  }

  actors[actorIndex] = { ...actors[actorIndex], ...updates };

  const actorsPath = getDataPath(projectPath, 'Actors.json');
  await writeJsonFile(actorsPath, actors);

  return actors[actorIndex];
}

/**
 * Create a new actor
 */
export async function createActor(
  projectPath: string,
  actorData: Omit<Actor, 'id'>
): Promise<Actor> {
  const actors = await getActors(projectPath);

  // Find the next available ID
  const maxId = actors.reduce((max, actor) => {
    return actor && actor.id > max ? actor.id : max;
  }, 0);

  const newActor: Actor = {
    id: maxId + 1,
    ...actorData
  };

  actors.push(newActor);

  const actorsPath = getDataPath(projectPath, 'Actors.json');
  await writeJsonFile(actorsPath, actors);

  return newActor;
}

/**
 * Delete an actor
 */
export async function deleteActor(projectPath: string, actorId: number): Promise<boolean> {
  const actors = await getActors(projectPath);
  const actorIndex = actors.findIndex(actor => actor && actor.id === actorId);

  if (actorIndex === -1) {
    return false;
  }

  actors[actorIndex] = null as any;

  const actorsPath = getDataPath(projectPath, 'Actors.json');
  await writeJsonFile(actorsPath, actors);

  return true;
}

/**
 * Search actors by name
 */
export async function searchActors(projectPath: string, searchTerm: string): Promise<Actor[]> {
  const actors = await getActors(projectPath);
  const lowerSearchTerm = searchTerm.toLowerCase();

  return actors.filter(actor =>
    actor && (
      actor.name.toLowerCase().includes(lowerSearchTerm) ||
      actor.nickname.toLowerCase().includes(lowerSearchTerm)
    )
  );
}
