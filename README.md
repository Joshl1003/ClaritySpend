# 💰 ClaritySpend

ClaritySpend is a modern **personal finance web application** that helps users track their spending, create budgets, and gain insights into their financial habits — all in one place.

Built with a clean **FastAPI backend** and a **React + TypeScript frontend**, ClaritySpend focuses on simplicity, usability, and real-time financial management.

---
## 🎯 Motivation

ClaritySpend was built to explore real-world full-stack development in the fintech space.
The goal was to design a clean, production-style budgeting application that emphasizes
data integrity, user experience, and scalable backend architecture.

---

## 📸 Screenshots
### Dashboard Overview
![Dashboard](frontend/public/screenshots/Home_page.png)

### Authentication
![Budget Usage](frontend/public/screenshots/Login_page.png)

### Transactions Management
![Transactions](frontend/public/screenshots/Transaction_page.png)

### Budgets Management
![Budgets](frontend/public/screenshots/Budget_page.png)

### Categories
![Categories](frontend/public/screenshots/Category_page.png)
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
- Expenses are stored as positive values
- Income is stored as negative values
- This enables clean aggregation for spending, budgets, and analytics

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

## ☁️ Cloud Deployment (AWS)
- Deployed to AWS with full production infrastructure
- **ECS Fargate** — serverless container hosting for the FastAPI backend
- **ECR** — Docker image registry for backend container
- **RDS PostgreSQL** — managed database in a private VPC
- **ALB** — Application Load Balancer routing traffic to ECS
- **S3 + CloudFront** — static frontend hosting with HTTPS and global CDN
- **Secrets Manager** — secure injection of database credentials and JWT secret into ECS tasks
- **IAM** — least-privilege roles for ECS task execution

---

# ⚙️ Tech Stack

## **Frontend**
- React 19.2.0 (Vite + TypeScript)
- TailwindCSS 4.1.14
- ShadCN UI + Lucide React Icons
- React Router DOM 7.9.3
- PostCSS & CSS animation utilities
- chart.js react-chartjs-2


## **Backend**
- FastAPI 0.116.1
- SQLAlchemy 2.0.42
- PostgreSQL (via psycopg2-binary)
- Pydantic 2.11.7 for schema validation
- Python-dotenv for environment variables
- Uvicorn for ASGI server

## **Cloud (AWS)**
- ECS Fargate, ECR, RDS PostgreSQL
- Application Load Balancer, CloudFront, S3
- Secrets Manager, IAM, VPC

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
- Ensure PostgreSQL is running before starting the backend
- Backend runs on http://localhost:8000
- Frontend runs on http://localhost:5173
- JWT tokens are stored client-side for authenticated requests
- All protected endpoints rely on JWT authentication
- Frontend API calls use a centralized Axios client with interceptors
- Schemas (Pydantic models) handle request validation and response shaping.

---

# ## 🚀 Project Status

ClaritySpend is considered feature-complete for v1.
Future updates may include additional analytics, filtering, and UX improvements,
but the core budgeting and transaction workflows are stable and usable.

---

# 🧪 Future Enhancements

These features are planned but intentionally excluded from v1
to prioritize stability and clarity.

- Pagination & search for transactions
- Advanced analytics (category pie charts, trends)
- CSV export
- Dark mode
- CI/CD pipeline for automated deployments
---

# 🧍 Author

## Josh Lee
👨‍💻 Computer Science Graduate | Software Engineer
📧 joshjlee1003@gmail.com

## 🌐 LinkedIn

www.linkedin.com/in/joshuajlee1003

## 🏁 License

This project is not licensed

