# AssertiveMe 🧠💪

> Emotional awareness & assertiveness training mobile app

**AssertiveMe** помогает пользователям анализировать сложные эмоциональные ситуации и развивать навыки ассертивности через структурированное ведение дневника переживаний.

## 📱 Features

- **📝 Situation Logging**: Подробная запись эмоциональных ситуаций
- **🔍 Self-Analysis**: Анализ чувств, поведения и истинных желаний  
- **📚 Event History**: Просмотр и редактирование прошлых записей
- **💾 Local Storage**: Все данные хранятся локально на устройстве
- **🎨 Clean UI**: Минималистичный дизайн с приятной цветовой схемой

## 🏗️ Tech Stack

- **React Native** with **Expo Router**
- **TypeScript** for type safety
- **AsyncStorage** for local data persistence
- **File-based routing** with Expo Router
- **Native styling** with StyleSheet API

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator / Android Emulator / Physical device with Expo Go

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/assertiveme.git
cd assertiveme

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running the app
- **iOS**: Press `i` in terminal or scan QR with Expo Go
- **Android**: Press `a` in terminal or scan QR with Expo Go  
- **Web**: Press `w` in terminal

## 📱 App Structure

```
app/
├── _layout.tsx          # Root layout with navigation
├── index.tsx           # Main screen (situation form)
├── history.tsx         # History screen (events list)
└── +not-found.tsx      # 404 screen
```

### Navigation Flow
1. **Start** → Main Screen (situation form)
2. **Save Event** → History Screen  
3. **Edit Button** → Main Screen (pre-filled)
4. **Add New** → Main Screen (empty form)

## 🎯 Core Functionality

### Main Screen - "Let's figure it out"
- **Tabs**: Situation | Assertiveness practice
- **5 Input Fields**:
  - What happened? *(описание ситуации)*
  - What I felt? *(чувства и телесные реакции)*  
  - What I've done? *(фактическое поведение)*
  - What I actually wanted? *(истинные желания)*
  - What I was trying to avoid? *(избегаемые аспекты)*

### History Screen
- **Event Cards** with date, preview, edit/delete options
- **Empty State** for new users
- **Add New Event** button

## 🎨 Design System

### Colors
- **Primary**: `#009ECF` (Turquoise)
- **Background**: `#FFFFFF` (White)
- **Text**: `#333333` / `#666666`
- **Inputs**: `#FAFAFA` background

### Typography
- **Titles**: 28px bold
- **Labels**: 16px semi-bold
- **Body**: 16px regular

## 💾 Data Structure

Events are stored in AsyncStorage as JSON array:

```javascript
{
  whatHappened: string,
  whatIFelt: string, 
  whatIDone: string,
  whatIWanted: string,
  whatIAvoided: string,
  createdAt: string,
  updatedAt: string
}
```

## 🚀 Build & Deploy

### Development Preview
```bash
npx expo start
```

### Production Builds
```bash
# Android APK
npx eas build --platform android --profile preview

# iOS IPA  
npx eas build --platform ios --profile preview

# Web version
npx expo export --platform web
```

## 📋 Project Status

- ✅ **v1.0.0**: Core functionality implemented
- ✅ **Form validation** and error handling  
- ✅ **Local data persistence**
- ✅ **CRUD operations** for events
- ✅ **Responsive UI** design
- 🔄 **Coming Soon**: Assertiveness practice exercises

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for personal development and emotional intelligence
- Supports therapy and self-reflection practices
- Designed with privacy-first approach (local storage only)

---

**Made with ❤️ for emotional growth and assertiveness development**

![AssertiveMe Preview](https://via.placeholder.com/800x400/009ECF/FFFFFF?text=AssertiveMe+Preview)

> *Helping people understand their emotions and develop healthier communication patterns*
