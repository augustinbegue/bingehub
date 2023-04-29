import * as server from '../entries/pages/admin/media/_page.server.ts.js';

export const index = 5;
export const component = async () => (await import('../entries/pages/admin/media/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/media/+page.server.ts";
export const imports = ["_app/immutable/entry/admin-media-page.svelte.b1e218ec.js","_app/immutable/chunks/index.1fbcc1c5.js","_app/immutable/chunks/stores.6c0fa00a.js","_app/immutable/chunks/singletons.7bb68545.js","_app/immutable/chunks/pagination.a78ef5e4.js","_app/immutable/chunks/navigation.bf5ad0dd.js","_app/immutable/chunks/alerter.2a49f4f8.js"];
export const stylesheets = [];
export const fonts = [];
