# News App

A modern, responsive news aggregator built with React, Vite, Tailwind CSS, and Firebase authentication. Fetches news from NewsAPI.org, focusing on Indian news sources, and provides user authentication, topic filtering, and search functionality.

---

## Features

- **User Authentication:** Register and login with email/password using Firebase Auth. Auth state is managed globally.
- **Protected Routes:** Only authenticated users can access the main news feed.
- **News Feed:**
  - Fetches news from NewsAPI.org, filtered for Indian sources
  - Search for news by keyword
  - Filter by popular topics (Business, Technology, Sports, etc.)
  - Pagination with "Load More" button
  - Responsive sidebar for topics on mobile
- **UI:** Responsive, modern design using Tailwind CSS, with a Navbar and Footer for navigation.

---

## Project Structure

```
news-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── NewsCard.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NewsFeed.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   └── newsApi.js
│   ├── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd news-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

4. **Build for production:**
   ```bash
   npm run build
   ```
5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## Configuration

### Firebase
- Update `src/firebase.js` with your own Firebase project credentials if deploying elsewhere.

### NewsAPI
- The NewsAPI key is currently hardcoded in `src/services/newsApi.js`. For production, use environment variables and do not commit secrets to version control.

---

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

---

## Dependencies

- **React**
- **Vite**
- **Tailwind CSS**
- **Firebase**
- **React Router DOM**
- **ESLint** (with React and hooks plugins)

---

## Security Notes

- **API Keys:** Both Firebase and NewsAPI keys are present in the code. For production, move these to environment variables and do not commit secrets to version control.

---

## License

This project is for educational/demo purposes. Replace this section with your license as needed.
