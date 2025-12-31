# 💰 ClaritySpend

ClaritySpend is a modern **personal finance web application** that helps users track their spending, create budgets, and gain insights into their financial habits — all in one place.

Built with a clean **FastAPI backend** and a **React + TypeScript frontend**, ClaritySpend focuses on simplicity, usability, and real-time financial management.

---

# Demo & Screenshots

---

# Key Features
- Create, edit, and delete transactions
- Build category-based budgets
- Visualize spending with interactive charts
- Modular backend architecture (CRUD / schemas / routes)
- Dockerized services with Kubernetes-ready setup
- PostgreSQL-backed persistent storage

---

## ⚙️ Tech Stack

### **Frontend**
- React 19.2.0 (Vite + TypeScript)
- TailwindCSS 4.1.14
- ShadCN UI + Lucide React Icons
- React Router DOM 7.9.3
- PostCSS & CSS animation utilities
- Type-safe component merging and styling utilities
- chart.js react-chartjs-2


### **Backend**
- FastAPI 0.116.1
- SQLAlchemy 2.0.42
- PostgreSQL (via psycopg2-binary)
- Pydantic 2.11.7 for schema validation
- Python-dotenv for environment variables
- Uvicorn for ASGI server

---

## 📁 Folder Structure

ClaritySpend/
│
├── backend/
│ └── app/
│ ├── main.py
│ ├── config.py
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
│ ├── components/
│ │ ├── Navbar.tsx
│ │ └── ui/ (ShadCN components)
│ ├── pages/
│ │ ├── Home.tsx
│ │ ├── Transactions.tsx
│ │ ├── Budgets.tsx
│ │ └── Categories.tsx
│ ├── App.tsx
│ └── main.tsx
├── index.html
└── tailwind.config.js


---

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ClaritySpend.git
cd ClaritySpend
```

---


### 2. Backend Setup
# Create Virtual Environment
```bash
cd backend
python -m venv venv
```
# Activate it
```bash
venv\Scripts\activate      # On Windows
```
# or
```bash
source venv/bin/activate   # On macOS/Linux
```

# Install Dependencies
```bash
pip install -r requirements.txt
```

# Run the Server
```bash
uvicorn app.main:app --reload
```

---


### 3. Frontend Setup
```bash
cd frontend
npm install
```

# Run the Frontend
```bash
npm run dev
```
# Then open the URL shown in your terminal (usually http://localhost:5173).

---

### ⚙️ Environment Variables

# Create a .env file inside backend/app/:
```bash
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/ClaritySpend
```

# authentication (yet to implement):
```bash
SECRET_KEY=your_secret_here
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

### 🧩 API Endpoints
Method	Endpoint	Description
GET	/	Root endpoint - health check
GET	/budgets/	Get all budgets for a user
POST	/budgets/	Create a new budget
GET	/transactions/	Get all transactions
POST	/transactions/	Add a transaction
...	(More coming soon)	

---

### 🧱 Database Models

User – represents a registered user

Category – represents expense categories

Budget – represents a spending plan per category

Transaction – represents income/expense entries

---

### 💻 Development Notes

Each router (e.g., budget_router.py, transaction_router.py) handles CRUD logic for its model.

get_db() is used as a FastAPI dependency to manage DB sessions.

Schemas (Pydantic models) handle request validation and response shaping.

ShadCN UI provides ready-made, styled React components.

🧪 Future Enhancements

✅ Add authentication (JWT or OAuth)

📊 Add visual analytics dashboard

💾 Export transactions as CSV

🌙 Implement light/dark theme toggle

☁️ Deploy using Render / Vercel / Railway

---

### 🧍 Author

# Josh Lee
👨‍💻 Computer Science Graduate | Software Engineer
📧 joshjlee1003@gmail.com

# 🌐 LinkedIn

www.linkedin.com/in/joshuajlee1003

# 🏁 License

This project is not licensed

