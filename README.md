# 3D Portfolio Website

A modern, interactive portfolio website built with React and Three.js featuring a beautiful 3D background animation.

## Features

- 🎨 **3D Background Animation**: Interactive Three.js scene with floating geometric shapes
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- ⚡ **Modern Stack**: Built with React 18 and Vite for fast development
- 🎯 **Smooth Animations**: Elegant fade-in and scroll animations
- 🖱️ **Mouse Interaction**: Camera follows mouse movement for immersive experience

## Tech Stack

- **React 18** - UI library
- **Three.js** - 3D graphics library
- **Vite** - Build tool and dev server
- **CSS-in-JS** - Styled components with inline styles

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   └── Portfolio3D.jsx    # Main portfolio component
│   ├── App.jsx                 # Root app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js             # Vite configuration
└── README.md                   # This file
```

## Customization

You can customize the portfolio by editing `src/components/Portfolio3D.jsx`:

- **Projects**: Update the `projects` array
- **Skills**: Modify the `skills` array
- **Contact Info**: Update the contact section
- **Colors**: Change the color scheme in the CSS styles
- **3D Shapes**: Adjust the geometries and colors in the Three.js scene

## Hosting Your Portfolio

Your portfolio is ready to be hosted! Here are the best free hosting options:

### Option 1: Vercel (Recommended - Easiest)

1. **Push your code to GitHub** (if not already):

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click "Deploy"
   - Your site will be live in seconds with a custom URL like `your-portfolio.vercel.app`

**Benefits**: Zero configuration, automatic HTTPS, custom domains, continuous deployment

### Option 2: Netlify

1. **Push your code to GitHub** (same as above)

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign up/login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"
   - Your site will be live with a URL like `your-portfolio.netlify.app`

**Benefits**: Free SSL, custom domains, form handling, serverless functions

### Option 3: GitHub Pages

1. **Update `vite.config.js`** to set the base path:

   ```js
   export default defineConfig({
     plugins: [react()],
     base: "/your-repo-name/", // Replace with your GitHub repo name
   });
   ```

2. **Install gh-pages package**:

   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to `package.json`**:

   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy**:

   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: `gh-pages` branch
   - Your site will be at `https://yourusername.github.io/your-repo-name/`

### Option 4: Cloudflare Pages

1. **Push your code to GitHub**

2. **Deploy to Cloudflare Pages**:
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Connect your GitHub account
   - Select your repository
   - Build settings:
     - **Framework preset**: Vite
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
   - Click "Save and Deploy"

**Benefits**: Fast global CDN, free SSL, unlimited bandwidth

### Option 5: Firebase Hosting

1. **Install Firebase CLI**:

   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase**:

   ```bash
   firebase init hosting
   ```

   - Select "Use an existing project" or create a new one
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Don't overwrite index.html: `No`

3. **Build and deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

**Benefits**: Free hosting, CDN, custom domains, easy rollbacks

### Quick Local Build Test

Before deploying, test your production build locally:

```bash
npm run build
npm run preview
```

This will serve your production build at `http://localhost:4173` to verify everything works correctly.

## License

© 2025 Vivek Manna. All rights reserved.
