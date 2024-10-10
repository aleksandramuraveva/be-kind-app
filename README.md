# be-kind-app

This application allows users to manage their list of good deeds, register, authorize, update user data, and add friends using a unique tag. Built with a stack including TypeScript, NestJS, PostgreSQL, Docker, React, NextJS, Redux, and TailwindCSS.

## Prerequisites
Docker

Docker Compose

## Getting Started
Clone the Repository

```
git clone https://github.com/aleksandramuraveva/be-kind-app.git
cd be-kind-app
```
## Environment Variables

Ensure you have the necessary environment variables in your .env files for both backend and frontend.

## Starting the Application

```
docker-compose up --build
```
This will start the backend, frontend, and the PostgreSQL database.

## Access the Application

Frontend: http://localhost:3000

Backend API: http://localhost:4000

## Technologies Used
Backend: TypeScript, NestJS, PostgreSQL, Docker

Frontend: TypeScript, React, NextJS, Redux, TailwindCSS

## Docker Services
backend: NestJS API running on port 4000.

frontend: NextJS application running on port 3000.

db: PostgreSQL database running on port 5432.

### Note
Ensure Docker is running on your machine and ports 3000, 4000, and 5432 are available.
