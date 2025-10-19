# RPG Maker MZ MCP Server - Setup Guide

Complete step-by-step guide to install and configure the RPG Maker MZ MCP Server.

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- RPG Maker MZ project
- Claude Desktop

## Installation Steps

### Step 1: Install Dependencies

Navigate to the project directory and install dependencies:

```bash
cd rpgmaker-mz-mcp
npm install
```

### Step 2: Build the Project

Build the TypeScript code:

```bash
npm run build
```

This will create the compiled JavaScript files in the `dist/` directory.

### Step 3: Verify Installation

Check that the build was successful:

```bash
# Windows
dir dist

# macOS/Linux
ls -la dist
```

You should see `index.js` and related files.

## Configuration

### Step 4: Configure Claude Desktop

You need to add the MCP server to Claude Desktop's configuration file.

#### Windows

1. Open File Explorer and navigate to:
   ```
   %APPDATA%\Claude\
   ```
   (or `C:\Users\YourUsername\AppData\Roaming\Claude\`)

2. Open or create `claude_desktop_config.json`

3. Add the following configuration:

```json
{
  "mcpServers": {
    "rpgmaker-mz": {
      "command": "node",
      "args": [
        "C:/Users/PC_User/OneDrive/ドキュメント/claude/rpgmaker-mz-mcp/dist/index.js"
      ],
      "env": {
        "RPGMAKER_PROJECT_PATH": "C:/path/to/your/rpgmaker/project"
      }
    }
  }
}
```

**Important**:
- Replace the path in `args` with the actual path to your `dist/index.js`
- Replace `RPGMAKER_PROJECT_PATH` with the path to your RPG Maker MZ project
- Use forward slashes (`/`) in paths, even on Windows

#### macOS

1. Open Terminal and edit the configuration file:
   ```bash
   nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. Add the following configuration:

```json
{
  "mcpServers": {
    "rpgmaker-mz": {
      "command": "node",
      "args": [
        "/path/to/rpgmaker-mz-mcp/dist/index.js"
      ],
      "env": {
        "RPGMAKER_PROJECT_PATH": "/path/to/your/rpgmaker/project"
      }
    }
  }
}
```

3. Save with `Ctrl+O`, then exit with `Ctrl+X`

#### Linux

1. Edit the configuration file:
   ```bash
   nano ~/.config/Claude/claude_desktop_config.json
   ```

2. Add the same configuration as macOS (shown above)

### Step 5: Find Your RPG Maker MZ Project Path

Your RPG Maker MZ project path should contain:
- `game.rmmzproject` file
- `data/` directory
- `js/` directory
- `img/` directory

Example paths:
- Windows: `C:/Users/YourName/Documents/RPGMZ/MyGame`
- macOS: `/Users/YourName/Documents/RPGMZ/MyGame`
- Linux: `/home/YourName/Documents/RPGMZ/MyGame`

### Step 6: Restart Claude Desktop

After saving the configuration file, completely quit and restart Claude Desktop.

## Verification

### Step 1: Check Server Connection

Open Claude Desktop and start a new conversation. Ask:

```
What MCP servers are connected?
```

You should see `rpgmaker-mz` in the list.

### Step 2: Test Basic Functionality

Try a simple command:

```
Show me the game title from my RPG Maker MZ project
```

If successful, Claude will use the `get_game_title` tool and display your game's title.

### Step 3: Test More Features

```
Show me all actors in my project
```

Claude should list all actors from your RPG Maker MZ project.

## Troubleshooting

### Issue: "rpgmaker-mz server not found"

**Solution**:
1. Verify the path in `claude_desktop_config.json` is correct
2. Make sure you restarted Claude Desktop
3. Check that `dist/index.js` exists

### Issue: "Invalid RPG Maker MZ project path"

**Solution**:
1. Verify `RPGMAKER_PROJECT_PATH` points to a valid RPG Maker MZ project
2. Check that the project contains `game.rmmzproject` and `data/System.json`
3. Make sure the path uses forward slashes (`/`) even on Windows

### Issue: "ENOENT: no such file or directory"

**Solution**:
1. Close RPG Maker MZ editor (files may be locked)
2. Check file permissions
3. Verify the project path is correct

### Issue: "Cannot find module"

**Solution**:
1. Run `npm install` again
2. Run `npm run build` to rebuild
3. Check that `node_modules/` directory exists

### Issue: Server starts but tools don't work

**Solution**:
1. Check Claude Desktop logs:
   - Windows: `%APPDATA%\Claude\logs\`
   - macOS: `~/Library/Logs/Claude/`
   - Linux: `~/.config/Claude/logs/`
2. Verify the project path is correct
3. Make sure RPG Maker MZ editor is closed

## Advanced Configuration

### Using Environment Variables (Alternative Method)

Instead of setting the project path in the config file, you can set it as a system environment variable:

#### Windows

1. Open System Properties → Advanced → Environment Variables
2. Add new User Variable:
   - Name: `RPGMAKER_PROJECT_PATH`
   - Value: `C:\path\to\your\rpgmaker\project`
3. Restart Claude Desktop

Then your config becomes:

```json
{
  "mcpServers": {
    "rpgmaker-mz": {
      "command": "node",
      "args": [
        "C:/Users/PC_User/OneDrive/ドキュメント/claude/rpgmaker-mz-mcp/dist/index.js"
      ]
    }
  }
}
```

#### macOS/Linux

Add to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
export RPGMAKER_PROJECT_PATH="/path/to/your/rpgmaker/project"
```

### Multiple Projects

To work with multiple RPG Maker MZ projects, create separate server configurations:

```json
{
  "mcpServers": {
    "rpgmaker-project1": {
      "command": "node",
      "args": ["C:/path/to/rpgmaker-mz-mcp/dist/index.js"],
      "env": {
        "RPGMAKER_PROJECT_PATH": "C:/path/to/project1"
      }
    },
    "rpgmaker-project2": {
      "command": "node",
      "args": ["C:/path/to/rpgmaker-mz-mcp/dist/index.js"],
      "env": {
        "RPGMAKER_PROJECT_PATH": "C:/path/to/project2"
      }
    }
  }
}
```

## Development Mode

If you want to make changes to the server code:

### Watch Mode

Run TypeScript in watch mode for automatic recompilation:

```bash
npm run dev
```

This will automatically rebuild when you save changes to TypeScript files.

### Debugging

Add console.log statements in your code. Logs will appear in:
- Claude Desktop logs directory
- Or run the server directly in terminal for debugging:

```bash
set RPGMAKER_PROJECT_PATH=C:/path/to/project
node dist/index.js
```

Then you can see console output directly.

## Best Practices

1. **Always Backup**: Backup your RPG Maker MZ project before using the server
2. **Close Editor**: Always close RPG Maker MZ editor when using the MCP server
3. **Version Control**: Use git to track changes to your project
4. **Test Changes**: Test your game after making changes
5. **Read Logs**: Check logs if something doesn't work as expected

## Next Steps

After setup is complete:

1. Read [README.md](README.md) for feature overview
2. Check [EXAMPLES.md](EXAMPLES.md) for usage examples
3. Start experimenting with simple commands
4. Gradually explore more advanced features

## Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Review Claude Desktop logs
3. Verify all paths are correct
4. Make sure RPG Maker MZ is closed
5. Try restarting Claude Desktop
6. Check that your project is valid (can be opened in RPG Maker MZ)

## Safety Reminders

- ⚠️ This tool modifies your game files directly
- ✅ Always backup your project first
- ✅ Close RPG Maker MZ editor before using the server
- ✅ Test changes in the editor after modifications
- ✅ Use version control (git) for your project

## Uninstallation

To remove the MCP server:

1. Remove the configuration from `claude_desktop_config.json`
2. Restart Claude Desktop
3. Optionally, delete the `rpgmaker-mz-mcp` directory

Your RPG Maker MZ projects will not be affected.
