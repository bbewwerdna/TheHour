# Happy Hour Finder

A full-stack web app to discover restaurant happy hour deals.

## Stack
- **Backend**: Java 17 + Spring Boot 3
- **Frontend**: React 18 + Vite

## Running the App

### 1. Start the Backend

```bash
cd backend
./mvnw spring-boot:run
# Windows: mvnw.cmd spring-boot:run
```
Backend runs at `http://localhost:8080`

> First run downloads Maven wrapper — requires Java 17+ and internet access.

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/restaurants` | List all restaurants |
| GET | `/api/restaurants?name=sushi` | Search by name |
| GET | `/api/restaurants?day=Friday` | Filter by day |
| GET | `/api/restaurants?name=bar&day=Monday` | Combined filter |
| GET | `/api/restaurants/{id}` | Single restaurant detail |
