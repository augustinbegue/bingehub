import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 8;
const component = async () => (await import('./_page.svelte-ffd3d3d4.js')).default;
const server_id = "src/routes/admin/users/+page.server.ts";
const imports = ["_app/immutable/entry/admin-users-page.svelte.f8625f13.js","_app/immutable/chunks/index.1fbcc1c5.js","_app/immutable/chunks/stores.6c0fa00a.js","_app/immutable/chunks/singletons.7bb68545.js","_app/immutable/chunks/pagination.a78ef5e4.js","_app/immutable/chunks/navigation.bf5ad0dd.js","_app/immutable/chunks/alerter.2a49f4f8.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-54482f82.js.map
