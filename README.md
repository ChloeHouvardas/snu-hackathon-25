# Yorigo 

<div align="center">
  <img src="assets/images/Yorigo_icon_dark.png" alt="Yorigo Logo" width="200"/>
  <p><em>Your personal Korean cooking companion</em></p>
</div>

## Features

### Recipe Discovery
- Browse your favourite platforms and find curated recipes.
- Send us a link and lets us do the rest!
- Smart recipe parsing from video descriptions
- Ingredient recommendations with price comparisons

<div align="center">
  <img src="docs/images/kimchiJigae.jpg" alt="Kimchi Jjigae" width="300"/>
  <img src="docs/images/bulgogi.jpg" alt="Bulgogi" width="300"/>
  <p><em>Some of our featured recipes</em></p>
</div>

### Smart Shopping
- Automated shopping list generation
- Price comparison for ingredients
- Multiple portion calculations
- Pantry management system

## Getting Started With The App

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Install dependencies:

   ```bash
   # Make the setup script executable and run it (sets up Python backend)
   chmod +x setup.sh
   ./setup.sh

   # Install frontend dependencies
   cd client/recipe-app
   npm install

   # Return to root directory
   cd ../..
   ```

2. Start the development servers:
   ```bash
   # Start the backend server (in a new terminal)
   cd server
   source venvRecipe/bin/activate 
   # OR use: venvRecipe\Scripts\activate 
   python main.py

   # Start the frontend development server (in another terminal)
   cd client/recipe-app
   npx expo start

   # Available commands after starting Expo:
   # Press 'a' - open Android emulator
   # Press 'i' - open iOS simulator
   # Press 'w' - open in web browser
   # Scan QR code with Expo Go app on your device
   ```

3. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Tech Stack

- **Frontend Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: React Context API
- **API Integration**: REST APIs with fetch
- **UI Components**: Custom components with native elements
- **Styling**: React Native StyleSheet

## Acknowledgments

- Korean recipe content providers
- Expo team for the framework
- Coupang API
- SNU Hacks

---

<div align="center">
  Made with love for Korean food lovers, 사랑해요
</div>