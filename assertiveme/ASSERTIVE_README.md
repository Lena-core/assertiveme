# AssertiveMe - Emotional Awareness & Assertiveness Training App

## 📱 Overview
AssertiveMe is a React Native app designed to help users analyze difficult emotional situations and develop assertiveness skills. Users can log situations where they experienced complex feelings, reflect on their responses, and work towards more assertive behavior.

## 🏗️ App Structure

### Main Screens

#### 1. **Main Screen** (`app/index.tsx`)
- **Title**: "Let's figure it out"
- **Purpose**: Input and edit information about challenging emotional situations
- **Features**:
  - Tab navigation between "Situation" and "Assertiveness practice"
  - Five input fields for comprehensive situation analysis:
    - What happened? (situation description)
    - What I felt? (emotions and bodily reactions)
    - What I've done? (actual behavior)
    - What I actually wanted? (true desires)
    - What I was trying to avoid? (avoided aspects like conflict, intimacy)
  - Save/Cancel buttons
  - Form validation (first 3 fields required)
  - Edit mode for existing entries

#### 2. **History Screen** (`app/history.tsx`)
- **Title**: "History"
- **Subtitle**: "New"
- **Purpose**: View and manage saved event records
- **Features**:
  - List of event cards with:
    - Bell icon (🔔)
    - Date (formatted as "Month Year")
    - Event preview (truncated description)
    - Edit button
    - Delete option
  - Empty state with call-to-action
  - Pull-to-refresh functionality
  - Add new event button

### Navigation Flow
1. **App Start** → Main Screen (index.tsx)
2. **Save Event** → History Screen
3. **Edit Button** → Main Screen (with pre-filled data)
4. **Add New** → Main Screen (empty form)

## 🎨 Design System

### Color Palette
- **Primary Color**: `#009ECF` (Turquoise)
- **Background**: `#FFFFFF` (White)
- **Text Primary**: `#333333`
- **Text Secondary**: `#666666`
- **Input Background**: `#FAFAFA`
- **Borders**: `#E0E0E0`

### Typography
- **Title**: 28px, bold
- **Subtitle**: 18px, semi-bold
- **Labels**: 16px, semi-bold
- **Body**: 16px, regular
- **Small Text**: 14px

### Component Styling
- **Rounded Corners**: 12px for cards, 25px for buttons
- **Spacing**: 20px margins, 16px padding
- **Shadows**: Subtle elevation for cards
- **Tab Design**: Pill-shaped with smooth transitions

## 💾 Data Storage

### Storage Structure
- **Storage Key**: `'assertive_events'`
- **Format**: JSON array of event objects
- **Event Object Structure**:
```javascript
{
  whatHappened: string,
  whatIFelt: string,
  whatIDone: string,
  whatIWanted: string,
  whatIAvoided: string,
  createdAt: string (ISO format),
  updatedAt: string (ISO format)
}
```

## 🔧 Technical Implementation

### Dependencies
- **Framework**: React Native with Expo Router
- **Navigation**: Expo Router for file-based routing
- **Storage**: AsyncStorage for local data persistence
- **Icons**: Native emojis and text symbols
- **Styling**: StyleSheet API with responsive design

### File Structure
```
app/
├── _layout.tsx          # Root layout with navigation
├── index.tsx           # Main screen (form input)
├── history.tsx         # History screen (event list)
└── +not-found.tsx      # 404 screen

screens/                # Legacy folder (can be removed)
├── MainScreen.js
└── HistoryScreen.js

App.js                  # Entry point (updated for new structure)
```

## 🚀 Features

### Current Features
- ✅ Comprehensive situation logging
- ✅ Event history with edit/delete
- ✅ Form validation
- ✅ Responsive UI design
- ✅ Data persistence
- ✅ Empty states
- ✅ Error handling

### Future Features (Planned)
- 🔄 Assertiveness practice exercises
- 🔄 Progress tracking
- 🔄 Export functionality
- 🔄 Reminder notifications
- 🔄 Categories and tags

## 🎯 Purpose & Benefits
This app helps users:
1. **Increase Self-Awareness**: By documenting emotional reactions and behaviors
2. **Identify Patterns**: Through regular logging and review
3. **Develop Assertiveness**: By clarifying true desires vs. actual actions
4. **Reduce Avoidance**: By identifying what they're trying to avoid
5. **Improve Communication**: Through structured reflection on interpersonal situations

## 📱 Usage Instructions
1. **Start**: Open app to main form screen
2. **Log Event**: Fill in situation details (first 3 fields required)
3. **Save**: Data saved to device storage and navigate to history
4. **Review**: View past events in history screen
5. **Edit**: Tap "Edit" on any event to modify
6. **Delete**: Tap "×" to remove unwanted events

Perfect for therapy support, personal development, and building emotional intelligence!
