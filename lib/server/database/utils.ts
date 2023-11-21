import type { EventType, User } from '@prisma/client';
import { prisma } from './prisma';

export async function createEvent(type: EventType, user: User, data: unknown) {
	const res = await prisma.event.create({
		data: {
			type,
			user: {
				connect: {
					uid: user.uid
				}
			},
			data: JSON.stringify(data)
		}
	});

	return res;
}
