# Digital-Twin-for-Personal-Finance

## 🏗️ Tech Stack

| Layer          | Technology                     |
|----------------|---------------------------------|
| Frontend       | HTML, CSS, JavaScript, Chart.js |
| Backend        | Node.js, Express.js             |
| Database       | MongoDB                         |
| Auth           | JWT, bcrypt                     |

---

## 📁 Project Structure

```
digital-finance-twin/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── simulator.html
│   ├── goals.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── auth.js
│       ├── dashboard.js
│       ├── simulator.js
│       └── charts.js
│
├── backend/
│   ├── server.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   └── FinancialProfile.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── financeRoutes.js
│   │   └── simulationRoutes.js
│   │
│   └── middleware/
│       └── authMiddleware.js
│
└── README.md
```

---

## 🔄 How the Digital Twin Works

```
User enters financial information
        ↓
Data stored in database → Financial Profile created
        ↓
Digital Twin Engine calculates current financial status
        ↓
User creates a "What-If" scenario
        ↓
Simulation Engine compares current vs. simulated future
        ↓
Impact shown: savings, health score, goal timeline
```

**Example — Financial Health Score**

```js
let score = 100;

if (savings < monthlyExpenses * 3) {
    score -= 20;
}
if (debt > income * 5) {
    score -= 20;
}
if (expenses > income * 0.8) {
    score -= 15;
}
```

- 🟢 80–100 → Excellent
- 🟡 60–79 → Moderate
- 🔴 Below 60 → Financial Risk

**Example — What-If Simulation**

```
Current savings: ₹2,00,000
Scenario: Buy an iPhone for ₹80,000

After purchase:
  Savings: ₹1,20,000
  Health score: 85 → 72
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB running locally or a MongoDB Atlas connection string

### Setup

```bash
# clone the repo
git clone <your-repo-url>
cd digital-finance-twin

# install backend dependencies
cd backend
npm install

# add environment variables
# create a .env file in /backend with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret

# start the backend
node server.js
```

Open `frontend/index.html` in the browser (or serve it with a static server / Live Server) to use the app.

---

## 🗺️ Roadmap

- [ ] User authentication (register/login/reset)
- [ ] Financial profile setup form
- [ ] Dashboard with health score + charts
- [ ] What-If simulator (purchase, income change, job loss scenarios)
- [ ] Goals module with ETA prediction
- [ ] Smart alerts engine
- [ ] Financial decision comparison (e.g. buy vs. invest)
- [ ] Add inflation, investment returns, and loan interest to future projections

---

## 📌 MVP Scope (v1)

1. Login / Register
2. Financial Profile Setup
3. Dashboard
4. Add Income & Expenses
5. What-If Simulator
6. Financial Goals & Prediction

---

## License

Add a license here (e.g. MIT) once decided.
