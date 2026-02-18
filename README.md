# Codegram 🚀

A real-time 1v1 competitive coding platform where developers battle it out in algorithmic duels.

## 📁 Project Structure

```
coding-battle-platform/
├── public/              # Static assets (images, fonts, favicon)
├── src/
│   ├── components/      # Reusable React components
│   │   ├── CodeEditor.jsx
│   │   ├── Layout.jsx
│   │   └── ProblemCard.jsx
│   ├── pages/          # Page components (routes)
│   │   ├── Home.jsx
│   │   ├── Lobby.jsx
│   │   ├── BattleArena.jsx
│   │   └── Results.jsx
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API calls and external services
│   ├── utils/          # Helper functions and utilities
│   ├── constants/      # App-wide constants and config
│   ├── styles/         # Global styles and CSS
│   │   └── index.css
│   ├── App.jsx         # Main app component
│   └── main.jsx        # App entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── start_app.ps1       # Quick start script

```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **Code Editor**: Monaco Editor (VS Code editor)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Getting Started

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
Or use the PowerShell script:
```powershell
.\start_app.ps1
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Features

- ⚔️ **1v1 Duels**: Real-time competitive coding battles
- 🎮 **ELO-based Matchmaking**: Fair and balanced matches
- 💻 **Live Code Execution**: Instant feedback on solutions
- 🏆 **Leaderboards**: Track your progress and rankings
- 🧠 **Topic Mastery**: Practice specific algorithms and data structures
- 🎨 **Modern UI**: Beautiful, responsive design with dark mode

## 🗂️ Folder Guidelines

- **components/**: Reusable UI components used across multiple pages
- **pages/**: Full page components that correspond to routes
- **hooks/**: Custom React hooks for shared logic
- **services/**: API integrations and external service calls
- **utils/**: Pure utility functions and helpers
- **constants/**: Configuration values and app-wide constants
- **styles/**: Global CSS and styling files

## 🤝 Contributing

Contributions are welcome! Please follow the existing code structure and naming conventions.

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for competitive coders
