FROM python:3.11-alpine

# Install system dependencies
RUN apk add --no-cache python3-dev libpq gcc musl-dev

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