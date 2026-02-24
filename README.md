# Travlr Getaways – MEAN Stack Full-Stack Application

Travlr Getaways is a full-stack travel booking application built using the MEAN stack (MongoDB, Express.js, Angular, and Node.js).  
This project includes a public-facing website and an administrator Single-Page Application (SPA) for managing travel packages.

Course Milestones: Development history is preserved in branches module1 through module7.
Each milestone was developed in its own Git branch, preserving incremental development history and demonstrating disciplined version control practices.

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
  - 
The project enforces separation of concerns by isolating database logic in Mongoose models, request handling in controllers, routing in Express route files, authentication in middleware, and UI state management in Angular services and components. This modular structure improves maintainability and scalability.

### Frontend Development: Express HTML, JavaScript, and the SPA

This project used three distinct approaches to frontend development, each with its own strengths and trade-offs. The customer-facing side of the application started as static Express HTML pages, is simple, fast to load, and easy to maintain, but limited in interactivity since each page navigation required a full server round-trip. As the project evolved, JavaScript and Handlebars templates were introduced to dynamically render data from the database, reducing code duplication and making the site data-driven rather than hardcoded. The administrator side was built as an Angular Single-Page Application (SPA), which represents a fundamentally different architectural approach: the entire application is loaded once in the browser, and subsequent interactions update only the necessary portions of the page without full reloads. This results in a faster, more responsive experience for users performing repeated actions like editing or creating trips, at the cost of greater upfront complexity in component and routing setup.

### Why NoSQL MongoDB?

The backend uses MongoDB, a NoSQL document database, because the data structures in a travel application like this are a natural fit for JSON-like documents. Trip records can vary in shape, without requiring schema migrations as they would in a relational database. Some may have different optional fields, nested objects, or arrays of sub-documents like itinerary stops. MongoDB also pairs seamlessly with the rest of the MEAN stack since data flows through the entire application in the same JSON format, from the database all the way to the Angular frontend. This consistency simplifies development and reduces the need for complex data transformation at each layer.

---

## Functionality

### JSON vs. JavaScript

JavaScript is a full programming language used to write application logic. It handles control flow, functions, classes, and DOM manipulation. JSON (JavaScript Object Notation) is a data format, not a language. It is a structured, text-based representation of data that can be serialized and transmitted between systems. In this project, JSON acts as the universal contract that ties the frontend and backend together: the Angular SPA sends JSON in HTTP request bodies to the Express API, the API reads and writes JSON-formatted documents to MongoDB via Mongoose, and responses come back as JSON that Angular parses to update the view. Without JSON as the shared data format, coordinating data across Node.js, Express, MongoDB, and Angular would require translation layers at each boundary.

### Code Refactoring and Reusable UI Components

One of the most impactful refactoring efforts was converting static HTML trip listings into Handlebars templates on the customer-facing site, which eliminated repetitive markup and made it easy to render any number of trips from a single data source. On the Angular side, creating reusable components provided significant advantages: changes to how a trip is displayed or edited only need to be made in one place, reducing bugs caused by inconsistency and speeding up future feature development, such as a shared trip card and a trip form. Centralizing the data service layer into Angular services rather than making HTTP calls directly from each component was another key refactor that improved separation of concerns and made testing individual pieces of the application more straightforward.

---

## Testing

### Methods, Endpoints, and Security

API testing in a full-stack application requires understanding both what is being tested and the context in which it runs. HTTP methods define the intent of a request: GET retrieves data without side effects, POST creates new resources, and PUT replaces existing ones. Endpoints are the specific routes that accept these requests, for example, `GET /api/trips` to fetch all trips or `PUT /api/trips/:tripCode` to update a specific one.

Testing these endpoints was done using Postman, which allows requests to be crafted manually with custom headers, request bodies, and authentication tokens. The addition of JWT security added a meaningful layer of complexity to testing: unauthenticated requests to protected endpoints correctly return a 401 Unauthorized response, while valid requests with a Bearer token in the Authorization header are processed normally. Testing with security enabled requires first obtaining a token via the login endpoint and then including it in subsequent requests. A workflow that closely mirrors how the Angular SPA handles authentication in production. This process reinforced the importance of testing both the happy path and failure scenarios, particularly around expired or missing tokens.

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

## Reflection

This course has been one of the most practically valuable in my computer science program. Prior to CS 465, my experience with web development was largely limited to front-end work or back-end concepts in isolation. Building a full-stack application end-to-end gave me a much clearer picture of how production web applications are structured and how data flows through every layer of the system. It helped me understand how data flows from a MongoDB schema through an Express REST API and into an Angular SPA.

The skills I developed that I feel most confident carrying into a professional setting are RESTful API design, JWT-based authentication, and component-based frontend development with Angular. Understanding how to secure endpoints, manage authentication state on the client, and structure an application so that concerns are cleanly separated are foundational skills that apply across many stacks and roles. Working through real debugging challenges was especially valuable because it built the kind of problem-solving instinct that classroom exercises alone cannot replicate, such as getting Angular to properly consume the Express API, or resolving CORS and authentication issues

As a candidate entering the software development field, being able to demonstrate a complete, working full-stack application on GitHub is a tangible artifact that speaks to my ability to plan, build, and deliver a multi-layered software project from start to finish, along with the version-controlled development history showing how it evolved

---

## Author

Jose Morales Egipciaco  
CS 465 – Full Stack Development  
Southern New Hampshire University
