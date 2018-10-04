process.env = {
  ...process.env,

  /** Setup as necessary */
  NODE_ENV: 'test',
  BCRYPT_ROUNDS: 1,
  JWT_SECRET: 'ThisShouldBeASecretKeyThatNobodyKnowsAbout',
  JWT_ALGORITHM: 'HS256',
  JWT_EXPIRES_IN: '365days',
}
