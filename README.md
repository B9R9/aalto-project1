# SHARED SHOPPING LIST

## Introduction
In the first course project, you will build a web application that is used as a shared shopping list. The application must use a three-tier architecture (client, server, database) and a layered architecture with four layers (views, controllers, services, database).
This project is part of the [fitech101 aalto web development](https://fitech101.aalto.fi/web-software-development-1-0/20-course-project-i/).

## Instruction
You can check all the instructions [here](https://fitech101.aalto.fi/web-software-development-1-0/20-course-project-i/1-project-handout)

## Prerequisites
Before starting, make sure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)

## Installation
Clone the repository:
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

## Project Structure
```
your-repo/
|__ app-cache
|   |__ ...
|
├── e2e-playwright/
│   ├── tests/
│   │   ├── index.spec.js
│   │   └── lists.spec.js
│   ├── Dockerfile
│   └── ...
├── shopping-list/
│   ├── Dockerfile
│   └── ...
├── flyway/
│   ├── sql/
│   │   ├── V1__init.sql
│   │   └── ...
│   └── ...
├── test/
│   ├── Dockerfile
|   └── ...
├── docker-compose.yml
├── README.md
└── ...
```

## App Structure
```
├── app/
│   ├── controllers/
│   │   ├── itemsController.js
│   │   ├── listsController.js
│   │   └── mainPageController.js
│   ├── services/
│   │   ├── itemsService.js
│   │   ├── listsService.js
│   │   └── mainPageService.js
│   ├── views/
│   |   ├── layouts/
│   │   |   └── layout.eta
│   │   ├── index.eta
│   │   ├── lists.eta
│   │   └── list.eta
│   ├── database/
│   │   └──  database.js
│   │ 
│   ├── app.js
│   └── deps.js
```
## Docker Compose
List of the services:

| Service             | Depends On                | Description                                      |
|---------------------|---------------------------|--------------------------------------------------|
| app                 | postgres, flyway          | Main application service                         |
| postgres            | None                      | PostgreSQL database service                      |
| flyway              | postgres                  | Database migration service using Flyway          |
| flyway_repair       | postgres                  | Flyway repair service                            |
| adminer             | postgres                  | Database management tool                         |
| e2e-playwright      | test                      | End-to-end testing service using Playwright      |
| test                | mock-db, flyway_test      | Test environment for the application             |
| mock-db             | None                      | Mock PostgreSQL database for testing             |
| flyway_test         | mock-db                   | Database migration service for testing           |
| flyway_repair_test  | mock-db                   | Flyway repair service for testing                |

## Usage
### Production:
To start the application in production, use the following Docker Compose commands:
> docker-compose up --build app

### Testing
To start the test environment, use the following Docker Compose commands:
> docker-compose run --rm e2e-playwright npx playwright test

You can specify a test at the end of the command:
> docker-compose run --rm e2e-playwright npx playwright test "/path/to/your/testfile"

You can also run:
> deno test --allow-net --allow-read --allow-env
or with a specific file:
> deno test --allow-net --allow-read --allow-env "/path/to/your/testfile"

### Running Migration
To run the database migrations, use the following Docker Compose commands:
> docker-compose up --build flyway

To repair the database migrations, use the following Docker Compose commands:
> docker-compose up --build flyway_repair

## Troubleshooting
* **Database Connection Error**: Make sure your `DATABASE_URL` is correctly set and the PostgreSQL service is running.  

* **Port Already in Use**: Ensure the port specified in the `PORT` environment variable is not being used by another application.
