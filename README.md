# IMDb Clone

A fully responsive, frontend clone of the IMDb homepage built using React and Vite. This project accurately replicates the layout, styling, and core interactive components of the official IMDb website, utilizing comprehensive mock data to simulate a robust movie database experience without the need for external API keys.

## ✨ Features

- **Offline-Capable Data:** Uses a rich internal mock data structure (`mockData.js`) to display trending movies, fan favorites, celebrity information, and streaming options, completely eliminating external API dependencies.
- **Dynamic Carousels:** Implements horizontal scrolling lists for "Top Picks," "Fan Favorites," "In Theaters," and "Born Today" celebrity highlights.
- **Exclusive Trailer Section:** A custom-built, responsive media player layout that displays main trailers with a synchronized "Up Next" sidebar.
- **Live Local Search:** A fully functional mock search bar in the header that filters through the local movie database and displays dropdown results instantly.
- **Responsive Design:** Carefully crafted UI using CSS Grid and Flexbox to ensure the layout degrades gracefully across desktop, tablet, and mobile breakpoints.
- **Clean Architecture:** Component-based architecture with separated concerns, ensuring a maintainable and readable codebase.

## 🛠️ Technologies Used

- **React.js:** Component-driven UI development.
- **Vite:** Next-generation frontend tooling for ultra-fast compilation and Hot Module Replacement (HMR).
- **Vanilla CSS:** Custom styling utilizing modern CSS features to closely match the dark-theme aesthetic of IMDb.
- **React Router:** For seamless, single-page application navigation (configured for future multi-page expansion).

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if applicable) or download the project files.
2. **Navigate to the project directory:**
   ```bash
   cd imdb_clone
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **View the app:**
   Open your browser and navigate to `http://localhost:5173` to see the application running.

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components (Header, Hero, TrailerBox, TopPicks, etc.)
├── data/
│   └── mockData.js      # Centralized offline data replacing API calls
├── utils/               # Utility functions (e.g., Wishlist management)
├── App.jsx              # Main application layout and routing
├── App.css              # Global styles and layout utilities
└── main.jsx             # React DOM entry point
```

## 📝 Notes

- This project is currently configured to operate entirely offline for demonstration and portfolio purposes. No TMDB or IMDb API key is required to view the content.
- All comments and boilerplate code have been stripped from the `src` directory to ensure a clean, professional codebase.
