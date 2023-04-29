import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
const component = async () => (await import('./_page.svelte-c45f22b5.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/entry/_page.svelte.0628e600.js","_app/immutable/chunks/index.1fbcc1c5.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-f60a45d3.js.map
