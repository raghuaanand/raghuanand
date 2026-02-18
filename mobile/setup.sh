#!/bin/bash

# Mobile App Setup Script
# This script helps you set up the mobile development environment

set -e

echo "🚀 Raghu Anand Mobile App Setup"
echo "================================"
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v) detected"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm $(npm -v) detected"

# Navigate to mobile directory
cd "$(dirname "$0")"
echo "📁 Working in: $(pwd)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install global tools
echo ""
echo "🔧 Installing global Expo tools..."
npm install -g expo-cli eas-cli

# Check for fonts
echo ""
echo "📝 Checking font assets..."
FONTS_DIR="./assets/fonts"
REQUIRED_FONTS=("Inter-Regular.ttf" "Inter-Medium.ttf" "Inter-SemiBold.ttf" "CrimsonPro-Regular.ttf" "CrimsonPro-SemiBold.ttf" "CrimsonPro-Italic.ttf" "IBMPlexMono-Regular.ttf")

MISSING_FONTS=()
for font in "${REQUIRED_FONTS[@]}"; do
    if [ ! -f "$FONTS_DIR/$font" ]; then
        MISSING_FONTS+=("$font")
    fi
done

if [ ${#MISSING_FONTS[@]} -gt 0 ]; then
    echo "⚠️  Missing fonts:"
    for font in "${MISSING_FONTS[@]}"; do
        echo "   - $font"
    done
    echo ""
    echo "   Download fonts from Google Fonts and place in $FONTS_DIR"
    echo "   See $FONTS_DIR/README.md for details"
else
    echo "✅ All fonts present"
fi

# Check for images
echo ""
echo "🖼️  Checking image assets..."
IMAGES_DIR="./assets/images"
REQUIRED_IMAGES=("icon.png" "adaptive-icon.png" "splash-icon.png" "profile.png")

MISSING_IMAGES=()
for img in "${REQUIRED_IMAGES[@]}"; do
    if [ ! -f "$IMAGES_DIR/$img" ]; then
        MISSING_IMAGES+=("$img")
    fi
done

if [ ${#MISSING_IMAGES[@]} -gt 0 ]; then
    echo "⚠️  Missing images:"
    for img in "${MISSING_IMAGES[@]}"; do
        echo "   - $img"
    done
    echo ""
    echo "   Create placeholder images or add your assets"
    echo "   See $IMAGES_DIR/README.md for details"
else
    echo "✅ All images present"
fi

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo ""
    echo "📄 Creating .env file..."
    cp .env.example .env
    echo "✅ Created .env (update with your API URL if needed)"
fi

echo ""
echo "================================"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Add missing fonts/images (if any)"
echo "  2. Run 'npm start' to start development"
echo "  3. Scan QR code with Expo Go app"
echo ""
echo "For building:"
echo "  - Android APK: npm run build:android:preview"
echo "  - iOS build:   npm run build:ios:preview"
echo ""
