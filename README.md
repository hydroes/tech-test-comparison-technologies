# RESTful API Server 
## Featuring Docker, Node, Express, MongoDB, Mongoose, & NGINX 

## License & Purpose

MIT License. 

## Trade offs:
I would implement more unit tests and get 100% test coverage.
I would implement contract tests
I would try performance test using a framework like swarm
I would would use the paradigm of working smarter and not harder more

## About

This configuration is a backend [RESTful API] with the following pieces

- [Docker](https://www.docker.com/) as the container service to isolate the environment.
- [Node.js](https://nodejs.org/en/) (Long-Term-Support Version) as the run-time environment to run JavaScript.
- [Express.js](https://expressjs.com/) as the server framework / controller layer
- [MongoDB](https://www.mongodb.com/) as the database layer
- [Mongoose](https://mongoosejs.com/) as the "ODM" / model layer
- [NGINX](https://docs.nginx.com/nginx/admin-guide/content-cache/content-caching/) as a proxy / content-caching layer

## How to Install & Run

You will need to first download and install [Docker Desktop](https://www.docker.com/products/docker-desktop) or [Linux equivalent](https://docs.docker.com/install/linux/docker-ce/ubuntu/).

1.  Run `docker-compose up` to start three containers:
    - the MongoDB database container
    - the Node.js app container
    - the NGINX proxy container
1.  Server is accessible at `http://localhost:5000` if you have Docker for Windows or Mac. Use `http://localhost` without specifying the port to hit the NGINX proxy. 

## How to Run Tests

Currently, tests are run outside of the Docker container (unfortunately for now). The tests use an in-memory version of MongoDB. You should be able to run `npm install` followed by `npm test` to run everything (assuming you have the LTS version of Node installed on your machine).

## App Structure

**\_\_tests\_\_**

- this folder contains unit and integration tests both run using `npm test` which in turn uses [Jest](https://jestjs.io/)

**./app**

- `handlers` are Express.js route handlers that have `request`, `response`, and `next` parameters.
- `helpers` are raw JS "classes" and utility functions for use across the app
- `models` are [Mongoose schema](https://mongoosejs.com/docs/guide.html) definitions and associated models
- `routers` are RESTful route declarations using [express.Router module](https://expressjs.com/en/guide/routing.html) that utilize the functions in `handlers`
- `schemas` are [JSONSchema](https://json-schema.org/understanding-json-schema/index.html) validation schemas for creating or updating a Message. 
- `app.js` is what builds and configures the express app
- `config.js` config for the app
- `index.js` is the entrypoint that actually starts the Express server

**./config**

- config contains NGINX proxy configuration, the production pm2 configuration, and the Jest configuration to run MongoDB in memory
