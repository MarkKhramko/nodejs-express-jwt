# nodejs-express-jwt

> Express REST API Boilerplate with JWT Authentication and support for MySQL and PostgreSQL.

- Compilation via [Babel](https://babeljs.io/)
- Authentication via [JWT](https://jwt.io/)
- Routes mapping via [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- Environments for `development`, `testing`, and `production`

## Table of Contents

- [Install & Use](#install-and-use)
- [Policies](#policies)
- [Services](#services)
- [Config](#config)
  - [Connection and Database](#connection-and-database)
- [npm scripts](#npm-scripts)
- [License]()

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
  getComments: async () => (
    try{
      const res = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'get'
      });
      // do some fancy stuff with the response
    }
    catch(err){
      // Process error
    }
  );
};
```

## Config

### Connection and Database

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

## npm scripts

### `npm run dev`

This is the entry for a developer. This command:

- runs **nodemon watch task** for the all files conected to `.app/app.js`, except `./public` directory
- Reads **environment variable** `NODE_ENV` from `.env`
- Opens the db connection for `development`
- Starts the server on 127.0.0.1:APP_PORT

## `npm run production`

This command:

- Sets the **environment variable** to `production`
- Opens the db connection for `production`
- Starts the server on 127.0.0.1:APP_PORT

Before running on production you have to set the **environment vaiables**:

- APP_PORT - Port for your application (usually `80`).
- DB_DIALECT - `mysql` or `postgres`
- DB_HOST - Host address of your database
- DB_NAME - Database name for production
- DB_USER - Database username for production
- DB_PASS - Database password for production
- DB_PORT - Database port for production
- JWT_SECERT - Secret for JSON web token (Make sure it is different from your local environment)

### Other commands

- `npm start` - Simply start the server without a watcher;

## LICENSE

MIT 2018-present. By [Mark Khramko](https://github.com/MarkKhramko)