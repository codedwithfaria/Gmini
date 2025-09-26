# Gmini AI Coding Agent Instructions

## Project Overview
Gmini is a unified Model Context Protocol (MCP) server hub that combines multiple services:
- MCP server for web search and content fetching
- Gemini AI integration layer
- Browser automation capabilities
- Web UI with Monaco editor integration

## Key Architecture Components

### Backend (Python)
- `gmini/server.py`: Core MCP server implementation with DuckDuckGo integration
  - Implements rate limiting (30 searches/min, 20 fetches/min)
  - Uses TTL caching for search results (1h) and content (24h)
- `gmini/core.py`: Gemini AI integration interface
  - Requires `GEMINI_API_KEY` environment variable
  - Handles text generation, image processing, and world simulation

### Frontend (TypeScript/React)
- Built with Vite + React + TypeScript
- Uses Monaco Editor for code editing
- Sandpack integration for live previews

## Development Workflow

### Environment Setup
```bash
# Backend
pip install -r requirements.txt
python -m gmini.server

# Frontend
cd web
npm install
npm run dev
```

### Testing
- Uses Playwright for browser automation tests
- Run tests with: `npm test`
- UI test mode available: `npm run test:ui`

## Project Conventions

### Rate Limiting
Always use the `@sleep_and_retry` and `@limits` decorators for external API calls:
```python
@sleep_and_retry
@limits(calls=30, period=60)
async def your_function():
    # Implementation
```

### Error Handling
- Use `loguru.logger` for error logging
- Raise exceptions with descriptive messages
- Cache errors to prevent repeated failures

### Testing Patterns
- Test files mirror source structure
- Use `test.describe` blocks for grouping
- Always cleanup resources in `afterEach`

## Integration Points

### MCP Server Integration
- Implements Model Context Protocol
- Exposed at `http://localhost:3000`
- See `examples/basic_usage.py` for integration patterns

### Browser Automation
- Use `BrowserAgent` class for web interactions
- Screenshots stored in `screenshots/` directory
- Example in `tests/browserAgent.test.ts`

## Docker Deployment
```bash
docker-compose up -d
```
Access server at `http://localhost:3000`