# Energy World - Fonts Directory

## About Fonts

This directory contains the offline font files for the Energy World website.

### Fonts Used

**Inter** - Body text and general content  
**Outfit** - Headings and titles

### System Font Fallbacks

The website uses a robust font stack with fallbacks to ensure text displays correctly even if font files fail to load:

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

This means the website will use:
1. Inter/Outfit (if loaded from these files)
2. macOS system font (-apple-system)
3. Chrome/Edge system font (BlinkMacSystemFont)
4. Windows system font (Segoe UI)
5. Generic sans-serif

### Download Full Font Files (Optional)

To use the actual Inter and Outfit fonts instead of system fallbacks, download them from:

**Inter Font:**
- Official Site: https://rsms.me/inter/
- GitHub: https://github.com/rsms/inter

**Outfit Font:**
- Google Fonts: https://fonts.google.com/specimen/Outfit
- GitHub: https://github.com/Outfitio/Outfit-Fonts

### Installation Instructions

1. Download the `.woff2` font files
2. Place them in the respective folders:
   - `inter/` folder: inter-regular.woff2, inter-medium.woff2, inter-semibold.woff2, inter-bold.woff2
   - `outfit/` folder: outfit-regular.woff2, outfit-medium.woff2, outfit-semibold.woff2, outfit-bold.woff2, outfit-extrabold.woff2
3. The fonts will load automatically (already configured in style.css)

### Current Status

✅ Font declarations in CSS (using @font-face)  
✅ System font fallbacks configured  
⏳ Full font files (can be downloaded and placed here)

The website works perfectly with system fonts, downloading the actual fonts is optional for brand consistency.
