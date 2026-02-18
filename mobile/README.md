# Raghu Anand - Mobile Application

A world-class mobile application for iOS and Android, built with React Native and Expo. This app provides an Apple-quality native experience with a Medium-quality reading experience, maintaining full parity with the web portfolio.

## 📱 Features

- **Home Screen**: Hero section, recent articles, and quick navigation
- **Writing Screen**: Full article listing with featured posts
- **Article Reader**: Long-form reading experience optimized for mobile
- **Projects Screen**: Portfolio of projects with links
- **About Screen**: Bio, experience, and contact information

## 🎨 Design Philosophy

- Same product, different form factor
- Apple-quality native interactions
- Medium-quality reading experience
- Calm, confident, timeless design
- No webview feel, no generic templates

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK 52
- **Navigation**: Expo Router (file-based routing)
- **Styling**: React Native StyleSheet (matching web design tokens)
- **Fonts**: Inter, Crimson Pro, IBM Plex Mono
- **Build**: EAS Build (Expo Application Services)

## 📁 Project Structure

```
mobile/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout
│   ├── (tabs)/             # Tab navigator
│   │   ├── _layout.tsx     # Tab configuration
│   │   ├── index.tsx       # Home screen
│   │   ├── writing.tsx     # Articles list
│   │   ├── projects.tsx    # Projects
│   │   └── about.tsx       # About/Contact
│   └── writing/
│       └── [slug].tsx      # Article detail
├── components/             # Reusable components
│   ├── ui/                 # Base UI components
│   │   ├── Text.tsx
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── ArticleCard.tsx
│   ├── ArticleList.tsx
│   ├── ArticleContent.tsx
│   ├── Header.tsx
│   └── ...
├── constants/              # Design tokens & content
│   ├── theme.ts            # Colors, typography, spacing
│   ├── types.ts            # TypeScript interfaces
│   └── content.ts          # Static content
├── lib/                    # Utilities & hooks
│   ├── api.ts              # API client
│   ├── utils.ts            # Helper functions
│   └── hooks.ts            # Custom React hooks
├── assets/                 # Static assets
│   ├── fonts/              # Custom fonts
│   └── images/             # App icons & images
├── app.json                # Expo configuration
├── eas.json                # EAS Build configuration
└── package.json            # Dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- For iOS: macOS with Xcode (for local builds)
- For Android: Android Studio with SDK (for local builds)

### Installation

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start development server
npm start
```

### Running on Device

1. Install "Expo Go" app on your phone (App Store / Play Store)
2. Scan the QR code from the terminal
3. The app will load on your device

### Running on Simulator

```bash
# iOS Simulator (macOS only)
npm run ios

# Android Emulator
npm run android
```

---

## 📦 Building for Production

### Setting Up EAS Build

1. Create an Expo account at https://expo.dev
2. Login to EAS:
   ```bash
   eas login
   ```
3. Configure your project:
   ```bash
   eas build:configure
   ```

### Understanding Build Profiles

The `eas.json` file defines three build profiles:

| Profile | Purpose | Output |
|---------|---------|--------|
| `development` | Testing with dev tools | APK / Simulator build |
| `preview` | Internal testing | APK / Ad-hoc IPA |
| `production` | Store release | AAB / App Store IPA |

---

## 🤖 Android Build & Publishing

### Building APK for Testing

```bash
# Build debug APK
eas build --platform android --profile preview
```

This creates an APK file that can be installed directly on any Android device.

### Installing APK on Device

1. **Enable Unknown Sources**:
   - Go to Settings → Security
   - Enable "Install unknown apps" for your file manager

2. **Transfer APK**:
   - Download from EAS dashboard, or
   - Use `adb install app.apk`

3. **Install**: Open the APK file on your device

### Building for Google Play Store

```bash
# Build production App Bundle
eas build --platform android --profile production
```

This creates an AAB (Android App Bundle) file optimized for Play Store distribution.

### Publishing to Google Play

#### 1. Create Google Play Console Account

1. Go to https://play.google.com/console
2. Pay $25 one-time registration fee
3. Complete account verification (can take 48 hours)

#### 2. Create App Listing

1. Click "Create app"
2. Fill in app details:
   - App name: "Raghu Anand"
   - Default language: English
   - App or game: App
   - Free or paid: Free

#### 3. Complete Store Listing

Required information:
- **Short description** (80 chars): "Engineering insights and portfolio by Raghu Anand"
- **Full description** (4000 chars): Detailed app description
- **Screenshots**: 
  - Phone: At least 2 (1080x1920 recommended)
  - Tablet: At least 1 7-inch, 1 10-inch
- **Feature graphic**: 1024x500 PNG
- **App icon**: 512x512 PNG
- **Category**: Books & Reference or Education
- **Contact email**: Your email address
- **Privacy policy URL**: Link to privacy policy

#### 4. Content Rating

1. Go to "Content rating" in sidebar
2. Complete IARC questionnaire
3. Receive content ratings for each country

#### 5. Set Up Pricing

1. Go to "Monetization setup"
2. Select "Free" (or configure paid)
3. Select countries for distribution

#### 6. Upload App Bundle

1. Go to "Production" → "Create new release"
2. Upload the `.aab` file from EAS build
3. Add release notes
4. Review and roll out

#### 7. App Review

- Google reviews typically take 1-7 days
- First submission may take longer
- Address any policy violations if rejected

### Setting Up Automated Submission

Update `eas.json` for automated submission:

```json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-services-key.json",
        "track": "internal"
      }
    }
  }
}
```

Create a Service Account:
1. Go to Google Cloud Console
2. Create a service account
3. Grant "Service Account User" role
4. Download JSON key file
5. In Play Console, go to "Users and permissions"
6. Invite the service account email with "Release manager" access

Then submit:
```bash
eas submit --platform android --latest
```

---

## 🍎 iOS Build & Publishing

### Prerequisites

- Apple Developer Account ($99/year)
- macOS with Xcode installed (for local signing)

### Building for TestFlight

```bash
# Build for internal testing
eas build --platform ios --profile preview
```

### Building for App Store

```bash
# Build production IPA
eas build --platform ios --profile production
```

### Setting Up Apple Credentials

EAS can manage credentials automatically:

```bash
# Let EAS handle certificates
eas credentials
```

Or manually:
1. Go to https://developer.apple.com
2. Create App ID: `com.raghuanand.portfolio`
3. Create Distribution Certificate
4. Create Provisioning Profile

### Publishing to App Store

#### 1. Create App Store Connect Entry

1. Go to https://appstoreconnect.apple.com
2. Click "+" → "New App"
3. Fill in details:
   - Platform: iOS
   - Name: "Raghu Anand"
   - Primary language: English
   - Bundle ID: `com.raghuanand.portfolio`
   - SKU: `raghuanand-portfolio`

#### 2. Complete App Information

Required:
- **Screenshots**:
  - 6.7" (iPhone 14 Pro Max): 1290x2796 or 2796x1290
  - 6.5" (iPhone 11 Pro Max): 1284x2778 or 2778x1284
  - 5.5" (iPhone 8 Plus): 1242x2208 or 2208x1242
  - iPad Pro 12.9": 2048x2732 or 2732x2048
- **App Preview** (optional): 15-30 second video
- **Description**: Up to 4000 characters
- **Keywords**: Up to 100 characters
- **Support URL**: Your website
- **Privacy Policy URL**: Required

#### 3. Upload Build

Using EAS Submit:
```bash
eas submit --platform ios --latest
```

Or manually:
1. Download IPA from EAS dashboard
2. Use Transporter app (macOS) to upload
3. Wait for processing (10-30 minutes)

#### 4. Submit for Review

1. Select the build in App Store Connect
2. Complete "App Review Information"
3. Add notes for reviewer if needed
4. Submit for review

#### 5. TestFlight (Optional Pre-release)

1. Go to TestFlight tab
2. Add internal testers (up to 100)
3. Or create public link for external testers
4. TestFlight builds don't need full review

#### 6. App Review

- Apple reviews typically take 24-48 hours
- May request additional information
- Common rejection reasons:
  - Crashes or bugs
  - Incomplete features
  - Guideline violations
  - Privacy policy issues

### Setting Up Automated Submission

Update `eas.json`:

```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "your-app-store-connect-app-id"
      }
    }
  }
}
```

Get your ASC App ID from App Store Connect (it's in the URL when viewing your app).

---

## 🔧 Environment Configuration

### API Configuration

Create `.env` file:

```bash
EXPO_PUBLIC_API_URL=https://raghuanand.me
```

For development, you may use a local API:
```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### Updating App Version

In `app.json`:
```json
{
  "expo": {
    "version": "1.0.0",
    "ios": {
      "buildNumber": "1"
    },
    "android": {
      "versionCode": 1
    }
  }
}
```

For updates:
- Increment `version` for user-visible changes
- Increment `buildNumber`/`versionCode` for each store upload

---

## 📋 Pre-Launch Checklist

### Assets
- [ ] App icon (1024x1024)
- [ ] Splash screen icon
- [ ] Profile image
- [ ] Store screenshots (all required sizes)
- [ ] Feature graphic (Android)

### Content
- [ ] Privacy policy URL
- [ ] Support email/URL
- [ ] App description (short and full)
- [ ] Keywords (iOS)
- [ ] Release notes

### Technical
- [ ] API endpoint configured
- [ ] Fonts installed
- [ ] Production build tested
- [ ] Deep links configured (if any)

### Store Listings
- [ ] App Store listing complete
- [ ] Google Play listing complete
- [ ] Content ratings completed
- [ ] Pricing and availability set

---

## 🐛 Troubleshooting

### Common Issues

**Fonts not loading:**
- Ensure font files exist in `assets/fonts/`
- Check font names match exactly in `useFonts()`

**API not connecting:**
- Check `EXPO_PUBLIC_API_URL` is set
- Ensure CORS is enabled on web API
- Check network connectivity

**Build failures:**
- Run `npx expo-doctor` to diagnose
- Clear cache: `npx expo start -c`
- Check EAS build logs for details

**iOS Simulator not working:**
- Ensure Xcode is installed and configured
- Run `sudo xcode-select -s /Applications/Xcode.app`

**Android Emulator not working:**
- Ensure Android Studio and SDK are installed
- Check `ANDROID_HOME` environment variable

---

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines)
- [Google Play Policy Center](https://play.google.com/console/about/guides/releasewithconfidence)

---

## 🤝 Contributing

This is a personal portfolio project. For questions or suggestions, reach out via the contact information in the app.

## 📄 License

This project is private and not licensed for redistribution.
