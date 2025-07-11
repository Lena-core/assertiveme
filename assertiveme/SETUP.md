# AssertiveMe - Installation & Setup

## 🛠️ Installation Steps

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Install Additional Required Dependency
```bash
npm install @react-navigation/native-stack
# or
yarn add @react-navigation/native-stack
```

### 3. Start Development Server
```bash
npx expo start
```

### 4. Run on Device/Simulator
- **iOS**: Press `i` in terminal or scan QR code with Expo Go app
- **Android**: Press `a` in terminal or scan QR code with Expo Go app
- **Web**: Press `w` in terminal

## 🎯 App Features
- **Main Screen**: Form for logging emotional situations
- **History Screen**: View and edit past events
- **Data Persistence**: All data saved locally on device
- **Clean UI**: Minimalist design with turquoise accent color

## 🔧 Technical Notes
- Built with **Expo Router** for file-based navigation
- Uses **AsyncStorage** for local data persistence
- Fully **TypeScript** compatible
- **No external API** dependencies - works offline

## 📱 Navigation
- `/` (index.tsx) - Main form screen
- `/history` - Event history screen
- Auto-navigation after saving events
- Edit mode via URL parameters

## 🎨 Color Scheme
- Primary: `#009ECF` (Turquoise)
- Background: White
- Text: Dark gray tones
- Accents: Light grays for inputs and cards

Ready to help users develop emotional awareness and assertiveness skills! 🚀
