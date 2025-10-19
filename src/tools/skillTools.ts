import { readJsonFile, writeJsonFile, getDataPath } from '../utils/fileHandler.js';
import { Skill } from '../utils/types.js';

/**
 * Get all skills from the project
 */
export async function getSkills(projectPath: string): Promise<Skill[]> {
  const skillsPath = getDataPath(projectPath, 'Skills.json');
  return await readJsonFile<Skill[]>(skillsPath);
}

/**
 * Get a specific skill by ID
 */
export async function getSkill(projectPath: string, skillId: number): Promise<Skill | null> {
  const skills = await getSkills(projectPath);
  return skills.find(skill => skill && skill.id === skillId) || null;
}

/**
 * Create a new skill
 */
export async function createSkill(
  projectPath: string,
  skillData: {
    name: string;
    description?: string;
    iconIndex?: number;
    mpCost?: number;
    tpCost?: number;
    scope?: number;
    damage?: {
      type: number;
      elementId: number;
      formula: string;
      variance?: number;
      critical?: boolean;
    };
    effects?: Array<{
      code: number;
      dataId: number;
      value1: number;
      value2: number;
    }>;
    animationId?: number;
    message1?: string;
    stypeId?: number;
  }
): Promise<Skill> {
  const skills = await getSkills(projectPath);

  // Find the next available ID
  const maxId = skills.reduce((max, skill) => {
    return skill && skill.id > max ? skill.id : max;
  }, 0);

  const newSkill: Skill = {
    id: maxId + 1,
    name: skillData.name,
    description: skillData.description || '',
    iconIndex: skillData.iconIndex || 64,
    mpCost: skillData.mpCost || 0,
    tpCost: skillData.tpCost || 0,
    tpGain: 0,
    scope: skillData.scope || 1, // Default: enemy single
    occasion: 1, // Battle only
    speed: 0,
    successRate: 100,
    repeats: 1,
    hitType: skillData.damage?.type === 1 || skillData.damage?.type === 5 ? 1 : 2,
    animationId: skillData.animationId || 0,
    damage: {
      type: skillData.damage?.type || 0,
      elementId: skillData.damage?.elementId || 0,
      formula: skillData.damage?.formula || '0',
      variance: skillData.damage?.variance !== undefined ? skillData.damage.variance : 20,
      critical: skillData.damage?.critical !== undefined ? skillData.damage.critical : false
    },
    effects: skillData.effects || [],
    message1: skillData.message1 || '',
    message2: '',
    note: '',
    stypeId: skillData.stypeId || 1, // Default: Magic
    requiredWtypeId1: 0,
    requiredWtypeId2: 0,
    messageType: 1,
    traits: []
  };

  skills.push(newSkill);

  const skillsPath = getDataPath(projectPath, 'Skills.json');
  await writeJsonFile(skillsPath, skills);

  return newSkill;
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
 * Delete a skill
 */
export async function deleteSkill(projectPath: string, skillId: number): Promise<boolean> {
  const skills = await getSkills(projectPath);
  const skillIndex = skills.findIndex(skill => skill && skill.id === skillId);

  if (skillIndex === -1) {
    return false;
  }

  // Don't delete core skills (1, 2)
  if (skillId === 1 || skillId === 2) {
    throw new Error('Cannot delete core skills (Attack/Guard)');
  }

  skills[skillIndex] = null as any;

  const skillsPath = getDataPath(projectPath, 'Skills.json');
  await writeJsonFile(skillsPath, skills);

  return true;
}

/**
 * Search skills by name
 */
export async function searchSkills(projectPath: string, searchTerm: string): Promise<Skill[]> {
  const skills = await getSkills(projectPath);
  const lowerSearchTerm = searchTerm.toLowerCase();

  return skills.filter(skill =>
    skill && (
      skill.name.toLowerCase().includes(lowerSearchTerm) ||
      skill.description.toLowerCase().includes(lowerSearchTerm)
    )
  );
}

/**
 * Create a damage skill (attack spell or physical skill)
 */
export async function createDamageSkill(
  projectPath: string,
  name: string,
  damageFormula: string,
  mpCost: number,
  scope: number,
  elementId?: number,
  description?: string
): Promise<Skill> {
  return await createSkill(projectPath, {
    name,
    description: description || `${name}を使用する`,
    mpCost,
    scope,
    damage: {
      type: 1, // HP damage
      elementId: elementId || 0,
      formula: damageFormula,
      variance: 20,
      critical: true
    },
    animationId: 1,
    message1: `%1は${name}を放った！`,
    stypeId: 1 // Magic
  });
}

/**
 * Create a healing skill
 */
export async function createHealingSkill(
  projectPath: string,
  name: string,
  healFormula: string,
  mpCost: number,
  scope: number,
  description?: string
): Promise<Skill> {
  return await createSkill(projectPath, {
    name,
    description: description || `${name}でHPを回復する`,
    mpCost,
    scope,
    damage: {
      type: 3, // HP recovery
      elementId: 0,
      formula: healFormula,
      variance: 20,
      critical: false
    },
    animationId: 47,
    message1: `%1は${name}を唱えた！`,
    stypeId: 1,
    iconIndex: 72
  });
}

/**
 * Create a buff skill
 */
export async function createBuffSkill(
  projectPath: string,
  name: string,
  buffType: number,
  turns: number,
  mpCost: number,
  scope: number,
  description?: string
): Promise<Skill> {
  return await createSkill(projectPath, {
    name,
    description: description || `${name}で能力を強化する`,
    mpCost,
    scope,
    effects: [
      {
        code: 31, // Add buff
        dataId: buffType,
        value1: turns,
        value2: 0
      }
    ],
    animationId: 52,
    message1: `%1は${name}を使った！`,
    stypeId: 1,
    iconIndex: 73
  });
}

/**
 * Create a debuff skill
 */
export async function createDebuffSkill(
  projectPath: string,
  name: string,
  debuffType: number,
  turns: number,
  mpCost: number,
  scope: number,
  description?: string
): Promise<Skill> {
  return await createSkill(projectPath, {
    name,
    description: description || `${name}で敵を弱体化する`,
    mpCost,
    scope,
    effects: [
      {
        code: 32, // Add debuff
        dataId: debuffType,
        value1: turns,
        value2: 0
      }
    ],
    animationId: 40,
    message1: `%1は${name}を放った！`,
    stypeId: 1,
    iconIndex: 74
  });
}

/**
 * Create a state-inflicting skill
 */
export async function createStateSkill(
  projectPath: string,
  name: string,
  stateId: number,
  chance: number,
  mpCost: number,
  scope: number,
  description?: string
): Promise<Skill> {
  return await createSkill(projectPath, {
    name,
    description: description || `${name}で状態異常を付与する`,
    mpCost,
    scope,
    effects: [
      {
        code: 21, // Add state
        dataId: stateId,
        value1: chance,
        value2: 0
      }
    ],
    damage: {
      type: 0,
      elementId: 0,
      formula: '0',
      variance: 20,
      critical: false
    },
    animationId: 1,
    message1: `%1は${name}を使った！`,
    stypeId: 1
  });
}
