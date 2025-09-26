"""
MCP Server implementation for DuckDuckGo search and content fetching
"""

import asyncio
from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from mcp.server import MCPServer
from duckduckgo_search import AsyncDDGS
from loguru import logger
from ratelimit import limits, sleep_and_retry
from cachetools import TTLCache
import html2text
import aiohttp

class SearchRequest(BaseModel):
    query: str
    max_results: Optional[int] = 10

class ContentRequest(BaseModel):
    url: str

class GminiMCPServer(MCPServer):
    def __init__(self):
        super().__init__()
        self.ddgs = AsyncDDGS()
        self.html_converter = html2text.HTML2Text()
        self.html_converter.ignore_links = False
        
        # Cache for search results (TTL: 1 hour)
        self.search_cache = TTLCache(maxsize=1000, ttl=3600)
        
        # Cache for fetched content (TTL: 24 hours)
        self.content_cache = TTLCache(maxsize=500, ttl=86400)

    @sleep_and_retry
    @limits(calls=30, period=60)  # 30 requests per minute
    async def search(self, request: SearchRequest) -> str:
        """Search DuckDuckGo and return formatted results"""
        cache_key = f"{request.query}:{request.max_results}"
        
        # Check cache first
        if cache_key in self.search_cache:
            return self.search_cache[cache_key]
        
        try:
            results = await self.ddgs.text(
                request.query,
                max_results=request.max_results
            )
            
            formatted_results = []
            for r in results:
                formatted_results.append(
                    f"Title: {r['title']}\n"
                    f"URL: {r['link']}\n"
                    f"Snippet: {r['body']}\n"
                )
            
            response = "\n\n".join(formatted_results)
            self.search_cache[cache_key] = response
            return response
            
        except Exception as e:
            logger.error(f"Search error: {str(e)}")
            raise

    @sleep_and_retry
    @limits(calls=20, period=60)  # 20 requests per minute
    async def fetch_content(self, request: ContentRequest) -> str:
        """Fetch and parse content from a webpage"""
        if request.url in self.content_cache:
            return self.content_cache[request.url]
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(request.url) as response:
                    if response.status == 200:
                        html = await response.text()
                        text = self.html_converter.handle(html)
                        
                        # Clean and format the text
                        text = text.strip()
                        self.content_cache[request.url] = text
                        return text
                    else:
                        raise Exception(f"HTTP {response.status}")
                        
        except Exception as e:
            logger.error(f"Content fetch error for {request.url}: {str(e)}")
            raise

    async def health_check(self) -> Dict[str, Any]:
        """Health check endpoint"""
        return {
            "status": "healthy",
            "search_cache_size": len(self.search_cache),
            "content_cache_size": len(self.content_cache)
        }