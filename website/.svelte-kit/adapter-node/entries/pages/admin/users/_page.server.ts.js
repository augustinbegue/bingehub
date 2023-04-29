import { p as prisma } from "../../../../chunks/prisma.js";
const load = async ({ locals, params, url }) => {
  const pagination = {
    current: parseInt(url.searchParams.get("page") ?? "1"),
    total: 0
  };
  const users = await prisma.user.findMany({
    select: {
      uid: true,
      username: true,
      createdAt: true,
      updatedAt: true,
      isActive: true,
      roles: {
        select: {
          uid: true
        }
      }
    },
    where: {
      isDeleted: false
    },
    orderBy: {
      createdAt: "desc"
    },
    skip: (pagination.current - 1) * 20,
    take: 20
  });
  const roles = await prisma.role.findMany({
    select: {
      name: true,
      uid: true
    },
    where: {
      isDeleted: false
    }
  });
  pagination.total = await prisma.user.count({
    where: {
      isDeleted: false
    }
  });
  return {
    users,
    roles,
    pagination
  };
};
export {
  load
};
