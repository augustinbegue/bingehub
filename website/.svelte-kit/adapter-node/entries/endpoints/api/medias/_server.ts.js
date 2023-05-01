import { i as isLogged } from "../../../../chunks/utils.js";
import { e as error, j as json } from "../../../../chunks/index.js";
import { p as prisma } from "../../../../chunks/prisma.js";
const GET = async ({ locals, url }) => {
  if (!isLogged(locals.user)) {
    throw error(401, "Unauthorized");
  }
  const pageLength = parseInt(url.searchParams.get("count") ?? "9");
  const pagination = {
    current: parseInt(url.searchParams.get("page") ?? "1"),
    total: 0
  };
  const medias = await prisma.post.findMany({
    where: {
      isActive: true,
      isDeleted: false,
      type: "MEDIA"
    },
    include: {
      media: true
    },
    take: pageLength,
    skip: (pagination.current - 1) * pageLength,
    orderBy: {
      createdAt: "desc"
    }
  });
  const count = await prisma.post.count({
    where: {
      isActive: true,
      isDeleted: false,
      type: "MEDIA"
    }
  });
  pagination.total = Math.ceil(count / pageLength);
  return json({
    medias,
    pagination
  });
};
export {
  GET
};
