import { p as prisma } from "../../chunks/prisma.js";
const load = async ({ parent, locals, url }) => {
  await parent();
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
    take: 10,
    skip: (pagination.current - 1) * 10,
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
  pagination.total = Math.ceil(count / 10);
  return {
    medias,
    pagination
  };
};
export {
  load
};
