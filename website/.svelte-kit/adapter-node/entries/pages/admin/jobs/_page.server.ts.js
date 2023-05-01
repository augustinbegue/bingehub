import { p as prisma } from "../../../../chunks/prisma.js";
const load = async ({ locals, params, url }) => {
  const pagination = {
    current: parseInt(url.searchParams.get("page") ?? "1"),
    total: 0
  };
  const jobs = await prisma.job.findMany({
    where: {
      isDeleted: false
    },
    orderBy: {
      createdAt: "desc"
    },
    skip: (pagination.current - 1) * 20,
    take: 20,
    include: {
      media: {
        select: {
          uid: true,
          url: true,
          post: {
            select: {
              uid: true,
              title: true
            }
          }
        }
      }
    }
  });
  pagination.total = Math.ceil(
    await prisma.job.count({
      where: {
        isDeleted: false
      }
    }) / 20
  );
  return {
    jobs,
    pagination
  };
};
export {
  load
};
