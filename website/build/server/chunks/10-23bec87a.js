import { i as isLogged } from './utils-cbdd992a.js';
import { r as redirect } from './index-1dce6fb5.js';
import { p as prisma } from './prisma-68db7c66.js';
import './index3-84056cf6.js';
import './index5-493b4a72.js';
import './index2-ea984e2e.js';
import '@prisma/client';

const load = async ({ parent, params, url }) => {
  const { uid } = params;
  const { user } = await parent();
  if (!isLogged(user)) {
    throw redirect(301, `/login?redirect=${url.pathname}`);
  }
  const media = await prisma.post.findUnique({
    where: {
      uid
    },
    include: {
      media: true
    }
  });
  if (!media || !media.media) {
    throw redirect(301, "/");
  }
  return {
    media
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 10;
const component = async () => (await import('./_page.svelte-664f57c1.js')).default;
const server_id = "src/routes/watch/[uid]/+page.server.ts";
const imports = ["_app/immutable/entry/watch-_uid_-page.svelte.595d234c.js","_app/immutable/chunks/index.1fbcc1c5.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-23bec87a.js.map
