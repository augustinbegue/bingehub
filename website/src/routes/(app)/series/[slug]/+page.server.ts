import { prisma } from "$lib/server/database/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
    const parentPost = await prisma.post.findFirst({
        where: {
            slug: params.slug,
        },
        include: {
            childs: {
                orderBy: {
                    slug: "asc",
                },
                include: {
                    media: {
                        include: {
                            views: {
                                where: {
                                    userId: locals.user?.uid,
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    if (!parentPost) {
        throw error(404, "Series not found");
    }
    return {
        series: parentPost
    };
};
