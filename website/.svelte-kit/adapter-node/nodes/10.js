import * as server from '../entries/pages/watch/_uid_/_page.server.ts.js';

export const index = 10;
export const component = async () => (await import('../entries/pages/watch/_uid_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/watch/[uid]/+page.server.ts";
export const imports = ["_app/immutable/entry/watch-_uid_-page.svelte.595d234c.js","_app/immutable/chunks/index.1fbcc1c5.js"];
export const stylesheets = [];
export const fonts = [];
