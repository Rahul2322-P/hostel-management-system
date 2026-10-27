# Hostel Management System

**Student Details:**
- **Student Name:** P Rahul
- **Student ID:** P2400032050
- **Section:** S05
- **Course / Project:** Full-Stack Hostel Management System (College Exam Project)

---

## 1. Project Overview

The **Hostel Management System** is a production-grade, full-stack web application designed to manage university and institutional hostels efficiently. It provides a modern, responsive dashboard with real-time statistics, hostel registration with robust client and server validation, dynamic records listing, and secure deletion with confirmation dialogs.

### Technology Stack
- **Frontend:** React 18, Vite, JavaScript, Bootstrap 5, Bootstrap Icons, Axios
- **Backend:** Java 21, Spring Boot 3.3.4, Spring Data JPA, Jakarta Bean Validation, Springdoc OpenAPI 2.6.0 (Swagger UI), Maven
- **Database:** MySQL 8.0 (with H2 in-memory/file fallback for instant local testing)
- **DevOps:** Docker, Multi-Stage Dockerfiles, Docker Compose, Docker Hub, GitHub Actions CI/CD

---

## 2. System Architecture & Repository Structure

```
SDPWORKSPACE/
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- AlertMessage.jsx
|   |   |   |-- Dashboard.jsx
|   |   |   |-- DeleteModal.jsx
|   |   |   |-- HostelForm.jsx
|   |   |   |-- HostelList.jsx
|   |   |   |-- Navbar.jsx
|   |   |-- services/
|   |   |   |-- hostelService.js
|   |   |-- App.jsx
|   |   |-- index.css
|   |   |-- main.jsx
|   |-- .env
|   |-- .env.example
|   |-- Dockerfile
|   |-- nginx.conf
|   |-- package.json
|   |-- vite.config.js
|
|-- backend/
|   |-- src/main/java/com/klef/soa/docker/
|   |   |-- configuration/
|   |   |   |-- CorsConfig.java
|   |   |   |-- GlobalExceptionHandler.java
|   |   |   |-- OpenApiConfig.java
|   |   |-- controller/
|   |   |   |-- HostelController.java
|   |   |-- dto/
|   |   |   |-- ErrorResponse.java
|   |   |   |-- HostelRequest.java
|   |   |   |-- HostelResponse.java
|   |   |-- entity/
|   |   |   |-- Hostel.java
|   |   |-- exception/
|   |   |   |-- ResourceNotFoundException.java
|   |   |-- repository/
|   |   |   |-- HostelRepository.java
|   |   |-- service/
|   |   |   |-- HostelService.java
|   |   |   |-- impl/
|   |   |       |-- HostelServiceImpl.java
|   |   |-- HostelManagementApplication.java
|   |-- src/main/resources/
|   |   |-- application.properties
|   |   |-- application-h2.properties
|   |-- Dockerfile
|   |-- pom.xml
|
|-- .github/workflows/
|   |-- docker-publish.yml
|-- docker-compose.yml
|-- .gitignore
|-- README.md
```

---

## 3. REST API Endpoints

Base Path: `/api/hostels`

| HTTP Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/hostels` | Retrieve all registered hostels | `200 OK` |
| `GET` | `/api/hostels/{id}` | Retrieve single hostel by primary key | `200 OK` / `404 Not Found` |
| `POST` | `/api/hostels` | Create new hostel (**ID auto-generated**) | `201 Created` / `400 Bad Request` |
| `DELETE` | `/api/hostels/{id}` | Permanently delete hostel by ID | `204 No Content` / `404 Not Found` |

### Swagger UI API Documentation:
- Local development: [http://localhost:8081/swagger-ui/index.html](http://localhost:8081/swagger-ui/index.html)
- OpenAPI Specification: [http://localhost:8081/v3/api-docs](http://localhost:8081/v3/api-docs)

---

## 4. Local Execution Guide

### Prerequisites
- Java 21 LTS
- Node.js (v18+) and npm
- Apache Maven 3.9+
- MySQL 8.0 (or automatic H2 profile)

### Step 1: Start Backend (Spring Boot)
```bash
cd backend
mvn clean package -DskipTests
java -jar target/hostel-management-backend-1.0.0.jar --spring.profiles.active=h2
```
*Backend starts on `http://localhost:8081`.*

### Step 2: Start Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*Frontend starts on `http://localhost:5173`.*

---

## 5. Docker & Docker Compose Deployment

Run the complete multi-tier architecture (Frontend + Backend + MySQL) with a single command:

```bash
docker-compose up --build -d
```

### Containers Created:
1. `hostel-mysql`: MySQL 8.0 database with persistent volume `hostel_mysql_data`.
2. `hostel-backend`: Spring Boot 3 running on Java 21 JRE, connected to MySQL.
3. `hostel-frontend`: React production assets served via Nginx with reverse proxy.

### Accessing Docker Services:
- Web Application: [http://localhost](http://localhost) (Port 80)
- Swagger UI through Docker: [http://localhost/swagger-ui/index.html](http://localhost/swagger-ui/index.html)
- Backend Direct: [http://localhost:8082](http://localhost:8082)

---

## 6. GitHub Actions CI/CD & Docker Hub Publishing

The automated workflow located at `.github/workflows/docker-publish.yml` triggers on pushes to the `main` branch:
1. Checks out repository code.
2. Sets up Docker Buildx.
3. Authenticates with Docker Hub via GitHub repository secrets:
   - `DOCKERHUB_USERNAME`
   - `DOCKERHUB_TOKEN`
4. Builds and publishes:
   - `<username>/docker-frontend-P2400032050:latest`
   - `<username>/docker-backend-P2400032050:latest`
