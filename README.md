# Pisces - A caseworker app for managing aquaculture facilities
## Architecture

The project is a mono repo with two top-level folders: `frontend/` and `backend/`.

### Backend — Kotlin Spring Boot

```
backend/
  api/     — DTOs only (no Spring dependency); shared contract between backend and frontend types
  app/     — Spring Boot application: controllers, services, repositories, JPA entities, Flyway migrations
```

- **Language:** Java 26
- **Framework:** Spring Boot 4.x
- **Persistence:** H2 database
- **Schema migrations:** Flyway
- **Build tool:** Maven

The `api` module contains plain Java data classes with no runtime dependencies, so they can be shared or reused independently of the application runtime.

The `app` module contains the full Spring Boot application:
- `domain/` — JPA entities
- `repository/` — Spring Data JPA repositories
- `service/` — business logic
- `controller/` — REST endpoints
- `config/` — CORS configuration
- `exception/` — exception classes mapped to HTTP status codes

Use the Spring Boot quickstart to set up a skeleton project with the settings above: https://start.spring.io/
The Java app package name is pisces.

#### Configuration

Database credentials are configured in `app/src/main/resources/application.yml`. 


### Frontend — React with TypeScript

```
frontend/src/
  types/           — TypeScript interfaces mirroring backend DTOs
  components/
```

- **Framework:** React 19
- **Language:** TypeScript
- **State management:** React providers/context
- **Build tool:** Vite
- **Dev proxy:** `/api` requests are proxied to `http://localhost:8080` — configured in `frontend/vite.config.ts`

Follow this guide to set up React 19 with Vite and TypeScript: https://www.robinwieruch.de/vite-typescript/
### Database

H2 (embedded), running in-process with the backend so that no separate container is needed. 
Flyway runs migrations automatically on application startup.

---


## Getting Started

### Prerequisites
- JDK 21
- Node.js 18+

### 1. Start the database

### 2. Start the backend

```bash
cd backend
mvn install -DskipTests && mvn spring-boot:run -pl app
```

Flyway runs the database migrations automatically on startup. The API is available at `http://localhost:8080`.

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The app is available at `http://localhost:5179`.
