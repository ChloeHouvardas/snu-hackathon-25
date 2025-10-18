#!/bin/bash

# Recipe App Backend Setup Script

echo "🍳 Recipe App Backend Setup"
echo "=========================="

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file and add your YouTube API key:"
    echo "   YOUTUBE_API_KEY=your_actual_api_key_here"
    echo ""
    echo "🔗 Get your API key from: https://console.cloud.google.com/"
    echo "   1. Create/select a project"
    echo "   2. Enable YouTube Data API v3"
    echo "   3. Create credentials (API Key)"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Check if virtual environment exists
if [ ! -d "venvRecipe" ]; then
    echo "🐍 Creating Python virtual environment..."
    python -m venv venvRecipe
    echo "✅ Virtual environment created!"
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venvRecipe/bin/activate 2>/dev/null || source venvRecipe/Scripts/activate 2>/dev/null

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "🚀 Setup complete! To start the server:"
echo "   source venvRecipe/bin/activate  # Linux/Mac"
echo "   # OR"
echo "   venvRecipe\\Scripts\\activate     # Windows"
echo "   python main.py"
echo ""
echo "🌐 Server will be available at: http://localhost:8000"
