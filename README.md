# Travlr Getaways – MEAN Stack Full-Stack Application

Travlr Getaways is a full-stack travel booking application built using the MEAN stack (MongoDB, Express.js, Angular, and Node.js).  

This project includes a public-facing website and an administrator Single-Page Application (SPA) for managing travel packages.

Course Milestones: Development history is preserved in branches module1 through module7.
---

## Architecture

The application follows a three-tier architecture:

- **Presentation Layer**
  - Express + Handlebars public website
  - Angular admin SPA

- **Application Layer**
  - Node.js + Express RESTful API
  - JWT authentication middleware

- **Data Layer**
  - MongoDB database
  - Mongoose schemas and models

---

## Features

- Express MVC customer-facing website
- Dynamic Handlebars rendering from MongoDB
- Angular admin SPA
- RESTful API (GET, POST, PUT)
- JWT-based authentication
- Secure protected endpoints
- MongoDB integration with Mongoose
- API testing using Postman

---

## Security

Administrative routes are protected using JSON Web Tokens (JWT).  
Authenticated users must include a valid Bearer token in the `Authorization` header to access protected endpoints.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/trips | Retrieve all trips |
| GET | /api/trips/:tripCode | Retrieve specific trip |
| POST | /api/trips | Create new trip (Auth required) |
| PUT | /api/trips/:tripCode | Update trip (Auth required) |
| POST | /api/login | Authenticate admin |

---

## Installation & Setup

### Install server dependencies
```
npm install
```

### Seed database (if applicable)
```
npm run seed
```

### Start Express server
```
npm start
```

Server runs on:
```
http://localhost:3000
```

---

### Start Angular Admin SPA

Navigate to Angular app directory:

```
cd app_admin
npm install
npm start
```

Angular runs on:
```
http://localhost:4200
```

---

## Project Structure

```
/app_api       → Express API (routes, controllers, models)
/app_admin     → Angular SPA
/views         → Handlebars templates
/public        → Static assets
/data          → Seed data
```

---

## Author

Jose Morales Egipciaco  
CS 465 – Full Stack Development  
Southern New Hampshire University
