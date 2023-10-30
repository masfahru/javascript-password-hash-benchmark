// import rsArgon2 from '@node-rs/argon2';
// import argon2 from 'argon2';
// import bcrypt from 'bcrypt';
import bcryptjs from 'bcryptjs';
import { describe, it } from 'bun:test';
// import { describe, it } from 'mocha';
import { password } from '../password.js';
import assert from 'node:assert/strict';

describe('Unit Tests', () => {
  // const salt = bcrypt.genSaltSync(10);

  // it('@node-rs/argon2 hashed password should be valid when verified', async () => {
  //   const hashed = await rsArgon2.hash(password);
  //   console.log(hashed)
  //   const isValid = await rsArgon2.verify(hashed, password);
  //   assert.ok(isValid)
  // });

  // it('argon2 hashed password should be valid when verified', async () => {
  //   const hashed = await argon2.hash(password);
  //   console.log(hashed)
  //   const isValid = await argon2.verify(hashed, password);
  //   assert.ok(isValid)
  // });

  // it('bcrypt hashed password should be valid when verified', async () => {
  //   const hashed = await bcrypt.hash(password, salt);
  //   const isValid = await bcrypt.compare(password, hashed);
  //   assert.ok(isValid)
  // });

  it('bcryptjs hashed password should be valid when verified', async () => {
    const hashed = await bcryptjs.hash(password, 10);
    const isValid = await bcryptjs.compare(password, hashed);
    assert.ok(isValid);
  });

  it('bun.password bcrypt hashed password should be valid when verified', async () => {
    const hashed = await Bun.password.hash(password, {
      algorithm: "bcrypt",
    });
    const isValid = await Bun.password.verify(password, hashed);
    assert.ok(isValid);
  });

  it('bun.password argon2id hashed password should be valid when verified', async () => {
    const hashed = await Bun.password.hash(password);
    const isValid = await Bun.password.verify(password, hashed);
    assert.ok(isValid);
  });
});
