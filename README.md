# ebdp1plus-accounts-service

This repository contains the Accounts service.
The service provides RESTful API to work with users' accounts information.

## General dependencies

- [NodeJS lts](https://nodejs.org)
- [Postgresql lts](https://www.postgresql.org/download/)

## Initialization

- `npm i` - for installation dependencies
- `npm run db:init` - initialized DB and migrates data
- `npm run start` - run server

Copy/create local.json config file into ~/config/env folder

- `npm run start:local` - running server in development mode

## Documentation

Use http://localhost:3400/ebdp1plus-accounts-service/api-docs for swagger documentation defined on `/src/api/swagger/swagger.yaml`

Before using documentation please run server `npm run server`

## Third party dependencies

We use PostgreSQL to store the data.
To work with PostgreSQL TypeORM has been used.
Also some well-known 3rd party libraries (like Moment) have been used.
