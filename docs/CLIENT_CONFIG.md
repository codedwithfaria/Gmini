# Gmini Client Configuration

```json
{
  "mcpServers": {
    "gmini": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-p",
        "8080:8080",
        "gmini"
      ]
    }
  }
}
```

## Available Services

### Memory Service
Knowledge graph operations available at `/memory`:
- Create/delete entities and relations
- Add/delete observations
- Search and query the graph
- Open specific nodes

### Playwright Service
Browser automation features at `/playwright`:
- Navigate web pages
- Click, type, and interact
- Take screenshots
- Handle dialogs
- Manage multiple tabs

### Node.js Sandbox
Secure JavaScript execution at `/node-sandbox`:
- Run JavaScript code
- Install npm packages
- Search npm registry
- TypeScript definitions support

## Authentication
Each service maintains its own authentication. Configure tokens in the environment variables:

```bash
MEMORY_TOKEN=your_memory_token
PLAYWRIGHT_TOKEN=your_playwright_token
NODE_SANDBOX_TOKEN=your_node_token
```