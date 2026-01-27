# 💰 ClaritySpend

ClaritySpend is a modern **personal finance web application** that helps users track their spending, create budgets, and gain insights into their financial habits — all in one place.

Built with a clean **FastAPI backend** and a **React + TypeScript frontend**, ClaritySpend focuses on simplicity, usability, and real-time financial management.

---

# Demo & Screenshots
(Coming soon — dashboard, budgets, and transaction views)
---

# Key Features
## 🔐 Authentication & Users
- Secure user registration and login
- JWT-based authentication
- Protected routes and session persistence across refresh

## 💸 Transactions
- Create, edit, and delete transactions
- Categorize transactions for budgeting and analytics
- Date-based filtering and sorting support

## 📊 Budgets
- Category-based budgets
- Real-time budget usage calculations
- Visual indicators for remaining vs. exceeded budgets

## 🏷 Categories
- Global default categories available to all users
- User-defined custom categories
- Category reuse across transactions and budgets

## 📈 Dashboard & Insights
- Monthly spending overview
- Recent transactions summary
- Derived financial metrics (totals, averages, budget usage)
- Foundation for category-based charts and analytics

## 🧱 Architecture & Tooling
- Modular backend (models / schemas / CRUD / routes)
- Type-safe frontend services layer (Axios + interceptors)
- Dockerized backend, Kubernetes-ready
- PostgreSQL-backed persistent storage

---

# ⚙️ Tech Stack

## **Frontend**
- React 19.2.0 (Vite + TypeScript)
- TailwindCSS 4.1.14
- ShadCN UI + Lucide React Icons
- React Router DOM 7.9.3
- PostCSS & CSS animation utilities
- Type-safe component merging and styling utilities
- chart.js react-chartjs-2


## **Backend**
- FastAPI 0.116.1
- SQLAlchemy 2.0.42
- PostgreSQL (via psycopg2-binary)
- Pydantic 2.11.7 for schema validation
- Python-dotenv for environment variables
- Uvicorn for ASGI server

---

# 📁 Folder Structure
```bash
ClaritySpend/
│
├── backend/
│ └── app/
│ ├── main.py
│ ├── seed.py
│ ├── core/
│ │ ├── deps.py
│ │ └── security.py
│ ├── database/
│ │ ├── connection.py
│ │ └── database.py
│ ├── models/
│ ├── crud/
│ ├── routes/
│ └── schemas/
│
└── frontend/
├── src/
│ ├── auth/
│ │ ├── AuthContext.tsx
│ │ ├── ProtectedRoute.tsx
│ │ └── useAuth.tsx
│ ├── components/
│ │ ├── Navbar.tsx
│ │ └── ui/ (ShadCN components)
│ ├── pages/
│ │ ├── Home.tsx
│ │ ├── Transactions.tsx
│ │ ├── Budgets.tsx
│ │ └── Categories.tsx
│ ├── services/
│ │ └── api.tsx
│ ├── types/
│ │ └── auth.ts
│ ├── app.tsx
│ └── main.tsx
├── index.html
└── tailwind.config.js
```

---

# 🔧 Installation & Setup

## 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ClaritySpend.git
cd ClaritySpend
```

---


## 2. Backend Setup
### Create Virtual Environment
```bash
cd backend
python -m venv venv
```
### Activate it
```bash
venv\Scripts\activate      # On Windows
```
### or
```bash
source venv/bin/activate   # On macOS/Linux
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run the Server
```bash
uvicorn app.main:app --reload
```

---


## 3. Frontend Setup
```bash
cd frontend
npm install
```

### Run the Frontend
```bash
npm run dev
```
### Then open the URL shown in your terminal (usually http://localhost:5173).

---

## ⚙️ Environment Variables

### Create a .env file inside backend/app/:
```bash
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/ClaritySpend
SECRET_KEY=your_secret_here
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# 🧩 API Overview

| Method | Endpoint        | Description                    |
|--------|-----------------|--------------------------------|
| POST   | /auth/register  | Register new user              |
| POST   | /auth/login     | Login user                     |
| GET    | /auth/me        | Get current authenticated user |
| GET    | /transactions   | Fetch user transactions        |
| POST   | /transactions   | Create transaction             |
| GET    | /budgets        | Fetch budgets                  |
| POST   | /budgets        | Create budget                  |
| GET    | /categories     | Fetch categories               |

---

# 🧱 Database Models

User – authenticated account

Category – global or user-specific spending category

Budget – spending limit per category

Transaction – individual income/expense entry

---

# 💻 Development Notes

- All protected endpoints rely on JWT authentication

- Frontend API calls use a centralized Axios client with interceptors

- Schemas (Pydantic models) handle request validation and response shaping.

- ShadCN UI provides ready-made, styled React components.

---

# 🧪 Future Enhancements

✅ Budget alerts & warnings

📊 Add visual analytics dashboard

💾 CSV export for transactions

🌙 Implement light/dark theme toggle

☁️ Deploy using Render / Vercel / Railway

---

# 🧍 Author

## Josh Lee
👨‍💻 Computer Science Graduate | Software Engineer
📧 joshjlee1003@gmail.com

## 🌐 LinkedIn

www.linkedin.com/in/joshuajlee1003

## 🏁 License

This project is not licensed

