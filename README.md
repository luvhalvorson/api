# Installation

The following enviornment variables need to be set

|Key|Description|Value|Required|Default|
|-|-|-|-|-|
|NODE_ENV|Production/Test...|string|yes|undefined|
|BCRYPT_ROUNDS|Bcrypt rounds|int()|yes|undefined|
|JWT_SECRET|JWT Hash|string()|yes|undefined|
|JWT_ALGORITHM|JWT Algorithm|string(HS256)|no|HS256|
|JWT_EXPIRES_IN|JWT Expire tim|string()|no|undefined|

They can be set in either a `.env` file in the root of the project, run
```
$ cp .env.example .env
```

in the root of the project.

Next open `knexfile.js` setup the desired database for
each available enviornment.

```
$ NODE_ENV={env} npm start
```

# Testing

```
$ NODE_ENV=test mocha
```

or

```
$ npm test
```

The file `test/setup.js` is loaded by mocha.  Set up enviornment variables in this file.

# Project log

## 15:00 3/10/18

Moved from `jest` to `mocha`.  Mocha is much faster when running request test.  `Jest` took up towards 4 seconds to run the
following tests

```js
const request = require('supertest');
const app = require('../../app');
const { connection } = require('../../app/config');
const factory = require('../../database/factory');

/**
 * AuthRequest
 */
describe('Request : Auth', () => {

  beforeEach(async () => {
    await connection.migrate.latest();
  });

  afterEach(async () => {
    await connection.migrate.rollback();
  });

  describe('errors', () => {
    it('should reject if payload is missing', async () => {
      await request(app)
        .post('/api/auth')
        .expect(400);
    });

    /**
     * This is with unknown user
     */
    it('should respond with 401 when credentials are invalid', async () => {
      const user = await factory.create('user', {
        password: 'password',
      });

      await request(app)
        .post('/api/auth')
        .send({ email: `not_${user.email}`, password: 'password' })
        .expect(401);
    });
    /**
     * This is with correct email but wrong password
     */
    it('should respond with 401 when credentials are invalid', async () => {
      const user = await factory.create('user', {
        password: 'password',
      });

      await request(app)
        .post('/api/auth')
        .send({ email: user.email, password: 'password2' })
        .expect(401);
    });
  });

  it('should respond with token', async () => {
    const user = await factory.create('user', {
      password: 'password'
    });

    const response = await request(app)
      .post('/api/auth')
      .send({
        email: user.email,
        password: 'password'
      })
      .expect(200);

      //expect(response.body.token).toBeDefined();
    });
});
```

In `mocha` the above test runs in `130 ms` on average.

### Updating migrations

When updating migrations it is necessary to update some other files.
If a migration have a related factory `../database/factory` it is necessary to
update the factory to ensure they are inline with migrations.
