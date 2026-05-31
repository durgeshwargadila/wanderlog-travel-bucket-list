# WanderLog — Travel Bucket List App

WanderLog is a modern, recruiter-ready React application built with **React, Vite, and Plain CSS**. It allows users to search, filter, and sort countries around the world, view their detailed specifications, and build a persistent, priority-based travel bucket list.

---

## 🚀 Key Features

1. **Authentication Flow (Mock Auth)**: Log in and register integrations via Reqres.in API.
2. **Session & State Persistence**: Auths and user lists are saved in `localStorage`, guaranteeing isolated lists per user email.
3. **Optimized Country Explorer**:
   - Live query fields optimization (minimizes REST Countries payload to ~15KB).
   - Debounced search queries preventing performance hiccups.
   - Region/continent filters and multi-parameter sorting configurations.
4. **Interactive Profile Details**:
   - Shows capitals, population size, land area, timezones, and currencies.
   - Neighboring country border links supporting keyboard actions.
5. **Drag-and-Drop priority sorting**: Dashboard drag actions reorder Wishlists and Visited priority lists dynamically.
6. **Robust Error Resilience**: Inline retry blocks coupled with `react-hot-toast` notifications.
7. **Skeleton Loading System**: Custom keyframe shimmers mimicking detail page outlines.
8. **Dual-Theme Persistency**: Beautiful light and dark themes styled using CSS custom properties.
9. **Accessibility (a11y)**: Accessible focus-visible boundaries, label attachments, screen-reader texts, and Space/Enter trigger selections.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18 / Vite 8
- **Routing**: React Router DOM (v6) only
- **Styling**: Vanilla CSS Variables & Flexbox/Grid Layouts (No CSS frameworks)
- **State Management**: React Context API & useReducer
- **Notifications**: `react-hot-toast`
- **Icon Set**: `lucide-react`

---

## 💻 Local Installation & Setup

Follow these steps to run WanderLog on your computer:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder-name>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_COUNTRY_API=https://restcountries.com/v3.1
   VITE_AUTH_API=https://reqres.in/api
   ```

4. **Run Local Server**:
   ```bash
   npm run dev
   ```
   Open your browser to the URL shown in your terminal (usually `http://localhost:5173`).

5. **Generate Production Compilation**:
   ```bash
   npm run build
   ```

---

## 🔑 Test Evaluation Credentials

Reqres.in mock auth accepts a fixed set of accounts for success returns. Please use:

- **Email**: `eve.holt@reqres.in`
- **Password**: Any password works (e.g. `cityslicka`)

*Note: Clicking the Autofill button on the Sign In or Sign Up cards automatically populates these credentials.*

---

## ☁️ Deployment Instructions

### Deploy to GitHub
1. Create a public repository on GitHub.
2. Initialize and push your local codebase:
   ```bash
   git init
   git add .
   git commit -m "feat: complete WanderLog travel bucket list app"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### Deploy to Vercel
1. Install the Vercel CLI globally or use the Vercel GitHub Integration dashboard.
2. If using Vercel CLI, execute from root:
   ```bash
   vercel
   ```
3. Set your project properties, click "Deploy". In your production settings, Vercel will automatically read `vercel.json` rewrite settings to handle React Router client pathing redirects.

---

## 📝 Recruiter Extension Note (Future Enhancements)

If given more development timeline, the following additions would be implemented to elevate the application:
1. **API Pagination & Virtual Scrolling**: Integrate virtual scrolling lists (using `@tanstack/react-virtual` or similar) to render only in-viewport cards, boosting scroll performance for low-end mobile devices.
2. **Offline Mode with Service Workers**: Set up Workbox and indexDB to caching REST countries responses and sync queued offline wishlist actions when internet connection returns.
3. **Advanced Detail Map views**: Render visual map points using leaflet or Mapbox, utilizing geographic latitude/longitude values from REST Countries responses.
4. **Multi-User Real-time Sync**: Hook database lists to a headless cloud backend like Supabase or Firebase to enable live bucket list sharing between users.
