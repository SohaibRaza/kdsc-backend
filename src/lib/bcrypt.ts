import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

async function hash(password) {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
}

async function compare(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export default { compare, hash };
