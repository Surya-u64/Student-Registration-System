# Student Registration System

## Overview

Student Registration System is a full-stack web application developed using React.js, ASP.NET Core Web API, and PostgreSQL. The application enables administrators to manage student and course information through a user-friendly interface and secure backend services.

The system provides complete CRUD operations for Students and Courses, supports student enrollment management, and uses JWT Authentication for secure access to protected resources.

---

## Features

### Authentication

* User Login
* JWT Token Generation
* Protected API Endpoints
* Secure Access Control

### Student Management

* Add New Student
* View Student List
* Update Student Details
* Delete Student

### Course Management

* Add New Course
* View Course List
* Update Course Details
* Delete Course

### Enrollment Management

* Assign Courses to Students
* Manage Student-Course Relationships
* Many-to-Many Relationship Support

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* HTML5
* CSS3
* Bootstrap

### Backend

* ASP.NET Core Web API
* C#
* Entity Framework Core
* Dependency Injection
* Async/Await Programming

### Database

* PostgreSQL

### Authentication

* JWT (JSON Web Token)

---

## Architecture

The application follows a layered architecture that separates responsibilities across different layers.

```text
React Frontend
       │
       ▼
ASP.NET Core Controllers
       │
       ▼
Business Services
       │
       ▼
Entity Framework Core
       │
       ▼
PostgreSQL Database
```

### Layers

#### Presentation Layer

* React Components
* Forms
* Routing
* API Calls

#### API Layer

* Controllers
* Request Handling
* Response Management
* Authentication

#### Business Layer

* Business Logic
* Validation
* Service Operations

#### Data Layer

* Entity Framework Core
* Database Access
* Entity Mapping

#### Database Layer

* PostgreSQL Tables
* Relationships
* Constraints

---

## Project Structure

```text
Student/
│
├── Student-frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   └── App.jsx
│
├── Student-backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Data/
│   ├── DTOs/
│   ├── Migrations/
│   ├── Program.cs
│   └── appsettings.json
│
└── README.md
```

---

## Database Design

### Student

| Column | Type    |
| ------ | ------- |
| Id     | Integer |
| Name   | String  |
| Email  | String  |
| Phone  | String  |

### Course

| Column      | Type    |
| ----------- | ------- |
| Id          | Integer |
| CourseName  | String  |
| Description | String  |

### StudentCourse

| Column    | Type        |
| --------- | ----------- |
| StudentId | Foreign Key |
| CourseId  | Foreign Key |

### Relationship Diagram

```text
Student
   │
   │
   ▼
StudentCourse
   ▲
   │
   │
Course
```

A student can enroll in multiple courses, and a course can contain multiple students.

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

## Installation Guide

### Clone Repository

```bash
git clone https://github.com/Surya-u64/Student-Registration-System.git
```

### Backend Setup

```bash
cd Student-backend

dotnet restore

dotnet ef database update

dotnet run
```

Backend runs on:

```text
https://localhost:5001
```

### Frontend Setup

```bash
cd Student-frontend

npm install

npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Security Features

* JWT Authentication
* Protected API Routes
* Secure Token-Based Authorization
* Input Validation
* Entity Framework Core Query Protection
* Environment-Based Configuration

---

## Key Concepts Demonstrated

* Full Stack Development
* React.js Application Development
* ASP.NET Core Web API Development
* PostgreSQL Database Integration
* JWT Authentication
* Layered Architecture
* Dependency Injection
* Entity Framework Core
* Async Programming
* RESTful API Design

---

## Future Enhancements

* Role-Based Access Control (RBAC)
* Refresh Token Authentication
* Email Verification
* Audit Logging
* Dashboard Analytics
* Docker Containerization
* Unit Testing
* Integration Testing
* Cloud Deployment

---

## Author

**Surya Venkat**

Full Stack Developer

### Skills

* React.js
* ASP.NET Core Web API
* PostgreSQL
* Entity Framework Core
* JWT Authentication
* REST APIs
* Git & GitHub
