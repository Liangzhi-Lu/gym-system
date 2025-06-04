# Gym Management System

A full-stack gym management system built with React and Django REST Framework.

## Project Structure
```
gym-sys/
├── backend/                # Django backend
│   ├── gym_api/           # API modules
│   └── requirements.txt   # Backend dependencies
└── frontend/              # React frontend
    ├── public/            # Static assets
    └── src/               # Source code
```

## Features
- User Authentication (JWT)
- User Management (Members, Trainers, Admins)
- Course Management
- Class Scheduling
- Membership Management
- Order Processing

## Tech Stack
- Backend: Python, Django 4.2, DRF, MySQL
- Frontend: React 18, Ant Design, Axios

## Quick Start

### Backend Setup
```bash
# Create virtual environment
conda create -n gym-env 
conda activate gym-env

# Install dependencies
cd backend
pip install -r requirements.txt

# Setup database
python manage.py migrate
python manage.py createsuperuser

# Start server
python manage.py runserver
```

### Frontend Setup
```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm start
```


## CI/CD
GitHub Actions workflow automatically runs on push to `main` branch:
- Builds and tests frontend
- Runs backend migrations
- Deploys to production server
