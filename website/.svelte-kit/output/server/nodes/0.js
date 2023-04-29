import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/entry/_layout.svelte.9d5479e4.js","_app/immutable/chunks/index.1fbcc1c5.js","_app/immutable/chunks/stores.6c0fa00a.js","_app/immutable/chunks/singletons.7bb68545.js","_app/immutable/chunks/alerter.2a49f4f8.js","_app/immutable/chunks/index.d363154b.js","_app/immutable/chunks/utils.0381256a.js"];
export const stylesheets = ["_app/immutable/assets/_layout.e1350f32.css"];
export const fonts = [];
