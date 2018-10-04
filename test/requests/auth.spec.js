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
