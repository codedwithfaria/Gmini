"""
Example usage of Gmini - Gemini AI Assistant
"""

import asyncio
import os
from dotenv import load_dotenv
from gmini.core import GeminiAI

async def main():
    # Load environment variables
    load_dotenv()
    
    # Initialize Gemini AI
    gemini = GeminiAI()
    
    # Example prompt
    response = await gemini.generate_response(
        "What are the key features of quantum computing?"
    )
    print(f"Gemini response: {response}")
    
    # Example world simulation
    scenario = {
        "environment": "urban",
        "time": "evening",
        "agents": ["pedestrians", "vehicles"],
    }
    simulation = await gemini.simulate_world(scenario)
    print(f"World simulation results: {simulation}")

if __name__ == "__main__":
    asyncio.run(main())