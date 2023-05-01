import * as server from '../entries/pages/watch/_uid_/_page.server.ts.js';

export const index = 11;
export const component = async () => (await import('../entries/pages/watch/_uid_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/watch/[uid]/+page.server.ts";
export const imports = ["_app/immutable/entry/watch-_uid_-page.svelte.cd560f23.js","_app/immutable/chunks/index.c7fa5583.js","_app/immutable/chunks/stores.1249a1df.js","_app/immutable/chunks/singletons.a77ac586.js","_app/immutable/chunks/index.03281ece.js"];
export const stylesheets = ["_app/immutable/assets/_page.8ab25718.css"];
export const fonts = [];
