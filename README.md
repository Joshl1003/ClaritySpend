# 💰 ClaritySpend

ClaritySpend is a modern **personal finance web application** that helps users track their spending, create budgets, and gain insights into their financial habits — all in one place.

Built with a clean **FastAPI backend** and a **React + TypeScript frontend**, ClaritySpend focuses on simplicity, usability, and real-time financial management.

---

## 🧠 Overview

- 📊 Track and visualize transactions  
- 💸 Create and manage personalized budgets  
- 🏷️ Categorize expenses and incomes  
- 🧾 Store data securely in a PostgreSQL database  
- ⚡ Built for speed using FastAPI and Vite  

---

## ⚙️ Tech Stack

### **Frontend**
- React 19.2.0 (Vite + TypeScript)
- TailwindCSS 4.1.14
- ShadCN UI + Lucide React Icons
- React Router DOM 7.9.3
- PostCSS & CSS animation utilities
- Type-safe component merging and styling utilities

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

requirements.txt
```sql
annotated-types==0.7.0
anyio==4.10.0
click==8.2.1
colorama==0.4.6
fastapi==0.116.1
greenlet==3.2.3
h11==0.16.0
httptools==0.6.4
idna==3.10
psycopg2-binary==2.9.10
pydantic==2.11.7
pydantic_core==2.33.2
python-dotenv==1.1.1
PyYAML==6.0.2
sniffio==1.3.1
SQLAlchemy==2.0.42
starlette==0.47.2
typing-inspection==0.4.1
typing_extensions==4.14.1
uvicorn==0.35.0
watchfiles==1.1.0
websockets==15.0.1
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

package.json
```sql
clsx@2.1.1
lucide-react@0.545.0
postcss@8.5.6
react@19.2.0
react-dom@19.2.0
react-router-dom@7.9.3
tailwindcss@4.1.14
tailwindcss-animate@1.0.7
tailwind-merge@3.3.1
tw-animate-css@1.4.0
typescript@5.8.3
vite@7.1.9
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

