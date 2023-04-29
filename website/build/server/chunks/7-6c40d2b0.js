import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

const load = async ({ locals, params, url }) => {
  const pagination = {
    current: parseInt(url.searchParams.get("page") ?? "1"),
    total: 0
  };
  const roles = await prisma.role.findMany({
    select: {
      uid: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      isActive: true,
      _count: {
        select: {
          users: true
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
  pagination.total = await prisma.role.count({
    where: {
      isDeleted: false
    }
  });
  return {
    roles,
    pagination
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 7;
const component = async () => (await import('./_page.svelte-71b00538.js')).default;
const server_id = "src/routes/admin/roles/+page.server.ts";
const imports = ["_app/immutable/entry/admin-roles-page.svelte.bf483942.js","_app/immutable/chunks/index.1fbcc1c5.js","_app/immutable/chunks/stores.6c0fa00a.js","_app/immutable/chunks/singletons.7bb68545.js","_app/immutable/chunks/pagination.a78ef5e4.js","_app/immutable/chunks/navigation.bf5ad0dd.js","_app/immutable/chunks/alerter.2a49f4f8.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-6c40d2b0.js.map
