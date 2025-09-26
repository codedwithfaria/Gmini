# Gmini - Unified MCP Server Hub

A comprehensive Model Context Protocol (MCP) server that combines multiple powerful services:

- 🧠 **Memory Service**: Knowledge graph management and persistent memory
- 🎭 **Playwright Service**: Browser automation and web interaction
- 📦 **Node.js Sandbox**: Secure JavaScript execution environment

## Features

- 🔍 Web Search: Search DuckDuckGo with advanced rate limiting and result formatting
- 📄 Content Fetching: Retrieve and parse webpage content with intelligent text extraction
- ⚡ Rate Limiting: Built-in protection against rate limits (30 searches/min, 20 fetches/min)
- 🚀 Caching: Intelligent caching system for both search results and webpage content
- 🔄 MCP Compatible: Fully compatible with the Model Context Protocol
- 📊 Health Monitoring: Built-in health checks and monitoring

## Quick Start

1. Build and start the container:
```bash
docker-compose up -d
```

2. The MCP server will be available at `http://localhost:3000`

## Usage in Claude Desktop

1. Edit your Claude Desktop configuration:
```json
{
    "mcpServers": {
        "ddg-search": {
            "command": "docker",
            "args": [
                "run",
                "-i",
                "--rm",
                "localhost:3000/gmini"
            ]
        }
    }
}
```

2. Available tools:

### Search
```python
async def search(query: str, max_results: int = 10) -> str
```
- `query`: Search query string
- `max_results`: Maximum number of results (default: 10)

### Fetch Content
```python
async def fetch_content(url: str) -> str
```
- `url`: Webpage URL to fetch content from

## Development

Requirements:
- Python 3.11+
- Docker
- Docker Compose

Local development:
```bash
# Install dependencies
pip install -r requirements.txt

# Run the MCP server
python -m gmini.server
```

## License

MIT License
provided extensive documentation about Firefox in Docker containers and JSShell. Let me help you create a proper development environment for this project that appears to be focused on browser containerization and security tooling.