# Supabase Authentication with React & Vite

<div align="center">
  <img src="public/logo192.png" alt="Supabase React Auth" width="120" />

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Supabase](https://img.shields.io/badge/Supabase-3.x-3ECF8E?logo=supabase)](https://supabase.com/)
  [![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

  A modern authentication flow built with Supabase, React, and Vite featuring email/password authentication, protected routes, and a beautiful UI.
</div>

## ✨ Features

- 🔐 Email/Password Authentication
- 🔄 Session Management
- 🛡️ Protected Routes
- ✨ Modern UI with Glassmorphism Design
- 🔄 Real-time Auth State
- 📱 Fully Responsive Layout

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ & npm/yarn
- [Supabase](https://supabase.com/) account

### Supabase Setup

1. Create a new project in [Supabase Dashboard](https://app.supabase.com/)
2. Go to Authentication → Providers and enable "Email" provider
3. In Authentication → URL Configuration, set your site URL (e.g., `http://localhost:5173`)
4. Get your project URL and anon key from Project Settings → API

### Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/supabase-auth-demo.git
   cd supabase-auth-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔐 Authentication Flow

- **Sign Up**: New users can create an account with email and password
- **Login**: Existing users can sign in with their credentials
- **Protected Routes**: Only authenticated users can access the dashboard
- **Session Persistence**: User sessions are maintained across page refreshes

## 🛠️ Tech Stack

- [Supabase](https://supabase.com/) - Authentication & Real-time Database
- [React](https://reactjs.org/) - Frontend Library
- [React Router](https://reactrouter.com/) - Client-side Routing
- [Vite](https://vitejs.dev/) - Build Tool & Dev Server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context providers
│   └── AuthContext.jsx  # Authentication state management
├── pages/         # Application pages
│   ├── Login.jsx  # Login page
│   ├── Signup.jsx # Signup page
│   ├── Dashboard.jsx # Protected dashboard
│   └── Landing.jsx  # Public landing page
└── App.jsx        # Main application component
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing development experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Supabase](https://supabase.com/) for the awesome authentication and database services
