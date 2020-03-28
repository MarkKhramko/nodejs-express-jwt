# nodejs-express-jwt

> Express REST API Boilerplate with JWT Authentication and support for MySQL and PostgreSQL

- authentication via [JWT](https://jwt.io/)
- routes mapping via [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- environments for `development`, `testing`, and `production`
- built with [npm scripts](#npm-scripts)
- check the example for User model and User controller, with jwt authentication - [installation instructions](#install-and-use).

## Table of Contents

- [Install & Use](#install-and-use)
- [Folder Structure](#folder-structure)
- [Controllers](#controllers)
  - [Create a Controller](#create-a-controller)
- [Models](#models)
  - [Create a Model](#create-a-model)
- [Policies](#policies)
  - [auth.policy](#authpolicy)
- [Services](#services)
- [Config](#config)
  - [Connection and Database](#connection-and-database)
- [Routes](#routes)
  - [Create Routes](#create-routes)
- [npm scripts](#npm-scripts)

## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/MarkKhramko/nodejs-express-jwt
```

then use [npm](https://www.npmjs.com/) to

```sh
# cd into project root
$ npm install
# copy environment file 
$ cp .env.example .env
# fill .env file
# ...
# if you want to use postgresql (optional)
$ npm install -S pg pg-hstore
# start the application
$ npm start
#
# OR
#
# start development with nodemon
$ npm run dev
```

MySQL is supported out of the box as it is the default.

## Folder Structure

This boilerplate has 4 main directories:

- app - for controllers, models, services, etc.
- config - for routes, database, etc.
- public - for css, js, favicon files, etc.
- migrator - snippet to help migrate required models before application start.

## Controllers

### Create a Controller

Controllers in this boilerplate have a naming convention: `ModelnameController.js` and uses an object factory pattern.
To use a model inside of your controller you have to require it.
We use [Sequelize](http://docs.sequelizejs.com/) as ORM, if you want further information read the [Docs](http://docs.sequelizejs.com/).

Example Controller for all **CRUD** oparations:

```js
const Model = require('#models/Model');

const ModelController = () => {
  const create = (req, res) => {
    // body is part of a form-data
    const { value } = req.body;

    Model
      .create({
        key: value
      })
      .then((model) => {
        if(!model) {
          return res.status(400).json({ msg: 'Bad Request: Model not found' });
        }

        return res.status(200).json({ model });
      })
      .catch((err) => {
        // better save it to log file
        console.error(err);

        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  const getAll = (req, res) {
    Model
      .findAll()
      .then((models) => {
        if(!models){
          return res.status(400).json({ msg: 'Bad Request: Models not found' });
        }

        return res.status(200).json({ models });
      })
      .catch((err) => {
        // better save it to log file
        console.error(err);

        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  const get = (req, res) => {
    // params is part of an url
    const { id } = req.params;

    Model
      .findOne({
        where: {
          id,
        },
      })
      .then((model) => {
        if(!model) {
          return res.status(400).json({ msg: 'Bad Request: Model not found' });
        }

        return res.status(200).json({ model });
      })
      .catch((err) => {
        // better save it to log file
        console.error(err);

        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  const update = (req, res) => {
    // params is part of an url
    const { id } = req.params;

    // body is part of form-data
    const { value } = req.body;

    Model
      .findByPk(id)
      .then((model) => {
        if(!model) {
          return res.status(400).json({ msg: 'Bad Request: Model not found' });
        }

        return model
          .update({
            key: value,
          }).then((updatedModel) => {
            return res.status(200).json({ updatedModel });
          });
      })
      .catch((err) => {
        // better save it to log file
        console.error(err);

        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  const destroy = (req, res) => {
    // params is part of an url
    const { id } = req.params;

    Model
      .findByPk(id)
      .then((model) => {
        if(!model) {
          return res.status(400).json({ msg: 'Bad Request: Model not found' })
        }

        model.destroy().then(() => {
          return res.status(200).json({ msg: 'Successfully destroyed model' });
        }).catch((err) => {
          // better save it to log file
          console.error(err);

          return res.status(500).json({ msg: 'Internal server error' });
        });
      })
      .catch((err) => {
        // better save it to log file
        console.error(err);

        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  // IMPORTANT
  // don't forget to return the functions
  return {
    create,
    getAll,
    get,
    update,
    destroy
  };
};

model.exports = ModelController;
```

## Models

### Create a Model

Controllers in this boilerplate have a naming convention: `Model.js` and uses [Sequelize](http://docs.sequelizejs.com/) to define Models, if you want further information read the [Docs](http://docs.sequelizejs.com/).

Example User Model:

```js
const Sequelize = require('sequelize');

// for passwords encryption
const bcryptSevice = require('#services/bcrypt.service');

// the DB connection
const sequelize = require('#config/database');

// hooks are functions that can run before or after a specific event
const hooks = {
  beforeCreate(user) {
    user.password = bcryptSevice.password(user);
  }
};

// naming the table in DB
const tableName = 'users';

// the actual model
const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  }
}, { hooks, tableName });

// Instead of using instanceMethod
// in Sequelize > 4 we write the function
// to the prototype object of our model.
// As we do not want to share sensitive data, the password
// field gets ommited before sending
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

// IMPORTANT
// don't forget to export the Model
module.exports = User;
```

## Policies

Policies are middleware functions that can run before hitting a apecific or more specified route(s).

Example policy:

(Only allow if the user is marked as admin)

> Note: this is not a secure example, only for presentation puposes

```js
module.exports = (req, res, next) => {
  if(req.body.userrole === 'admin') {
    // do some verification stuff
    const verified = verifyAdmin(req.body.userid);

    if(verified) {
      return next();
    }

    return res.status(401).json({ msg: 'Unauthorized' });
  }

  return res.status(401).json({ msg: 'Unauthorized' });
};
```

To use this policy on all routes that only admins are allowed:

app.js

```js
const adminPolicy = require('#policies/admin.policy');

app.all('/admin/*', (req,res,next) => adminPolicy(req,res,next));
```

Or for one specific route

app.js

```js
const adminPolicy = require('#policies/admin.policy');

app.get('/admin/myroute',
  (req,res,next) => adminPolicy(req,res,next),
  (req,res) => {
  //do some fancy stuff
});
```

## auth.policy

The `auth.policy` checks wether a `JSON Web Token` ([further information](https://jwt.io/)) is send in the header of an request as `Authorization: Bearer [JSON Web Token]` or inside of the body of an request as `token: [JSON Web Token]`.
The policy runs default on all api routes that are are prefixed with `/private`. To map multiple routes read the [docs](https://github.com/aichbauer/express-routes-mapper/blob/master/README.md) from `express-routes-mapper`.

To use this policy on all routes of a specific prefix:

app.js

```js
app.use('/prefix', yourRoutes);
app.all('/prefix', (req, res, next) => auth(req, res, next));
```

or to use this policy on one specific route:

app.js

```js
app.get('/specificRoute',
  (req, res, next) => auth(req, res, next),
  (req, res) => {
  // do some fancy stuff
});
```

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

Holds all the server configurations.

## Connection and Database

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

There are no automation tool or task runner like [grunt](https://gruntjs.com/) or [gulp](http://gulpjs.com/) used for this boilerplate. These boilerplate only uses npm scripts for automatization.

### npm start

This is the entry for a developer. This command:

- runs **nodemon watch task** for the all files conected to `.app/app.js`
- sets the **environment variable** `NODE_ENV` to `development`
- opens the db connection for `development`
- starts the server on 127.0.0.1:APP_PORT

## npm run production

This command:

- sets the **environment variable** to `production`
- opens the db connection for `production`
- starts the server on 127.0.0.1:APP_PORT

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

- `npm run dev` - simply start the server without a watcher
- `npm run nodemon` - same as `npm start`

## LICENSE

MIT 2018-present © Mark Khramko