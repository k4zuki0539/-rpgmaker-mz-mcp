import { readFile, writeFile, readdir } from 'fs/promises';
import { join, extname } from 'path';

/**
 * Read and parse a JSON file from RPG Maker MZ project
 */
export async function readJsonFile<T>(filePath: string): Promise<T> {
  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    throw new Error(`Failed to read JSON file ${filePath}: ${error}`);
  }
}

/**
 * Write JSON data to a file with proper formatting
 */
export async function writeJsonFile(filePath: string, data: any): Promise<void> {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await writeFile(filePath, jsonString, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to write JSON file ${filePath}: ${error}`);
  }
}

/**
 * List all files in a directory with a specific extension
 */
export async function listFiles(dirPath: string, extension: string): Promise<string[]> {
  try {
    const files = await readdir(dirPath);
    return files.filter(file => extname(file) === extension);
  } catch (error) {
    throw new Error(`Failed to list files in ${dirPath}: ${error}`);
  }
}

/**
 * Get the full path to a data file in RPG Maker MZ project
 */
export function getDataPath(projectPath: string, fileName: string): string {
  return join(projectPath, 'data', fileName);
}

/**
 * Get the full path to a map file in RPG Maker MZ project
 */
export function getMapPath(projectPath: string, mapId: number): string {
  const fileName = `Map${String(mapId).padStart(3, '0')}.json`;
  return getDataPath(projectPath, fileName);
}

/**
 * Validate RPG Maker MZ project path
 */
export async function validateProjectPath(projectPath: string): Promise<boolean> {
  try {
    // Check if project has essential files
    await readFile(join(projectPath, 'game.rmmzproject'), 'utf-8');
    await readFile(getDataPath(projectPath, 'System.json'), 'utf-8');
    return true;
  } catch {
    return false;
  }
}
