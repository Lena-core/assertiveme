#!/bin/bash

echo ""
echo "========================================"
echo "   🐙 AssertiveMe GitHub Setup"
echo "========================================"
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed"
    echo "Please install Git from https://git-scm.com/"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Initialize Git repository
echo "📂 Initializing Git repository..."
git init

# Add all files
echo "📝 Adding all files..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "🎉 Initial commit: AssertiveMe v1.0.0

✨ Features:
- Emotional situation logging with 5 comprehensive fields
- Event history with edit/delete functionality  
- Local data persistence with AsyncStorage
- Clean UI with turquoise accent (#009ECF)
- Form validation and error handling
- TypeScript support with Expo Router

🏗️ Tech Stack:
- React Native + Expo Router
- TypeScript
- AsyncStorage for local storage
- File-based routing

📱 App Structure:
- Main screen: Situation analysis form
- History screen: Event management
- Tab navigation ready for future features

🎯 Purpose: Help users develop emotional awareness and assertiveness skills"

echo ""
echo "✅ Git repository initialized successfully!"
echo ""
echo "========================================"
echo "   📋 Next Steps:"
echo "========================================"
echo ""
echo "1. Go to https://github.com/new"
echo "2. Repository name: assertiveme"
echo "3. Description: 🧠💪 Emotional awareness & assertiveness training mobile app"
echo "4. Make it Public"
echo "5. DO NOT initialize with README/LICENSE (we already have them)"
echo "6. Click 'Create repository'"
echo ""
echo "7. Run these commands (replace YOUR_USERNAME):"
echo "   git remote add origin https://github.com/YOUR_USERNAME/assertiveme.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "========================================"
echo "   🎉 Repository Ready for GitHub!"
echo "========================================"
echo ""
