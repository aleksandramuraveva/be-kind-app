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

**Backend** 
.env
```
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=bekinduser
DATABASE_PASSWORD=bekindpassword
DATABASE_NAME=bekinddb
JWT_SECRET=super_secret_key
```
**Frontend**
.env.local
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Starting the Application

```
docker-compose up --build
```
This will start the backend, frontend, and the PostgreSQL database.

## Database
Execute the SQL scripts to create tables and seed initial data:
```
CREATE TABLE public.good_deed (
	id serial4 NOT NULL,
	"userId" int4 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"content" varchar NOT NULL,
	"userUserId" int4 NULL,
	CONSTRAINT good_deed_pkey PRIMARY KEY (id)
);

CREATE TABLE public."user" (
	"userId" serial4 NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	"uniqueTag" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	username varchar NOT NULL,
	CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email),
	CONSTRAINT user_pkey PRIMARY KEY ("userId")
);

CREATE TABLE public.user_friends_user (
	"userUserId_1" int4 NOT NULL,
	"userUserId_2" int4 NOT NULL,
	CONSTRAINT "PK_ee6fb14a87dd3a8957a255c09fb" PRIMARY KEY ("userUserId_1", "userUserId_2")
);
CREATE INDEX "IDX_4b2937856e8abb83d19e7e8e8a" ON public.user_friends_user USING btree ("userUserId_2");
CREATE INDEX "IDX_7fb20798b9339ba724e2939de1" ON public.user_friends_user USING btree ("userUserId_1");
```

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
