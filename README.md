# pipedrive-gist-grapper

Using the Github API query a user’s publicly available GitHub gists and create a deal/activity in Pipedrive for each gist. Implemented a cron job that periodically checks for a user's publicly available gists, this application also has a web endpoint which provide the gists for that user that were added since the last visit.

## Initialise development environment

Run command:

```sh
make init-dev
```

Above command will install the dependencies, build & run the needful containers for you.

## Run the application

```sh
npm start
```

Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/)
