#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

import { validateProjectPath } from './utils/fileHandler.js';
import * as actorTools from './tools/actorTools.js';
import * as itemTools from './tools/itemTools.js';
import * as mapTools from './tools/mapTools.js';
import * as systemTools from './tools/systemTools.js';

/**
 * RPG Maker MZ MCP Server
 *
 * A high-quality Model Context Protocol server for RPG Maker MZ integration.
 * Provides comprehensive tools for managing game data, maps, events, and system settings.
 */

// Global project path - should be set via environment variable
const PROJECT_PATH = process.env.RPGMAKER_PROJECT_PATH || '';

class RPGMakerMZServer {
  private server: Server;
  private projectPath: string;

  constructor() {
    this.server = new Server(
      {
        name: 'rpgmaker-mz-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.projectPath = PROJECT_PATH;
    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.getToolDefinitions(),
      };
    });

    // Handle tool execution
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        if (!this.projectPath) {
          throw new Error('RPGMAKER_PROJECT_PATH environment variable not set');
        }

        const isValid = await validateProjectPath(this.projectPath);
        if (!isValid) {
          throw new Error('Invalid RPG Maker MZ project path');
        }

        return await this.handleToolCall(request.params.name, request.params.arguments || {});
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
        };
      }
    });
  }

  private getToolDefinitions(): Tool[] {
    return [
      // Actor Tools
      {
        name: 'get_actors',
        description: 'Get all actors from the RPG Maker MZ project',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_actor',
        description: 'Get a specific actor by ID',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: {
              type: 'number',
              description: 'The ID of the actor to retrieve',
            },
          },
          required: ['actorId'],
        },
      },
      {
        name: 'update_actor',
        description: 'Update an actor\'s properties',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: {
              type: 'number',
              description: 'The ID of the actor to update',
            },
            updates: {
              type: 'object',
              description: 'Object containing properties to update',
            },
          },
          required: ['actorId', 'updates'],
        },
      },
      {
        name: 'create_actor',
        description: 'Create a new actor',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            nickname: { type: 'string' },
            profile: { type: 'string' },
            classId: { type: 'number' },
            initialLevel: { type: 'number' },
            maxLevel: { type: 'number' },
            characterName: { type: 'string' },
            characterIndex: { type: 'number' },
            faceName: { type: 'string' },
            faceIndex: { type: 'number' },
            battlerName: { type: 'string' },
            traits: { type: 'array' },
            equips: { type: 'array' },
            note: { type: 'string' },
          },
          required: ['name'],
        },
      },
      {
        name: 'search_actors',
        description: 'Search actors by name or nickname',
        inputSchema: {
          type: 'object',
          properties: {
            searchTerm: {
              type: 'string',
              description: 'The search term to find actors',
            },
          },
          required: ['searchTerm'],
        },
      },

      // Item Tools
      {
        name: 'get_items',
        description: 'Get all items from the project',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_weapons',
        description: 'Get all weapons from the project',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_armors',
        description: 'Get all armors from the project',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_skills',
        description: 'Get all skills from the project',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'update_item',
        description: 'Update an item\'s properties',
        inputSchema: {
          type: 'object',
          properties: {
            itemId: { type: 'number' },
            updates: { type: 'object' },
          },
          required: ['itemId', 'updates'],
        },
      },
      {
        name: 'search_items',
        description: 'Search items by name or description',
        inputSchema: {
          type: 'object',
          properties: {
            searchTerm: { type: 'string' },
          },
          required: ['searchTerm'],
        },
      },

      // Map Tools
      {
        name: 'get_map',
        description: 'Get map data by ID',
        inputSchema: {
          type: 'object',
          properties: {
            mapId: {
              type: 'number',
              description: 'The ID of the map to retrieve',
            },
          },
          required: ['mapId'],
        },
      },
      {
        name: 'get_map_infos',
        description: 'Get information about all maps',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_map_events',
        description: 'Get all events from a specific map',
        inputSchema: {
          type: 'object',
          properties: {
            mapId: { type: 'number' },
          },
          required: ['mapId'],
        },
      },
      {
        name: 'get_map_event',
        description: 'Get a specific event from a map',
        inputSchema: {
          type: 'object',
          properties: {
            mapId: { type: 'number' },
            eventId: { type: 'number' },
          },
          required: ['mapId', 'eventId'],
        },
      },
      {
        name: 'update_map_event',
        description: 'Update a map event\'s properties',
        inputSchema: {
          type: 'object',
          properties: {
            mapId: { type: 'number' },
            eventId: { type: 'number' },
            updates: { type: 'object' },
          },
          required: ['mapId', 'eventId', 'updates'],
        },
      },
      {
        name: 'create_map_event',
        description: 'Create a new event on a map',
        inputSchema: {
          type: 'object',
          properties: {
            mapId: { type: 'number' },
            name: { type: 'string' },
            x: { type: 'number' },
            y: { type: 'number' },
            note: { type: 'string' },
            pages: { type: 'array' },
          },
          required: ['mapId', 'name', 'x', 'y', 'pages'],
        },
      },
      {
        name: 'search_map_events',
        description: 'Search events on a map by name',
        inputSchema: {
          type: 'object',
          properties: {
            mapId: { type: 'number' },
            searchTerm: { type: 'string' },
          },
          required: ['mapId', 'searchTerm'],
        },
      },
      {
        name: 'add_event_command',
        description: 'Add a command to an event page',
        inputSchema: {
          type: 'object',
          properties: {
            mapId: { type: 'number' },
            eventId: { type: 'number' },
            pageIndex: { type: 'number' },
            command: {
              type: 'object',
              properties: {
                code: { type: 'number' },
                indent: { type: 'number' },
                parameters: { type: 'array' },
              },
            },
            position: { type: 'number' },
          },
          required: ['mapId', 'eventId', 'pageIndex', 'command'],
        },
      },

      // System Tools
      {
        name: 'get_system',
        description: 'Get system data',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_variables',
        description: 'Get all game variable names',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'set_variable_name',
        description: 'Set a variable name',
        inputSchema: {
          type: 'object',
          properties: {
            variableId: { type: 'number' },
            name: { type: 'string' },
          },
          required: ['variableId', 'name'],
        },
      },
      {
        name: 'get_switches',
        description: 'Get all game switch names',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'set_switch_name',
        description: 'Set a switch name',
        inputSchema: {
          type: 'object',
          properties: {
            switchId: { type: 'number' },
            name: { type: 'string' },
          },
          required: ['switchId', 'name'],
        },
      },
      {
        name: 'get_game_title',
        description: 'Get the game title',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'update_game_title',
        description: 'Update the game title',
        inputSchema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
          },
          required: ['title'],
        },
      },
      {
        name: 'update_starting_position',
        description: 'Update the game starting position',
        inputSchema: {
          type: 'object',
          properties: {
            mapId: { type: 'number' },
            x: { type: 'number' },
            y: { type: 'number' },
          },
          required: ['mapId', 'x', 'y'],
        },
      },
    ];
  }

  private async handleToolCall(name: string, args: any): Promise<any> {
    const result = await this.executeToolFunction(name, args);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  private async executeToolFunction(name: string, args: any): Promise<any> {
    switch (name) {
      // Actor Tools
      case 'get_actors':
        return await actorTools.getActors(this.projectPath);
      case 'get_actor':
        return await actorTools.getActor(this.projectPath, args.actorId);
      case 'update_actor':
        return await actorTools.updateActor(this.projectPath, args.actorId, args.updates);
      case 'create_actor':
        return await actorTools.createActor(this.projectPath, args);
      case 'search_actors':
        return await actorTools.searchActors(this.projectPath, args.searchTerm);

      // Item Tools
      case 'get_items':
        return await itemTools.getItems(this.projectPath);
      case 'get_weapons':
        return await itemTools.getWeapons(this.projectPath);
      case 'get_armors':
        return await itemTools.getArmors(this.projectPath);
      case 'get_skills':
        return await itemTools.getSkills(this.projectPath);
      case 'update_item':
        return await itemTools.updateItem(this.projectPath, args.itemId, args.updates);
      case 'search_items':
        return await itemTools.searchItems(this.projectPath, args.searchTerm);

      // Map Tools
      case 'get_map':
        return await mapTools.getMap(this.projectPath, args.mapId);
      case 'get_map_infos':
        return await mapTools.getMapInfos(this.projectPath);
      case 'get_map_events':
        return await mapTools.getMapEvents(this.projectPath, args.mapId);
      case 'get_map_event':
        return await mapTools.getMapEvent(this.projectPath, args.mapId, args.eventId);
      case 'update_map_event':
        return await mapTools.updateMapEvent(this.projectPath, args.mapId, args.eventId, args.updates);
      case 'create_map_event':
        return await mapTools.createMapEvent(this.projectPath, args.mapId, args);
      case 'search_map_events':
        return await mapTools.searchMapEvents(this.projectPath, args.mapId, args.searchTerm);
      case 'add_event_command':
        return await mapTools.addEventCommand(
          this.projectPath,
          args.mapId,
          args.eventId,
          args.pageIndex,
          args.command,
          args.position
        );

      // System Tools
      case 'get_system':
        return await systemTools.getSystem(this.projectPath);
      case 'get_variables':
        return await systemTools.getVariables(this.projectPath);
      case 'set_variable_name':
        await systemTools.setVariableName(this.projectPath, args.variableId, args.name);
        return { success: true };
      case 'get_switches':
        return await systemTools.getSwitches(this.projectPath);
      case 'set_switch_name':
        await systemTools.setSwitchName(this.projectPath, args.switchId, args.name);
        return { success: true };
      case 'get_game_title':
        return await systemTools.getGameTitle(this.projectPath);
      case 'update_game_title':
        await systemTools.updateGameTitle(this.projectPath, args.title);
        return { success: true };
      case 'update_starting_position':
        await systemTools.updateStartingPosition(this.projectPath, args.mapId, args.x, args.y);
        return { success: true };

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('RPG Maker MZ MCP server running on stdio');
  }
}

// Start the server
const server = new RPGMakerMZServer();
server.run().catch(console.error);
