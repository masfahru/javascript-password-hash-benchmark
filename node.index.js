import rsArgon2 from '@node-rs/argon2';
import argon2 from 'argon2';
import bcrypt from 'bcrypt';
import bcryptjs from 'bcryptjs';
import { password, argon2idConfig } from './password.js';
import { bench, group, run } from 'mitata';

const hashedNodeRsArgon = await rsArgon2.hash(password, argon2idConfig);
console.info('@node-rs/argon2:', hashedNodeRsArgon);

const hashedArgon2 = await argon2.hash(password, argon2idConfig);
console.info('Argon2:', hashedArgon2);

const hashedBcrypt = await bcrypt.hash(password, 10);
console.info('Bcrypt:', hashedBcrypt);

const hashedBcryptjs = await bcryptjs.hash(password, 10);
console.info('Bcryptjs:', hashedBcryptjs);

console.info();

group('Node.js', () => {
  bench('@node-rs/argon2', async () => {
    const hashed = await rsArgon2.hash(password, argon2idConfig);
    await rsArgon2.verify(hashed, password);
  });
  bench('Argon2', async () => {
    const hashed = await argon2.hash(password, argon2idConfig);
    await argon2.verify(hashed, password);
  });
  bench('Bcrypt', async () => {
    const hashed = await bcrypt.hash(password, 10);
    await bcrypt.compare(password, hashed);
  });
  bench('bcryptjs', async () => {
    const hashed = await bcryptjs.hash(password, 10);
    await bcryptjs.compare(password, hashed);
  });
});

await run({
  colors: false,
});
