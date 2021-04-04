# nodejs-express-jwt

> Express REST API Boilerplate with JWT Authentication and support for MySQL and PostgreSQL.

- Compilation via [Babel](https://babeljs.io/);
- Authentication via [JWT](https://jwt.io/);
- Routes mapping via [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper);
- Environments for `development`, `testing`, and `production`.

## Table of Contents

- [Version notice](#version-notice)
- [Install & Use](#install-and-use)
- [Policies](#policies)
- [Services](#services)
- [Configs](#configs)
  - [.env](#.env-file)
- [npm scripts](#npm-scripts)
- [License]()

## Version notice

This project came a long way since the initial release in 2018. If you used this boilerplate before 2021, you should check a [v0.x.x branch](https://github.com/MarkKhramko/nodejs-express-jwt/tree/v0.x.x) and [v0 tags](https://github.com/MarkKhramko/nodejs-express-jwt/releases/tag/v0.0.0)for latest changes of v0.

## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/MarkKhramko/nodejs-express-jwt
```

then use [npm](https://www.npmjs.com/) to

```sh
# Enter project root
$ cd nodejs-express-jwt
# Install dependencies
$ npm i
# Copy environment file 
$ cp .env.example .env
# Fill .env file
# ...
# If you want to use PostgreSQL (optional)
$ npm install -S pg pg-hstore
# Start the application (without code watcher)
$ npm start
#
# OR
#
# start development with nodemon
$ npm run dev
```

MySQL is supported out of the box as it is the default.


## Policies

Policies are middleware functions that can run before hitting a apecific or more specified route(s).


## Services

Services are little useful snippets, or calls to another API that are not the main focus of your API.

Example service:

Get comments from another API:

```js
module.exports = {
  getComments:_getComments
};

async function _getComments() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'get'
    });
    // do some fancy stuff with the response.
  }
  catch(error) {
    // Process error.
  }
}
```

## Configs

### .env file

#### Database

Configure the keys with your credentials in `.env` file.

```
  DB_DIALECT=mysql
  DB_HOST=localhost
  DB_NAME=name
  DB_USER=root
  DB_PASSWORD=root
  DB_PORT=3609
```

Default dialect for the application is MySQL. To switch for PostgreSQL, type `DB_DIALECT=postgres` in `.env` file.

> Note: if you use `mysql` make sure MySQL server is running on the machine

> Note: to use a postgres run : `npm i -S pg pg-hstore` or `yarn add pg pg-hstore`

#### JWT

Set random `secret access keys` for your access and refresh tokens.

```
JWT_ACCESS_SECRET=<any random string>
JWT_REFRESH_SECRET=<any random string>
```

## npm scripts

### `npm run dev`

This is the entry for a developer. This command:

- runs **nodemon watch task** for the all files conected to `.app/app.js`, except `./public` directory;
- Reads **environment variable** `NODE_ENV` from `.env`;
- Opens the db connection for `development`;
- Starts the server on 127.0.0.1:APP_PORT,

### `npm run production`

This command:

- Sets the **environment variable** to `production`;
- Opens the db connection for `production`;
- Starts the server on 127.0.0.1:APP_PORT.

Before running on production you have to set the **environment vaiables**:

- APP_PORT - Port for your application (usually `80`);
- DB_DIALECT - `mysql` or `postgres`l;
- DB_HOST - Host address of your database;
- DB_NAME - Database name for production;
- DB_USER - Database username for production;
- DB_PASS - Database password for production;
- DB_PORT - Database port for production;
- JWT_ACCESS_SECRET - Secret for JSON web token for direct API requests;
- JWT_REFRESH_SECRET - Secret for JSON web token to renew the Access-JWT.

### `npm start`

This command:
- Opens the db connection for default environment in `.env` file.
- Simply start the server on 127.0.0.1:APP_PORT without a watcher.

### `npm run db:migrate`

This command:
- Ensures that database schemas are equivalent to the ones configured in `/app/models/index.js`.

### `npm run db:seed`

This command:
- Inserts all seeds, configured in `/migrator/seeder.js` into the database.


## LICENSE

MIT 2018-present. By [Mark Khramko](https://github.com/MarkKhramko)