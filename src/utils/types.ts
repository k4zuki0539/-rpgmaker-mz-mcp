/**
 * Type definitions for RPG Maker MZ data structures
 */

export interface Actor {
  id: number;
  name: string;
  nickname: string;
  profile: string;
  classId: number;
  initialLevel: number;
  maxLevel: number;
  characterName: string;
  characterIndex: number;
  faceName: string;
  faceIndex: number;
  battlerName: string;
  traits: Trait[];
  equips: number[];
  note: string;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  iconIndex: number;
  itypeId: number;
  price: number;
  consumable: boolean;
  effects: Effect[];
  traits: Trait[];
  note: string;
}

export interface Skill {
  id: number;
  name: string;
  description: string;
  iconIndex: number;
  stypeId: number;
  mpCost: number;
  tpCost: number;
  scope: number;
  occasion: number;
  speed: number;
  successRate: number;
  repeats: number;
  tpGain: number;
  hitType: number;
  animationId: number;
  damage: Damage;
  effects: Effect[];
  note: string;
  message1: string;
  message2: string;
  requiredWtypeId1: number;
  requiredWtypeId2: number;
  messageType: number;
  traits: Trait[];
}

export interface Weapon {
  id: number;
  name: string;
  description: string;
  iconIndex: number;
  wtypeId: number;
  price: number;
  params: number[];
  traits: Trait[];
  etypeId: number;
  animationId: number;
  note: string;
}

export interface Armor {
  id: number;
  name: string;
  description: string;
  iconIndex: number;
  atypeId: number;
  price: number;
  params: number[];
  traits: Trait[];
  etypeId: number;
  note: string;
}

export interface Enemy {
  id: number;
  name: string;
  battlerName: string;
  battlerHue: number;
  params: number[];
  exp: number;
  gold: number;
  dropItems: DropItem[];
  actions: EnemyAction[];
  traits: Trait[];
  note: string;
}

export interface Trait {
  code: number;
  dataId: number;
  value: number;
}

export interface Effect {
  code: number;
  dataId: number;
  value1: number;
  value2: number;
}

export interface Damage {
  type: number;
  elementId: number;
  formula: string;
  variance: number;
  critical: boolean;
}

export interface DropItem {
  kind: number;
  dataId: number;
  denominator: number;
}

export interface EnemyAction {
  skillId: number;
  conditionType: number;
  conditionParam1: number;
  conditionParam2: number;
  rating: number;
}

export interface MapData {
  autoplayBgm: boolean;
  autoplayBgs: boolean;
  battleback1Name: string;
  battleback2Name: string;
  bgm: AudioFile;
  bgs: AudioFile;
  disableDashing: boolean;
  displayName: string;
  encounterList: Encounter[];
  encounterStep: number;
  height: number;
  width: number;
  parallaxLoopX: boolean;
  parallaxLoopY: boolean;
  parallaxName: string;
  parallaxShow: boolean;
  parallaxSx: number;
  parallaxSy: number;
  scrollType: number;
  specifyBattleback: boolean;
  tilesetId: number;
  data: number[];
  events: (MapEvent | null)[];
}

export interface MapEvent {
  id: number;
  name: string;
  note: string;
  pages: EventPage[];
  x: number;
  y: number;
}

export interface EventPage {
  conditions: EventConditions;
  directionFix: boolean;
  image: EventImage;
  list: EventCommand[];
  moveFrequency: number;
  moveRoute: MoveRoute;
  moveSpeed: number;
  moveType: number;
  priorityType: number;
  stepAnime: boolean;
  through: boolean;
  trigger: number;
  walkAnime: boolean;
}

export interface EventConditions {
  actorId: number;
  actorValid: boolean;
  itemId: number;
  itemValid: boolean;
  selfSwitchCh: string;
  selfSwitchValid: boolean;
  switch1Id: number;
  switch1Valid: boolean;
  switch2Id: number;
  switch2Valid: boolean;
  variableId: number;
  variableValid: boolean;
  variableValue: number;
}

export interface EventImage {
  characterIndex: number;
  characterName: string;
  direction: number;
  pattern: number;
  tileId: number;
}

export interface EventCommand {
  code: number;
  indent: number;
  parameters: any[];
}

export interface MoveRoute {
  list: MoveCommand[];
  repeat: boolean;
  skippable: boolean;
  wait: boolean;
}

export interface MoveCommand {
  code: number;
  parameters: any[];
}

export interface AudioFile {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}

export interface Encounter {
  regionSet: number[];
  troopId: number;
  weight: number;
}

export interface SystemData {
  airship: Vehicle;
  armorTypes: string[];
  attackMotions: AttackMotion[];
  battleBgm: AudioFile;
  battleback1Name: string;
  battleback2Name: string;
  battlerHue: number;
  battlerName: string;
  boat: Vehicle;
  currencyUnit: string;
  defeatMe: AudioFile;
  editMapId: number;
  elements: string[];
  equipTypes: string[];
  gameTitle: string;
  gameoverMe: AudioFile;
  locale: string;
  magicSkills: number[];
  menuCommands: boolean[];
  optDisplayTp: boolean;
  optDrawTitle: boolean;
  optExtraExp: boolean;
  optFloorDeath: boolean;
  optFollowers: boolean;
  optSideView: boolean;
  optSlipDeath: boolean;
  optTransparent: boolean;
  partyMembers: number[];
  ship: Vehicle;
  skillTypes: string[];
  sounds: AudioFile[];
  startMapId: number;
  startX: number;
  startY: number;
  switches: string[];
  terms: Terms;
  testBattlers: TestBattler[];
  testTroopId: number;
  title1Name: string;
  title2Name: string;
  titleBgm: AudioFile;
  variables: string[];
  versionId: number;
  victoryMe: AudioFile;
  weaponTypes: string[];
  windowTone: number[];
}

export interface Vehicle {
  bgm: AudioFile;
  characterIndex: number;
  characterName: string;
  startMapId: number;
  startX: number;
  startY: number;
}

export interface AttackMotion {
  type: number;
  weaponImageId: number;
}

export interface Terms {
  basic: string[];
  commands: string[];
  params: string[];
  messages: { [key: string]: string };
}

export interface TestBattler {
  actorId: number;
  equips: number[];
  level: number;
}
