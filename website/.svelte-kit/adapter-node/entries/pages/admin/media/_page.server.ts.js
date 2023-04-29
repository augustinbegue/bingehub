import { p as prisma } from "../../../../chunks/prisma.js";
import "../../../../chunks/index.js";
const load = async ({ locals, params, url }) => {
  const pagination = {
    current: parseInt(url.searchParams.get("page") ?? "1"),
    total: 0
  };
  const posts = await prisma.post.findMany({
    where: {
      isDeleted: false,
      type: "MEDIA"
    },
    orderBy: {
      createdAt: "desc"
    },
    skip: (pagination.current - 1) * 20,
    take: 20,
    include: {
      author: {
        select: {
          username: true
        }
      },
      media: true
    }
  });
  pagination.total = await prisma.post.count({
    where: {
      isDeleted: false
    }
  });
  return {
    posts,
    pagination
  };
};
export {
  load
};
