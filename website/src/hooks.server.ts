import { prisma } from '$lib/server/database/prisma';
import { log } from '$lib/server/logger';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const accessLogger: Handle = async ({ event, resolve }) => {
	log.info(`${event.request.method} ${event.url.pathname} from ${event.getClientAddress()}`);

	const response = await resolve(event);

	log.info(
		`${response.status} ${event.url.pathname} ${response.headers.get(
			'content-length'
		)} to ${event.getClientAddress()}`
	);

	return response;
};

const sessionHandler: Handle = async ({ event, resolve }) => {
	const { cookies, locals } = event;
	const sessiondId = cookies.get('session');

	if (sessiondId) {
		const session = await prisma.session.findUnique({
			where: {
				uid: sessiondId
			},
			include: {
				user: {
					select: {
						uid: true,
						username: true,
						isActive: true,
						isDeleted: true,
						roles: true
					}
				}
			}
		});

		locals.user = session?.user;
	}

	return resolve(event);
};

export const handle = sequence(accessLogger, sessionHandler);
