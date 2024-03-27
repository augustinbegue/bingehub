import { isLogged } from '$lib/modules/auth/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/prisma';

export const ssr = false;

export const load: PageServerLoad = async ({ parent, params, url }) => {
	const { uid } = params;
	const { user } = await parent();

	if (!isLogged(user)) {
		throw redirect(301, `/auth/login?redirect=${url.pathname}`);
	}

	const post = await prisma.post.findUnique({
		where: {
			uid
		},
		include: {
			media: true,
			artworks: {
				where: {
					type: {
						in: ['BACKGROUND', 'THUMBNAIL']
					}
				},
				take: 1
			},
			parent: {
				select: {
					uid: true,
					title: true,
					slug: true,
					childs: {
						select: {
							uid: true,
							title: true,
							slug: true
						},
						orderBy: {
							slug: 'asc'
						}
					}
				}
			},
		}
	});


	if (!post || !post.media) {
		throw redirect(301, '/');
	}

	let previousPost = null;
	let nextPost = null;

	if (post.parent) {
		const parent = post.parent;
		const childs = parent.childs;

		const index = childs.findIndex((child) => child.uid === post.uid);

		if (index > 0) {
			previousPost = childs[index - 1];
		}

		if (index < childs.length - 1) {
			nextPost = childs[index + 1];
		}
	}

	return {
		post: post,
		previousPost: previousPost,
		nextPost: nextPost
	};
};
