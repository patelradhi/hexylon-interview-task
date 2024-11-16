# User Authentication System

A Node.js-based authentication system with PostgreSQL database and Redis session management using Docker containers.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Git (optional)
- Postman (for API testing)

## Quick Start

1. Clone the repository (if using Git):

```bash
git clone https://github.com/patelradhi/hexylon-interview-task
cd hexylon-interview-task
```

2. Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=4000
HOST=localhost
COOKIE_SECRET=your_cookie_secret_here
REDIS_PASSWORD=
REDIS_HOST=localhost
REDIS_PORT=6379
POSTGRES_USER=root
POSTGRES_PASSWORD=secret
POSTGRES_DATABASE=userdb
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

3. Start the Docker containers:

```bash
docker-compose up -d
```

4. Check if containers are running:

```bash
docker-compose ps
```

## Database Setup

### Accessing PostgreSQL Container

1. Enter the PostgreSQL container:

```bash
docker exec -it <postgres_container_id> psql -U root -d userdb
```

Alternative way:

```bash
docker exec -it <postgres_container_id> bash
psql -U root -d userdb
```

### Creating Database Schema

Once inside the PostgreSQL shell, execute the following SQL commands:

```sql
-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    board VARCHAR(100) NOT NULL,
    field VARCHAR(100) NOT NULL,
    standard VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    age INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for email lookups
CREATE INDEX idx_users_email ON users(email);
```

## API Endpoints

### Register User

```http
POST http://localhost:4000/sample/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "board": "CBSE",
  "field": "Science",
  "standard": "12th",
  "date_of_birth": "2000-01-01"
}
```

### Login User

```http
POST http://localhost:4000/sample/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Update User

```http
PUT http://localhost:4000/sample/user
Content-Type: application/json
Cookie: sessionId=<session-id-from-login>

{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "password": "newpassword",
  "board": "ICSE",
  "field": "Commerce",
  "standard": "11th",
  "date_of_birth": "2000-02-01"
}
```

## Security Features

1. Password Hashing: Uses bcrypt for secure password hashing
2. Session Management: Redis-based session storage with signed cookies
3. CORS Protection: Configurable CORS settings
4. Helmet Security: HTTP headers security with helmet.js
5. Request ID Tracking: Unique ID for each request for better debugging

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Testing

Use the provided Postman collection to test the APIs. Make sure to:

1. Register a new user
2. Login with the registered credentials
3. Use the received session cookie for authenticated requests
