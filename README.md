# RNR server FOR DEV

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [mongoDb]

## Setup

Clone the repository and run

    $ yarn   # or npm install

Make a copy of `.env.example` as `.env` and update your application details and database credentials. Now, run the migrations and seed the database.

    $ yarn seed

Finally, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)

Navigate to http://localhost:8848/api-docs/ to verify installation.

## Creating new Migrations

These are the commands to create a new migration.

    $ yarn make:migration <name>

Example,

    $ yarn make:migration create_tags_table

## Creating new Seeds

    [Create seeding data](https://github.com/pkosiec/mongo-seeding/blob/master/docs/import-data-definition.md)

    As mentioned in the above tutorials data to seed our mongoDB database is under directory src/seeds.

### Multi-stage docker builds

There are multiple build targets available for different stages. These images can be used to deploy or run jobs in different container based cloud infrastructure like Kubernetes, AWS ECS, Fargate, GCP Cloud Run etc.

1. Building a production image.

   ```bash
   $ docker build --target=prod -t app:prod .
   ```

2. Building an image for development.

   ```bash
   $ docker build --target=dev -t app:dev .
   ```

3. Building an image that runs migration and/or rollback.

   ```bash
    # Docker image that runs migration and seeds.
    $ docker build --target=migrate -t app:migrate .

    # Docker image that rollbacks migrations.
    $ docker build --target=migrate-rollback -t app:migrate-rollback .
   ```

Once the images have been built - all you need to do is run them providing a `.env` file. Like this:

```bash
$ docker run -v "/path/to/your/.env:/app/.env" app:migrate
```

## Tests

To run the tests you need to create a separate test database. Don't forget to update your `.env` file to include the connections for test database.

    $ NODE_ENV=test yarn migrate
    $ yarn test

Run tests with coverage.

    $ yarn test:coverage
