# Raghu Anand - Portfolio Website

A classic, timeless portfolio website built with Next.js, TypeScript, and Tailwind CSS, showcasing professional software engineering expertise and projects.

## 🎨 Design Philosophy

This portfolio follows a **classic and timeless design** approach with:
- **Color Palette**: Navy blue (#1a365d), charcoal gray (#2d3748), professional blue accent (#3182ce), and off-white backgrounds
- **Typography**: Crimson Text serif for headings, Inter sans-serif for body text
- **Layout**: Mobile-first responsive design with clean spacing and professional aesthetics
- **Accessibility**: WCAG AA compliance with proper contrast ratios and semantic HTML

## ✨ Key Features

### Overview/Detail Modal System
- **Main Page**: Shows brief overviews of all sections with "View in Detail" buttons
- **Modal Experience**: Full-screen detailed content in smooth, accessible modals
- **Smart Features**:
  - Scroll position memory - modals remember where you left off
  - Keyboard navigation (ESC to close, focus management)
  - Progress indicator showing scroll progress
  - Lazy loading for better performance
  - Mobile-optimized responsive design
  - Smooth animations and micro-interactions

### Performance Optimizations
- Lazy-loaded modal content components
- Scroll position persistence
- Optimized bundle splitting
- Fast page transitions

### 🏠 Hero Section
- Full-viewport landing with professional tagline
- Primary CTAs for resume download and work showcase
- Smooth scroll navigation

### 👨‍💻 About Me
- Professional headshot with hover effects
- Personal background and career goals
- Technology showcase with interactive elements

### 🛠️ Technical Skills
- Categorized skill display (Frontend, Backend, Tools)
- Visual skill level indicators
- Certifications and achievements showcase

### 💼 Experience & Education
- Timeline-based experience display
- Detailed achievements and technologies used
- Educational background with relevant coursework

### 🚀 Featured Projects
- Showcase of 3-5 key projects
- Live demo and source code links
- Project screenshots and technology stacks

### 📝 Blog/Writing
- Recent articles with summaries
- External links to full articles
- Category-based organization

### 📞 Contact
- Comprehensive contact form
- Multiple contact methods
- Social media integration
- Quick action buttons

### 🔗 Footer
- Complete site navigation
- Social links and contact information
- Professional copyright notice

## 🚀 Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **UI Components**: Headless UI
- **State Management**: Zustand
- **Image Optimization**: Next.js Image
- **Font Loading**: Google Fonts

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/raghuaanand/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage with all sections
├── components/            # Reusable components
│   ├── sections/         # Page sections
│   │   ├── hero.tsx      # Landing section
│   │   ├── about.tsx     # About section
│   │   ├── skills.tsx    # Skills showcase
│   │   ├── experience.tsx # Experience timeline
│   │   ├── projects.tsx  # Featured projects
│   │   ├── blog.tsx      # Recent writing
│   │   └── contact.tsx   # Contact form & info
│   ├── cards/            # Card components
│   ├── navbar.tsx        # Navigation header
│   ├── footer.tsx        # Site footer
│   └── drawer.tsx        # Mobile navigation
├── constants/            # Data and configuration
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and types
└── public/              # Static assets
```

## 🎨 Customization

### Colors
Update the color palette in `tailwind.config.ts`:
```typescript
colors: {
  primary: "#1a365d",      // Navy blue
  secondary: "#2d3748",    // Charcoal
  accent: "#3182ce",       // Professional blue
  background: "#f7fafc",   // Off-white
  surface: "#ffffff",      // Pure white
}
```

### Fonts
Modify font imports in `app/globals.css`:
```css
@import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap");
```

### Content
Update personal information in `constants/index.tsx`:
- Experience data
- Education details
- Skills and technologies
- Project information
- Blog posts
- Social links

## 📱 Responsive Design

The portfolio is fully responsive across all device sizes:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key responsive features:
- Collapsible navigation with hamburger menu
- Responsive grid layouts
- Optimized typography scaling
- Touch-friendly interactive elements

## ♿ Accessibility

Built with accessibility in mind:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios
- Focus indicators

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Below-the-fold content lazy loading
- **Font Optimization**: Google Fonts with `display=swap`
- **Bundle Analysis**: Optimized bundle size

## 📈 SEO Features

- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Rich snippets for search engines
- **Sitemap**: Auto-generated XML sitemap
- **Analytics Ready**: Google Analytics integration ready

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Custom Server
1. Build the project: `npm run build`
2. Start the server: `npm start`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Contact

- **Email**: raghuaanand@gmail.com
- **LinkedIn**: [linkedin.com/in/raghuanand](https://linkedin.com/in/raghuanand)
- **GitHub**: [github.com/raghuaanand](https://github.com/raghuaanand)

---

Built with ❤️ by Raghu Anand using Next.js and Tailwind CSS
