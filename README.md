# Student Registration System

## Project Overview

The Student Registration System is a full-stack web application developed using React.js, .NET Core Web API, and PostgreSQL. The application allows administrators to manage students and courses efficiently through a secure and scalable architecture.

The system supports student and course management, authentication, and enrollment functionality while following Clean Architecture, CQRS Pattern, and Repository Pattern principles.

---

## Features

### Authentication & Authorization

* JWT Authentication
* Secure Login
* Protected API Endpoints
* Role-Based Access Ready

### Student Management

* Create Student
* View Students
* Update Student Details
* Delete Student

### Course Management

* Create Course
* View Courses
* Update Course Details
* Delete Course

### Enrollment Management

* Student-Course Enrollment
* Many-to-Many Relationship Handling

---

## Technology Stack

### Frontend

* React.js
* React Router
* Axios
* Bootstrap / CSS

### Backend

* ASP.NET Core Web API
* Entity Framework Core
* CQRS Pattern
* Repository Pattern
* Dependency Injection

### Database

* PostgreSQL

### Security

* JWT Authentication
* Authorization Middleware

---

## Architecture

The project follows Clean Architecture to maintain separation of concerns and improve maintainability.

Frontend (React.js)
↓
API Controllers
↓
Application Layer
↓
CQRS Commands & Queries
↓
Repositories
↓
Entity Framework Core
↓
PostgreSQL Database

---

## Project Structure

Student/
│
├── Student-frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.js
│
├── Student-backend/
│ ├── Controllers/
│ ├── Application/
│ ├── Domain/
│ ├── Infrastructure/
│ ├── Repositories/
│ ├── Services/
│ └── Program.cs
│
└── README.md

---

## Database Design

### Student

| Field | Type    |
| ----- | ------- |
| Id    | Integer |
| Name  | String  |
| Email | String  |
| Phone | String  |

### Course

| Field       | Type    |
| ----------- | ------- |
| Id          | Integer |
| CourseName  | String  |
| Description | String  |

### StudentCourse

| Field     | Type |
| --------- | ---- |
| StudentId | FK   |
| CourseId  | FK   |

### Relationships

Student
↓
StudentCourse
↑
Course

Many Students can enroll in Many Courses.

---

## Design Patterns Used

### Clean Architecture

Separates business logic from infrastructure and presentation layers.

### CQRS Pattern

* Commands → Write Operations
* Queries → Read Operations

### Repository Pattern

Provides abstraction between business logic and database access.

### Dependency Injection

Services and repositories are injected through ASP.NET Core DI Container.

---

## API Endpoints

### Authentication

POST /api/auth/login

### Student APIs

GET /api/students

GET /api/students/{id}

POST /api/students

PUT /api/students/{id}

DELETE /api/students/{id}

### Course APIs

GET /api/courses

GET /api/courses/{id}

POST /api/courses

PUT /api/courses/{id}

DELETE /api/courses/{id}

---

## Installation

### Backend Setup

```bash
cd Student-backend
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend Setup

```bash
cd Student-frontend
npm install
npm start
```

---

## Security Features

* JWT Token Authentication
* Protected Routes
* Secure API Access
* Input Validation
* Entity Framework Parameterized Queries

---

## Interview Highlights

This project demonstrates:

* Full Stack Development
* React.js Frontend Development
* ASP.NET Core Web API Development
* PostgreSQL Database Design
* JWT Authentication
* Clean Architecture
* CQRS Pattern
* Repository Pattern
* Dependency Injection
* Entity Framework Core

---

## Future Enhancements

* Role-Based Access Control
* Refresh Token Authentication
* Audit Logging
* Email Notifications
* Dashboard Analytics
* Docker Deployment
* Unit Testing
* Integration Testing

---

## Author

Surya Venkat

Full Stack Developer

Technologies: React.js | .NET Core | PostgreSQL | JWT | Clean Architecture | CQRS
