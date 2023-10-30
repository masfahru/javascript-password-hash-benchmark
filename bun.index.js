import bcryptjs from 'bcryptjs';
import { password, argon2idConfig } from './password.js';
import { bench, group, run } from 'mitata';

const argonConfig = Object.assign(
  {
    algorithm: 'argon2id',
  },
  argon2idConfig
);
const hashedBunArgon = await Bun.password.hash(password, argonConfig);
console.info('Bun Argon2id:', hashedBunArgon);

const hashedBunBcrypt = await Bun.password.hash(password, {
  algorithm: 'bcrypt',
});
console.info('Bun Bcrypt:', hashedBunBcrypt);

const hashedBcryptjs = await bcryptjs.hash(password, 10);
console.info('Bcryptjs:', hashedBcryptjs);

console.info();

group('Bun.sh', () => {
  bench('Bun Argon2id', async () => {
    const hashed = await Bun.password.hash(password, argonConfig);
    await Bun.password.verify(password, hashed);
  });
  bench('Bun Bcrypt', async () => {
    const hashed = await Bun.password.hash(password, {
      algorithm: 'bcrypt',
    });
    await Bun.password.verify(password, hashed);
  });
  bench('Bcryptjs', async () => {
    const hashed = await bcryptjs.hash(password, 10);
    await bcryptjs.compare(password, hashed);
  });
});

await run({
  colors: false,
});
