FROM python:3.11-alpine

# Install PostgreSQL development tools
RUN apk --no-cache add postgresql-dev

# Path: /app
WORKDIR /app

# Path: /app/requirements.txt
COPY requirements.txt .

# Path: /app
RUN pip install -r requirements.txt

# Copy all files from current directory to /app in container
COPY . .

# Path: /app
CMD ["python", "slackbot.py"]