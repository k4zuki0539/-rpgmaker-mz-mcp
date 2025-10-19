import { readJsonFile, writeJsonFile, getDataPath } from '../utils/fileHandler.js';
import { Item, Weapon, Armor, Skill } from '../utils/types.js';

/**
 * Get all items from the project
 */
export async function getItems(projectPath: string): Promise<Item[]> {
  const itemsPath = getDataPath(projectPath, 'Items.json');
  return await readJsonFile<Item[]>(itemsPath);
}

/**
 * Get all weapons from the project
 */
export async function getWeapons(projectPath: string): Promise<Weapon[]> {
  const weaponsPath = getDataPath(projectPath, 'Weapons.json');
  return await readJsonFile<Weapon[]>(weaponsPath);
}

/**
 * Get all armors from the project
 */
export async function getArmors(projectPath: string): Promise<Armor[]> {
  const armorsPath = getDataPath(projectPath, 'Armors.json');
  return await readJsonFile<Armor[]>(armorsPath);
}

/**
 * Get all skills from the project
 */
export async function getSkills(projectPath: string): Promise<Skill[]> {
  const skillsPath = getDataPath(projectPath, 'Skills.json');
  return await readJsonFile<Skill[]>(skillsPath);
}

/**
 * Get a specific item by ID
 */
export async function getItem(projectPath: string, itemId: number): Promise<Item | null> {
  const items = await getItems(projectPath);
  return items.find(item => item && item.id === itemId) || null;
}

/**
 * Update an item's data
 */
export async function updateItem(
  projectPath: string,
  itemId: number,
  updates: Partial<Item>
): Promise<Item> {
  const items = await getItems(projectPath);
  const itemIndex = items.findIndex(item => item && item.id === itemId);

  if (itemIndex === -1) {
    throw new Error(`Item with ID ${itemId} not found`);
  }

  items[itemIndex] = { ...items[itemIndex], ...updates };

  const itemsPath = getDataPath(projectPath, 'Items.json');
  await writeJsonFile(itemsPath, items);

  return items[itemIndex];
}

/**
 * Create a new item
 */
export async function createItem(
  projectPath: string,
  itemData: Omit<Item, 'id'>
): Promise<Item> {
  const items = await getItems(projectPath);

  const maxId = items.reduce((max, item) => {
    return item && item.id > max ? item.id : max;
  }, 0);

  const newItem: Item = {
    id: maxId + 1,
    ...itemData
  };

  items.push(newItem);

  const itemsPath = getDataPath(projectPath, 'Items.json');
  await writeJsonFile(itemsPath, items);

  return newItem;
}

/**
 * Update a weapon's data
 */
export async function updateWeapon(
  projectPath: string,
  weaponId: number,
  updates: Partial<Weapon>
): Promise<Weapon> {
  const weapons = await getWeapons(projectPath);
  const weaponIndex = weapons.findIndex(weapon => weapon && weapon.id === weaponId);

  if (weaponIndex === -1) {
    throw new Error(`Weapon with ID ${weaponId} not found`);
  }

  weapons[weaponIndex] = { ...weapons[weaponIndex], ...updates };

  const weaponsPath = getDataPath(projectPath, 'Weapons.json');
  await writeJsonFile(weaponsPath, weapons);

  return weapons[weaponIndex];
}

/**
 * Update an armor's data
 */
export async function updateArmor(
  projectPath: string,
  armorId: number,
  updates: Partial<Armor>
): Promise<Armor> {
  const armors = await getArmors(projectPath);
  const armorIndex = armors.findIndex(armor => armor && armor.id === armorId);

  if (armorIndex === -1) {
    throw new Error(`Armor with ID ${armorId} not found`);
  }

  armors[armorIndex] = { ...armors[armorIndex], ...updates };

  const armorsPath = getDataPath(projectPath, 'Armors.json');
  await writeJsonFile(armorsPath, armors);

  return armors[armorIndex];
}

/**
 * Update a skill's data
 */
export async function updateSkill(
  projectPath: string,
  skillId: number,
  updates: Partial<Skill>
): Promise<Skill> {
  const skills = await getSkills(projectPath);
  const skillIndex = skills.findIndex(skill => skill && skill.id === skillId);

  if (skillIndex === -1) {
    throw new Error(`Skill with ID ${skillId} not found`);
  }

  skills[skillIndex] = { ...skills[skillIndex], ...updates };

  const skillsPath = getDataPath(projectPath, 'Skills.json');
  await writeJsonFile(skillsPath, skills);

  return skills[skillIndex];
}

/**
 * Search items by name or description
 */
export async function searchItems(projectPath: string, searchTerm: string): Promise<Item[]> {
  const items = await getItems(projectPath);
  const lowerSearchTerm = searchTerm.toLowerCase();

  return items.filter(item =>
    item && (
      item.name.toLowerCase().includes(lowerSearchTerm) ||
      item.description.toLowerCase().includes(lowerSearchTerm)
    )
  );
}
