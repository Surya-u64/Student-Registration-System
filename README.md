# Student Management System

## Overview

The Student Management System is a full-stack web application developed using React.js, ASP.NET Core Web API, and PostgreSQL. The application enables administrators to manage students, courses, and enrollments through a secure and scalable architecture.

The system provides complete CRUD (Create, Read, Update, Delete) operations for Students and Courses while implementing JWT Authentication for secure user access. The project follows Clean Architecture principles and utilizes CQRS and Repository Pattern to build a maintainable and enterprise-level application.

---

## Features

### Authentication & Authorization

* JWT Authentication
* Secure Login
* Protected API Endpoints
* Token-Based Authorization

### Student Management

* Create Student
* View Student Details
* Update Student Information
* Delete Student

### Course Management

* Create Course
* View Course Details
* Update Course Information
* Delete Course

### Enrollment Management

* Student-Course Enrollment
* Many-to-Many Relationship Support
* Course Assignment Management

---

## Technology Stack

### Frontend

* React.js
* React Router
* Axios
* HTML5
* CSS3
* Bootstrap

### Backend

* ASP.NET Core Web API
* C#
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

The project follows Clean Architecture to ensure separation of concerns and maintainability.

```text
React.js Frontend
        │
        ▼
API Controllers
        │
        ▼
Application Layer
        │
        ├── Commands (Write Operations)
        ├── Queries (Read Operations)
        ├── DTOs
        └── Services
        │
        ▼
Infrastructure Layer
        │
        ├── Repository Pattern
        ├── AppDbContext
        └── JwtService
        │
        ▼
Entity Framework Core
        │
        ▼
PostgreSQL Database
```

---

## Clean Architecture Layers

### Domain Layer

Contains the core business entities:

* Student
* Course
* Enrollment / StudentCourse

This layer contains only business models and does not depend on external frameworks.

### Application Layer

Responsible for:

* DTOs
* CQRS Commands
* CQRS Queries
* Service Interfaces
* Business Rules

### Infrastructure Layer

Responsible for:

* Repository Implementations
* Database Access
* Entity Framework Core Configuration
* JWT Token Generation
* PostgreSQL Connectivity

### Presentation Layer

Responsible for:

* React User Interface
* API Controllers
* Request and Response Handling

---

## Database Design

### Student Table

| Column | Type    |
| ------ | ------- |
| Id     | Integer |
| Name   | String  |
| Email  | String  |
| Phone  | String  |

### Course Table

| Column      | Type    |
| ----------- | ------- |
| Id          | Integer |
| CourseName  | String  |
| Description | String  |

### StudentCourse Table

| Column    | Type        |
| --------- | ----------- |
| StudentId | Foreign Key |
| CourseId  | Foreign Key |

---

## Entity Relationship Diagram

```text
+-----------+
|  Student  |
+-----------+
| Id        |
| Name      |
| Email     |
| Phone     |
+-----------+
      |
      | Many
      |
      ▼
+----------------+
| StudentCourse  |
+----------------+
| StudentId (FK) |
| CourseId  (FK) |
+----------------+
      ▲
      |
      | Many
      |
+-----------+
|  Course   |
+-----------+
| Id        |
| Name      |
| Description|
+-----------+
```

Relationship:

* One Student can enroll in multiple Courses.
* One Course can contain multiple Students.
* Implemented using a Many-to-Many relationship.

---

## Design Patterns Used

### Clean Architecture

Separates business logic, infrastructure, and presentation concerns.

### CQRS (Command Query Responsibility Segregation)

Read and Write operations are separated.

#### Commands

Used for:

* Create Student
* Update Student
* Delete Student
* Create Course
* Update Course
* Delete Course

#### Queries

Used for:

* Get Student List
* Get Student By Id
* Get Course List
* Get Course By Id

### Repository Pattern

Provides abstraction between business logic and database access.

Benefits:

* Loose Coupling
* Easier Testing
* Maintainable Code

### Dependency Injection

Used to inject:

* Services
* Repositories
* Database Context
* JWT Services

### Async/Await

Used for:

* Database Operations
* API Processing
* Improved Application Performance

---

## API Endpoints

### Authentication

```http
POST /api/auth/login
```

### Students

```http
GET    /api/students
GET    /api/students/{id}
POST   /api/students
PUT    /api/students/{id}
DELETE /api/students/{id}
```

### Courses

```http
GET    /api/courses
GET    /api/courses/{id}
POST   /api/courses
PUT    /api/courses/{id}
DELETE /api/courses/{id}
```

---

## Request Flow

### Create Student

```text
React Form
    ↓
Axios Request
    ↓
Student Controller
    ↓
CreateStudentCommand
    ↓
Application Service
    ↓
Repository
    ↓
Entity Framework Core
    ↓
PostgreSQL Database
    ↓
Success Response
    ↓
React UI Update
```

---

## Security Features

* JWT Authentication
* Secure Token Validation
* Protected API Endpoints
* Authorization Middleware
* Input Validation
* Secure Database Access

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

## Skills Demonstrated

* React.js Development
* ASP.NET Core Web API
* PostgreSQL Database Design
* JWT Authentication
* Entity Framework Core
* Clean Architecture
* CQRS Pattern
* Repository Pattern
* Dependency Injection
* Async Programming
* REST API Development
* Full Stack Development

---

## Future Enhancements

* Role-Based Authorization
* Refresh Tokens
* Email Notifications
* Dashboard Analytics
* Docker Support
* Unit Testing
* Integration Testing
* Cloud Deployment

---

## Author

### Surya Venkat

Full Stack Developer

**Technologies:** React.js • ASP.NET Core Web API • PostgreSQL • JWT Authentication • Clean Architecture • CQRS • Repository Pattern • Entity Framework Core
