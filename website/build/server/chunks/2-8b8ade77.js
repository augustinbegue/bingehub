import { i as isLogged, h as hasRole } from './utils-cbdd992a.js';
import { r as redirect, e as error } from './index-1dce6fb5.js';
import './index3-84056cf6.js';
import './index5-493b4a72.js';
import './index2-ea984e2e.js';

const load = async ({ parent, url }) => {
  const parentData = await parent();
  if (!isLogged(parentData.user)) {
    throw redirect(307, "/auth/login?redirect=" + url.pathname);
  }
  if (!hasRole("admin", parentData.user)) {
    throw error(403, "You are not allowed to access this page");
  }
};

var _layout_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
const component = async () => (await import('./_layout.svelte-6e57606e.js')).default;
const universal_id = "src/routes/admin/+layout.ts";
const imports = ["_app/immutable/entry/admin-layout.svelte.9f43a46b.js","_app/immutable/chunks/index.1fbcc1c5.js","_app/immutable/chunks/stores.6c0fa00a.js","_app/immutable/chunks/singletons.7bb68545.js","_app/immutable/entry/admin-layout.ts.47317e3c.js","_app/immutable/chunks/utils.0381256a.js","_app/immutable/chunks/index.1fbcc1c5.js","_app/immutable/chunks/index.d363154b.js","_app/immutable/chunks/singletons.7bb68545.js","_app/immutable/chunks/_layout.57aec4cc.js","_app/immutable/chunks/control.e7f5239e.js","_app/immutable/chunks/navigation.bf5ad0dd.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _layout_ts as universal, universal_id };
//# sourceMappingURL=2-8b8ade77.js.map
