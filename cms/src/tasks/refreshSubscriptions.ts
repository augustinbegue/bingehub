import { prisma } from '$lib/server/database/prisma';
import { log } from '..';
export async function refreshSubscriptions() {
	try {
		log.info('Refreshing subscriptions');

		const expiredSubscriptions = await prisma.subscription.findMany({
			where: {
				expiresAt: {
					lte: new Date()
				}
			},
			include: {
				user: {
					select: {
						uid: true
					}
				}
			}
		});

		const userUids = expiredSubscriptions.map((subscription) => subscription.user.uid);

		await prisma.user.updateMany({
			where: {
				uid: {
					in: userUids
				}
			},
			data: {
				isActive: false
			}
		});

		log.info('Subscriptions refreshed');
	} catch (error) {
		log.error(error);
		log.error('Failed to refresh subscriptions');
	}
}
