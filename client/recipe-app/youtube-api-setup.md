# YouTube Data API Setup Guide

## How to Get Real Video Descriptions

To fetch actual video descriptions from YouTube, you need to set up the YouTube Data API v3.

### Step 1: Get a YouTube Data API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"

4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### Step 2: Update Your Code

Replace `YOUR_YOUTUBE_API_KEY` in `app/index.tsx` with your actual API key:

```typescript
const API_KEY = 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Your actual key
```

### Step 3: Test the Integration

1. Start your backend: `cd server && python main.py`
2. Start your frontend: `cd client/recipe-app && npm start`
3. Paste a YouTube URL and watch real descriptions appear!

### API Quotas

- **Free tier**: 10,000 units per day
- **Each video request**: 1 unit
- **Cost**: $0.0001 per 100 units after free tier

### Security Note

For production, don't put your API key directly in the code. Instead:
- Use environment variables
- Implement server-side API calls
- Use API key restrictions in Google Cloud Console

### Example API Response

The YouTube API returns data like this:
```json
{
  "items": [{
    "snippet": {
      "title": "Amazing Chocolate Cake Recipe",
      "description": "Learn how to make the perfect chocolate cake...",
      "channelTitle": "Cooking Channel",
      "publishedAt": "2024-01-15T10:30:00Z"
    }
  }]
}
```

### Troubleshooting

- **403 Error**: API quota exceeded or invalid key
- **404 Error**: Video not found or private
- **400 Error**: Invalid video ID format

The app includes fallback mock data if the API fails, so it will still work for testing!
