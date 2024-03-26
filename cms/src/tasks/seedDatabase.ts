import { prisma } from '$lib/server/database/prisma';
import { hashPassword } from '$lib/server/auth';
import { log } from '../logger';

export async function seedDatabase() {
	try {
		const role = await prisma.role.findFirst({
			where: {
				name: 'admin'
			}
		});

		if (!role) {
			await prisma.role.create({
				data: {
					name: 'admin'
				}
			});
		}

		const admin = await prisma.user.findFirst({
			where: {
				username: 'admin'
			}
		});

		if (!admin) {
			await prisma.user.create({
				data: {
					username: 'admin',
					password: await hashPassword('admin'),
					roles: {
						connect: {
							name: 'admin'
						}
					}
				}
			});
		}

		log.info('Database seeded');
	} catch (error) {
		console.error(error);
		console.error('Failed to seed database');
	}
}

seedDatabase();
