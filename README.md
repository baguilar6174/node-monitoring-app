# Node NOC (Monitoring Application)

This repository contains a monitoring application to create logs on different data sources. Also send emails using NodeMailer service. The application was implemented using clean architecture concepts and SOLID principles.

## Installation

Clone this repository

```bash
git clone https://github.com/baguilar6174/node-noc-app.git
```

Install dependencies

```bash
yarn
```

Clone `.env.template` file and rename to `.env`.

Replace your environment variables in `.env` file

## Running the app

If you need local mongo database

- Install docker
- Run `docker compose up -d` This command create a local volumen in root project to save data.

**Important**: If you don't need mongo from Docker, set your configuration into `.env` file `docker-compose.yaml` create a container:

1. **Mongo Database**: the volume of this database is allocated in the root of your project `./mongo` if you delete this folder you'll lose your data.

- Run `yarn dev`

If your want to create build production, run `yarn build`

## My process

### Built with

- Node
- Typescript
- Eslint & Prettier
- NodeMailer
- Mongoose
- Prisma
- TypeORM

### What I learned

- Clean Architecture
  - Entities
  - Data sources
  - Repositories
  - Abstract classes
  - Implementations
- Dependency injection
- Use Cases
- Services
- CRON Task
- Environment variables
- NodeMailer

## Development Features

- Clean Architecture
- SOLID

## Improves

-

## Stay in touch

- Website - [www.bryan-aguilar.com](https://www.bryan-aguilar.com/)
- Medium - [baguilar6174](https://baguilar6174.medium.com/)
- LinkeIn - [baguilar6174](https://www.linkedin.com/in/baguilar6174)
