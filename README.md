# Bhutan Civil Registration & Census System - Frontend

## Features

### Core Functionality

- **Application Guides**: Interactive step-by-step guides for:
  - CID for Adults (18+)
  - CID for Minors (<18)
- **AI-Powered Assistant**: Intelligent chatbot to help users with application processes

### Key Components

- **News & Announcements**: Latest updates and notifications
- **Contact Section**: Integrated chat interface and office details
- **Birth Registration Forms**: Digital forms for civil registration
- **Quick Links**: Easy access to government services

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Package Manager**: npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Census-Pro/census-frontend.git
   cd census-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Project Structure

```
census-frontend/
├── app/
│   ├── (navigation)/        # Main navigation routes
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── divisions/      # Divisions overview
│   │   ├── guide/          # Application guides
│   │   │   ├── cid-adult/  # Adult CID guide
│   │   │   └── cid-minor/  # Minor CID guide
│   │   ├── leadership/     # Leadership directory
│   │   └── offices/        # Regional offices
│   ├── api/                # API routes
│   ├── components/         # Reusable components
│   │   ├── form/          # Form components
│   │   ├── guide/         # Guide assistant
│   │   └── news-announcements/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets
│   ├── ChatBot.jpg
│   ├── headertext.svg
│   ├── left.svg
│   ├── right.svg
│   └── ndi.svg
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Design System

### Color Palette

- **Primary**: Orange/Saffron theme (matching national colors)
- **Secondary**: Complementary accent colors
- **Background**: Clean white with subtle gray tones
- **Text**: Black and gray scale for optimal readability

### Typography

- **Font Weights**: Bold, black weights for headings
- **Responsive Sizing**: Scales appropriately across breakpoints
- **Uppercase Tracking**: Wide letter spacing for emphasis

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Tailwind Configuration

Custom theme settings are defined in `tailwind.config.js`:

- Custom colors
- Extended spacing
- Custom animations
- Font families

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

- **Netlify**: Compatible with Next.js
- **AWS**: Deploy using AWS Amplify
- **Self-hosted**: Use `npm run build` and serve with PM2 or similar

## Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## License

This project is proprietary software developed for the Department of Civil Registration & Census, Royal Government of Bhutan.

## Team

**Developers**
- Tenzin Yoezer (Team Lead)
- Asseh Nepal (Backend)
- Sonam Tenzin (Frontend)

**Department of Civil Registration & Census (DCRC)**

- Government of Bhutan
- Ministry of Home Affairs
- GovTech

## Changelog

### Version 1.0.0 (Current)

- Initial release
- Responsive design implementation
- All core pages and features
- AI assistant integration

## Acknowledgments

- Royal Government of Bhutan
- Ministry of Home Affairs
- Department of Civil Registration & Census
- All contributors and developers

---

**Built for the people of Bhutan by 21 Tech**
