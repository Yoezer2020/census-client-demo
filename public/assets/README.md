# Assets Folder Structure

This folder contains all static assets for the Client Portal application.

## Folder Organization

```
assets/
├── images/       # General images (backgrounds, banners, photos, etc.)
├── icons/        # Icon files (SVG, PNG icons)
├── logos/        # Company and partner logos
├── fonts/        # Custom font files (if needed)
└── documents/    # PDF files, documents for download
```

## Usage in Components

### Accessing Images in Next.js

```tsx
import Image from 'next/image';

// Example: Using an image
<Image
  src="/assets/images/banner.jpg"
  alt="Banner"
  width={1200}
  height={600}
/>

// Example: Using as background
<div style={{ backgroundImage: 'url(/assets/icons/logo.svg)' }}>
  Content here
</div>
```

### Accessing in CSS/Tailwind

```css
.background {
  background-image: url("/assets/images/background.jpg");
}
```

## Best Practices

1. **Optimize images** before adding them to the project
2. **Use descriptive names** for files (e.g., `hero-banner.jpg`, not `img1.jpg`)
3. **Use SVG** for icons and logos when possible
4. **Keep file sizes small** for better performance
5. **Use Next.js Image component** for automatic optimization

## File Naming Convention

- Use lowercase with hyphens: `user-profile.png`
- Be descriptive: `home-hero-background.jpg`
- Include dimensions for specific sizes: `logo-small-100x100.png`
