import { prisma } from '../lib/server/database/prisma';
import { createThumbnail } from '../lib/server/media/create-thumbnail';

const medias = await prisma.media.findMany({
	where: {
		isDeleted: false
	},
	select: {
		url: true,
		uid: true
	}
});

console.log(`Found ${medias.length} medias`);

for (let i = 0; i < medias.length; i++) {
	const media = medias[i];

	const thumbnail = await createThumbnail(media.url);

	await prisma.media.update({
		where: {
			uid: media.uid
		},
		data: {
			thumbnailDataUrl: thumbnail
		}
	});

	console.log(`Updated ${media.url}`);
}
