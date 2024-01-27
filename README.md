# My Organizer Backend - Node.js Express API

Welcome to the My Organizer Backend, a Node.js Express API designed to handle backend operations for the My Organizer web app. This backend provides endpoints for Users CRUD, Projects CRUD, and Tasks CRUD. It utilizes MongoDB as the database for storage and incorporates JWT for authentication purposes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)

## Introduction

The My Organizer Backend serves as the backend infrastructure for the My Organizer web app, providing a robust API for managing users, projects, and tasks. This backend is built with Node.js and Express, offering a scalable and secure solution for project management.

## Features

- **Users CRUD:**
  - Create, read, update, and delete user information.

- **Projects CRUD:**
  - Manage projects with operations like create, read, update, and delete.

- **Tasks CRUD:**
  - Perform CRUD operations on tasks associated with projects.

## Technologies

The My Organizer Backend utilizes the following technologies:

- **Node.js:** A JavaScript runtime for building scalable and performant server-side applications.
- **Express:** A web application framework for Node.js that simplifies API development.
- **MongoDB:** A NoSQL database used for storing user, project, and task information.
- **JWT (JSON Web Tokens):** Used for authentication purposes, securing API endpoints.

## API Endpoints

1. **Users CRUD:**
   - `GET /users`: Get all users.
   - `GET /users/:id`: Get user by ID.
   - `POST /users`: Create a new user.
   - `PATCH /users/:id`: Update user by ID.
   - `DELETE /users/:id`: Delete user by ID.

2. **Projects CRUD:**
   - `GET /projects`: Get all projects.
   - `GET /projects/:id`: Get project by ID.
   - `POST /projects`: Create a new project.
   - `PATCH /projects/:id`: Update project by ID.
   - `DELETE /projects/:id`: Delete project by ID.

3. **Tasks CRUD:**
   - `GET /tasks`: Get all tasks.
   - `GET /tasks/:id`: Get task by ID.
   - `POST /tasks`: Create a new task.
   - `PATCH /tasks/:id`: Update task by ID.
   - `DELETE /tasks/:id`: Delete task by ID.

## Authentication

The API endpoints are secured using JSON Web Tokens (JWT) for user authentication. Users need to include a valid JWT in the Authorization header for accessing protected routes.

## Database

The backend uses MongoDB as the database to store user, project, and task information. Ensure you have a MongoDB instance set up and configured in your environment.

## Contribution

Contributions are welcome! If you have ideas for improvements, new features, or bug reports, please open an issue or submit a pull request. Refer to the [Contribution Guidelines](CONTRIBUTING.md) for more details.


## Contact

For any inquiries or feedback, please reach out to me at salmanpatrick5@gmail.com.
