# RPG Maker MZ MCP Server

A high-quality Model Context Protocol (MCP) server for RPG Maker MZ integration. This server provides comprehensive tools for managing game data, maps, events, and system settings through the MCP protocol.

## Features

- **Actor Management**: Create, read, update, and search actors
- **Item/Equipment Management**: Manage items, weapons, armors, and skills
- **Map Management**: Access and modify map data, tiles, and properties
- **Event Management**: Create, update, and manage map events and commands
- **System Configuration**: Update game settings, variables, switches, and vocabulary
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Error Handling**: Robust error handling and validation

## Installation

```bash
npm install
npm run build
```

## Configuration

Set the RPG Maker MZ project path as an environment variable:

```bash
# Windows
set RPGMAKER_PROJECT_PATH=C:\path\to\your\rpgmaker\project

# macOS/Linux
export RPGMAKER_PROJECT_PATH=/path/to/your/rpgmaker/project
```

## Usage

### Running the Server

```bash
npm start
```

Or directly:

```bash
node dist/index.js
```

### Configuring in Claude Desktop

Add to your Claude Desktop configuration file:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "rpgmaker-mz": {
      "command": "node",
      "args": ["C:/path/to/rpgmaker-mz-mcp/dist/index.js"],
      "env": {
        "RPGMAKER_PROJECT_PATH": "C:/path/to/your/rpgmaker/project"
      }
    }
  }
}
```

## Available Tools

### Actor Tools

- `get_actors` - Get all actors from the project
- `get_actor` - Get a specific actor by ID
- `update_actor` - Update an actor's properties
- `create_actor` - Create a new actor
- `search_actors` - Search actors by name or nickname

### Item Tools

- `get_items` - Get all items from the project
- `get_weapons` - Get all weapons from the project
- `get_armors` - Get all armors from the project
- `get_skills` - Get all skills from the project
- `update_item` - Update an item's properties
- `search_items` - Search items by name or description

### Map Tools

- `get_map` - Get map data by ID
- `get_map_infos` - Get information about all maps
- `get_map_events` - Get all events from a specific map
- `get_map_event` - Get a specific event from a map
- `update_map_event` - Update a map event's properties
- `create_map_event` - Create a new event on a map
- `search_map_events` - Search events on a map by name
- `add_event_command` - Add a command to an event page

### System Tools

- `get_system` - Get system data
- `get_variables` - Get all game variable names
- `set_variable_name` - Set a variable name
- `get_switches` - Get all game switch names
- `set_switch_name` - Set a switch name
- `get_game_title` - Get the game title
- `update_game_title` - Update the game title
- `update_starting_position` - Update the game starting position

## Example Usage

Once configured, you can use Claude to interact with your RPG Maker MZ project:

### Example 1: Get All Actors

```
Show me all actors in my RPG Maker MZ project
```

Claude will use the `get_actors` tool to retrieve and display all actors.

### Example 2: Update an Actor

```
Update actor 1's name to "Hero" and initial level to 5
```

Claude will use the `update_actor` tool with the appropriate parameters.

### Example 3: Create a New Item

```
Create a new item called "Health Potion" that restores 50 HP
```

Claude will help you create the item with the proper structure.

### Example 4: Search Map Events

```
Find all events on map 1 that contain "treasure" in their name
```

Claude will use the `search_map_events` tool to find matching events.

### Example 5: Update Game Settings

```
Change the game title to "My Epic Adventure"
```

Claude will use the `update_game_title` tool to update the system data.

## Data Structure Reference

### Actor Structure

```typescript
{
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
```

### Map Event Structure

```typescript
{
  id: number;
  name: string;
  note: string;
  pages: EventPage[];
  x: number;
  y: number;
}
```

### Event Command Structure

```typescript
{
  code: number;        // Command code (see RPG Maker MZ documentation)
  indent: number;      // Indentation level
  parameters: any[];   // Command parameters
}
```

## Common Event Command Codes

- `101` - Show Text
- `102` - Show Choices
- `111` - Conditional Branch
- `112` - Loop
- `113` - Break Loop
- `121` - Control Switches
- `122` - Control Variables
- `125` - Change Gold
- `126` - Change Items
- `201` - Transfer Player
- `356` - Plugin Command

For a complete list, refer to the RPG Maker MZ documentation.

## Development

### Building

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

## Project Structure

```
rpgmaker-mz-mcp/
├── src/
│   ├── index.ts              # Main MCP server
│   ├── tools/
│   │   ├── actorTools.ts     # Actor management functions
│   │   ├── itemTools.ts      # Item/equipment management
│   │   ├── mapTools.ts       # Map and event management
│   │   └── systemTools.ts    # System settings management
│   └── utils/
│       ├── fileHandler.ts    # File I/O utilities
│       └── types.ts          # TypeScript type definitions
├── dist/                     # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## Safety and Best Practices

1. **Backup Your Project**: Always backup your RPG Maker MZ project before making changes
2. **Close RPG Maker MZ Editor**: Close the RPG Maker MZ editor when using this server to avoid conflicts
3. **Validate Changes**: Test your game after making changes to ensure everything works correctly
4. **Version Control**: Use git or another version control system for your project

## Limitations

- This server modifies JSON files directly. Make sure the RPG Maker MZ editor is closed when using it
- Some advanced features may require manual editing in the RPG Maker MZ editor
- Plugin-specific data structures may not be fully supported

## Troubleshooting

### "Invalid RPG Maker MZ project path"

Make sure the `RPGMAKER_PROJECT_PATH` environment variable points to a valid RPG Maker MZ project directory containing:
- `game.rmmzproject` file
- `data/` directory with `System.json`

### Changes Not Appearing

1. Make sure the RPG Maker MZ editor is closed
2. Verify the project path is correct
3. Check that the JSON files have write permissions

### Tool Not Found

Restart Claude Desktop after updating the configuration file.

## Contributing

Contributions are welcome! Please ensure:
- Code follows TypeScript best practices
- All functions include proper error handling
- Type definitions are updated for new features
- Documentation is updated accordingly

## License

MIT

## Resources

- [RPG Maker MZ Official Website](https://www.rpgmakerweb.com/products/rpg-maker-mz)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [RPG Maker MZ Database Structure](https://github.com/rpgtkoolmv/rmmz-api-reference)

## Support

For issues and feature requests, please open an issue on the project repository.
