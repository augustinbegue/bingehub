import { hash, compare } from 'bcrypt';

const saltRounds = 10;
async function hashPassword(password) {
  return await hash(password, saltRounds);
}
async function comparePassword(password, hash2) {
  return await compare(password, hash2);
}

export { comparePassword as c, hashPassword as h };
//# sourceMappingURL=index4-fdf292d6.js.map
