import { p as prisma } from './prisma-68db7c66.js';
import './index-1dce6fb5.js';
import '@prisma/client';

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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
const component = async () => (await import('./_page.svelte-879d9a71.js')).default;
const server_id = "src/routes/admin/media/+page.server.ts";
const imports = ["_app/immutable/entry/admin-media-page.svelte.b1e218ec.js","_app/immutable/chunks/index.1fbcc1c5.js","_app/immutable/chunks/stores.6c0fa00a.js","_app/immutable/chunks/singletons.7bb68545.js","_app/immutable/chunks/pagination.a78ef5e4.js","_app/immutable/chunks/navigation.bf5ad0dd.js","_app/immutable/chunks/alerter.2a49f4f8.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-2c4544e3.js.map
