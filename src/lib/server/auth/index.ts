import { compare, hash } from 'bcrypt';
const saltRounds = 10;

export async function hashPassword(password: string) {
	return await hash(password, saltRounds);
}

/**
 * Compares a password with a hash
 * @param password plain text password
 * @param hash hashed password
 * @returns true if the password matches the hash
 */
export async function comparePassword(password: string, hash: string) {
	return await compare(password, hash);
}
