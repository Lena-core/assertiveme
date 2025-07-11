# 🚀 AssertiveMe - Подготовка к публикации

## 📱 Что нужно для публикации приложения

### 🎨 **Визуальные материалы**
- [ ] **Иконка приложения** (1024x1024 px)
- [ ] **Скриншоты** для разных устройств
- [ ] **Промо-изображения** для магазинов

### 📝 **Описания и метаданные**
- [ ] **Название**: AssertiveMe
- [ ] **Короткое описание**: "Emotional awareness & assertiveness training"
- [ ] **Полное описание**: 
```
AssertiveMe помогает анализировать сложные эмоциональные ситуации и развивать навыки ассертивности. 

🎯 Основные функции:
• Ведение дневника эмоциональных ситуаций
• Анализ чувств и поведения
• Развитие навыков ассертивности
• Локальное хранение данных

Идеально подходит для личностного роста, поддержки терапии и развития эмоционального интеллекта.
```

### 🏷️ **Категории и теги**
- **Категория**: Health & Fitness / Lifestyle
- **Теги**: emotional intelligence, assertiveness, personal development, mental health, diary

### 🔒 **Юридические документы**
- [ ] **Privacy Policy** (политика конфиденциальности)
- [ ] **Terms of Service** (условия использования)

### 📊 **Настройки app.json**
```json
{
  "expo": {
    "name": "AssertiveMe",
    "slug": "assertive-me",
    "version": "1.0.0",
    "description": "Emotional awareness & assertiveness training app",
    "privacy": "public",
    "platforms": ["ios", "android", "web"],
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#009ECF"
    },
    "orientation": "portrait",
    "scheme": "assertiveme",
    "userInterfaceStyle": "automatic"
  }
}
```

## 🎯 **Пошаговый план публикации**

### **Неделя 1: Подготовка**
1. Создать иконку и скриншоты
2. Написать описания на нескольких языках
3. Подготовить Privacy Policy
4. Протестировать приложение с друзьями

### **Неделя 2: Техническая подготовка**
1. Настроить app.json
2. Создать production builds
3. Зарегистрироваться в магазинах приложений
4. Настроить analytics (опционально)

### **Неделя 3: Публикация**
1. Загрузить в Google Play
2. Загрузить в App Store
3. Создать веб-версию
4. Подготовить marketing материалы

## 🛠️ **Команды для публикации**

### **EAS Build Setup**
```bash
# Установить EAS CLI
npm install -g @expo/cli

# Войти в аккаунт
npx expo login

# Инициализировать EAS
npx eas build:configure

# Создать Android APK
npx eas build --platform android --profile preview

# Создать iOS build (нужен Apple Developer Account)
npx eas build --platform ios --profile preview
```

### **Веб деплой**
```bash
# Создать веб-версию
npx expo export --platform web

# Деплой на Vercel
npx vercel deploy dist

# Или на Netlify
netlify deploy --prod --dir=dist
```

## 💰 **Стоимость публикации**

### **Бесплатно:**
- ✅ Expo Go sharing
- ✅ GitHub repository
- ✅ Веб-версия (Vercel/Netlify)

### **Платно:**
- 💰 Google Play: $25 (одноразово)
- 💰 Apple Developer: $99/год
- 💰 EAS Build: бесплатно до лимитов, потом $29/месяц

## 🎯 **Рекомендуемая последовательность:**

1. **Сначала**: Expo Go + QR код (тесты)
2. **Потом**: APK файл через EAS Build
3. **Затем**: Веб-версия на Vercel
4. **В конце**: Магазины приложений

Каждый следующий шаг даёт больше охвата, но требует больше времени и ресурсов.
