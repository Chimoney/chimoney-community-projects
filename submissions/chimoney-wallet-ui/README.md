# Chimoney Wallet UI ⚡

A secure and interactive **React + TypeScript Wallet Application** with encrypted local authentication, persistent sessions, live analytics, and beautiful UI built using **TailwindCSS**.

This project was built using **Create React App** and demonstrates how to implement client-side wallet management, data persistence, and dynamic visual analytics — all without a backend dependency.

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Setup](#-project-setup)
- [App Structure](#-app-structure)
- [Authentication Flow](#-authentication-flow)
- [Storage Strategy](#-storage-strategy)
- [Scripts](#-scripts)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)
- [Author](#-author)

---

## 🚀 Features

### 🧩 Core Functionality

- **Secure signup/login** using AES encryption + PBKDF2 hashing (`crypto-js`)
- **Persistent sessions** stored in `localStorage` — users stay logged in after refresh
- **IndexedDB data layer** via `idb-keyval` for encrypted user storage and wallet data
- **Duplicate prevention** – existing wallet IDs can’t be re-registered
- **Dynamic Fund/Withdraw system**
- **Transaction analytics** visualized with interactive real-time SVG charts
- **Configurable user settings** (theme, 2FA, biometrics, push/email alerts)
- **Lightweight, responsive Tailwind UI**

### 💻 UX Features

- Responsive layouts for desktop & mobile
- Transaction-driven chart updates in real-time
- Logout confirmation overlays
- Persistent theme stored in `localStorage` (`glassmorphic`, `neumorphic`, etc.)
- Error boundaries to gracefully handle crashes

---

## ⚙️ Tech Stack

| Category         | Technology                              |
| ---------------- | --------------------------------------- |
| Framework        | React 19 + TypeScript                   |
| Styling          | TailwindCSS 3.x                         |
| Storage          | IndexedDB (`idb-keyval`) + LocalStorage |
| Encryption       | CryptoJS (AES‑256 + PBKDF2)             |
| Auth Persistence | LocalStorage session TTL                |
| Build System     | React Scripts (CRA)                     |
| Testing          | React Testing Library + Jest            |

---

## 🏗️ Project Setup

### 1. Clone the repository

git clone https://github.com/yourusername/chimoney-wallet-ui.git
cd chimoney-wallet-ui

text

### 2. Install dependencies

npm install

text

### 3. Start development server

npm start

text
Runs the app on [http://localhost:3000](http://localhost:3000)

### 4. Build for production

npm run build

text
Creates optimized bundle in the `build/` directory.

---

## 📁 App Structure

src/
│
├── auth/
│ ├── SecureAuth.ts # AES encryption, PBKDF2 hashing, sessions
│ ├── Signup.tsx # Handles registration + duplicate check
│ └── Login.tsx # User authentication form
│
├── components/
│ ├── WalletContainer.tsx # Root layout / theme context provider
│ ├── WalletOverview.tsx # Overview card (balance, currency info)
│ ├── TransactionHistory.tsx # Transaction list
│ ├── FundingOptions.tsx # Deposit handler
│ ├── WithdrawOptions.tsx # Withdrawal handler
│ ├── DashboardCharts.tsx # Realtime analytics chart
│ ├── SettingsPanel.tsx # Theme + security settings
│ └── ErrorBoundary.tsx # Global error recovery wrapper
│
├── App.tsx # Root app logic and session restore
└── index.tsx # ReactDOM root render entrypoint

text

---

## 🔐 Authentication Flow

1. **Signup**

   - User enters Wallet ID and password
   - Password hashed with PBKDF2 then used as AES key
   - Wallet ID stored encrypted in IndexedDB
   - Redirects to login

2. **Login**

   - User provides Wallet ID + password
   - System decrypts the stored AES entry using PBKDF2 key
   - On success, stores session `{ walletId, expiresAt }` in `localStorage`

3. **Session Persistence**

   - On app mount, `getActiveSession()` reads and restores wallet details automatically
   - Route `wallet` loads if session is valid; otherwise, default route = `login`

4. **Logout**
   - Removes `wallet-session` and resets route to `login`

---

## 💾 Storage Strategy

| Storage Layer | Key Pattern               | Purpose                                |
| ------------- | ------------------------- | -------------------------------------- |
| IndexedDB     | `walletdb-{walletId}`     | Encrypted login credentials            |
| LocalStorage  | `wallet-session`          | Persisted auth session (walletId, TTL) |
| LocalStorage  | `balance_{walletId}`      | Wallet balance tracking                |
| LocalStorage  | `transactions_{walletId}` | Transaction history                    |
| LocalStorage  | `wallet-route`            | Last app route (login/signup/wallet)   |
| LocalStorage  | `wallet-theme`            | UI theme state                         |

All user data is sandboxed to the browser and encrypted with AES before storage.

---

## 🎨 Analytics Charts

Built entirely using custom SVG — no external chart libraries.  
Features:

- Smooth responsive polyline rendering
- Hover/touch displays dynamic vertical guide + tooltip
- Auto-calculates daily labels (`MM/DD` format)
- Reflects real-time transaction count and amounts

---

## 🧪 Testing

### Run all tests

npm test

text

### Library stack

- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`

---

## ⚙️ npm Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm start`     | Run development mode               |
| `npm run build` | Create optimized production bundle |
| `npm test`      | Run tests                          |
| `npm run eject` | Eject configuration (optional)     |

---

## 🧰 Dependencies (from `package.json`)

**Production:**

- `react` `19.2.0`
- `react-dom` `19.2.0`
- `crypto-js` `4.2.0`
- `idb-keyval` `6.2.2`
- `typescript` `4.9.5`
- `web-vitals` `2.1.4`
- Tailwind: `3.4.18`
- PostCSS / Autoprefixer: latest stable

**Dev:**

- React Testing Libraries (`@testing-library/react`, `@types/jest`, etc.)
- Tailwind/PostCSS Build Chain
- TypeScript Definitions

---

## 📦 Example User Flow

1. **Sign Up** ⇒ Creates encrypted record
2. **Login** ⇒ Authenticates and shows wallet dashboard
3. **Fund Account** ⇒ Updates transaction + chart
4. **Withdraw Funds** ⇒ Reflects deduction immediately
5. **Theme Switch** ⇒ Saves UI preference persistently
6. **Logout** ⇒ Securely clears session and returns to login

---

## 🧱 Future Improvements

- Integration with Chimoney API for live balance sync
- Multi-wallet management
- Currency conversion APIs
- PWA support with offline cache
- Enhanced session renewal techniques

---

## 🪪 License

**MIT License**  
This project is free to use and modify under open-source terms.

---

## 👨‍💻 Author

**Your Name**  
Software Developer
📧 Email: atharvakulkarni172003@gmail.com
🔗 GitHub: [github.com/Atharva1723](https://github.com/Atharva1723)

---
