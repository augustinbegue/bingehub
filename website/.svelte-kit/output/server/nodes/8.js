import * as server from '../entries/pages/admin/roles/_page.server.ts.js';

export const index = 8;
export const component = async () => (await import('../entries/pages/admin/roles/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/roles/+page.server.ts";
export const imports = ["_app/immutable/entry/admin-roles-page.svelte.af45225b.js","_app/immutable/chunks/index.c7fa5583.js","_app/immutable/chunks/stores.1249a1df.js","_app/immutable/chunks/singletons.a77ac586.js","_app/immutable/chunks/index.03281ece.js","_app/immutable/chunks/Modal.ca3fada1.js","_app/immutable/chunks/pagination.82eda5f1.js","_app/immutable/chunks/navigation.38e53729.js","_app/immutable/chunks/alerter.a508b1c7.js"];
export const stylesheets = [];
export const fonts = [];
