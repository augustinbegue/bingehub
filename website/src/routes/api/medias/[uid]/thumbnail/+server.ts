import { isLogged } from '$lib/modules/auth/utils';
import { error, json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database/prisma';

export const GET: RequestHandler = async ({ locals, params }) => {
    if (!isLogged(locals.user)) {
        throw error(401, 'Unauthorized');
    }

    const { uid } = params;

    if (!uid) throw error(400, 'Bad Request');

    const media = await prisma.post.findUnique({
        where: {
            uid,
        },
        select: {
            artworks: {
                select: {
                    type: true,
                    dataUrl: true
                }
            },
        }
    });
    if (!media || media.artworks.length < 0)
        throw error(404, 'Thumbnail not found');

    const thumb = media.artworks.find(artwork => artwork.type === 'THUMBNAIL' || artwork.type === 'BACKGROUND');

    if (!thumb)
        throw error(404, 'Thumbnail not found');

    return text(thumb.dataUrl, {
        headers: {
            'Content-Type': 'image/png'
        }
    });
};
