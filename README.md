# Yorigo 

<div align="center">
  <img src="docs/images/Yorigo_icon_dark.png" alt="Yorigo Logo" width="200"/>
  <p><em>Your personal Korean cooking companion</em></p>
</div>

## 📱 Features

### Recipe Discovery
- Browse curated Korean recipes with detailed instructions
- YouTube integration for video tutorials
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

### User Experience
- Intuitive, modern UI design
- Multi-language support (English/Korean)
- Offline recipe access
- Cross-platform compatibility (iOS/Android)

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

   # Configure your API keys in the .env file
   # Required: YouTube API key for video integration
   # Optional: OpenAI API key for enhanced recipe parsing
   nano .env

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
   source venvRecipe/bin/activate  # On Linux/Mac
   # OR use: venvRecipe\Scripts\activate  # On Windows
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

## 📂 Project Structure

```
recipe-app/
├── app/                   # Main application code
│   ├── _layout.tsx       # Root layout component
│   ├── index.tsx         # Home screen
│   ├── feed.tsx          # Recipe feed
│   ├── recipes.tsx       # Recipe listing
│   ├── cart.tsx          # Shopping cart
│   └── recipe/           # Recipe details
├── assets/               # Static assets
│   └── images/          # Image assets
├── components/           # Reusable components
└── docs/                # Documentation
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
YOUTUBE_API_KEY=your_youtube_api_key
```

### API Keys
- YouTube Data API v3 (for recipe video integration)
- Optional: OpenAI API (for recipe parsing)

## 📱 Screenshots

[Add your app screenshots here]

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Developer: [Your Name]
- Designer: [Designer Name]
- Project Manager: [PM Name]

## 🙏 Acknowledgments

- Korean recipe content providers
- Expo team for the amazing framework
- Our beta testers and early adopters

## 📞 Support

For support, email support@yorigo.com or join our Discord channel.

---

<div align="center">
  Made with ❤️ for Korean food lovers
</div>