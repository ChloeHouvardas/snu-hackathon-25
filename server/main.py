# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
import os
import httpx
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class VideoRequest(BaseModel):
    youtubeUrl: str

class RecipeData(BaseModel):
    videoId: str
    title: str
    description: str
    thumbnailUrl: str
    youtubeUrl: str
    channelTitle: Optional[str] = None
    publishedAt: Optional[str] = None

# YouTube API functions
def extract_video_id(url: str) -> Optional[str]:
    """Extract video ID from YouTube URL"""
    import re
    regex = r'(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})'
    match = re.search(regex, url)
    return match.group(1) if match else None

def get_youtube_thumbnail(video_id: str) -> str:
    """Get YouTube thumbnail URL"""
    return f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"

async def fetch_youtube_video_details(video_id: str) -> dict:
    """Fetch video details from YouTube Data API"""
    api_key = os.getenv("YOUTUBE_API_KEY")
    
    if not api_key:
        raise HTTPException(
            status_code=500, 
            detail="YouTube API key not configured. Please set YOUTUBE_API_KEY environment variable."
        )
    
    url = f"https://www.googleapis.com/youtube/v3/videos?id={video_id}&part=snippet&key={api_key}"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            
            data = response.json()
            
            if not data.get("items") or len(data["items"]) == 0:
                raise HTTPException(status_code=404, detail="Video not found or unavailable")
            
            video = data["items"][0]
            snippet = video["snippet"]
            
            return {
                "title": snippet.get("title", "Untitled Video"),
                "description": snippet.get("description", "No description available"),
                "channelTitle": snippet.get("channelTitle", "Unknown Channel"),
                "publishedAt": snippet.get("publishedAt", "Unknown Date")
            }
            
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 403:
                raise HTTPException(status_code=403, detail="YouTube API quota exceeded or API key invalid")
            elif e.response.status_code == 404:
                raise HTTPException(status_code=404, detail="Video not found")
            else:
                raise HTTPException(status_code=500, detail=f"YouTube API error: {e.response.status_code}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch video details: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Recipe API Server is running!"}

@app.post("/api/fetch-video")
async def fetch_video_details(request: VideoRequest):
    """
    Fetch video details from YouTube API
    """
    try:
        # Extract video ID from URL
        video_id = extract_video_id(request.youtubeUrl)
        if not video_id:
            raise HTTPException(status_code=400, detail="Invalid YouTube URL")
        
        # Fetch video details from YouTube API
        video_details = await fetch_youtube_video_details(video_id)
        
        # Get thumbnail URL
        thumbnail_url = get_youtube_thumbnail(video_id)
        
        return {
            "success": True,
            "videoId": video_id,
            "title": video_details["title"],
            "description": video_details["description"],
            "channelTitle": video_details["channelTitle"],
            "publishedAt": video_details["publishedAt"],
            "thumbnailUrl": thumbnail_url
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process video: {str(e)}")

@app.post("/api/recipes")
def save_recipe(recipe: RecipeData):
    """
    Save a recipe from YouTube video data
    """
    try:
        # Print the video description to console
        print("\n" + "="*80)
        print(f"NEW RECIPE SAVED - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*80)
        print(f"Video ID: {recipe.videoId}")
        print(f"Title: {recipe.title}")
        print(f"Channel: {recipe.channelTitle or 'Unknown'}")
        print(f"Published: {recipe.publishedAt or 'Unknown'}")
        print(f"YouTube URL: {recipe.youtubeUrl}")
        print(f"Thumbnail URL: {recipe.thumbnailUrl}")
        print("\nVIDEO DESCRIPTION:")
        print("-" * 40)
        print(recipe.description)
        print("-" * 40)
        print("="*80 + "\n")
        
        # Here you could save to database, file, etc.
        # For now, we'll just return success
        
        return {
            "success": True,
            "message": "Recipe saved successfully!",
            "data": {
                "videoId": recipe.videoId,
                "title": recipe.title,
                "description_length": len(recipe.description),
                "saved_at": datetime.now().isoformat()
            }
        }
        
    except Exception as e:
        print(f"Error saving recipe: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to save recipe: {str(e)}")

@app.get("/api/recipes")
def get_recipes():
    """
    Get all saved recipes (placeholder for now)
    """
    return {
        "recipes": [],
        "message": "No recipes saved yet. Use POST /api/recipes to save recipes."
    }

@app.get("/api/recipes/{recipe_id}")
def get_recipe(recipe_id: str):
    """
    Get a specific recipe by ID
    """
    return {
        "recipe_id": recipe_id,
        "message": "Recipe not found. This is a placeholder endpoint."
    }