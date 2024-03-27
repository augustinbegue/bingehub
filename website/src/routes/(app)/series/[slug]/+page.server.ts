import { prisma } from "$lib/server/database/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const parentPost = await prisma.post.findFirst({
        where: {
            slug: params.slug,
        },
        include: {
            childs: {
                orderBy: {
                    slug: "asc",
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
