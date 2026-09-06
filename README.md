# Pisces - A caseworker app for managing aquaculture facilities
## Architecture

The project is a mono repo with two top-level folders: `frontend/` and `backend/`.

### Backend — Java Spring Boot

```
backend/
  app/     — Spring Boot application: controllers, services, repositories, JPA entities, DTOs, Flyway migrations
```

- **Language:** Java 26
- **Framework:** Spring Boot 4.x
- **Persistence:** H2 database
- **Schema migrations:** Flyway
- **Build tool:** Maven

The `app` module contains the full Spring Boot application:
- `domain/` — JPA entities
- `dto/` — request/response data classes for the REST API
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
  api/             — fetch wrapper for all backend endpoints
  hooks/
  components/
```

- **Framework:** React 18
- **Language:** TypeScript
- **State management:** TanStack Query (server state), React providers/context (UI state)
- **Build tool:** Vite
- **Dev proxy:** `/api` requests are proxied to `http://localhost:8080` — configured in `frontend/vite.config.ts`

Follow this guide to set up React 18 with Vite and TypeScript: https://www.robinwieruch.de/vite-typescript/
### Database

H2 (embedded), running in-process with the backend so that no separate container is needed. 
Flyway runs migrations automatically on application startup.

---


## Getting Started

### Prerequisites
- JDK 26
- Node.js 18+

### 1. Start the backend

```bash
cd backend
mvn install -DskipTests && mvn spring-boot:run -pl app
```

Flyway runs the database migrations automatically on startup. The API is available at `http://localhost:8080`.

#### 1.5 Run tests

- Single module: `mvn -pl app test`
- Single test class: `mvn -pl app test -Dtest=FacilityRepositoryIT`

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The app is available on `http://localhost:5179`.


# Ting jeg skulle ønske jeg fikk utvidet med
- Websocket og SSE for å støtte flere saksbehandlere på samme sak samtidig
- Spring Security Roles med `@EnableMethodSecurity` og `@PreAuthorize`
- Flere og mer dekkende tester
- Nynorsk språkstøtte
- Pagination hvis veldig mange anlegg
- React 19: use/useActionState for å eliminere hele TanStack https://dev.to/rakhee/can-react-v19-replace-react-querytanstack-5gmh
- Verktøy-fane for å kunne legge til nye anlegg og fisketyper
