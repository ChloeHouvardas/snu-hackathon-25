@echo off

REM Recipe App Backend Setup Script (Windows)

echo 🍳 Recipe App Backend Setup
echo ==========================

REM Check if .env file exists
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy env.example .env
    echo ✅ .env file created!
    echo.
    echo ⚠️  IMPORTANT: Edit .env file and add your YouTube API key:
    echo    YOUTUBE_API_KEY=your_actual_api_key_here
    echo.
    echo 🔗 Get your API key from: https://console.cloud.google.com/
    echo    1. Create/select a project
    echo    2. Enable YouTube Data API v3
    echo    3. Create credentials (API Key)
    echo.
) else (
    echo ✅ .env file already exists
)

REM Check if virtual environment exists
if not exist "venvRecipe" (
    echo 🐍 Creating Python virtual environment...
    python -m venv venvRecipe
    echo ✅ Virtual environment created!
)

REM Activate virtual environment
echo 🔄 Activating virtual environment...
call venvRecipe\Scripts\activate

REM Install dependencies
echo 📦 Installing dependencies...
pip install -r requirements.txt

echo.
echo 🚀 Setup complete! To start the server:
echo    venvRecipe\Scripts\activate
echo    python main.py
echo.
echo 🌐 Server will be available at: http://localhost:8000

pause
