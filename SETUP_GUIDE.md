# Oikos Application Setup Guide

This guide describes how to set up and run the Oikos application (Frontend and Backend) on a new machine.

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or later) & **npm**
- **Python** (v3.11 or later)
- **Git**

## 1. Clone the Repositories

Clone both the frontend and backend repositories into a directory.

```bash
# Create a main directory
mkdir oikos-project
cd oikos-project

# Clone Frontend
git clone https://github.com/velu-jaya/oikos-frontend.git

# Clone Backend
git clone https://github.com/velu-jaya/oikos-backend.git
```

## 2. Backend Setup

Navigate to the backend directory and set up the Python environment.

### 2.1 Set up Virtual Environment

```bash
cd oikos-backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
```

### 2.2 Install Dependencies

```bash
pip install -r requirements.txt
```

### 2.3 Configure Environment Variables

Create a `.env` file in the `oikos-backend` root directory. Add the following keys (you will need to provide the actual values from your Supabase project):

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
```

### 2.4 Database Setup (If needed)

If leading a fresh database, execute the SQL commands found in `db_shema.sql` in your Supabase SQL Editor.

### 2.5 Run the Backend Server

```bash
uvicorn app.main:app --reload
```
The backend will start at `http://127.0.0.1:8000`.

---

## 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory.

### 3.1 Install Dependencies

```bash
cd oikos-frontend
npm install
```

### 3.2 Configure Environment Variables

Create a `.env.local` file in the `oikos-frontend` root directory.

```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
```

### 3.3 Run the Frontend

```bash
npm run dev
```
The frontend will start at `http://localhost:3000`.

## 4. Verification

1.  Open `http://localhost:3000` in your browser.
2.  Ensure the application loads without errors.
3.  Check the terminal logs for any connection errors between frontend and backend.
