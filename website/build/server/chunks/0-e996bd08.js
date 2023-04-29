import './index-1dce6fb5.js';

const load = async ({ locals }) => {
  const { user } = locals;
  return {
    user
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
const component = async () => (await import('./_layout.svelte-7422cfe8.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/entry/_layout.svelte.9d5479e4.js","_app/immutable/chunks/index.1fbcc1c5.js","_app/immutable/chunks/stores.6c0fa00a.js","_app/immutable/chunks/singletons.7bb68545.js","_app/immutable/chunks/alerter.2a49f4f8.js","_app/immutable/chunks/index.d363154b.js","_app/immutable/chunks/utils.0381256a.js"];
const stylesheets = ["_app/immutable/assets/_layout.e1350f32.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-e996bd08.js.map
