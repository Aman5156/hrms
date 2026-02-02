# HRMS Lite

A lightweight Human Resource Management System built with Django (backend) and React (frontend).

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Git**: For cloning the repository
- **Python 3.8+**: For running the Django backend
- **Node.js 14+ and npm**: For running the React frontend
- **PostgreSQL**: As the database backend

### Installing Prerequisites

#### Windows
1. **Git**: Download from [git-scm.com](https://git-scm.com/downloads)
2. **Python**: Download from [python.org](https://www.python.org/downloads/)
3. **Node.js**: Download from [nodejs.org](https://nodejs.org/)
4. **PostgreSQL**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)

#### macOS
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install prerequisites
brew install git python node postgresql
```

## Local Deployment Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hrms_lite
```

Replace `<repository-url>` with the actual Git repository URL.

### 2. Backend Setup

#### Create Virtual Environment
```bash
cd backend
python -m venv venv
```

#### Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Environment Configuration
Create a `.env` file in the `backend` directory with the following variables:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
DB_NAME=hrms_lite_db
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

**Note:** Generate a secure SECRET_KEY using:
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

#### Database Setup
1. Create a PostgreSQL database:
```sql
CREATE DATABASE hrms_lite_db;
```

2. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

#### Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd ../frontend
```

#### Install Dependencies
```bash
npm install
```

### 4. Running the Application

#### Start Backend Server
In the backend terminal (with virtual environment activated):

```bash
cd backend
python manage.py runserver
```

The backend will be available at `http://127.0.0.1:8000`

#### Start Frontend Development Server
In the frontend terminal:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://127.0.0.1:5173` (default Vite port)

### 5. Access the Application

- **Frontend**: Open `http://127.0.0.1:5173` in your browser
- **Backend API**: Available at `http://127.0.0.1:8000`
- **Django Admin** (if superuser created): `http://127.0.0.1:8000/admin`

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port using `python manage.py runserver 8001` for backend or update Vite config for frontend.

2. **Database connection error**: Ensure PostgreSQL is running and credentials in `.env` are correct.

3. **Module not found errors**: Ensure virtual environment is activated for backend and all dependencies are installed.

4. **CORS errors**: The backend is configured to allow all origins for development. For production, update `CORS_ALLOW_ALL_ORIGINS` in settings.

### Additional Commands

- **Run tests**: `python manage.py test`
- **Create new app**: `python manage.py startapp <app_name>`
- **Collect static files**: `python manage.py collectstatic`

## Project Structure

```
hrms_lite/
├── backend/                 # Django backend
│   ├── hrms/               # Main app
│   ├── hrms_lite/          # Project settings
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
