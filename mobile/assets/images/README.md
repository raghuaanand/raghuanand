# Image Assets

This folder contains image assets for the mobile app.

## Required Images

### App Icons
- `icon.png` - App icon (1024x1024 pixels, PNG)
- `adaptive-icon.png` - Android adaptive icon foreground (1024x1024 pixels, PNG)
- `favicon.png` - Web favicon (48x48 pixels, PNG)
- `splash-icon.png` - Splash screen icon (288x288 pixels, PNG)

### Profile
- `profile.png` - Profile photo (used on Home and About screens)

## Creating App Icons

You can use tools like:
- https://icon.kitchen/ - Free app icon generator
- https://www.appicon.co/ - Generate all sizes from one image

### Icon Requirements

1. **App Icon (icon.png)**
   - Size: 1024x1024 pixels
   - Format: PNG with no transparency
   - Used for iOS App Store and home screen

2. **Adaptive Icon (adaptive-icon.png)**
   - Size: 1024x1024 pixels
   - Format: PNG with transparency (foreground only)
   - Android uses this with a background color (#ffffff set in app.json)

3. **Splash Icon (splash-icon.png)**
   - Size: 288x288 pixels (will be centered)
   - Format: PNG with transparency
   - Shown while app loads

## Placeholder Icons

For development, you can create simple placeholder icons using any image editor.
The app will build with any valid PNG files.
