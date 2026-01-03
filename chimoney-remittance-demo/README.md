# 💸 Chimoney Remittance Demo

A simple demo app that shows how to use the [Chimoney API](https://chimoney.readme.io/reference/introduction) to:

- Create a wallet
- Send bank payouts
- Verify payments

---

## 🚀 Setup Instructions

### 1. Clone this repository

```bash
git clone https://github.com/<your-username>/chimoney-remittance-demo.git
cd chimoney-remittance-demo
```

> Replace `<your-username>` with your GitHub username.

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Add your Chimoney API key

1. Create a `.env` file in the root of the project.
2. Add your key like this:

```bash
CHIMONEY_API_KEY=your_chimoney_api_key_here
```

> You can get your API key from [https://accounts.chimoney.io](https://accounts.chimoney.io)

---

### 4. Run the app

```bash
npm start
```

The app will start on **http://localhost:3000**

---

### 5. Test the Flow

Open your browser and go to:

```
http://localhost:3000
```

From there you can:
- Create a wallet
- Make a bank payout
- Verify a payment

---

## 🧠 Tech Stack

- **Node.js + Express** (Backend)
- **HTML + Vanilla JS** (Frontend)
- **dotenv** for environment variables
- **Chimoney API** for payments

---

## 📂 Folder Structure

```
chimoney-remittance-demo/
├── server.js
├── package.json
├── .env.example
├── .env
├── public/
│   └── index.html
└── README.md
```

---

## 🤝 Contributing

Pull requests are welcome!  
If you find any issue or want to improve the demo UI, feel free to open one.

---

## 🧾 License

[MIT License](LICENSE)

---

> Built for the [Chimoney Community Projects](https://github.com/Chimoney/chimoney-community-projects)
