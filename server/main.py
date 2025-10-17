# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
from datetime import datetime

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for recipe data
class RecipeData(BaseModel):
    videoId: str
    title: str
    description: str
    thumbnailUrl: str
    youtubeUrl: str
    channelTitle: Optional[str] = None
    publishedAt: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "Recipe API Server is running!"}

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