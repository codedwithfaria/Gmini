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

---

## Meet Gemini

Meet Gemini — Google’s AI assistant. Get help with writing, planning, brainstorming, and more. Experience the power of generative AI.

- Accessible
- Collaborative
- Empowering

Start exploring and building with Google’s latest AI models. Choose a capability below to see it in action.

## Around the Prompt

"Around the Prompt" goes deep, peeling back the layers of AI innovation to reveal the hidden gems and untapped potential uncovered from conversations with leading experts.

Whether you're a seasoned AI enthusiast or just dipping your toes into the world of artificial intelligence, we'll be your compass for navigating the ever-changing landscape. Discover how AI is transforming industries, enhancing our daily lives, and shaping the world of tomorrow. Our conversations transcend mere trends and buzzwords, giving you the practical insights you need to harness the power of AI effectively.

## Try it — Landing Page

A simple landing page showcasing the project is available at `docs/index.html`. Open it in a browser or serve the `docs` folder to preview the site.