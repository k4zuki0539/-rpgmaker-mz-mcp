# RPG Maker MZ MCP Server - Usage Examples

This document provides detailed examples of how to use the RPG Maker MZ MCP Server with Claude.

## Table of Contents

1. [Actor Management](#actor-management)
2. [Item and Equipment Management](#item-and-equipment-management)
3. [Map and Event Management](#map-and-event-management)
4. [System Configuration](#system-configuration)
5. [Advanced Use Cases](#advanced-use-cases)

## Actor Management

### Example 1: List All Actors

**User**: "Show me all the actors in my RPG Maker MZ project"

Claude will use the `get_actors` tool and display all actors with their IDs, names, and key properties.

### Example 2: Get Specific Actor Details

**User**: "Show me the details of actor 1"

Claude will use the `get_actor` tool with actorId 1 and display complete information including:
- Name and nickname
- Class ID
- Initial and max level
- Character and face graphics
- Traits and equipment

### Example 3: Update an Existing Actor

**User**: "Change actor 2's name to 'Warrior' and set their initial level to 10"

Claude will use the `update_actor` tool:

```json
{
  "actorId": 2,
  "updates": {
    "name": "Warrior",
    "initialLevel": 10
  }
}
```

### Example 4: Create a New Actor

**User**: "Create a new actor named 'Mage' with class 2, starting at level 5"

Claude will use the `create_actor` tool with appropriate default values:

```json
{
  "name": "Mage",
  "nickname": "",
  "profile": "",
  "classId": 2,
  "initialLevel": 5,
  "maxLevel": 99,
  "characterName": "",
  "characterIndex": 0,
  "faceName": "",
  "faceIndex": 0,
  "battlerName": "",
  "traits": [],
  "equips": [0, 0, 0, 0, 0],
  "note": ""
}
```

### Example 5: Search Actors

**User**: "Find all actors whose names contain 'knight'"

Claude will use the `search_actors` tool to find matching actors.

## Item and Equipment Management

### Example 1: List All Items

**User**: "Show me all the items in the game"

Claude will use the `get_items` tool to retrieve and display all items.

### Example 2: List Weapons and Armors

**User**: "Show me all weapons and armors"

Claude will use both `get_weapons` and `get_armors` tools in parallel.

### Example 3: Update Item Properties

**User**: "Change the 'Health Potion' (item 1) price to 100 gold"

Claude will use the `update_item` tool:

```json
{
  "itemId": 1,
  "updates": {
    "price": 100
  }
}
```

### Example 4: Update Item Description and Effects

**User**: "Update item 5 to restore 100 HP instead of 50"

Claude will help you modify the item's effects array appropriately.

### Example 5: Search Items

**User**: "Find all items related to healing"

Claude will use the `search_items` tool with "heal" as the search term.

## Map and Event Management

### Example 1: Get Map Information

**User**: "Show me the details of map 1"

Claude will use the `get_map` tool to retrieve complete map data including dimensions, tileset, and display name.

### Example 2: List All Events on a Map

**User**: "Show me all events on map 3"

Claude will use the `get_map_events` tool to list all events with their positions and names.

### Example 3: Get Specific Event Details

**User**: "Show me event 5 on map 2"

Claude will use the `get_map_event` tool to retrieve detailed information about the event including all pages and commands.

### Example 4: Update Event Position

**User**: "Move event 3 on map 1 to position (10, 15)"

Claude will use the `update_map_event` tool:

```json
{
  "mapId": 1,
  "eventId": 3,
  "updates": {
    "x": 10,
    "y": 15
  }
}
```

### Example 5: Create a Simple Event

**User**: "Create a treasure chest event at position (5, 5) on map 1"

Claude will use the `create_map_event` tool with a basic event structure:

```json
{
  "mapId": 1,
  "name": "Treasure Chest",
  "x": 5,
  "y": 5,
  "note": "",
  "pages": [
    {
      "conditions": {
        "actorId": 1,
        "actorValid": false,
        "itemId": 1,
        "itemValid": false,
        "selfSwitchCh": "A",
        "selfSwitchValid": false,
        "switch1Id": 1,
        "switch1Valid": false,
        "switch2Id": 1,
        "switch2Valid": false,
        "variableId": 1,
        "variableValid": false,
        "variableValue": 0
      },
      "directionFix": false,
      "image": {
        "characterIndex": 0,
        "characterName": "!Chest",
        "direction": 2,
        "pattern": 0,
        "tileId": 0
      },
      "list": [
        {
          "code": 101,
          "indent": 0,
          "parameters": ["", 0, 0, 2]
        },
        {
          "code": 401,
          "indent": 0,
          "parameters": ["You found a treasure!"]
        },
        {
          "code": 0,
          "indent": 0,
          "parameters": []
        }
      ],
      "moveFrequency": 3,
      "moveRoute": {
        "list": [{"code": 0, "parameters": []}],
        "repeat": true,
        "skippable": false,
        "wait": false
      },
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 0,
      "stepAnime": false,
      "through": false,
      "trigger": 0,
      "walkAnime": true
    }
  ]
}
```

### Example 6: Add a Command to an Event

**User**: "Add a 'Show Text' command to event 1 on map 1, page 0"

Claude will use the `add_event_command` tool:

```json
{
  "mapId": 1,
  "eventId": 1,
  "pageIndex": 0,
  "command": {
    "code": 101,
    "indent": 0,
    "parameters": ["", 0, 0, 2]
  }
}
```

### Example 7: Search Events by Name

**User**: "Find all NPC events on map 2"

Claude will use the `search_map_events` tool with "NPC" as the search term.

## System Configuration

### Example 1: Get Game Variables

**User**: "Show me all the game variables"

Claude will use the `get_variables` tool to list all variable names.

### Example 2: Set Variable Name

**User**: "Set variable 1 to 'Player Gold'"

Claude will use the `set_variable_name` tool:

```json
{
  "variableId": 1,
  "name": "Player Gold"
}
```

### Example 3: Get Game Switches

**User**: "Show me all game switches"

Claude will use the `get_switches` tool.

### Example 4: Set Switch Name

**User**: "Name switch 10 'Quest Complete'"

Claude will use the `set_switch_name` tool:

```json
{
  "switchId": 10,
  "name": "Quest Complete"
}
```

### Example 5: Update Game Title

**User**: "Change the game title to 'Legend of the Crystal'"

Claude will use the `update_game_title` tool:

```json
{
  "title": "Legend of the Crystal"
}
```

### Example 6: Update Starting Position

**User**: "Set the starting position to map 5 at coordinates (10, 8)"

Claude will use the `update_starting_position` tool:

```json
{
  "mapId": 5,
  "x": 10,
  "y": 8
}
```

## Advanced Use Cases

### Use Case 1: Batch Update Actors

**User**: "Set all actors to start at level 10"

Claude will:
1. Use `get_actors` to retrieve all actors
2. Use `update_actor` for each actor to set initialLevel to 10

### Use Case 2: Create a Complete NPC Event

**User**: "Create an NPC on map 1 at (12, 8) that gives the player 100 gold when talked to"

Claude will create an event with appropriate commands:
- Show Text: "Here's some gold!"
- Change Gold: +100
- Show Text: "Good luck on your journey!"

### Use Case 3: Organize Variables and Switches

**User**: "Organize my variables - set variables 1-10 for player stats (HP, MP, etc.) and variables 11-20 for quest flags"

Claude will use `set_variable_name` multiple times to name each variable appropriately.

### Use Case 4: Update All Potion Prices

**User**: "Increase the price of all items with 'Potion' in their name by 50%"

Claude will:
1. Use `search_items` with "Potion"
2. For each result, use `update_item` to increase the price

### Use Case 5: Create Event Template

**User**: "Create a template for save point events that I can reuse"

Claude will provide a complete event structure with:
- Appropriate graphic (e.g., crystal or save point sprite)
- Event commands for saving
- Self-switch to prevent repeated triggers if needed

### Use Case 6: Analyze Map Layout

**User**: "Tell me how many events are on each map"

Claude will:
1. Use `get_map_infos` to get all maps
2. For each map, use `get_map_events` and count non-null events

### Use Case 7: Clone an Event

**User**: "Copy event 3 from map 1 to position (20, 10) on the same map"

Claude will:
1. Use `get_map_event` to retrieve event 3
2. Use `create_map_event` with the same properties but new position

### Use Case 8: Update Event Dialogues

**User**: "Change all dialogue in event 5 on map 2 to be more formal"

Claude will:
1. Use `get_map_event` to retrieve the event
2. Analyze the event commands for Show Text (code 101)
3. Suggest updated dialogue
4. Use `update_map_event` to apply changes

## Event Command Reference

Here are common event command codes you might use:

### Message Commands
- `101` - Show Text
- `102` - Show Choices
- `103` - Input Number
- `104` - Select Item

### Flow Control
- `111` - Conditional Branch
- `112` - Loop
- `113` - Break Loop
- `115` - Exit Event Processing
- `117` - Common Event

### Party Commands
- `121` - Control Switches
- `122` - Control Variables
- `123` - Control Self Switch
- `124` - Control Timer
- `125` - Change Gold
- `126` - Change Items
- `127` - Change Weapons
- `128` - Change Armor

### Actor Commands
- `129` - Change Party Member
- `311` - Change HP
- `312` - Change MP
- `313` - Change State
- `314` - Recover All
- `315` - Change EXP
- `316` - Change Level

### Movement Commands
- `201` - Transfer Player
- `202` - Set Vehicle Location
- `203` - Set Event Location
- `204` - Scroll Map
- `205` - Set Movement Route

### Screen Commands
- `221` - Fadeout Screen
- `222` - Fadein Screen
- `223` - Tint Screen
- `224` - Flash Screen
- `225` - Shake Screen

### Audio Commands
- `241` - Play BGM
- `242` - Fadeout BGM
- `249` - Play SE

### Other
- `355` - Script
- `356` - Plugin Command

## Tips for Best Results

1. **Be Specific**: Provide exact IDs and clear descriptions
2. **One Step at a Time**: For complex operations, break them down
3. **Verify Changes**: Always ask Claude to show you the result after making changes
4. **Backup First**: Ask Claude to retrieve current data before making destructive changes
5. **Use Search**: When you don't know IDs, use search tools first

## Error Handling

If you encounter errors:

1. **"Actor not found"**: Check the actor ID is correct
2. **"Map not found"**: Verify the map ID exists in your project
3. **"Invalid project path"**: Ensure RPGMAKER_PROJECT_PATH is set correctly
4. **File permission errors**: Make sure RPG Maker MZ editor is closed

## Combining Multiple Operations

You can ask Claude to perform multiple operations in sequence:

**User**: "Create a new actor named 'Thief', add them to the starting party, and create an event on map 1 that lets the player recruit them"

Claude will:
1. Create the actor
2. Update the system's party members
3. Create an appropriate recruitment event
