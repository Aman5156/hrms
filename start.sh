#!/bin/bash
# Start script for Railway deployment

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start the Django application with gunicorn
gunicorn hrms_lite.wsgi:application --bind 0.0.0.0:$PORT
