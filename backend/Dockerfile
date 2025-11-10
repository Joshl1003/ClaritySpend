# backend/Dockerfile
FROM python:3.11-slim

# System deps for psycopg2
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only requirements first for better cache
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy app code
COPY backend/app /app/app

# Expose port
EXPOSE 8000

# Env (override at runtime)
ENV PYTHONUNBUFFERED=1

# Run FastAPI with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
