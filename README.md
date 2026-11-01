# Analog Clock

A modern, responsive and customizable analog clock built with web technologies. This project includes two implementations: a Vanilla JavaScript version and a React version with a Node.js and Express backend.

## Live Demos

Try both versions of the Analog Clock:

| Version | Demo |
|---|---|
| Web Basic — HTML, CSS & JavaScript | [Open Web Basic](https://vkaashkrsah.github.io/analog_clock/web-basic/) |
| React + Node.js | [Open React Version](https://vkaashkrsah.github.io/analog_clock/react-node/client/) |

**Note:** These links are intended for GitHub Pages hosting. The React version also requires a deployed backend; your local Express server at `localhost:5001` will not be accessible online.

## Project Versions

### 1. Web Basic — HTML, CSS & JavaScript

A standalone analog clock built using Vanilla JavaScript.

**Features**
- Live analog clock with smoothly moving hands
- Digital time and date display
- Four numeral styles
- Eight hand designs
- Seven dial designs
- Six watch color themes
- Six background themes
- Custom dial and background color selection
- Reset Design functionality
- Responsive layout

**Source Code:** [Open Web Basic Version](web-basic/index.html)

### 2. React + Node.js Version

A modern implementation using React for the frontend and Express for the backend.

**Frontend**
- React
- Vite
- CSS3
- Axios
- Live analog and digital clock
- Interactive clock customization
- Backend connection status

**Backend**
- Node.js
- Express.js
- REST API
- Health-check endpoint

**Source Code**
- [React Frontend](react-node/client/src/App.jsx)
- [Express Backend](react-node/server/server.js)

## Project Structure

```text
analog_clock/
│
├── web-basic/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── react-node/
│   ├── client/
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.js
│   │
│   └── server/
│       ├── server.js
│       ├── package.json
│       └── package-lock.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Web Basic Version

1. Open the `web-basic` folder.
2. Open `index.html` in your browser.
3. Start using the clock and customization options.

### React + Node.js Version

**Prerequisites**
- Node.js
- npm

**Step 1: Start the backend**

```bash
cd react-node/server
npm install
node server.js
```

Backend URL:

`http://localhost:5001`

Health-check API:

`http://localhost:5001/api/health`

**Step 2: Start the frontend**

Open another terminal:

```bash
cd react-node/client
npm install
npm run dev
```

Open the local development URL displayed in the terminal, usually:

`http://localhost:5173`

Keep both frontend and backend terminals running.

## Technologies Used

| Category | Technologies |
|---|---|
| Web Basic | HTML5, CSS3, JavaScript |
| Frontend | React, Vite, CSS3 |
| Backend | Node.js, Express.js |
| API Communication | Axios, REST API |
| Version Control | Git, GitHub |

## Author

**Vikash Kumar Sah**

GitHub: [@vkaashkrsah](https://github.com/vkaashkrsah)

---

**Project:** Analog Clock  
**Status:** Two implementations developed — Vanilla JavaScript and React + Node.js.